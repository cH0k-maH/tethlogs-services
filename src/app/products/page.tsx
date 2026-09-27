"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckIcon,
  FileTextIcon,
  WrenchIcon,
} from "@/components/ui/Icons";
import { RICOH_PRODUCTS } from "@/data/tethlogsData";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("cat") || "all";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const categories = [
    { id: "all", label: "All Equipment" },
    { id: "mfp", label: "Multifunction (MFP)" },
    { id: "office", label: "Office Workgroups" },
    { id: "production", label: "Production Print" },
    { id: "copier", label: "Copiers & Dedicated" },
    { id: "scanner", label: "Enterprise Scanners" },
    { id: "supplies", label: "Genuine Consumables" },
  ];

  const filtered =
    selectedCategory === "all"
      ? RICOH_PRODUCTS
      : RICOH_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Pill Bar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedCategory(c.id)}
            className={`text-[11px] font-bold px-3.5 py-1.5 rounded-full transition-all ${
              selectedCategory === c.id
                ? "bg-[#0052CC] text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Product Grid: 4 columns on desktop, centered when fewer than 4 items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 place-items-center lg:place-items-stretch">
        {filtered.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="w-full max-w-xs lg:max-w-none scroll-mt-28 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
          >
            {/* 1. Header: Category badge & Title — ALWAYS above the image */}
            <div className="px-3.5 pt-3.5 pb-2 border-b border-slate-100 bg-white">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#0052CC] px-2 py-0.5 rounded border border-blue-100 truncate max-w-[70%]">
                  {item.categoryLabel}
                </span>
                <span className="text-[10px] text-slate-400 font-medium shrink-0">Ricoh OEM</span>
              </div>
              <h3
                className="text-xs sm:text-sm font-bold text-[#0A192F] group-hover:text-[#0052CC] transition-colors leading-snug line-clamp-2"
                title={item.name}
              >
                {item.name}
              </h3>
            </div>

            {/* 2. Image Area: Fixed height, contained — never overflows into title */}
            <div className="bg-[#F8FAFC] flex items-center justify-center border-b border-slate-100 h-28 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                width={160}
                height={100}
                className="object-contain max-h-24 w-auto group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* 3. Specs & Highlights — all visible, no inner scroll */}
            <div className="px-3 pt-2.5 pb-2 flex flex-col gap-2 flex-1">
              {/* Speed & Format */}
              <div className="grid grid-cols-2 gap-1 text-[10px] py-1.5 px-2 bg-slate-50 rounded border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Speed</span>
                  <span className="font-semibold text-slate-800 block truncate">{item.speed}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Format</span>
                  <span className="font-semibold text-slate-800 block truncate">{item.paperSize}</span>
                </div>
              </div>

              {/* Top 2 highlights */}
              <ul className="space-y-1">
                {item.highlights.slice(0, 2).map((h, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                    <CheckIcon size={11} className="text-[#0052CC] shrink-0 mt-0.5" />
                    <span className="leading-tight">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. CTA Buttons — always at the bottom */}
            <div className="grid grid-cols-2 gap-1.5 px-3 pb-3 border-t border-slate-100 pt-2">
              <Link
                href={`/quote?product=${encodeURIComponent(item.name)}`}
                className="w-full text-center text-[11px] font-bold bg-[#0052CC] hover:bg-[#0747A6] text-white py-1.5 rounded transition-colors flex items-center justify-center gap-1"
              >
                <FileTextIcon size={11} />
                <span>Get Quote</span>
              </Link>

              <Link
                href={`/request-service?model=${encodeURIComponent(item.name)}`}
                className="w-full text-center text-[11px] font-semibold text-[#0A192F] border border-slate-300 hover:border-[#0052CC] hover:text-[#0052CC] py-1.5 rounded transition-colors flex items-center justify-center gap-1"
              >
                <WrenchIcon size={11} />
                <span>Service</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Single-item notice */}
      {filtered.length === 1 && (
        <p className="text-center text-xs text-slate-400 italic -mt-4">
          Only one unit in this category — full specifications available on request.
        </p>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="bg-[#F8FAFC] pb-20">
      {/* Banner */}
      <section className="bg-[#0A192F] text-white py-12 lg:py-16 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -right-12 -bottom-20 text-slate-800/40 text-[280px] font-serif leading-none font-bold select-none pointer-events-none"
        >
          ט
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-3 border border-slate-700">
              <span className="text-[#E51937]">ט</span>
              <span>Ricoh Equipment Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Authentic Ricoh Fleet &amp; Hardware
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
              Precision engineering for modern work environments. High-volume departmental units, compact branch copiers, and commercial production printers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filtered Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Suspense fallback={<div className="text-center py-12 text-slate-400">Loading Ricoh Catalogue...</div>}>
          <ProductsContent />
        </Suspense>
      </section>
    </main>
  );
}
