import React from "react";
import Link from "next/link";
import {
  WrenchIcon,
  SettingsIcon,
  PrinterIcon,
  ShieldCheckIcon,
  FileTextIcon,
  BoxIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";
import { CORE_SERVICES } from "@/data/tethlogsData";

export default function QuickServicesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Wrench: <WrenchIcon size={22} className="text-[#0052CC]" />,
    Settings: <SettingsIcon size={22} className="text-[#0052CC]" />,
    Printer: <PrinterIcon size={22} className="text-[#0052CC]" />,
    ShieldCheck: <ShieldCheckIcon size={22} className="text-[#0052CC]" />,
    FileText: <FileTextIcon size={22} className="text-[#0052CC]" />,
    Box: <BoxIcon size={22} className="text-[#0052CC]" />,
  };

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Teth signature */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0052CC] uppercase tracking-wider mb-2">
              <span className="text-[#E51937]">ט</span>
              <span>Our Core Technical Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
              Engineered to Keep Your Business Printing
            </h2>
          </div>
          <Link
            href="/services"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1 text-xs font-bold text-[#0052CC] hover:underline transition-colors"
          >
            <span>View All Detailed Services</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        {/* Quick Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-card group bg-white rounded-xl p-6 border border-slate-200 hover:border-[#0052CC]/50 relative flex flex-col justify-between"
            >
              {/* Subtle top blue accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#0052CC] rounded-t-xl transition-colors duration-200" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50/80 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    {iconMap[service.iconName] || <WrenchIcon size={22} className="text-[#0052CC]" />}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#0052CC] transition-colors">
                    Ricoh Spec
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0A192F] group-hover:text-[#0052CC] transition-colors mb-2">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Sub-feature bullet highlights */}
                <ul className="space-y-1.5 mb-6 text-[12px] text-slate-600">
                  {service.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#0052CC] font-bold text-xs mt-0.5">•</span>
                      <span className="line-clamp-1">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action row */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/services#${service.id}`}
                  className="text-xs font-semibold text-[#0A192F] hover:text-[#0052CC] flex items-center gap-1 group-hover:underline"
                >
                  <span>Learn more</span>
                  <ArrowRightIcon size={12} />
                </Link>

                <Link
                  href="/request-service"
                  className="text-xs font-bold text-[#0052CC] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors"
                >
                  Book Service
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
