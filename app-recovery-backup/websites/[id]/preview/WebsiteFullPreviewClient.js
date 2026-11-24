"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import CorpProRenderer from "../../../templates/corppro/preview/CorpProRenderer";

export default function WebsiteFullPreviewClient() {
  const params = useParams();
  const websiteId = params.id;

  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchWebsite() {
    if (!websiteId) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/websites/${encodeURIComponent(websiteId)}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.data) {
        throw new Error(
          result.message || "Gagal mengambil data website."
        );
      }

      setWebsite(result.data);
    } catch (err) {
      setError(err.message || "Gagal memuat preview.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWebsite();
  }, [websiteId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <RefreshCw
          size={27}
          className="animate-spin text-[#102C62]"
        />
      </main>
    );
  }

  if (error || !website) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] p-6">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center">
          <AlertCircle
            size={32}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-4 text-lg font-bold text-slate-800">
            Preview Tidak Tersedia
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error || "Data website tidak ditemukan."}
          </p>

          <button
            onClick={fetchWebsite}
            className="mt-6 rounded-lg bg-[#102C62] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Coba Lagi
          </button>
        </div>
      </main>
    );
  }

  const config = website.config?.config;

  if (website.template?.slug !== "corppro" || !config) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-800">
            Preview Belum Tersedia
          </h2>

          <Link
            href={`/websites/${websiteId}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#102C62]"
          >
            <ArrowLeft size={16} />
            Kembali ke Detail
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="fixed bottom-5 right-5 z-[100]">
        <Link
          href={`/websites/${websiteId}`}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
        >
          <ArrowLeft size={16} />
          Back to CMS
        </Link>
      </div>

      <CorpProRenderer config={config} />
    </main>
  );
}
