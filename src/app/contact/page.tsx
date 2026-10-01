"use client";

import React, { useState } from "react";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  WhatsAppIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";
import { COMPANY_INFO } from "@/data/tethlogsData";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Technical Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [inquiryResult, setInquiryResult] = useState<{
    inquiryCode: string;
    whatsappUrl: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Your name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+()\s-]{9,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message details are required";
    } else if (formData.message.trim().length < 8) {
      newErrors.message = "Please provide more details (at least 8 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit inquiry.");
      }

      setInquiryResult({
        inquiryCode: data.inquiryCode,
        whatsappUrl: data.whatsappUrl,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Contact error:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "An error occurred while sending your inquiry. Please try again or reach out on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span>Contact &amp; Support Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Connect With Our Engineering Desk
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Have an urgent question, need a consultation, or want immediate Ricoh technical assistance? Reach us through any channel below.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Direct Contact Details & WhatsApp Card */}
          <div className="lg:col-span-5 space-y-6">

            {/* Instant WhatsApp Priority Card — Two Lines */}
            <div className="bg-[#25D366] text-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-900 bg-white/30 px-2.5 py-1 rounded-full">
                  Fastest Technical Response
                </span>
                <WhatsAppIcon size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-extrabold">Chat on WhatsApp</h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                Connect directly with our technicians. Send photos of printer errors or discuss service dispatch instantly.
              </p>
              {/* Primary WhatsApp */}
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-2 w-full bg-white text-emerald-800 hover:bg-slate-100 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors shadow-sm"
              >
                <span>{COMPANY_INFO.phone}</span>
                <ArrowRightIcon size={14} />
              </a>
              {/* Secondary WhatsApp */}
              <a
                href={COMPANY_INFO.whatsappUrl2}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-2 w-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors"
              >
                <span>{COMPANY_INFO.phone2}</span>
                <ArrowRightIcon size={14} />
              </a>
            </div>

            {/* Corporate Info Cards */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0">
                  <PhoneIcon size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    WhatsApp Lines
                  </span>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-sm font-bold text-[#0A192F] hover:text-[#0052CC] transition-colors block"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <a
                    href={`tel:${COMPANY_INFO.phone2}`}
                    className="text-sm font-bold text-[#0A192F] hover:text-[#0052CC] transition-colors block"
                  >
                    {COMPANY_INFO.phone2}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Both lines available on WhatsApp
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0">
                  <MailIcon size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Support &amp; Sales Email
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-sm font-bold text-[#0A192F] hover:text-[#0052CC] transition-colors block"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.salesEmail}`}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    {COMPANY_INFO.salesEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0">
                  <ClockIcon size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Operating Hours &amp; SLA
                  </span>
                  <span className="text-xs font-semibold text-slate-700 block">
                    {COMPANY_INFO.workingHours}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Critical SLA contracts include 24/7 on-call dispatch
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0">
                  <MapPinIcon size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Head Office
                  </span>
                  <span className="text-xs text-slate-700 block leading-relaxed">
                    {COMPANY_INFO.officeAddress}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center mx-auto">
                  <CheckCircleIcon size={36} />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0A192F]">
                  Message Sent Successfully
                </h3>

                {inquiryResult?.inquiryCode && (
                  <div className="inline-block bg-slate-900 text-white font-mono text-sm px-4 py-2 rounded-lg font-bold border border-slate-700">
                    Ref ID: <span className="text-[#0052CC]">{inquiryResult.inquiryCode}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out. A Tethlogs service coordinator will review your inquiry and respond within 2 business hours.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {inquiryResult?.whatsappUrl && (
                    <a
                      href={inquiryResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all"
                    >
                      <WhatsAppIcon size={16} />
                      <span>Fast-Track on WhatsApp</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setInquiryResult(null);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "General Technical Inquiry",
                        message: "",
                      });
                    }}
                    className="text-xs font-bold text-[#0052CC] hover:underline py-2"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0052CC]">
                    Technical Desk Inquiry
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0A192F] mt-0.5">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-slate-500">
                    Need technical advice, equipment pricing, or contract information?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name <span className="text-[#E51937]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g. Sandra Johnson"
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
                      Email Address <span className="text-[#E51937]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="sandra@company.com"
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-[#E51937]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+234 806 117 7447"
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
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
                    >
                      <option value="General Technical Inquiry">General Technical Inquiry</option>
                      <option value="Printer Repair Service">Printer Repair Service</option>
                      <option value="Preventive Maintenance Contract">Preventive Maintenance Contract</option>
                      <option value="Ricoh Machine Purchase Quote">Ricoh Machine Purchase Quote</option>
                      <option value="Genuine Toners & Spares Supply">Genuine Toners &amp; Spares Supply</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message / Printer Issue Details <span className="text-[#E51937]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Provide details about your machine, location, or questions..."
                    className={`w-full text-sm p-3.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                      errors.message
                        ? "border-[#E51937] focus:ring-[#E51937]/30 focus:border-[#E51937]"
                        : "border-slate-300 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-[#E51937] font-medium">{errors.message}</p>
                  )}
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
                    className="w-full bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <span>Send Technical Inquiry</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
