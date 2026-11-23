"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getSiteConfig } from "../../../../lib/site-config";
import EduProRenderer from "./EduProRenderer";

export default function EduProPreviewPage() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  if (!config) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-slate-500">
          Loading EduPro preview...
        </p>
      </main>
    );
  }

  return (
    <>
      <div className="relative z-[60] flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
        <Link
          href="/templates/edupro/edit"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-800"
        >
          <ArrowLeft size={17} />
          Back to Editor
        </Link>

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          EduPro Preview
        </span>
      </div>

      <EduProRenderer config={config} />
    </>
  );
}
