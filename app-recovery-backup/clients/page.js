"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Eye,
  RefreshCw,
  AlertCircle,
  Building2,
  CheckCircle2,
  CircleX,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

const PAGE_SIZE = 10;

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

function normalizeStatus(status) {
  return String(status || "").toLowerCase();
}

function getStatusStyle(status) {
  switch (normalizeStatus(status)) {
    case "active":
      return "bg-emerald-50 text-emerald-700";
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

async function fetchAllPages(endpoint, signal) {
  const allItems = [];
  let page = 1;
  let lastPage = 1;

  do {
    const params = new URLSearchParams({
      page: String(page),
    });

    const response = await fetch(`${endpoint}?${params}`, {
      method: "GET",
      cache: "no-store",
      signal,
      headers: {
        Accept: "application/json",
      },
    });

    let result;

    try {
      result = await response.json();
    } catch {
      throw new Error("Response server tidak valid.");
    }

    if (!response.ok) {
      throw new Error(
        result.message || "Gagal mengambil data client."
      );
    }

    if (!Array.isArray(result.data)) {
      throw new Error("Format data client dari server tidak valid.");
    }

    const responseLastPage = Number(result.last_page);

    if (
      !Number.isInteger(responseLastPage) ||
      responseLastPage < 1
    ) {
      throw new Error("Informasi pagination dari server tidak valid.");
    }

    allItems.push(...result.data);
    lastPage = responseLastPage;
    page++;
  } while (page <= lastPage);

  return allItems;
}

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchClients(signal) {
    try {
      setLoading(true);
      setError("");

      const data = await fetchAllPages("/api/customers", signal);

      if (signal?.aborted) return;

      setClients(data);
    } catch (err) {
      if (err.name === "AbortError") return;

      setError(
        err.message || "Tidak dapat mengambil data client."
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchClients(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const stats = useMemo(() => {
    return [
      {
        title: "Total Clients",
        value: clients.length,
        icon: Users,
      },
      {
        title: "Active",
        value: clients.filter(
          (client) => normalizeStatus(client.status) === "active"
        ).length,
        icon: CheckCircle2,
      },
      {
        title: "Inactive",
        value: clients.filter(
          (client) => normalizeStatus(client.status) === "inactive"
        ).length,
        icon: CircleX,
      },
    ];
  }, [clients]);

  const filteredClients = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return clients.filter((client) => {
      const matchesSearch =
        !query ||
        client.company_name?.toLowerCase().includes(query) ||
        client.contact_name?.toLowerCase().includes(query) ||
        client.email?.toLowerCase().includes(query) ||
        client.phone?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        normalizeStatus(client.status) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [clients, searchQuery, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClients.length / PAGE_SIZE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedClients = filteredClients.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const startItem =
    filteredClients.length === 0
      ? 0
      : (safeCurrentPage - 1) * PAGE_SIZE + 1;

  const endItem = Math.min(
    safeCurrentPage * PAGE_SIZE,
    filteredClients.length
  );

  function resetFilters() {
    setSearchQuery("");
    setStatusFilter("all");
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] p-6 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Page Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Users size={16} />
              <span>CMS COMTRONICS</span>
              <span>/</span>
              <span>Clients</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#102C62] md:text-3xl">
              Client Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Kelola data pelanggan dan informasi perusahaan.
            </p>
          </div>

          <Link
            href="/clients/create"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#102C62] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#193D7D]"
          >
            <Plus size={17} />
            Add Client
          </Link>
        </div>

        {/* Statistics */}
        <section className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={String(stat.value).padStart(2, "0")}
              icon={stat.icon}
            />
          ))}
        </section>

        {/* Client List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#102C62]">
                All Clients
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Daftar perusahaan yang terdaftar di CMS COMTRONICS.
              </p>
            </div>

            <span className="text-sm text-slate-500">
              {filteredClients.length} Clients
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
                placeholder="Search company, contact, email, or phone..."
                aria-label="Search clients"
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
                aria-label="Filter client status"
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
                  Memuat data client...
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
                  Gagal memuat client
                </p>

                <p className="mt-1 max-w-md text-sm text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => fetchClients()}
                  className="mt-5 flex items-center gap-2 rounded-lg bg-[#102C62] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193D7D]"
                >
                  <RefreshCw size={15} />
                  Coba Lagi
                </button>
              </div>
            )}

            {!loading &&
              !error &&
              paginatedClients.length === 0 && (
                <div className="px-5 py-16 text-center">
                  <Users
                    className="mx-auto text-slate-300"
                    size={32}
                  />

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    {clients.length === 0
                      ? "Belum ada client"
                      : "Client tidak ditemukan"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {clients.length === 0
                      ? "Data pelanggan yang terdaftar akan muncul di sini."
                      : "Coba ubah kata kunci atau filter pencarian."}
                  </p>

                  {clients.length === 0 && (
                    <Link
                      href="/clients/create"
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#102C62] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193D7D]"
                    >
                      <Plus size={15} />
                      Add First Client
                    </Link>
                  )}
                </div>
              )}

            {!loading &&
              !error &&
              paginatedClients.length > 0 && (
                <>
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Company
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Contact Person
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Contact Information
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Websites
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Status
                        </th>

                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {paginatedClients.map((client) => (
                        <tr
                          key={client.id}
                          className="transition hover:bg-slate-50/70"
                        >
                          {/* Company */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#102C62]">
                                <Building2 size={18} />
                              </div>

                              <div className="min-w-0">
                                <p className="max-w-[220px] truncate text-sm font-semibold text-slate-800">
                                  {client.company_name}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  Client #{client.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Contact Person */}
                          <td className="px-5 py-4">
                            <span className="text-sm font-medium text-slate-700">
                              {client.contact_name || "-"}
                            </span>
                          </td>

                          {/* Contact Information */}
                          <td className="px-5 py-4">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <Mail
                                  size={13}
                                  className="shrink-0 text-slate-400"
                                />
                                <span className="max-w-[190px] truncate text-xs text-slate-600">
                                  {client.email || "-"}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <Phone
                                  size={13}
                                  className="shrink-0 text-slate-400"
                                />
                                <span className="text-xs text-slate-500">
                                  {client.phone || "-"}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Websites */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <Globe
                                size={15}
                                className="text-slate-400"
                              />

                              <span className="text-sm font-semibold text-slate-700">
                                {client.websites_count ?? 0}
                              </span>

                              <span className="text-xs text-slate-500">
                                websites
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                                client.status
                              )}`}
                            >
                              {getStatusLabel(client.status)}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end">
                              <Link
                                href={`/clients/${client.id}`}
                                title="View Detail"
                                aria-label={`View ${client.company_name}`}
                                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                              >
                                <Eye size={14} />
                                View Detail
                              </Link>
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
                        {filteredClients.length}
                      </span>{" "}
                      clients
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={safeCurrentPage <= 1}
                        onClick={() =>
                          setCurrentPage((page) => Math.max(1, page - 1))
                        }
                        className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={17} />
                      </button>

                      <span className="min-w-20 text-center text-sm font-medium text-slate-600">
                        Page {safeCurrentPage} of {totalPages}
                      </span>

                      <button
                        type="button"
                        disabled={safeCurrentPage >= totalPages}
                        onClick={() =>
                          setCurrentPage((page) =>
                            Math.min(totalPages, page + 1)
                          )
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
