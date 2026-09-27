import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "TETHLOGS Services Limited | Professional Printing & Document Solutions",
  description:
    "Reliable Ricoh printer maintenance, repairs, installation, and technical document workflows for businesses and organizations. Certified Ricoh technical specialists.",
  keywords: [
    "Ricoh printers",
    "printer repair Lagos",
    "printer maintenance",
    "multifunction printer service",
    "Tethlogs Services",
    "office document solutions",
    "genuine Ricoh toner",
  ],
  authors: [{ name: "Tethlogs Services Limited" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-[#0052CC] selection:text-white">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
