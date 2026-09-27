import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  WrenchIcon,
  FileTextIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@/components/ui/Icons";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-white via-[#F0F5FA] to-white pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 border-b border-slate-200/70 overflow-hidden">
      {/* Background Decorative Faint 'ט' Watermark */}
      <div 
        aria-hidden="true" 
        className="absolute -top-12 -right-12 select-none pointer-events-none text-slate-200/40 text-[320px] font-serif leading-none font-bold opacity-30"
      >
        ט
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Action Triggers */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 shadow-sm text-xs font-semibold text-[#0052CC]">
              <span className="flex h-2 w-2 rounded-full bg-[#E51937]" />
              <span className="text-[#E51937] font-bold">ט</span>
              <span>Exclusive Ricoh Technical Specialists</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A192F] leading-[1.15]">
              Professional Printing &amp; Document Solutions
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Reliable printer services, preventive maintenance, fast hardware repairs, and enterprise document workflows engineered for zero business downtime.
            </p>

            {/* The 3 Core Visitor Actions Prominently Displayed */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/request-service"
                className="bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2.5 group"
              >
                <WrenchIcon size={18} className="text-white group-hover:rotate-12 transition-transform" />
                <span>Request a Service</span>
              </Link>

              <Link
                href="/quote"
                className="bg-white hover:bg-slate-50 text-[#0A192F] font-bold text-sm sm:text-base px-6 py-3.5 rounded-lg border-2 border-slate-300 hover:border-[#0052CC] shadow-sm transition-all flex items-center gap-2"
              >
                <FileTextIcon size={18} className="text-slate-600" />
                <span>Get a Quote</span>
              </Link>
            </div>

            {/* Rapid Trust Verification Metrics */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A192F]">
                  <CheckCircleIcon size={15} className="text-[#0052CC]" />
                  <span>Ricoh Certified</span>
                </div>
                <p className="text-[11px] text-slate-500">Factory diagnostic standards</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A192F]">
                  <ClockIcon size={15} className="text-[#0052CC]" />
                  <span>Same-Day Response</span>
                </div>
                <p className="text-[11px] text-slate-500">Rapid on-site emergency dispatch</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A192F]">
                  <ShieldCheckIcon size={15} className="text-[#0052CC]" />
                  <span>100% Genuine</span>
                </div>
                <p className="text-[11px] text-slate-500">OEM toners, parts &amp; consumables</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Equipment Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-slate-200/90 group">
              
              {/* Card Header Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0052CC]" />
                  <span className="text-xs font-bold text-[#0A192F] uppercase tracking-wider">
                    Ricoh Multifunction MFP
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Ready For Dispatch
                </span>
              </div>

              {/* Equipment Image Placeholder */}
              <div className="relative my-6 aspect-[4/3] w-full bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-slate-100">
                <Image
                  src="/images/printer.jpg"
                  alt="Ricoh Multifunction Printer Unit"
                  width={420}
                  height={315}
                  priority
                  className="object-contain max-h-full w-auto drop-shadow-md group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* Equipment Spec Snapshot */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-medium text-slate-500">Print Engine Speed:</span>
                  <span className="font-bold text-[#0A192F]">35–60 Pages Per Minute</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-medium text-slate-500">Supported Formats:</span>
                  <span className="font-bold text-[#0A192F]">A3 / A4 / SRA3 / Envelopes</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-medium text-slate-500">Maintenance Cycle:</span>
                  <span className="font-bold text-emerald-600">Active SLA Coverage</span>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-4 pt-3 flex items-center justify-between">
                <Link
                  href="/products?cat=mfp"
                  className="text-xs font-semibold text-[#0052CC] hover:underline transition-colors"
                >
                  Explore Ricoh Fleet &rarr;
                </Link>
                <Link
                  href="/request-service"
                  className="text-xs font-bold text-[#0052CC] hover:underline"
                >
                  Need this serviced?
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
