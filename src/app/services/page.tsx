import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  WrenchIcon,
  SettingsIcon,
  PrinterIcon,
  ShieldCheckIcon,
  FileTextIcon,
  BoxIcon,
  CheckCircleIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { CORE_SERVICES, COMPANY_INFO } from "@/data/tethlogsData";

export const metadata: Metadata = {
  title: "Ricoh Technical Services & Maintenance | TETHLOGS",
  description:
    "Comprehensive Ricoh printer maintenance, emergency hardware repairs, network installation, and enterprise document workflows across Nigeria.",
};

export default function ServicesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Wrench: <WrenchIcon size={28} className="text-[#0052CC]" />,
    Settings: <SettingsIcon size={28} className="text-[#0052CC]" />,
    Printer: <PrinterIcon size={28} className="text-[#0052CC]" />,
    ShieldCheck: <ShieldCheckIcon size={28} className="text-[#0052CC]" />,
    FileText: <FileTextIcon size={28} className="text-[#0052CC]" />,
    Box: <BoxIcon size={28} className="text-[#0052CC]" />,
  };

  return (
    <main className="bg-[#F8FAFC] pb-24">
      {/* Header Banner */}
      <section className="bg-[#0A192F] text-white py-16 lg:py-20 relative overflow-hidden">
        <div 
          aria-hidden="true" 
          className="absolute -right-10 -bottom-16 text-slate-800/50 text-[260px] font-serif leading-none font-bold select-none pointer-events-none"
        >
          ט
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-4 border border-slate-700">
              <span className="text-[#E51937]">ט</span>
              <span>Dedicated Ricoh Services</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Technical Printer Services &amp; Document Workflows
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Every printer problem has a clear, methodical engineering fix. We provide preventive servicing, rapid component repairs, fleet installation, and secure digital document workflows.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/request-service"
                className="bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold text-sm px-6 py-3 rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <WrenchIcon size={16} />
                <span>Request a Service Ticket</span>
              </Link>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <WhatsAppIcon size={16} />
                <span>Speak to a Technician</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {CORE_SERVICES.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className="scroll-mt-28 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  {iconMap[service.iconName]}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                    Category 0{index + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
                    {service.title}
                  </h2>
                </div>
              </div>

              <p className="text-sm font-semibold text-[#0A192F] italic">
                "{service.tagline}"
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                {service.description}
              </p>

              {/* Specific Technical Inclusions */}
              <div className="pt-2">
                <h3 className="text-xs font-bold text-[#0A192F] uppercase tracking-wider mb-2.5">
                  Technical Service Inclusions:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircleIcon size={15} className="text-[#0052CC] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnostic Tip Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-[#0F2744] flex items-start gap-2.5">
                <span className="font-bold text-[#0052CC] shrink-0"><span className="text-[#E51937]">ט</span> Pro Tip:</span>
                <span>{service.diagnosticTip}</span>
              </div>
            </div>

            {/* Right Action / Dispatch Box */}
            <div className="lg:col-span-4 bg-[#F8FAFC] p-6 rounded-xl border border-slate-200 text-center space-y-4">
              <div className="relative h-32 w-full mx-auto flex items-center justify-center">
                <Image
                  src="/images/printer.jpg"
                  alt={service.title}
                  width={200}
                  height={130}
                  className="object-contain max-h-28 w-auto"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Service Availability
                </span>
                <span className="text-xs font-bold text-[#0A192F]">
                  On-Site &amp; Scheduled Maintenance
                </span>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href={`/request-service?service=${encodeURIComponent(service.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold text-xs py-3 px-4 rounded-lg shadow-sm transition-colors"
                >
                  <WrenchIcon size={14} />
                  <span>Book This Service</span>
                </Link>

                <Link
                  href="/quote"
                  className="w-full inline-flex items-center justify-center text-xs font-semibold text-slate-700 hover:text-[#0052CC] py-2"
                >
                  Request Fleet Maintenance SLA &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Emergency Bottom SLA Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">
              Emergency Printer Breakdown?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Need on-site dispatch within 4 hours?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Our mobile engineers carry Ricoh diagnostic equipment and OEM consumables to get your corporate printing back online with minimal disruption.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/request-service"
              className="w-full sm:w-auto text-center bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-md transition-all"
            >
              Submit Emergency Ticket
            </Link>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full sm:w-auto text-center border border-slate-600 hover:border-white text-white font-semibold text-sm px-5 py-3.5 rounded-lg transition-colors"
            >
              Call Technical Hotline
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
