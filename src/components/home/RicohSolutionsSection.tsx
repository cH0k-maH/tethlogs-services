"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, FileTextIcon, WrenchIcon } from "@/components/ui/Icons";
import { RICOH_PRODUCTS } from "@/data/tethlogsData";

export default function RicohSolutionsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Equipment" },
    { id: "mfp", label: "Multifunction (MFP)" },
    { id: "office", label: "Office Workgroups" },
    { id: "production", label: "Production Print" },
    { id: "copier", label: "Heavy Duty Copiers" },
    { id: "scanner", label: "Enterprise Scanners" },
    { id: "supplies", label: "Genuine Consumables" },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? RICOH_PRODUCTS
      : RICOH_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section className="py-10 lg:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Compact Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-[#0052CC] text-[11px] font-bold uppercase tracking-wider mb-2 border border-blue-100">
            <span className="text-[#E51937]">ט</span>
            <span>Ricoh Printing Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
            Authentic Ricoh Fleet &amp; Hardware
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
            Precision engineering for modern work environments. High-volume departmental units, compact branch copiers, and commercial production printers.
          </p>

          {/* Controlled Category Tabs */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#0052CC] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: exactly 4 columns on desktop, centered when fewer items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 place-items-center lg:place-items-stretch">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-xs lg:max-w-none bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
            >
              {/* 1. Header: Category badge & Title — ALWAYS above the image */}
              <div className="px-3.5 pt-3.5 pb-2 border-b border-slate-100 bg-white">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#0052CC] px-2 py-0.5 rounded border border-blue-100 truncate max-w-[70%]">
                    {product.categoryLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">Ricoh OEM</span>
                </div>
                <h3
                  className="text-xs sm:text-sm font-bold text-[#0A192F] group-hover:text-[#0052CC] transition-colors leading-snug line-clamp-2"
                  title={product.name}
                >
                  {product.name}
                </h3>
              </div>

              {/* 2. Image Area: Fixed height, contained — never overflows into title */}
              <div className="bg-[#F8FAFC] flex items-center justify-center border-b border-slate-100 h-28 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
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
                    <span className="font-semibold text-slate-800 block truncate">{product.speed}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Format</span>
                    <span className="font-semibold text-slate-800 block truncate">{product.paperSize}</span>
                  </div>
                </div>

                {/* Top 2 highlights */}
                <ul className="space-y-1">
                  {product.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                      <CheckIcon size={11} className="text-[#0052CC] shrink-0 mt-0.5" />
                      <span className="leading-tight">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. CTA Buttons — always at the bottom */}
              <div className="grid grid-cols-2 gap-1.5 px-3 pb-3 border-t border-slate-100 pt-2">
                <Link
                  href={`/quote?product=${encodeURIComponent(product.name)}`}
                  className="text-center text-[11px] font-bold bg-[#0052CC] hover:bg-[#0747A6] text-white py-1.5 rounded transition-colors flex items-center justify-center gap-1"
                >
                  <FileTextIcon size={11} />
                  <span>Get Quote</span>
                </Link>
                <Link
                  href={`/request-service?model=${encodeURIComponent(product.name)}`}
                  className="text-center text-[11px] font-semibold text-[#0A192F] border border-slate-300 hover:border-[#0052CC] hover:text-[#0052CC] py-1.5 rounded transition-colors flex items-center justify-center gap-1"
                >
                  <WrenchIcon size={11} />
                  <span>Service</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Centered placeholder when a single item is filtered */}
        {filteredProducts.length === 1 && (
          <div className="mt-2 text-center text-xs text-slate-400 italic">
            Only one unit in this category — full specifications available on request.
          </div>
        )}

        {/* Compact Consultant Strip */}
        <div className="mt-8 bg-[#F0F5FA] rounded-xl p-4 sm:p-5 border border-[#D0E0F0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-bold text-[#0A192F]">
              Need help sizing the right Ricoh unit for your team&#39;s volume?
            </h4>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Our engineers review your monthly page cycle to configure the ideal machine.
            </p>
          </div>
          <Link
            href="/quote"
            className="shrink-0 bg-[#0052CC] hover:bg-[#0747A6] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            Consult a Specialist
          </Link>
        </div>

      </div>
    </section>
  );
}
