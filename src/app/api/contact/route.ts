import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendContactEmail } from "@/lib/email";
import { generateContactWhatsAppUrl } from "@/lib/whatsapp";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional().nullable(),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  inquiryType: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const yearStr = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const inquiryCode = `TETH-INQ-${yearStr}-${randomSuffix}`;
    const category = validatedData.inquiryType || validatedData.subject || "General Inquiry";

    let dbRecord = null;
    try {
      dbRecord = await prisma.contactInquiry.create({
        data: {
          inquiryCode,
          name: validatedData.name,
          company: validatedData.company || null,
          email: validatedData.email,
          phone: validatedData.phone,
          inquiryType: category,
          message: validatedData.message,
          status: "UNREAD",
        },
      });
    } catch (dbError) {
      console.warn("Database storage skipped (ensure DATABASE_URL is reachable):", dbError);
    }

    const emailResult = await sendContactEmail({
      inquiryCode,
      name: validatedData.name,
      company: validatedData.company,
      email: validatedData.email,
      phone: validatedData.phone,
      inquiryType: category,
      message: validatedData.message,
    });

    const whatsappUrl = generateContactWhatsAppUrl({
      inquiryCode,
      name: validatedData.name,
      company: validatedData.company,
      phone: validatedData.phone,
      inquiryType: category,
      message: validatedData.message,
    });

    return NextResponse.json({
      success: true,
      inquiryCode,
      whatsappUrl,
      dbSaved: !!dbRecord,
      emailSent: emailResult.success,
      message: "Inquiry submitted successfully.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error("Error submitting contact inquiry:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
