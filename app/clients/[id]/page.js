
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Pencil,
  RefreshCw,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const styles = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    inactive: "bg-slate-100 text-slate-600 border-slate-200",
    draft: "bg-amber-50 text-amber-700 border-amber-200",
    published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  const labels = {
    active: "Active",
    inactive: "Inactive",
    draft: "Draft",
    published: "Published",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${
        styles[status] || "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {labels[status] || status || "Unknown"}
    </span>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-slate-800">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

function ClientDetailContent() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id;

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!clientId) return;

    let cancelled = false;

    async function fetchClient() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/customers/${encodeURIComponent(clientId)}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Gagal mengambil data client."
          );
        }

        if (!cancelled) {
          setClient(result.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Terjadi kesalahan.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchClient();

    return () => {
      cancelled = true;
    };
  }, [clientId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC]">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <RefreshCw size={17} className="animate-spin" />
          Memuat detail client...
        </div>
      </main>
    );
  }

  if (error || !client) {
    return (
      <main className="min-h-screen bg-[#F7F8FC] px-8 py-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/clients"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#102C62]"
          >
            <ArrowLeft size={16} />
            Kembali ke Clients
          </Link>

          <div className="rounded-xl border border-red-200 bg-white p-8">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={20}
                className="mt-0.5 text-red-500"
              />
              <div>
                <h2 className="font-semibold text-slate-900">
                  Tidak dapat memuat client
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {error || "Data client tidak ditemukan."}
                </p>
                <button
                  onClick={() => router.refresh()}
                  className="mt-4 text-sm font-semibold text-[#102C62] hover:underline"
                >
                  Coba lagi
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const websites = Array.isArray(client.websites)
    ? client.websites
    : [];

  const activeWebsites = websites.filter(
    (website) => website.status === "active" ||
      website.status === "published"
  ).length;

  const inactiveWebsites = websites.filter(
    (website) => website.status === "inactive"
  ).length;

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-8 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href="/clients"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#102C62]"
            >
              <ArrowLeft size={16} />
              Back to Clients
            </Link>

            <h1 className="text-2xl font-bold tracking-tight text-[#102C62]">
              Client Details
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Informasi dan website yang terdaftar untuk client ini.
            </p>
          </div>

          <Link
            href={`/clients/${client.id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#102C62] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#183D7C]"
          >
            <Pencil size={15} />
            Edit Client
          </Link>
        </div>

        {/* Client Overview */}
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#102C62]">
              <Building2 size={27} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold text-slate-900">
                  {client.company_name}
                </h2>
                <StatusBadge status={client.status} />
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Client #{client.id}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={15} />
                  Registered {formatDate(client.created_at)}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Globe size={15} />
                  {websites.length} Website(s)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Websites</p>
            <p className="mt-2 text-2xl font-bold text-[#102C62]">
              {websites.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Active Websites</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {activeWebsites}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Inactive Websites</p>
            <p className="mt-2 text-2xl font-bold text-slate-600">
              {inactiveWebsites}
            </p>
          </div>
        </section>

        {/* Company Information */}
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="font-semibold text-slate-900">
              Company Information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Informasi kontak dan data perusahaan.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <InfoItem
              icon={Building2}
              label="Company Name"
              value={client.company_name}
            />

            <InfoItem
              icon={Mail}
              label="Email Address"
              value={client.email}
            />

            <InfoItem
              icon={Building2}
              label="Contact Person"
              value={client.contact_name}
            />

            <InfoItem
              icon={Phone}
              label="Phone Number"
              value={client.phone}
            />

            <InfoItem
              icon={MapPin}
              label="Company Address"
              value={client.address}
            />

            <InfoItem
              icon={CalendarDays}
              label="Last Updated"
              value={formatDate(client.updated_at)}
            />
          </div>

          {client.notes && (
            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-xs text-slate-500">Notes</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {client.notes}
              </p>
            </div>
          )}
        </section>

        {/* Websites */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="font-semibold text-slate-900">
                Registered Websites
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Daftar website yang dimiliki client ini.
              </p>
            </div>

            <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
              {websites.length} Websites
            </span>
          </div>

          {websites.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                <Globe size={22} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-800">
                No websites yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Belum ada website yang terdaftar untuk client ini.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Website
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Template
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Domain
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {websites.map((website) => (
                    <tr
                      key={website.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-800">
                          {website.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          /{website.slug}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {website.template?.name || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {website.domain || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={website.status} />
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/websites/${website.id}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#102C62] hover:text-[#183D7C]"
                        >
                          View
                          <ExternalLink size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function ClientDetailPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC]">
          <p className="text-sm text-slate-500">
            Memuat detail client...
          </p>
        </main>
      }
    >
      <ClientDetailContent />
    </Suspense>
  );
}
