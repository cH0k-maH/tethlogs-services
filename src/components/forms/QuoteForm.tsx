"use client";

import React, { useState } from "react";
import {
  CheckCircleIcon,
  FileTextIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { COMPANY_INFO, RICOH_PRODUCTS } from "@/data/tethlogsData";

interface QuoteFormProps {
  preselectedProduct?: string;
}

export default function QuoteForm({ preselectedProduct = "" }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    productOrService: preselectedProduct || "Ricoh IM C3000 / C3500 Color MFP",
    quantity: "1",
    monthlyVolume: "5,000 - 15,000 Pages / Month",
    requirements: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [quoteResult, setQuoteResult] = useState<{
    quoteCode: string;
    whatsappUrl: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+()\s-]{9,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (e.g. 0802 345 6789)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit quote request.");
      }

      setQuoteResult({
        quoteCode: data.quoteCode,
        whatsappUrl: data.whatsappUrl,
      });
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("Quote error:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting. Please contact us directly on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    const whatsappLink =
      quoteResult?.whatsappUrl ||
      `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hello%20Tethlogs,%20I%20requested%20a%20quote%20for%20${encodeURIComponent(
        formData.productOrService
      )}%20for%20${encodeURIComponent(formData.company || formData.name)}.`;

    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xl max-w-xl mx-auto text-center animate-fade-in">
        <div className="w-16 h-16 bg-blue-50 text-[#0052CC] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon size={36} />
        </div>
        <h3 className="text-2xl font-extrabold text-[#0A192F]">
          Quote Request Sent
        </h3>

        {quoteResult?.quoteCode && (
          <div className="mt-3 inline-block bg-slate-900 text-white font-mono text-sm px-4 py-2 rounded-lg font-bold border border-slate-700">
            Quote Ref: <span className="text-[#0052CC]">{quoteResult.quoteCode}</span>
          </div>
        )}

        <p className="mt-3 text-sm text-slate-600">
          Thank you, <strong>{formData.name}</strong>. Our enterprise Ricoh technical consulting team will prepare a tailored quotation for <strong>{formData.productOrService}</strong>. A confirmation email has been dispatched.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm px-6 py-3 rounded-lg shadow-sm transition-all"
          >
            <WhatsAppIcon size={18} />
            <span>Fast-Track Quote via WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setQuoteResult(null);
              setFormData({
                name: "",
                company: "",
                phone: "",
                email: "",
                productOrService: preselectedProduct || "Ricoh IM C3000 / C3500 Color MFP",
                quantity: "1",
                monthlyVolume: "5,000 - 15,000 Pages / Month",
                requirements: "",
              });
              setErrors({});
            }}
            className="w-full sm:w-auto text-xs font-semibold text-slate-600 hover:text-[#0A192F] py-3 px-4"
          >
            Submit Another Quote
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-5"
    >
      <div className="border-b border-slate-100 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-2 border border-blue-100">
          <span className="text-[#E51937]">ט</span>
          <span>Equipment &amp; Solution Procurement</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A192F]">
          Looking for a Ricoh Printing Solution?
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Tell us what you need and our technical team will engineer the appropriate equipment and SLA package.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Full Name <span className="text-[#E51937]">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. David Adeleke"
            className={`w-full text-sm px-3.5 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-[#E51937] focus:ring-[#E51937]/30 focus:border-[#E51937]"
                : "border-slate-300 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-[#E51937] font-medium">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Company / Organization
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Zenith Logistics"
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Phone Number <span className="text-[#E51937]">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0802 345 6789"
            className={`w-full text-sm px-3.5 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-[#E51937] focus:ring-[#E51937]/30 focus:border-[#E51937]"
                : "border-slate-300 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-[#E51937] font-medium">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address <span className="text-[#E51937]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="d.adeleke@zenith.com"
            className={`w-full text-sm px-3.5 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-[#E51937] focus:ring-[#E51937]/30 focus:border-[#E51937]"
                : "border-slate-300 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-[#E51937] font-medium">{errors.email}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Ricoh Product or Solution Interested In <span className="text-[#E51937]">*</span>
          </label>
          <select
            name="productOrService"
            value={formData.productOrService}
            onChange={handleChange}
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
          >
            {RICOH_PRODUCTS.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name} ({p.categoryLabel})
              </option>
            ))}
            <option value="Fleet Maintenance Contract (Annual SLA)">
              Fleet Maintenance Contract (Annual SLA)
            </option>
            <option value="Genuine Ricoh Toners Bulk Supply">
              Genuine Ricoh Toners &amp; Consumables Bulk Supply
            </option>
            <option value="Custom Office Document Workflow Consultation">
              Custom Office Document Workflow Consultation
            </option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Estimated Unit Quantity
          </label>
          <input
            type="number"
            min="1"
            max="100"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Estimated Monthly Page Volume
          </label>
          <select
            name="monthlyVolume"
            value={formData.monthlyVolume}
            onChange={handleChange}
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
          >
            <option value="Under 5,000 Pages / Month">Under 5,000 Pages / Month</option>
            <option value="5,000 - 15,000 Pages / Month">5,000 - 15,000 Pages / Month</option>
            <option value="15,000 - 50,000 Pages / Month">15,000 - 50,000 Pages / Month</option>
            <option value="Over 50,000 Pages (Heavy Production)">Over 50,000 Pages (Heavy Production)</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Additional Specifications or Workflow Requirements
          </label>
          <textarea
            rows={3}
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="e.g. We require automatic stapling, badge-release Follow-Me printing for 45 staff, and scan-to-SharePoint integration..."
            className="w-full text-sm p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
          />
        </div>
      </div>

      {submitError && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-[#E51937] font-medium flex items-center justify-between">
          <span>{submitError}</span>
          <button
            type="button"
            onClick={() => setSubmitError(null)}
            className="text-red-400 hover:text-red-700 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold py-3.5 px-6 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Compiling Quotation...</span>
          ) : (
            <>
              <FileTextIcon size={18} />
              <span>Request Official Quotation</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
