
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Globe,
  Users,
  PanelsTopLeft,
  Image as ImageIcon,
  Settings,
} from "lucide-react";

import CorpProRenderer from "../../templates/corppro/preview/CorpProRenderer";

export default function WebsiteDetailPage() {
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
          method: "GET",
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal mengambil data website."
        );
      }

      if (!result.data) {
        throw new Error("Data website tidak ditemukan.");
      }

      setWebsite(result.data);
    } catch (err) {
      setError(err.message || "Tidak dapat memuat detail website.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWebsite();
  }, [websiteId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC]">
        <div className="text-center">
          <RefreshCw
            size={27}
            className="mx-auto animate-spin text-[#102C62]"
          />
          <p className="mt-4 text-sm font-medium text-slate-600">
            Memuat detail website...
          </p>
        </div>
      </main>
    );
  }

  if (error || !website) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] p-6">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center">
          <AlertCircle
            size={32}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-4 text-lg font-bold text-slate-800">
            Website Tidak Ditemukan
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error || "Data website tidak tersedia."}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={fetchWebsite}
              className="inline-flex items-center gap-2 rounded-lg bg-[#102C62] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#193D7D]"
            >
              <RefreshCw size={15} />
              Coba Lagi
            </button>

            <Link
              href="/websites"
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Kembali
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const customer = website.customer;
  const template = website.template;
  const config = website.config?.config;
  const mediaCount = Array.isArray(website.media)
    ? website.media.length
    : 0;

  const statusStyles = {
    active: "bg-emerald-50 text-emerald-700",
    draft: "bg-amber-50 text-amber-700",
    inactive: "bg-slate-100 text-slate-600",
  };

  const statusLabels = {
    active: "Active",
    draft: "Draft",
    inactive: "Inactive",
  };

  return (
    <main className="min-h-screen bg-[#F7F8FC] p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/websites"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#102C62]"
            >
              <ArrowLeft size={16} />
              Back to Websites
            </Link>

            <h1 className="text-2xl font-bold text-slate-900">
              Website Detail
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View website information and its current configuration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/websites/${website.id}/preview`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <ExternalLink size={16} />
              Full Preview
            </Link>

            <Link
              href={`/websites/${website.id}/manage`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#102C62] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193D7D]"
            >
              <Settings size={16} />
              Manage Website
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Globe size={19} />}
            label="Website Status"
            value={statusLabels[website.status] || website.status}
            description="Current publishing status"
          />

          <StatCard
            icon={<Users size={19} />}
            label="Customer"
            value={customer?.company_name || "-"}
            description="Website owner"
          />

          <StatCard
            icon={<PanelsTopLeft size={19} />}
            label="Template"
            value={template?.name || "-"}
            description={template?.category || "Website template"}
          />

          <StatCard
            icon={<ImageIcon size={19} />}
            label="Media Assets"
            value={mediaCount}
            description={`Configuration version ${website.config?.version || 1}`}
          />
        </div>

        {/* Website Information */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <section className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-2">
            <div className="mb-5">
              <h2 className="text-base font-bold text-slate-900">
                Website Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Basic information about this website.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              <InfoItem label="Website Name" value={website.name} />
              <InfoItem label="Slug" value={website.slug} />
              <InfoItem label="Domain" value={website.domain || "Not configured"} />
              <InfoItem label="Template" value={template?.name} />
              <InfoItem label="Category" value={template?.category} />
              <InfoItem
                label="Created At"
                value={formatDate(website.created_at)}
              />
              <InfoItem
                label="Last Updated"
                value={formatDate(website.updated_at)}
              />

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </p>

                <span
                  className={`inline-flex rounded-md px-3 py-1.5 text-xs font-semibold ${
                    statusStyles[website.status] ||
                    "bg-slate-100 text-slate-600"
                  }`}
                >
                  {statusLabels[website.status] || website.status}
                </span>
              </div>
            </div>
          </section>

          {/* Customer Information */}
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-slate-900">
                Customer Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Website owner details.
              </p>
            </div>

            <div className="space-y-5">
              <InfoItem
                label="Company Name"
                value={customer?.company_name}
              />

              <InfoItem
                label="Contact Person"
                value={customer?.contact_person}
              />

              <InfoItem
                label="Email"
                value={customer?.email}
              />

              <InfoItem
                label="Phone"
                value={customer?.phone}
              />
            </div>
          </section>
        </div>

        {/* Website Preview */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Website Preview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Preview of the customer's saved website configuration.
              </p>
            </div>

            <Link
              href={`/websites/${website.id}/preview`}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#102C62] hover:text-[#193D7D]"
            >
              Open Full Preview
              <ExternalLink size={15} />
            </Link>
          </div>

          {template?.slug === "corppro" && config ? (
            <div className="relative isolate max-h-[850px] overflow-y-auto overflow-x-hidden">
              <CorpProRenderer config={config} />
            </div>
          ) : (
            <div className="flex min-h-[350px] flex-col items-center justify-center p-8 text-center">
              <PanelsTopLeft
                size={36}
                className="text-slate-300"
              />

              <h3 className="mt-4 text-base font-semibold text-slate-700">
                Preview Not Available
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                Renderer for this template is not available yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({ icon, label, value, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FA] text-[#102C62]">
          {icon}
        </div>

        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>
      </div>

      <p className="mt-4 truncate text-xl font-bold text-slate-900">
        {value ?? "-"}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="break-words text-sm font-medium text-slate-800">
        {value || "-"}
      </p>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
