import React from "react";
import type { Metadata } from "next";
import MultiStepServiceForm from "@/components/forms/MultiStepServiceForm";
import ServiceFormWrapper from "@/components/forms/ServiceFormWrapper";
import {
  ClockIcon,
  ShieldCheckIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Request a Printer Service & Repair | TETHLOGS",
  description:
    "Log a Ricoh printer repair, schedule preventive maintenance, or upload an error code photo for immediate engineering dispatch.",
};

export default function RequestServicePage() {
  return (
    <main className="bg-[#F8FAFC] pb-24">
      {/* Header Banner */}
      <section className="bg-[#0A192F] text-white py-14 relative overflow-hidden">
        <div 
          aria-hidden="true" 
          className="absolute -right-8 -bottom-16 text-slate-800/40 text-[240px] font-serif leading-none font-bold select-none pointer-events-none"
        >
          ט
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-3 border border-slate-700">
            <span className="text-[#E51937]">ט</span>
            <span>Direct Engineering Dispatch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Request Ricoh Technical Service
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Fast response for paper jams, SC error codes, faded prints, or scheduled fleet servicing. Photograph the error screen or enter details below.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <ServiceFormWrapper />
      </section>

      {/* SLA & Helpdesk Support Cards */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center mx-auto">
            <ClockIcon size={20} />
          </div>
          <h3 className="text-sm font-bold text-[#0A192F]">Same-Day SLA</h3>
          <p className="text-xs text-slate-500">
            Urgent business breakdowns receive priority dispatch within 2 to 4 hours in commercial hubs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center mx-auto">
            <ShieldCheckIcon size={20} />
          </div>
          <h3 className="text-sm font-bold text-[#0A192F]">Certified Parts</h3>
          <p className="text-xs text-slate-500">
            All replaced components are authentic Ricoh factory spares covered by our service warranty.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#25D366] flex items-center justify-center mx-auto">
            <WhatsAppIcon size={20} />
          </div>
          <h3 className="text-sm font-bold text-[#0A192F]">Instant Hotline</h3>
          <p className="text-xs text-slate-500">
            Prefer direct human coordination? Chat with our lead technician on WhatsApp or call our desk.
          </p>
        </div>
      </section>
    </main>
  );
}
