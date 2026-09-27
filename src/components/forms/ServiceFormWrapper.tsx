"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MultiStepServiceForm from "./MultiStepServiceForm";

function ServiceFormInner() {
  const searchParams = useSearchParams();
  const model = searchParams.get("model") || "";
  const service = searchParams.get("service") || "";

  return <MultiStepServiceForm initialModel={model} initialService={service} />;
}

export default function ServiceFormWrapper() {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-xl max-w-3xl mx-auto text-center text-slate-400">
          Loading Service Dispatch Form...
        </div>
      }
    >
      <ServiceFormInner />
    </Suspense>
  );
}
