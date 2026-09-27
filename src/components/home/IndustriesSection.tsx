import React from "react";
import Link from "next/link";
import {
  BuildingIcon,
  GraduationCapIcon,
  LandmarkIcon,
  ActivityIcon,
  ChurchIcon,
  BriefcaseIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";
import { INDUSTRIES_DATA } from "@/data/tethlogsData";

export default function IndustriesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Building: <BuildingIcon size={24} className="text-[#0052CC]" />,
    GraduationCap: <GraduationCapIcon size={24} className="text-[#0052CC]" />,
    Landmark: <LandmarkIcon size={24} className="text-[#0052CC]" />,
    Activity: <ActivityIcon size={24} className="text-[#0052CC]" />,
    Church: <ChurchIcon size={24} className="text-[#0052CC]" />,
    Briefcase: <BriefcaseIcon size={24} className="text-[#0052CC]" />,
  };

  return (
    <section className="py-20 bg-[#F0F5FA] border-b border-[#D0E0F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-2 border border-slate-200">
              <span className="text-[#E51937]">ט</span>
              <span>B2B Sector Focus</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F]">
              Industries We Power &amp; Maintain
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              From corporate legal departments demanding strict print security to faith institutions producing weekly bulletins, our Ricoh solutions are tailored to exact sector workflows.
            </p>
          </div>
          <Link
            href="/industries"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1 text-xs font-bold text-[#0052CC] hover:underline transition-colors"
          >
            <span>Explore All Industry Specs</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        {/* 6 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_DATA.map((ind) => (
            <div
              key={ind.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    {iconMap[ind.icon]}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Enterprise SLA
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0A192F] group-hover:text-[#0052CC] transition-colors mb-2">
                  {ind.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {ind.description}
                </p>

                {/* Practical Solution Snapshot */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs mb-4">
                  <span className="font-bold text-[#0A192F] block text-[11px] mb-1">
                    Tailored Ricoh Deployment:
                  </span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {ind.solution}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/quote"
                  className="text-xs font-semibold text-[#0052CC] hover:underline flex items-center gap-1"
                >
                  <span>Request Custom Package</span>
                  <ArrowRightIcon size={12} />
                </Link>
                <Link
                  href="/request-service"
                  className="text-xs font-bold text-[#0052CC] hover:underline"
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
