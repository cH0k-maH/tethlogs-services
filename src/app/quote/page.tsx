"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import QuoteForm from "@/components/forms/QuoteForm";

function QuoteContent() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("product") || "";

  return <QuoteForm preselectedProduct={preselected} />;
}

export default function QuotePage() {
  return (
    <main className="bg-[#F8FAFC] pb-24">
      {/* Banner */}
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
            <span>Equipment &amp; SLA Proposals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Request an Equipment Quotation
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Tell us about your organization's document requirements, volume, and preferred Ricoh models. Our technical consultants will configure the right proposal.
          </p>
        </div>
      </section>

      {/* Main Quote Form Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <Suspense fallback={<div className="bg-white p-8 rounded-2xl text-center text-slate-400">Loading Quote Form...</div>}>
          <QuoteContent />
        </Suspense>
      </section>
    </main>
  );
}
