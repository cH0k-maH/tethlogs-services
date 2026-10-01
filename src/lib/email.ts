import nodemailer from "nodemailer";
import { COMPANY_INFO } from "@/data/tethlogsData";
import { generateTicketWhatsAppUrl, generateQuoteWhatsAppUrl } from "./whatsapp";

// Create reusable transporter
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

const DEFAULT_SENDER =
  process.env.SMTP_FROM || `"TETHLOGS Technical Support" <${process.env.SMTP_USER || "dispatch@tethlogs.com"}>`;
const ADMIN_RECIPIENT =
  process.env.ALERT_EMAIL_RECIPIENT || process.env.SMTP_USER || "info@tethlogs.com";

// ==========================================
// 1. SERVICE TICKET NOTIFICATIONS
// ==========================================
export async function sendTicketEmail(ticket: {
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
  imageUrl?: string | null;
}) {
  const transporter = getTransporter();
  const whatsappUrl = generateTicketWhatsAppUrl(ticket);

  if (!transporter) {
    console.log(
      `[SIMULATED EMAIL - SMTP not configured in .env.local]\n` +
      `New Ticket: ${ticket.ticketCode} for ${ticket.fullName} (${ticket.phone})\n` +
      `Issue: ${ticket.problemDescription}\n` +
      `WhatsApp Escalation: ${whatsappUrl}`
    );
    return { success: true, simulated: true };
  }

  try {
    // 1. Send Alert to Admin / Technician Desk
    await transporter.sendMail({
      from: DEFAULT_SENDER,
      to: ADMIN_RECIPIENT,
      subject: `🚨 [${ticket.urgency.toUpperCase()}] New Service Ticket #${ticket.ticketCode} - ${ticket.brand} ${ticket.model}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #F8FAFC; padding: 24px; color: #1E293B;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <div style="background-color: #0A192F; padding: 20px 24px; border-bottom: 3px solid #E51937;">
              <h2 style="color: #ffffff; margin: 0; font-size: 20px;">TETHLOGS SERVICE DISPATCH DESK</h2>
              <p style="color: #94A3B8; margin: 4px 0 0 0; font-size: 13px;">Instant Web Ticket Notification</p>
            </div>
            
            <div style="padding: 24px;">
              <div style="display: inline-block; background-color: #FEF2F2; color: #DC2626; padding: 4px 12px; border-radius: 999px; font-weight: bold; font-size: 12px; margin-bottom: 16px;">
                ${ticket.urgency}
              </div>

              <h3 style="margin-top: 0; color: #0A192F;">Ticket #${ticket.ticketCode}</h3>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #64748B; width: 140px;">Customer:</td>
                  <td style="padding: 8px 0; color: #0A192F;">${ticket.fullName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #64748B;">Company:</td>
                  <td style="padding: 8px 0; color: #0A192F;">${ticket.companyName || "Direct Client / None"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #64748B;">Phone:</td>
                  <td style="padding: 8px 0; color: #0052CC; font-weight: bold;"><a href="tel:${ticket.phone}">${ticket.phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #64748B;">Email:</td>
                  <td style="padding: 8px 0; color: #0A192F;"><a href="mailto:${ticket.email}">${ticket.email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #64748B;">Equipment:</td>
                  <td style="padding: 8px 0; color: #0A192F;"><strong>${ticket.brand} ${ticket.model}</strong> (${ticket.deviceType})</td>
                </tr>
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #64748B;">Service Type:</td>
                  <td style="padding: 8px 0; color: #0A192F;">${ticket.serviceType}</td>
                </tr>
              </table>

              <div style="background-color: #F8FAFC; border-left: 4px solid #0052CC; padding: 14px; margin-bottom: 24px; border-radius: 4px;">
                <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #0A192F;">Reported Issue / Error Description:</h4>
                <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.5; white-space: pre-wrap;">${ticket.problemDescription}</p>
              </div>

              ${
                ticket.imageUrl
                  ? `<div style="margin-bottom: 24px;">
                      <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #0A192F;">Customer Attached Photo:</h4>
                      <p><a href="${ticket.imageUrl}" target="_blank" style="color: #0052CC; font-weight: bold; text-decoration: underline;">View Attached Error Photo / Screenshot</a></p>
                     </div>`
                  : ""
              }

              <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #E2E8F0;">
                <a href="${whatsappUrl}" target="_blank" style="background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block; margin-right: 8px;">
                  Open & Reply in WhatsApp
                </a>
                <a href="tel:${ticket.phone}" style="background-color: #0052CC; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">
                  Call Customer
                </a>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    // 2. Send Confirmation to Customer
    await transporter.sendMail({
      from: DEFAULT_SENDER,
      to: ticket.email,
      subject: `Service Ticket Received #${ticket.ticketCode} - Tethlogs Technical Desk`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #F8FAFC; padding: 24px; color: #1E293B;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0;">
            <div style="background-color: #0A192F; padding: 24px; border-bottom: 3px solid #E51937;">
              <h2 style="color: #ffffff; margin: 0;">TETHLOGS SERVICES LTD</h2>
              <p style="color: #94A3B8; margin: 4px 0 0 0; font-size: 13px;">Enterprise Ricoh Office Equipment & Engineering</p>
            </div>
            
            <div style="padding: 24px;">
              <h3 style="color: #0A192F; margin-top: 0;">Thank You, ${ticket.fullName}</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #475569;">
                Your service request has been logged into our technical engineering queue under ticket reference <strong>#${ticket.ticketCode}</strong>.
              </p>

              <div style="background-color: #F1F5F9; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px;">
                <p style="margin: 4px 0;"><strong>Equipment:</strong> ${ticket.brand} ${ticket.model}</p>
                <p style="margin: 4px 0;"><strong>Service:</strong> ${ticket.serviceType}</p>
                <p style="margin: 4px 0;"><strong>Priority SLA:</strong> ${ticket.urgency}</p>
                <p style="margin: 4px 0;"><strong>Current Status:</strong> <span style="color: #0052CC; font-weight: bold;">QUEUED / DISPATCHING</span></p>
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #475569;">
                A certified field engineer will review your issue and reach out to confirm dispatch and parts requirements.
              </p>

              <div style="text-align: center; margin-top: 24px;">
                <a href="${whatsappUrl}" target="_blank" style="background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">
                  Fast-Track Ticket via WhatsApp
                </a>
              </div>

              <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #94A3B8; text-align: center;">
                Tethlogs Services Ltd | ${COMPANY_INFO.officeAddress} | Phone: ${COMPANY_INFO.phone}
              </div>
            </div>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending ticket email:", error);
    return { success: false, error };
  }
}

// ==========================================
// 2. QUOTE REQUEST NOTIFICATIONS
// ==========================================
export async function sendQuoteEmail(quote: {
  quoteCode: string;
  name: string;
  company?: string | null;
  phone: string;
  email: string;
  productOrService: string;
  quantity?: string;
  monthlyVolume?: string | null;
  requirements?: string | null;
}) {
  const transporter = getTransporter();
  const whatsappUrl = generateQuoteWhatsAppUrl(quote);

  if (!transporter) {
    console.log(
      `[SIMULATED EMAIL - SMTP not configured in .env.local]\n` +
      `New Quote: ${quote.quoteCode} for ${quote.name} (${quote.productOrService})\n` +
      `WhatsApp Escalation: ${whatsappUrl}`
    );
    return { success: true, simulated: true };
  }

  try {
    // Send to Admin
    await transporter.sendMail({
      from: DEFAULT_SENDER,
      to: ADMIN_RECIPIENT,
      subject: `📋 New Quotation Request #${quote.quoteCode} - ${quote.productOrService}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #F8FAFC; padding: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E2E8F0; padding: 24px;">
            <h2 style="color: #0A192F; margin-top: 0;">New Quote Request #${quote.quoteCode}</h2>
            <p><strong>Customer:</strong> ${quote.name} (${quote.company || "Direct"})</p>
            <p><strong>Phone:</strong> <a href="tel:${quote.phone}">${quote.phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${quote.email}">${quote.email}</a></p>
            <p><strong>Product/Service:</strong> ${quote.productOrService}</p>
            <p><strong>Quantity:</strong> ${quote.quantity || "1"}</p>
            <p><strong>Monthly Volume:</strong> ${quote.monthlyVolume || "N/A"}</p>
            <p><strong>Requirements:</strong> ${quote.requirements || "None specified"}</p>
            <div style="margin-top: 20px;">
              <a href="${whatsappUrl}" target="_blank" style="background-color: #25D366; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 13px;">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      `,
    });

    // Send confirmation to Customer
    await transporter.sendMail({
      from: DEFAULT_SENDER,
      to: quote.email,
      subject: `Quote Request Received #${quote.quoteCode} - Tethlogs Services Ltd`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #F8FAFC; padding: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E2E8F0; padding: 24px;">
            <h3 style="color: #0A192F; margin-top: 0;">Hello ${quote.name},</h3>
            <p>Thank you for requesting a quotation for <strong>${quote.productOrService}</strong>.</p>
            <p>Our enterprise solutions team is preparing an official quotation for your review under reference <strong>#${quote.quoteCode}</strong>.</p>
            <p>If you need expedited pricing or immediate equipment availability, you can fast-track directly on WhatsApp:</p>
            <div style="margin-top: 20px;">
              <a href="${whatsappUrl}" target="_blank" style="background-color: #25D366; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 13px;">Fast-Track via WhatsApp</a>
            </div>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending quote email:", error);
    return { success: false, error };
  }
}

// ==========================================
// 3. CONTACT INQUIRY NOTIFICATIONS
// ==========================================
export async function sendContactEmail(inquiry: {
  inquiryCode: string;
  name: string;
  company?: string | null;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
}) {
  const transporter = getTransporter();

  if (!transporter) {
    console.log(
      `[SIMULATED EMAIL - SMTP not configured in .env.local]\n` +
      `New Inquiry: ${inquiry.inquiryCode} from ${inquiry.name} (${inquiry.email})\n` +
      `Subject: ${inquiry.inquiryType}\n` +
      `Message: ${inquiry.message}`
    );
    return { success: true, simulated: true };
  }

  try {
    await transporter.sendMail({
      from: DEFAULT_SENDER,
      to: ADMIN_RECIPIENT,
      subject: `💬 New Web Inquiry #${inquiry.inquiryCode} - ${inquiry.inquiryType}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>New Message from ${inquiry.name}</h3>
          <p><strong>Company:</strong> ${inquiry.company || "N/A"}</p>
          <p><strong>Phone:</strong> <a href="tel:${inquiry.phone}">${inquiry.phone}</a></p>
          <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
          <p><strong>Category:</strong> ${inquiry.inquiryType}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #F1F5F9; padding: 12px; border-radius: 6px;">${inquiry.message}</div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error };
  }
}
