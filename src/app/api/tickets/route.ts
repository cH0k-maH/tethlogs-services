import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendTicketEmail } from "@/lib/email";
import { generateTicketWhatsAppUrl } from "@/lib/whatsapp";

const serviceTicketSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  companyName: z.string().optional().nullable(),
  phone: z.string().min(8, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
  deviceType: z.string().default("Multifunction Color MFP"),
  brand: z.string().default("Ricoh"),
  model: z.string().min(1, "Printer model is required"),
  serviceType: z.string().default("Repair (Hardware / Error Code)"),
  problemDescription: z.string().min(5, "Problem description is required"),
  urgency: z.string().default("Standard (Within 24 Hours)"),
  imageUrl: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = serviceTicketSchema.parse(body);

    // Generate unique reference ticket code
    const dateStr = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ticketCode = `TETH-SR-${dateStr}-${randomSuffix}`;

    // Attempt to store in Prisma Database
    let dbRecord = null;
    try {
      dbRecord = await prisma.serviceTicket.create({
        data: {
          ticketCode,
          fullName: validatedData.fullName,
          companyName: validatedData.companyName || null,
          phone: validatedData.phone,
          email: validatedData.email,
          deviceType: validatedData.deviceType,
          brand: validatedData.brand,
          model: validatedData.model,
          serviceType: validatedData.serviceType,
          problemDescription: validatedData.problemDescription,
          urgency: validatedData.urgency,
          imageUrl: validatedData.imageUrl || null,
          status: "PENDING",
        },
      });
    } catch (dbError) {
      console.warn("Database storage skipped (ensure DATABASE_URL is reachable):", dbError);
    }

    // Send Real-Time Email Alerts (Admin + Customer)
    const emailResult = await sendTicketEmail({
      ticketCode,
      fullName: validatedData.fullName,
      companyName: validatedData.companyName,
      phone: validatedData.phone,
      email: validatedData.email,
      deviceType: validatedData.deviceType,
      brand: validatedData.brand,
      model: validatedData.model,
      serviceType: validatedData.serviceType,
      problemDescription: validatedData.problemDescription,
      urgency: validatedData.urgency,
      imageUrl: validatedData.imageUrl,
    });

    // Generate WhatsApp direct escalation link
    const whatsappUrl = generateTicketWhatsAppUrl({
      ticketCode,
      fullName: validatedData.fullName,
      companyName: validatedData.companyName,
      phone: validatedData.phone,
      email: validatedData.email,
      deviceType: validatedData.deviceType,
      brand: validatedData.brand,
      model: validatedData.model,
      serviceType: validatedData.serviceType,
      problemDescription: validatedData.problemDescription,
      urgency: validatedData.urgency,
    });

    return NextResponse.json({
      success: true,
      ticketCode,
      whatsappUrl,
      dbSaved: !!dbRecord,
      emailSent: emailResult.success,
      message: "Service ticket logged successfully.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
