import { COMPANY_INFO } from "@/data/tethlogsData";

export interface TicketWhatsAppPayload {
  ticketCode: string;
  fullName: string;
  companyName?: string | null;
  phone: string;
  email: string;
  deviceType: string;
  brand: string;
  model: string;
  serviceType: string;
  problemDescription: string;
  urgency: string;
}

export interface QuoteWhatsAppPayload {
  quoteCode: string;
  name: string;
  company?: string | null;
  phone: string;
  email: string;
  productOrService: string;
  quantity?: string;
  monthlyVolume?: string | null;
  requirements?: string | null;
}

export function generateTicketWhatsAppUrl(ticket: TicketWhatsAppPayload): string {
  const company = ticket.companyName ? ` (${ticket.companyName})` : "";
  const lines = [
    `*🚨 TETHLOGS SERVICE DISPATCH*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `*Ticket Ref:* ${ticket.ticketCode}`,
    `*Urgency:* ${ticket.urgency}`,
    `*Customer:* ${ticket.fullName}${company}`,
    `*Phone:* ${ticket.phone}`,
    `*Email:* ${ticket.email}`,
    `*Equipment:* ${ticket.brand} ${ticket.model} (${ticket.deviceType})`,
    `*Service Requested:* ${ticket.serviceType}`,
    `*Fault Description:*`,
    `${ticket.problemDescription}`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `_Sent via Tethlogs Engineering Web Portal_`,
  ];

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`;
}

export function generateQuoteWhatsAppUrl(quote: QuoteWhatsAppPayload): string {
  const company = quote.company ? ` (${quote.company})` : "";
  const lines = [
    `*📋 TETHLOGS QUOTE REQUEST*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `*Quote Ref:* ${quote.quoteCode}`,
    `*Customer:* ${quote.name}${company}`,
    `*Phone:* ${quote.phone}`,
    `*Email:* ${quote.email}`,
    `*Machine / Service:* ${quote.productOrService}`,
    `*Quantity:* ${quote.quantity || "1"}`,
    `*Monthly Volume:* ${quote.monthlyVolume || "Standard"}`,
    `*Custom Requirements:*`,
    `${quote.requirements || "Standard enterprise supply & service"}`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `_Sent via Tethlogs Engineering Web Portal_`,
  ];

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`;
}

export function generateContactWhatsAppUrl(inquiry: {
  inquiryCode: string;
  name: string;
  company?: string | null;
  phone: string;
  inquiryType: string;
  message: string;
}): string {
  const company = inquiry.company ? ` (${inquiry.company})` : "";
  const lines = [
    `*💬 TETHLOGS TECHNICAL INQUIRY*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `*Ref:* ${inquiry.inquiryCode}`,
    `*Name:* ${inquiry.name}${company}`,
    `*Phone:* ${inquiry.phone}`,
    `*Subject:* ${inquiry.inquiryType}`,
    `*Message:*`,
    `${inquiry.message}`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
  ];

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`;
}
