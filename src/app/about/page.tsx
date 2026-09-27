import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircleIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About TETHLOGS | The Teth Story & Technical Standards",
  description:
    "Learn about Tethlogs Services Limited, our exclusive Ricoh specialization, and the philosophy behind the Hebrew Teth symbol.",
};

export default function AboutPage() {
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
              <span>The Tethlogs Story</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Engineering Reliability Behind Every Printed Page
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              We are a dedicated technical-services company founded on genuine craftsmanship, certified Ricoh equipment expertise, and absolute transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy & The Teth Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0052CC] flex items-center justify-center font-serif text-4xl font-bold mb-6">
              <span className="text-[#E51937]">ט</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0A192F] mb-3">
              The Hebrew Symbol: Teth (ט)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed space-y-3">
              In Hebrew, the letter <strong>Teth (ט)</strong> represents goodness that is inward, disciplined, and structurally sound.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              We adopted this symbol because office printing is fundamentally an internal, critical backbone. When it runs flawlessly with precision gears and authentic toners, business moves smoothly without stress.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
                <span className="font-semibold">Focused: We only deal on Ricoh printers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
                <span className="font-semibold">Substantiated: Zero misleading warranty claims</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
                <span className="font-semibold">Responsive: Direct human technical dispatch</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
              Why Exclusively Ricoh?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              When a service company claims to repair every brand from A to Z, they often carry generic parts and surface-level knowledge. Ricoh printing systems are enterprise-grade engineering marvels — featuring Smart Operation Panels, micro-polymerized toners, and sophisticated laser optic sensors.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              By dedicating our technical practice <strong>exclusively to Ricoh</strong>, our engineers have immediate command over Ricoh service access codes, component tolerances, fuser thermal curves, and network firmware. That means faster diagnoses, lower repair costs, and maximum equipment lifespan for our clients.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-2xl font-extrabold text-[#0A192F]">100%</div>
                <div className="text-xs text-slate-500 mt-1">Authentic Ricoh Factory Consumables</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-2xl font-extrabold text-[#0A192F]">2 - 4 Hrs</div>
                <div className="text-xs text-slate-500 mt-1">Average Metro On-Site SLA Response</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Ready to Experience the Tethlogs Standard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Ready for a Real Technical Partner?
          </h3>
          <p className="text-sm text-slate-300">
            Whether you need emergency repair on an existing Ricoh copier or want an audited maintenance proposal for your office fleet, our engineers are ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request-service"
              className="w-full sm:w-auto bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold text-sm px-6 py-3 rounded-lg shadow-sm transition-colors"
            >
              Request a Service
            </Link>
            <Link
              href="/quote"
              className="w-full sm:w-auto border border-slate-600 hover:border-white text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Get Equipment Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
