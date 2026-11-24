"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Globe,
  Search,
  Plus,
  Eye,
  Pencil,
  RefreshCw,
  AlertCircle,
  Building2,
  LayoutTemplate,
  CheckCircle2,
  FileClock,
  CircleX,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

const PAGE_SIZE = 10;

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "inactive", label: "Inactive" },
];

function formatDate(date) {
  if (!date) return "Belum tersedia";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Belum tersedia";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function getStatusStyle(status) {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-emerald-50 text-emerald-700";

    case "draft":
      return "bg-amber-50 text-amber-700";

    case "inactive":
      return "bg-slate-100 text-slate-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

function getStatusLabel(status) {
  if (!status) return "Unknown";

  return status.charAt(0).toUpperCase() + status.slice(1);
}

// Mengambil seluruh halaman data dari Laravel pagination.
async function fetchAllPages(endpoint) {
  const allItems = [];
  let page = 1;
  let lastPage = 1;

  do {
    const response = await fetch(
      `${endpoint}?page=${page}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || `Gagal mengambil data dari ${endpoint}.`
      );
    }

    allItems.push(
      ...(Array.isArray(result.data) ? result.data : [])
    );

    lastPage = Number(result.last_page) || 1;
    page++;
  } while (page <= lastPage);

  return allItems;
}

export default function WebsitesPage() {
  const [websites, setWebsites] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [templateFilter, setTemplateFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchWebsites() {
    try {
      setLoading(true);
      setError("");

      const [websiteData, templateData] = await Promise.all([
        fetchAllPages("/api/websites"),
        fetchAllPages("/api/templates"),
      ]);

      setWebsites(websiteData);
      setTemplates(templateData);
    } catch (err) {
      setError(
        err.message || "Tidak dapat mengambil data website."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWebsites();
  }, []);

  // Statistics
  const stats = useMemo(() => {
    return [
      {
        title: "Total Websites",
        value: websites.length,
        icon: Globe,
      },
      {
        title: "Active",
        value: websites.filter(
          (website) => website.status === "active"
        ).length,
        icon: CheckCircle2,
      },
      {
        title: "Draft",
        value: websites.filter(
          (website) => website.status === "draft"
        ).length,
        icon: FileClock,
      },
      {
        title: "Inactive",
        value: websites.filter(
          (website) => website.status === "inactive"
        ).length,
        icon: CircleX,
      },
    ];
  }, [websites]);

  // Search and filters
  const filteredWebsites = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return websites.filter((website) => {
      const matchesSearch =
        !query ||
        website.name?.toLowerCase().includes(query) ||
        website.domain?.toLowerCase().includes(query) ||
        website.slug?.toLowerCase().includes(query) ||
        website.customer?.company_name?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        website.status?.toLowerCase() === statusFilter;

      const matchesTemplate =
        templateFilter === "all" ||
        String(website.template_id) === templateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesTemplate
      );
    });
  }, [
    websites,
    searchQuery,
    statusFilter,
    templateFilter,
  ]);

  // Client-side pagination after retrieving all API pages.
  const totalPages = Math.max(
    1,
    Math.ceil(filteredWebsites.length / PAGE_SIZE)
  );

  const paginatedWebsites = filteredWebsites.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, templateFilter]);

  // Pagination information
  const startItem =
    filteredWebsites.length === 0
      ? 0
      : (currentPage - 1) * PAGE_SIZE + 1;

  const endItem = Math.min(
    currentPage * PAGE_SIZE,
    filteredWebsites.length
  );

  function resetFilters() {
    setSearchQuery("");
    setStatusFilter("all");
    setTemplateFilter("all");
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] p-6 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Page Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Globe size={16} />
              <span>CMS COMTRONICS</span>
              <span>/</span>
              <span>Websites</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#102C62] md:text-3xl">
              Website Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Kelola seluruh website yang dimiliki pelanggan.
            </p>
          </div>

          <Link
            href="/websites/create"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#102C62] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#193D7D]"
          >
            <Plus size={17} />
            Add Website
          </Link>
        </div>

        {/* Statistics */}
        <section className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={String(stat.value).padStart(2, "0")}
              icon={stat.icon}
            />
          ))}
        </section>

        {/* Website List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#102C62]">
                All Websites
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Daftar website yang terdaftar di CMS COMTRONICS.
              </p>
            </div>

            <span className="text-sm text-slate-500">
              {filteredWebsites.length} Websites
            </span>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search website, domain, or customer..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#102C62]"
              />
            </div>

            <div className="flex w-44 items-center gap-2 rounded-xl border border-slate-200 px-3">
              <SlidersHorizontal
                size={15}
                className="shrink-0 text-slate-400"
              />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="w-full bg-transparent py-2.5 text-sm text-slate-600 outline-none"
              >
                {statusOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-52">
              <select
                value={templateFilter}
                onChange={(event) =>
                  setTemplateFilter(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-[#102C62]"
              >
                <option value="all">All Templates</option>

                {templates.map((template) => (
                  <option
                    key={template.id}
                    value={String(template.id)}
                  >
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50"
            >
              Reset
            </button>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

            {loading && (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                <RefreshCw
                  size={26}
                  className="animate-spin text-[#102C62]"
                />

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Memuat data website...
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Mengambil data dari server.
                </p>
              </div>
            )}

            {!loading && error && (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                <AlertCircle
                  size={30}
                  className="text-red-500"
                />

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Gagal memuat website
                </p>

                <p className="mt-1 max-w-md text-sm text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={fetchWebsites}
                  className="mt-5 flex items-center gap-2 rounded-lg bg-[#102C62] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193D7D]"
                >
                  <RefreshCw size={15} />
                  Coba Lagi
                </button>
              </div>
            )}

            {!loading &&
              !error &&
              paginatedWebsites.length === 0 && (
                <div className="px-5 py-16 text-center">
                  <Globe
                    className="mx-auto text-slate-300"
                    size={32}
                  />

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    {websites.length === 0
                      ? "Belum ada website"
                      : "Website tidak ditemukan"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {websites.length === 0
                      ? "Website pelanggan yang terdaftar akan muncul di sini."
                      : "Coba ubah kata kunci atau filter pencarian."}
                  </p>
                </div>
              )}

            {!loading &&
              !error &&
              paginatedWebsites.length > 0 && (
                <>
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Website
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Customer
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Template
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Status
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Created
                        </th>

                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {paginatedWebsites.map((website) => (
                        <tr
                          key={website.id}
                          className="transition hover:bg-slate-50/70"
                        >
                          {/* Website */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#102C62]">
                                <Globe size={18} />
                              </div>

                              <div className="min-w-0">
                                <p className="max-w-[220px] truncate text-sm font-semibold text-slate-800">
                                  {website.name}
                                </p>

                                <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">
                                  {website.domain || website.slug}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Customer */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <Building2
                                size={15}
                                className="shrink-0 text-slate-400"
                              />

                              <span className="max-w-[170px] truncate text-sm font-medium text-slate-700">
                                {website.customer?.company_name || "-"}
                              </span>
                            </div>
                          </td>

                          {/* Template */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <LayoutTemplate
                                size={15}
                                className="shrink-0 text-slate-400"
                              />

                              <span className="max-w-[150px] truncate text-sm text-slate-600">
                                {website.template?.name || "-"}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                                website.status
                              )}`}
                            >
                              {getStatusLabel(website.status)}
                            </span>
                          </td>

                          {/* Created */}
                          <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                            {formatDate(website.created_at)}
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-1.5">
                              <ActionButton
                                label="View Detail"
                                icon={Eye}
                                onClick={() => {
                                  window.location.href = `/websites/${website.id}`;
                                }}
                              />

                              <ActionButton
                                label="Manage"
                                icon={Pencil}
                                onClick={() => {
                                  window.location.href = `/websites/${website.id}/manage`;
                                }}
                                primary
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
                    <p className="text-sm text-slate-500">
                      Showing{" "}
                      <span className="font-semibold text-slate-700">
                        {startItem}-{endItem}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-slate-700">
                        {filteredWebsites.length}
                      </span>{" "}
                      websites
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={currentPage <= 1}
                        onClick={() =>
                          setCurrentPage((page) => page - 1)
                        }
                        className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={17} />
                      </button>

                      <span className="min-w-20 text-center text-sm font-medium text-slate-600">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        type="button"
                        disabled={currentPage >= totalPages}
                        onClick={() =>
                          setCurrentPage((page) => page + 1)
                        }
                        className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Next page"
                      >
                        <ChevronRight size={17} />
                      </button>
                    </div>
                  </div>
                </>
              )}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className="flex size-10 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#102C62]">
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight text-[#102C62]">
        {value}
      </p>
    </div>
  );
}

function ActionButton({
  label,
  icon: Icon,
  onClick,
  primary = false,
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold transition ${
        primary
          ? "bg-[#102C62] text-white hover:bg-[#193D7D]"
          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}
