"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Globe,
  PanelsTopLeft,
  Users,
  Settings,
  Bell,
  ArrowRight,
  MoreHorizontal,
  CheckCircle2,
  GraduationCap,
  Building2,
  Landmark,
  ClipboardList,
  RefreshCw,
  AlertCircle,
  FileClock,
  CircleX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const navigation = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard, active: true },
  { label: "Website", href: "/websites", icon: Globe },
  { label: "Template", href: "/templates", icon: PanelsTopLeft },
  { label: "Client", href: "/clients", icon: Users },
];

const templateCategories = [
  {
    name: "Government",
    description: "Government agency and public service websites.",
    icon: Landmark,
  },
  {
    name: "Corporate",
    description: "Websites for companies, businesses, and organizations.",
    icon: Building2,
  },
  {
    name: "Education",
    description: "Websites for schools and educational institutions.",
    icon: GraduationCap,
  },
];

async function fetchAllPages(endpoint) {
  const allItems = [];
  let page = 1;
  let lastPage = 1;

  do {
    const response = await fetch(`${endpoint}?page=${page}`, {
      method: "GET",
      cache: "no-store",
    });

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

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#D7DEE8] bg-[#EDF1F6] text-[#526783]">
        <Icon size={22} strokeWidth={1.7} />
      </div>

      <h4 className="text-sm font-semibold text-[#172554]">
        {title}
      </h4>

      <p className="mt-1 max-w-xs text-xs leading-5 text-[#718096]">
        {description}
      </p>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, loading }) {
  return (
    <Card className="gap-0 border border-[#DCE2EA] bg-[#F8FAFC] py-0 shadow-none transition-colors hover:border-[#AAB8CB]">
      <CardContent className="px-5 py-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#718096]">
              {label}
            </p>

            <p className="mt-4 text-3xl font-bold tracking-tight text-[#172554]">
              {loading ? "..." : value}
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D7DEE8] bg-[#E9EEF5] text-[#405777]">
            <Icon size={20} strokeWidth={1.8} />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 border-t border-[#E2E7EE] pt-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#64748B]" />
          <p className="text-[11px] text-[#718096]">
            {loading ? "Memuat data..." : "Data dari CMS"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionHeading({ title, description }) {
  return (
    <div>
      <h3 className="text-base font-semibold tracking-tight text-[#172554]">
        {title}
      </h3>

      <p className="mt-1.5 text-xs leading-5 text-[#718096]">
        {description}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const [websites, setWebsites] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setErrors([]);

    const endpoints = [
      { key: "websites", url: "/api/websites" },
      { key: "templates", url: "/api/templates" },
      { key: "customers", url: "/api/customers" },
    ];

    const results = await Promise.allSettled(
      endpoints.map((item) => fetchAllPages(item.url))
    );

    const nextErrors = [];

    results.forEach((result, index) => {
      const key = endpoints[index].key;

      if (result.status === "fulfilled") {
        if (key === "websites") setWebsites(result.value);
        if (key === "templates") setTemplates(result.value);
        if (key === "customers") setCustomers(result.value);
      } else {
        nextErrors.push({
          key,
          message: result.reason?.message || "Gagal mengambil data.",
        });
      }
    });

    setErrors(nextErrors);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const statistics = useMemo(
    () => [
      {
        label: "Website Total",
        value: websites.length,
        icon: Globe,
      },
      {
        label: "Active Website",
        value: websites.filter(
          (website) => website.status?.toLowerCase() === "active"
        ).length,
        icon: CheckCircle2,
      },
      {
        label: "Template Total",
        value: templates.length,
        icon: PanelsTopLeft,
      },
      {
        label: "Client",
        value: customers.length,
        icon: Users,
      },
    ],
    [websites, templates, customers]
  );

  const websiteStatuses = useMemo(
    () => [
      {
        label: "Active",
        value: websites.filter(
          (website) => website.status?.toLowerCase() === "active"
        ).length,
        icon: CheckCircle2,
        color: "text-emerald-700",
        background: "bg-emerald-100",
      },
      {
        label: "Draft",
        value: websites.filter(
          (website) => website.status?.toLowerCase() === "draft"
        ).length,
        icon: FileClock,
        color: "text-amber-700",
        background: "bg-amber-100",
      },
      {
        label: "Inactive",
        value: websites.filter(
          (website) => website.status?.toLowerCase() === "inactive"
        ).length,
        icon: CircleX,
        color: "text-[#718096]",
        background: "bg-[#E9EDF2]",
      },
    ],
    [websites]
  );

  return (
    <div className="min-h-screen bg-[#E9EDF2] text-[#172554]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-[260px] shrink-0 flex-col border-r border-[#263967] bg-[#172554] lg:flex">

          <div className="flex h-[82px] items-center gap-3 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#64748B]/50 bg-[#243765] text-[#D8E0EC]">
              <PanelsTopLeft size={21} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-[15px] font-bold tracking-[0.12em] text-white">
                COMTRONICS
              </p>
              <p className="mt-0.5 text-[10px] tracking-wide text-[#B8C4D8]">
                WEBSITE MANAGEMENT
              </p>
            </div>
          </div>

          <Separator className="bg-[#35466F]" />

          <div className="px-4 pt-8">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#AEBBD1]">
              Workspace
            </p>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-lg border px-3 py-3 text-[13px] transition-colors ${
                      item.active
                        ? "border-[#64748B]/50 bg-[#34466F] font-semibold text-white"
                        : "border-transparent text-[#D0D8E6] hover:border-[#435477] hover:bg-[#263967] hover:text-white"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    {item.label}

                    {item.active && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#A9B8D0]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-9 px-4">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#AEBBD1]">
              Preferences
            </p>

            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-3 text-[13px] text-[#D0D8E6] transition-colors hover:border-[#435477] hover:bg-[#263967] hover:text-white"
            >
              <Settings size={18} strokeWidth={1.8} />
              Settings
            </Link>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-xl border border-[#435477] bg-[#111C3C] p-4">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#64748B]/50 bg-[#263967] text-[#D8E0EC]">
                  <Globe size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    CMS COMTRONICS
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#B8C4D8]">
                    Management Portal
                  </p>
                </div>
              </div>

              <p className="text-[11px] leading-5 text-[#C4CDDC]">
                Manage Client Websites in one place.
              </p>
            </div>

            <p className="mt-4 px-2 text-[9px] tracking-[0.12em] text-[#AEBBD1]">
              COMTRONICS CMS • 2026
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1">

          {/* TOPBAR */}
          <header className="sticky top-0 z-10 flex h-[82px] items-center justify-between border-b border-[#D5DCE6] bg-[#F4F6F9]/95 px-5 backdrop-blur-md md:px-8">

            <div>
              <div className="flex items-center gap-2 text-[11px] text-[#718096]">
                <span>Workspace</span>
                <span className="text-[#A0AABA]">/</span>
                <span className="font-medium text-[#405777]">Overview</span>
              </div>

              <h1 className="mt-1 text-lg font-semibold tracking-tight text-[#172554]">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <Button
                variant="outline"
                size="icon"
                className="relative h-10 w-10 border-[#D5DCE6] bg-[#F8FAFC] text-[#405777] hover:bg-[#E9EEF5] hover:text-[#172554]"
                aria-label="Notifikasi"
              >
                <Bell size={17} />
              </Button>

              <Separator
                orientation="vertical"
                className="hidden h-9 bg-[#D5DCE6] sm:block"
              />

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-[13px] font-semibold text-[#172554]">
                    Administrator
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#718096]">
                    Admin CMS
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C7D1E0] bg-[#DCE4EF] text-sm font-bold text-[#243765]">
                  A
                </div>
              </div>
            </div>
          </header>

          {/* DASHBOARD BODY */}
          <div className="mx-auto max-w-[1500px] space-y-8 p-5 md:p-8">

            {/* PAGE INTRO */}
            <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 border-[#C7D1E0] bg-[#E1E7F0] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#405777]"
                >
                  Management Overview
                </Badge>

                <h2 className="text-2xl font-semibold tracking-tight text-[#172554] md:text-[32px]">
                  Dashboard Overview
                </h2>

                <p className="mt-2 max-w-xl text-[13px] leading-6 text-[#718096]">
                  Manage all client websites and templates across your Comtronics workspace.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#718096]">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                CMS Data Overview
              </div>
            </section>

            {/* ERROR NOTICE */}
            {errors.length > 0 && (
              <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4">
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0 text-amber-700"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-amber-900">
                    Sebagian data dashboard gagal dimuat
                  </p>

                  {errors.map((error) => (
                    <p
                      key={error.key}
                      className="mt-1 text-xs leading-5 text-amber-800"
                    >
                      {error.key}: {error.message}
                    </p>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadDashboard}
                  disabled={loading}
                  className="border-amber-300 bg-white text-amber-900 hover:bg-amber-100"
                >
                  <RefreshCw size={14} className="mr-2" />
                  Coba Lagi
                </Button>
              </div>
            )}

            {/* STATISTICS */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <SectionHeading
                  title="Workspace Statistics"
                  description="Overview of your website management resources."
                />

                <span className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-[#718096] sm:block">
                  Total Resources
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statistics.map((stat) => (
                  <StatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    icon={stat.icon}
                    loading={loading}
                  />
                ))}
              </div>
            </section>

            {/* TEMPLATE CATEGORIES */}
            <section>
              <div className="mb-5 flex items-end justify-between gap-3">
                <SectionHeading
                  title="Template Categories"
                  description="Explore and manage template collections by category."
                />

                <Link
                  href="/templates"
                  className="flex shrink-0 items-center gap-2 text-xs font-semibold text-[#405777] transition-colors hover:text-[#172554]"
                >
                  All Templates
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {templateCategories.map((category) => {
                  const Icon = category.icon;

                  return (
                    <Link
                      key={category.name}
                      href="/templates"
                      className="group block"
                    >
                      <Card className="h-full gap-0 border border-[#DCE2EA] bg-[#F8FAFC] py-0 shadow-none transition-colors group-hover:border-[#AAB8CB] group-hover:bg-white">
                        <CardContent className="px-5 py-5">
                          <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D7DEE8] bg-[#E9EEF5] text-[#405777]">
                              <Icon size={22} strokeWidth={1.7} />
                            </div>

                            <MoreHorizontal
                              size={19}
                              className="text-[#8793A5] transition-colors group-hover:text-[#405777]"
                            />
                          </div>

                          <h4 className="mt-6 text-[15px] font-semibold text-[#172554]">
                            {category.name}
                          </h4>

                          <p className="mt-2 min-h-10 text-xs leading-5 text-[#718096]">
                            {category.description}
                          </p>

                          <div className="mt-5 flex items-center justify-between border-t border-[#E2E7EE] pt-4">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#718096]">
                              Explore Category
                            </span>

                            <ArrowRight
                              size={16}
                              className="text-[#64748B] transition-transform group-hover:translate-x-1"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* ACTIVITY AND WEBSITE STATUS */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">

              {/* LATEST ACTIVITIES */}
              <Card className="gap-0 border border-[#DCE2EA] bg-[#F8FAFC] py-0 shadow-none">
                <CardHeader className="flex flex-row items-center justify-between border-b border-[#E2E7EE] px-5 py-5">
                  <div>
                    <CardTitle className="text-[15px] font-semibold text-[#172554]">
                      Latest Activities
                    </CardTitle>

                    <p className="mt-1.5 text-[11px] font-normal text-[#718096]">
                      Website Management History
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE2EA] bg-[#EDF1F6] text-[#526783]">
                    <MoreHorizontal size={18} />
                  </div>
                </CardHeader>

                <CardContent className="px-5">
                  <EmptyState
                    icon={ClipboardList}
                    title="No Activity Yet"
                    description="Website management activities will appear here once an activity history endpoint is available."
                  />
                </CardContent>
              </Card>

              {/* WEBSITE STATUS */}
              <Card className="gap-0 border border-[#DCE2EA] bg-[#F8FAFC] py-0 shadow-none">
                <CardHeader className="border-b border-[#E2E7EE] px-5 py-5">
                  <CardTitle className="text-[15px] font-semibold text-[#172554]">
                    Website Status
                  </CardTitle>

                  <p className="mt-1.5 text-[11px] font-normal text-[#718096]">
                    Summary of website publication status.
                  </p>
                </CardHeader>

                <CardContent className="space-y-5 px-5 py-6">
                  {loading ? (
                    <div className="flex items-center justify-center py-8 text-xs text-[#718096]">
                      <RefreshCw
                        size={16}
                        className="mr-2 animate-spin text-[#405777]"
                      />
                      Memuat status website...
                    </div>
                  ) : websites.length === 0 ? (
                    <EmptyState
                      icon={Globe}
                      title="No Website Yet"
                      description="Website pelanggan akan ditampilkan di sini."
                    />
                  ) : (
                    websiteStatuses.map((status) => {
                      const Icon = status.icon;

                      return (
                        <div
                          key={status.label}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${status.background}`}>
                              <Icon
                                size={17}
                                className={status.color}
                              />
                            </div>

                            <span className="text-[13px] text-[#526178]">
                              {status.label}
                            </span>
                          </div>

                          <span className="text-base font-semibold tabular-nums text-[#172554]">
                            {status.value}
                          </span>
                        </div>
                      );
                    })
                  )}

                  {websites.length > 0 && (
                    <Link
                      href="/websites"
                      className="flex items-center justify-end gap-2 border-t border-[#E2E7EE] pt-4 text-xs font-semibold text-[#405777] transition-colors hover:text-[#172554]"
                    >
                      View Websites
                      <ArrowRight size={15} />
                    </Link>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* FOOTER */}
            <footer className="flex flex-col gap-2 border-t border-[#D5DCE6] pt-5 text-[10px] tracking-wide text-[#718096] sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 COMTRONICS.</p>
              <p>Website Management System</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
