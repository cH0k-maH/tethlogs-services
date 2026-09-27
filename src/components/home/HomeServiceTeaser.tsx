import React from "react";
import MultiStepServiceForm from "@/components/forms/MultiStepServiceForm";

export default function HomeServiceTeaser() {
  return (
    <section id="service-request-section" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100">
            <span className="text-[#E51937]">ט</span>
            <span>Quick Dispatch Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F]">
            Have a Printer or Document Problem?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Submit your equipment model, describe the issue or upload a photo of the error code on your Ricoh screen. Our certified engineering desk will assign an on-site technician immediately.
          </p>
        </div>

        {/* Embedded Interactive Multi-Step Request Engine */}
        <MultiStepServiceForm />
      </div>
    </section>
  );
}
