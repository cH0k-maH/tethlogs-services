"use client";

import React, { useState, useEffect } from "react";
import { WhatsAppIcon, XIcon } from "@/components/ui/Icons";
import { COMPANY_INFO } from "@/data/tethlogsData";

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Automatically hide tooltip after 8 seconds of calm presence
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside aria-label="Support chat" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip message */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0A192F] text-white text-xs py-2 px-3 rounded-lg shadow-lg border border-slate-700 animate-fade-in">
          <span>Need rapid Ricoh printer support? <strong>Chat with us</strong></span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1 p-0.5 rounded"
            aria-label="Close tooltip"
          >
            <XIcon size={12} />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Technical Support"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] rounded-full shadow-lg transition-transform hover:scale-105 animate-pulse-gentle focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        <WhatsAppIcon size={30} className="text-white" />
        <span className="sr-only">Chat with Tethlogs on WhatsApp</span>
        {/* Subtle online status indicator */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full" />
      </a>
    </aside>
  );
}
