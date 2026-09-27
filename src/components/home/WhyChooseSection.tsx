import React from "react";
import {
  ShieldCheckIcon,
  ClockIcon,
  WrenchIcon,
  PhoneIcon,
  CheckCircleIcon,
} from "@/components/ui/Icons";
import { WHY_CHOOSE_US } from "@/data/tethlogsData";

export default function WhyChooseSection() {
  const iconList = [
    <ShieldCheckIcon key="1" size={24} className="text-[#0052CC]" />,
    <ClockIcon key="2" size={24} className="text-[#0052CC]" />,
    <WrenchIcon key="3" size={24} className="text-[#0052CC]" />,
    <PhoneIcon key="4" size={24} className="text-[#0052CC]" />,
  ];

  return (
    <section className="py-20 bg-[#0A192F] text-white relative overflow-hidden">
      {/* Background Watermark */}
      <div 
        aria-hidden="true" 
        className="absolute -bottom-20 -left-16 text-slate-800/40 text-[280px] font-serif leading-none font-bold select-none pointer-events-none opacity-20"
      >
        ט
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-3 border border-slate-700">
            <span className="text-[#E51937]">ט</span>
            <span>Why Choose Tethlogs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Substantiated Technical Standards. Zero Empty Slogans.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            We operate on verifiable metrics: certified Ricoh diagnostics, response time SLAs, and genuine consumables that protect your hardware.
          </p>
        </div>

        {/* 4 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-[#0052CC]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-5 border border-slate-700">
                  {iconList[idx]}
                </div>
                
                <span className="text-[10px] font-bold text-[#0052CC] uppercase tracking-wider block mb-1">
                  {item.badge}
                </span>

                <h3 className="text-base font-bold text-white mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400">
                <CheckCircleIcon size={13} className="text-[#0052CC]" />
                <span>Verified SLA Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fact Sheet Banner */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
            <div className="text-xs text-slate-400 mt-1">Ricoh Engineering Dedication</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">&lt; 4 Hrs</div>
            <div className="text-xs text-slate-400 mt-1">Average Metro SLA Dispatch</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">Zero</div>
            <div className="text-xs text-slate-400 mt-1">Counterfeit Toners Installed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">99.4%</div>
            <div className="text-xs text-slate-400 mt-1">First-Time Fix Ratio</div>
          </div>
        </div>

      </div>
    </section>
  );
}
