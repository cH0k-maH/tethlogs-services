import React from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";

export default function AboutStorySection() {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual / Brand Badge Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#0A192F] text-white p-8 rounded-3xl shadow-xl overflow-hidden border border-slate-800">
              
              {/* Giant Background 'ט' Watermark */}
              <div 
                aria-hidden="true" 
                className="absolute -right-8 -bottom-12 text-slate-800/60 text-[260px] font-serif leading-none font-bold select-none pointer-events-none"
              >
                ט
              </div>

              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <span className="text-3xl font-serif text-[#0052CC] font-bold">
                    <span className="text-[#E51937]">ט</span>
                  </span>
                </div>

                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-blue-400">
                    The Brand Philosophy
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">
                    Integrity in Every Gear and Sensor
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In ancient Hebrew tradition, the letter <strong>Teth (ט)</strong> represents goodness concealed within structure — the concept that genuine quality is built into the hidden foundation, not just the surface.
                </p>

                <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-[#0052CC]" />
                    <span>Dedicated solely to Ricoh printing architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-[#0052CC]" />
                    <span>Precision alignment with manufacturer tolerances</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-[#0052CC]" />
                    <span>Zero counterfeit or grey-market consumables</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Company Story & Technical Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wider border border-blue-100">
              <span className="text-[#E51937]">ט</span>
              <span>About TETHLOGS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              A Technical Engineering Firm, Not a Generic Box Shipper
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Most printer vendors drop off a machine and vanish until a costly breakdown occurs. <strong>TETHLOGS Services Limited</strong> was founded on a different premise: modern businesses cannot afford print pauses during contract signings, university examinations, or daily logistics.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              By focusing exclusively on <strong>Ricoh</strong> equipment, our engineering team possesses deep, diagnostic-level mastery of Ricoh operating software, laser optic assemblies, fuser heaters, and paper paths. We diagnose errors right the first time and maintain your fleet to factory standards.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-sm transition-colors"
              >
                <span>Read Full Company Story</span>
                <ArrowRightIcon size={14} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0A192F] hover:text-[#0052CC] px-4 py-3 transition-colors"
              >
                <span>Contact Engineering Team &rarr;</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
