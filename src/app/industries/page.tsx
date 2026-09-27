import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BuildingIcon,
  GraduationCapIcon,
  LandmarkIcon,
  ActivityIcon,
  ChurchIcon,
  BriefcaseIcon,
  FileTextIcon,
} from "@/components/ui/Icons";
import { INDUSTRIES_DATA } from "@/data/tethlogsData";

export const metadata: Metadata = {
  title: "Industries We Serve | TETHLOGS Services Limited",
  description:
    "Tailored Ricoh printing fleets and document solutions for Corporate Offices, Education, Government, Healthcare, Churches, and SMEs.",
};

export default function IndustriesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Building: <BuildingIcon size={26} className="text-[#0052CC]" />,
    GraduationCap: <GraduationCapIcon size={26} className="text-[#0052CC]" />,
    Landmark: <LandmarkIcon size={26} className="text-[#0052CC]" />,
    Activity: <ActivityIcon size={26} className="text-[#0052CC]" />,
    Church: <ChurchIcon size={26} className="text-[#0052CC]" />,
    Briefcase: <BriefcaseIcon size={26} className="text-[#0052CC]" />,
  };

  return (
    <main className="bg-[#F8FAFC] pb-24">
      {/* Banner */}
      <section className="bg-[#0A192F] text-white py-16 lg:py-20 relative overflow-hidden">
        <div 
          aria-hidden="true" 
          className="absolute -right-12 -bottom-20 text-slate-800/40 text-[280px] font-serif leading-none font-bold select-none pointer-events-none"
        >
          ט
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-4 border border-slate-700">
              <span className="text-[#E51937]">ט</span>
              <span>Industry Print Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              B2B Printing &amp; Document Governance
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Every sector experiences distinct document volume curves, compliance mandates, and operational tempos. Explore how we engineer Ricoh printing workflows for your environment.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        {INDUSTRIES_DATA.map((ind, idx) => (
          <div
            key={ind.id}
            id={ind.id}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  {iconMap[ind.icon]}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052CC]">
                    Sector 0{idx + 1}
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#0A192F]">
                    {ind.title}
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {ind.description}
              </p>

              {/* Challenges */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Common Sector Printing Challenges:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                  {ind.commonChallenges.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution */}
              <div className="bg-[#F0F5FA] p-4 rounded-xl border border-[#D0E0F0] text-xs">
                <span className="font-bold text-[#0A192F] block text-xs mb-1">
                  The Tethlogs Engineered Solution:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {ind.solution}
                </p>
              </div>
            </div>

            {/* Right Action */}
            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 text-center space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Tailored Proposal
              </span>
              <p className="text-xs text-slate-500">
                Get a comprehensive SLA and machine breakdown configured for your organization's exact headcount.
              </p>
              <Link
                href={`/quote?product=${encodeURIComponent(ind.title + " Printing Solution")}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold text-xs py-3 px-4 rounded-lg shadow-sm transition-colors"
              >
                <FileTextIcon size={14} />
                <span>Request Sector Quote</span>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
