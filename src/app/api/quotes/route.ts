import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendQuoteEmail } from "@/lib/email";
import { generateQuoteWhatsAppUrl } from "@/lib/whatsapp";

const quoteRequestSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional().nullable(),
  phone: z.string().min(8, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
  productOrService: z.string().min(1, "Product or service is required"),
  quantity: z.string().default("1"),
  monthlyVolume: z.string().optional().nullable(),
  requirements: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = quoteRequestSchema.parse(body);

    const yearStr = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const quoteCode = `TETH-QR-${yearStr}-${randomSuffix}`;

    let dbRecord = null;
    try {
      dbRecord = await prisma.quoteRequest.create({
        data: {
          quoteCode,
          name: validatedData.name,
          company: validatedData.company || null,
          phone: validatedData.phone,
          email: validatedData.email,
          productOrService: validatedData.productOrService,
          quantity: validatedData.quantity || "1",
          monthlyVolume: validatedData.monthlyVolume || null,
          requirements: validatedData.requirements || null,
          status: "NEW",
        },
      });
    } catch (dbError) {
      console.warn("Database storage skipped (ensure DATABASE_URL is reachable):", dbError);
    }

    const emailResult = await sendQuoteEmail({
      quoteCode,
      name: validatedData.name,
      company: validatedData.company,
      phone: validatedData.phone,
      email: validatedData.email,
      productOrService: validatedData.productOrService,
      quantity: validatedData.quantity,
      monthlyVolume: validatedData.monthlyVolume,
      requirements: validatedData.requirements,
    });

    const whatsappUrl = generateQuoteWhatsAppUrl({
      quoteCode,
      name: validatedData.name,
      company: validatedData.company,
      phone: validatedData.phone,
      email: validatedData.email,
      productOrService: validatedData.productOrService,
      quantity: validatedData.quantity,
      monthlyVolume: validatedData.monthlyVolume,
      requirements: validatedData.requirements,
    });

    return NextResponse.json({
      success: true,
      quoteCode,
      whatsappUrl,
      dbSaved: !!dbRecord,
      emailSent: emailResult.success,
      message: "Quote request received successfully.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating quote:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
