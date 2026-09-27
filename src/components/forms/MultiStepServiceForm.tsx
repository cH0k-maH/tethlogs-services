"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CheckIcon,
  UploadIcon,
  ArrowRightIcon,
  WrenchIcon,
  WhatsAppIcon,
  CheckCircleIcon,
} from "@/components/ui/Icons";
import { COMPANY_INFO } from "@/data/tethlogsData";

interface MultiStepServiceFormProps {
  initialModel?: string;
  initialService?: string;
}

function getInitialServiceType(serviceParam?: string): string {
  if (!serviceParam) return "Repair (Hardware / Error Code)";
  const lower = serviceParam.toLowerCase();
  if (lower.includes("maintenance")) return "Preventive Maintenance & Servicing";
  if (lower.includes("repair")) return "Repair (Hardware / Error Code)";
  if (lower.includes("install") || lower.includes("setup")) return "Installation & Network Setup";
  if (lower.includes("support") || lower.includes("driver")) return "Technical Support & Drivers";
  if (lower.includes("supplies") || lower.includes("toner") || lower.includes("consumable") || lower.includes("part")) {
    return "Toner / Consumables Replacement";
  }
  if (lower.includes("jam") || lower.includes("noise")) return "Paper Jam / Mechanical Noise";
  return "Repair (Hardware / Error Code)";
}

export default function MultiStepServiceForm({
  initialModel = "",
  initialService = "",
}: MultiStepServiceFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    deviceType: "Multifunction Color MFP",
    brand: "Ricoh",
    model: initialModel || "",
    serviceType: getInitialServiceType(initialService),
    problemDescription: "",
    urgency: "Standard (Within 24 Hours)",
    imagePreview: "",
  });

  const handleInputChange = (
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Image size must be under 10MB" }));
        return;
      }
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.image;
        return updated;
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagePreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        stepErrors.fullName = "Please enter your full name.";
      } else if (formData.fullName.trim().length < 2) {
        stepErrors.fullName = "Name must be at least 2 characters.";
      }

      if (!formData.phone.trim()) {
        stepErrors.phone = "Phone number is required for dispatch updates.";
      } else if (!/^[0-9+()\s-]{9,20}$/.test(formData.phone.trim())) {
        stepErrors.phone = "Please enter a valid phone number (e.g. 0803 123 4567).";
      }

      if (!formData.email.trim()) {
        stepErrors.email = "Email address is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        stepErrors.email = "Please enter a valid email address.";
      }
    }

    if (currentStep === 2) {
      if (!formData.model.trim()) {
        stepErrors.model = "Please specify the printer model number or series.";
      }
    }

    if (currentStep === 3) {
      if (!formData.problemDescription.trim()) {
        stepErrors.problemDescription = "Please describe the issue or error code.";
      } else if (formData.problemDescription.trim().length < 8) {
        stepErrors.problemDescription = "Please provide more details (at least 8 characters).";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < 4) setStep(step + 1);
    }
  };

  const prevStep = () => {
    setErrors({});
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1)) {
      setStep(1);
      return;
    }
    if (!validateStep(2)) {
      setStep(2);
      return;
    }
    if (!validateStep(3)) {
      setStep(3);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const generateWhatsAppMessage = () => {
    const text = `*New Tethlogs Service Request*%0A%0A*Customer:* ${formData.fullName} (${formData.companyName || "Direct"})%0A*Phone:* ${formData.phone}%0A*Equipment:* ${formData.brand} ${formData.model || "Not specified"}%0A*Service:* ${formData.serviceType}%0A*Issue:* ${formData.problemDescription || "No notes"}%0A*Urgency:* ${formData.urgency}`;
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`;
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xl max-w-2xl mx-auto text-center animate-fade-in">
        <div className="w-16 h-16 bg-blue-50 text-[#0052CC] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon size={36} />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#0A192F] text-xs font-bold uppercase tracking-wider mb-2">
          <span><span className="text-[#E51937]">ט</span> Service Ticket Dispatched</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
          Service Request Received
        </h3>
        <p className="mt-3 text-sm text-slate-600 max-w-md mx-auto">
          Thank you, <strong>{formData.fullName}</strong>. Your ticket for the <strong>{formData.brand} {formData.model}</strong> has been logged in our certified technical engineering queue.
        </p>

        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Service Category:</span>
            <span className="font-semibold text-slate-800">{formData.serviceType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Urgency SLA:</span>
            <span className="font-semibold text-[#0052CC]">{formData.urgency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Follow-up Line:</span>
            <span className="font-semibold text-slate-800">{formData.phone}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm px-6 py-3 rounded-lg shadow-sm transition-all"
          >
            <WhatsAppIcon size={18} />
            <span>Send Copy via WhatsApp for Faster Dispatch</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setStep(1);
              setFormData({
                fullName: "",
                companyName: "",
                phone: "",
                email: "",
                deviceType: "Multifunction Color MFP",
                brand: "Ricoh",
                model: initialModel || "",
                serviceType: getInitialServiceType(initialService),
                problemDescription: "",
                urgency: "Standard (Within 24 Hours)",
                imagePreview: "",
              });
              setErrors({});
            }}
            className="w-full sm:w-auto text-xs font-semibold text-slate-600 hover:text-[#0A192F] py-3 px-4"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-3xl mx-auto overflow-hidden">
      {/* Top Banner Notice if preselected */}
      {(initialModel || initialService) && (
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-2.5 flex items-center justify-between text-xs text-[#0052CC]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#E51937]">ט</span>
            <span>
              Pre-selected configuration:{" "}
              <strong>
                {[initialModel, initialService].filter(Boolean).join(" • ")}
              </strong>
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
            You can modify details below
          </span>
        </div>
      )}

      {/* Step Progress Bar */}
      <div className="bg-[#0A192F] p-4 sm:p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#E51937] font-bold text-lg">ט</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold leading-none">
                Ricoh Technical Service Request
              </h3>
              <span className="text-xs text-slate-400">
                Direct technician ticket creation
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded">
            Step {step} of 4
          </span>
        </div>

        {/* 4 Step Progress Indicators */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { num: 1, label: "Customer" },
            { num: 2, label: "Equipment" },
            { num: 3, label: "Issue" },
            { num: 4, label: "Photo / Submit" },
          ].map((s) => (
            <div key={s.num} className="space-y-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step >= s.num ? "bg-[#0052CC]" : "bg-slate-700"
                }`}
              />
              <span
                className={`hidden sm:block text-[11px] font-medium transition-colors ${
                  step >= s.num ? "text-white" : "text-slate-500"
                }`}
              >
                0{s.num} {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Form Content */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8" noValidate>
        {/* STEP 1: Customer Information */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-[#0A192F]">
                Step 1: Your Contact Information
              </h4>
              <p className="text-xs text-slate-500">
                Where should our technical dispatch team reach you?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-[#E51937]">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Samuel Okon"
                  className={`w-full text-sm px-3.5 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? "border-[#E51937] focus:ring-[#E51937]/30 focus:border-[#E51937]"
                      : "border-slate-300 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-[#E51937] font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Apex Legal Chambers"
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number (for SMS &amp; WhatsApp updates) <span className="text-[#E51937]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 0803 123 4567"
                  className={`w-full text-sm px-3.5 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-[#E51937] focus:ring-[#E51937]/30 focus:border-[#E51937]"
                      : "border-slate-300 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-[#E51937] font-medium">
                    {errors.phone}
                  </p>
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
                  onChange={handleInputChange}
                  placeholder="s.okon@company.com"
                  className={`w-full text-sm px-3.5 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-[#E51937] focus:ring-[#E51937]/30 focus:border-[#E51937]"
                      : "border-slate-300 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-[#E51937] font-medium">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Equipment Identification */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-[#0A192F]">
                Step 2: Machine &amp; Model Information
              </h4>
              <p className="text-xs text-slate-500">
                Identify the Ricoh equipment requiring technical assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Device Brand
                </label>
                <div className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-semibold flex items-center justify-between">
                  <span>Ricoh (Exclusive Specialist)</span>
                  <span className="text-xs font-bold text-[#0052CC]">Certified</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Device Category
                </label>
                <select
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleInputChange}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
                >
                  <option value="Multifunction Color MFP">Multifunction Color MFP (A3/A4)</option>
                  <option value="Monochrome Copier / Printer">Monochrome Copier / Printer</option>
                  <option value="Production Digital Press">Production Digital Press</option>
                  <option value="Dedicated Enterprise Scanner">Dedicated Enterprise Scanner</option>
                  <option value="Desktop Network Printer">Desktop Network Printer</option>
                  <option value="Other Ricoh Machine">Other Ricoh Machine</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Model Number / Series <span className="text-[#E51937]">*</span>
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g. Ricoh IM C3500, MP 3055, Pro C5300s, or check front sticker"
                  className={`w-full text-sm px-3.5 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.model
                      ? "border-[#E51937] focus:ring-[#E51937]/30 focus:border-[#E51937]"
                      : "border-slate-300 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
                  }`}
                />
                {errors.model ? (
                  <p className="mt-1 text-xs text-[#E51937] font-medium">
                    {errors.model}
                  </p>
                ) : (
                  <p className="mt-1 text-[11px] text-slate-500">
                    Tip: The model number is printed on the front badge of your Ricoh unit.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Service Required & Description */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-[#0A192F]">
                Step 3: Service Category &amp; Problem Description
              </h4>
              <p className="text-xs text-slate-500">
                Explain the symptoms, error codes, or required servicing.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Service Required
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    "Repair (Hardware / Error Code)",
                    "Preventive Maintenance & Servicing",
                    "Installation & Network Setup",
                    "Technical Support & Drivers",
                    "Toner / Consumables Replacement",
                    "Paper Jam / Mechanical Noise",
                  ].map((srv) => (
                    <label
                      key={srv}
                      className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2 transition-all ${
                        formData.serviceType === srv
                          ? "border-[#0052CC] bg-blue-50/50 text-[#0A192F] font-bold"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        value={srv}
                        checked={formData.serviceType === srv}
                        onChange={handleInputChange}
                        className="text-[#0052CC] focus:ring-[#0052CC]"
                      />
                      <span>{srv}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Problem Description (What is happening with the machine?) <span className="text-[#E51937]">*</span>
                </label>
                <textarea
                  name="problemDescription"
                  rows={4}
                  value={formData.problemDescription}
                  onChange={handleInputChange}
                  placeholder="e.g. The machine displays SC 542 error code when turning on, or streaks appear along the left side of every printed page..."
                  className={`w-full text-sm p-3.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.problemDescription
                      ? "border-[#E51937] focus:ring-[#E51937]/30 focus:border-[#E51937]"
                      : "border-slate-300 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
                  }`}
                />
                {errors.problemDescription && (
                  <p className="mt-1 text-xs text-[#E51937] font-medium">
                    {errors.problemDescription}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Required Response Urgency
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/30 focus:border-[#0052CC]"
                >
                  <option value="Critical (Work stopped, machine dead)">
                    🚨 Critical (Work halted - same-day emergency SLA)
                  </option>
                  <option value="High (Printing with errors/lines)">
                    High (Machine operational but impaired)
                  </option>
                  <option value="Standard (Within 24 Hours)">
                    Standard (Routine preventive maintenance or setup)
                  </option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Image / Error Code Upload & Review */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-[#0A192F]">
                Step 4: Photograph Printer Error Screen &amp; Review
              </h4>
              <p className="text-xs text-slate-500">
                A photograph of the printer screen or defective printout drastically accelerates our diagnosis.
              </p>
            </div>

            {/* Drag & Drop / Photo Upload */}
            <div className="border-2 border-dashed border-slate-300 hover:border-[#0052CC] rounded-xl p-6 text-center transition-colors bg-slate-50/50">
              <input
                type="file"
                id="printer-error-photo"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="printer-error-photo"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center">
                  <UploadIcon size={22} />
                </div>
                <div>
                  <span className="text-sm font-bold text-[#0A192F] hover:underline">
                    Click to photograph or upload printer error screen
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Supports JPG, PNG from smartphone or camera (Max 10MB)
                  </p>
                </div>
              </label>

              {errors.image && (
                <p className="mt-2 text-xs text-[#E51937] font-medium">
                  {errors.image}
                </p>
              )}

              {/* Uploaded Preview */}
              {formData.imagePreview && (
                <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col items-center">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mb-2">
                    <CheckIcon size={14} /> Image Attached Successfully
                  </span>
                  <div className="relative h-32 w-48 rounded-lg overflow-hidden border border-slate-300 shadow-sm">
                    <Image
                      src={formData.imagePreview}
                      alt="Error preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Summary Review */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
                Ticket Summary Review:
              </span>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>
                  <strong>Customer:</strong> {formData.fullName || "Pending"}
                </div>
                <div>
                  <strong>Phone:</strong> {formData.phone || "Pending"}
                </div>
                <div>
                  <strong>Equipment:</strong> {formData.brand} {formData.model || "Not specified"}
                </div>
                <div>
                  <strong>Service:</strong> {formData.serviceType}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="text-xs font-bold text-slate-600 hover:text-[#0A192F] px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              &larr; Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold text-xs px-6 py-3 rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRightIcon size={14} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-lg shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Dispatching Ticket...</span>
              ) : (
                <>
                  <WrenchIcon size={16} />
                  <span>Submit Service Request</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
