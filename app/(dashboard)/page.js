import { Suspense } from "react";
import { redirect } from "next/navigation";
import {
  Globe,
  PanelsTopLeft,
  Users,
  ArrowRight,
  MoreHorizontal,
  GraduationCap,
  Building2,
  Landmark,
  ClipboardList,
  CheckCircle2,
  Clock3,
  CirclePause,
  ExternalLink,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const templateCategories = [
  {
    name: "Government",
    description: "Government agency and public service websites.",
    icon: Landmark,
    color: "bg-blue-50 text-blue-700",
    category: "government",
  },
  {
    name: "Corporate",
    description: "Websites for companies and organizations.",
    icon: Building2,
    color: "bg-violet-50 text-violet-700",
    category: "corporate",
  },
  {
    name: "Education",
    description: "Websites for schools and educational institutions.",
    icon: GraduationCap,
    color: "bg-emerald-50 text-emerald-700",
    category: "education",
  },
];

const statusConfig = {
  active: {
    label: "Active",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  draft: {
    label: "Draft",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  inactive: {
    label: "Inactive",
    className: "border-slate-200 bg-slate-100 text-slate-600",
  },
};

async function fetchAllPages(endpoint, token) {
  const baseUrl = process.env.CMS_API_URL;

  if (!baseUrl) {
    throw new Error("CMS_API_URL belum dikonfigurasi.");
  }

  const fetchPage = async (page) => {
    const response = await fetch(
      `${baseUrl}/${endpoint}?page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (response.status === 401 || response.status === 403) {
      redirect("/login");
    }

    if (!response.ok) {
      throw new Error(`Gagal mengambil data ${endpoint}.`);
    }

    return response.json();
  };

  const firstPage = await fetchPage(1);

  let items = Array.isArray(firstPage.data)
    ? firstPage.data
    : [];

  const lastPage = Number(firstPage.last_page || 1);

  for (let page = 2; page <= lastPage; page++) {
    const result = await fetchPage(page);

    if (Array.isArray(result.data)) {
      items = [...items, ...result.data];
    }
  }

  return {
    items,
    total: Number(firstPage.total ?? items.length),
  };
}

function formatDate(date) {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        <Icon size={22} />
      </div>

      <h4 className="text-sm font-semibold text-slate-700">
        {title}
      </h4>

      <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
}

function StatisticCard({ label, value, icon: Icon, description }) {
  return (
    <Card className="gap-4 border-slate-200 bg-white py-5 shadow-none">
      <CardContent className="px-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">{label}</p>

            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {value.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2fb] text-[#183d7c]">
            <Icon size={19} />
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function WebsiteStatusRow({ label, count, icon: Icon, color }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
          <Icon size={17} />
        </div>

        <span className="text-sm font-medium text-slate-600">
          {label}
        </span>
      </div>

      <span className="text-sm font-semibold tabular-nums text-slate-900">
        {count.toLocaleString("id-ID")}
      </span>
    </div>
  );
}

async function DashboardContent() {
  const [websiteResult, templateResult, customerResult] =
    await Promise.allSettled([
      fetchAllPages("websites"),
      fetchAllPages("templates"),
      fetchAllPages("customers"),
    ]);

  const websites =
    websiteResult.status === "fulfilled"
      ? websiteResult.value.items
      : [];

  const templates =
    templateResult.status === "fulfilled"
      ? templateResult.value.items
      : [];

  const customers =
    customerResult.status === "fulfilled"
      ? customerResult.value.items
      : [];

  const websiteTotal =
    websiteResult.status === "fulfilled"
      ? websiteResult.value.total
      : null;

  const templateTotal =
    templateResult.status === "fulfilled"
      ? templateResult.value.total
      : null;

  const customerTotal =
    customerResult.status === "fulfilled"
      ? customerResult.value.total
      : null;

  const websiteActive = websites.filter(
    (website) => website.status === "active"
  ).length;

  const websiteDraft = websites.filter(
    (website) => website.status === "draft"
  ).length;

  const websiteInactive = websites.filter(
    (website) => website.status === "inactive"
  ).length;

  const categoryCounts = {
    government: templates.filter(
      (template) =>
        template.category?.toLowerCase() === "government"
    ).length,

    corporate: templates.filter(
      (template) =>
        template.category?.toLowerCase() === "corporate"
    ).length,

    education: templates.filter(
      (template) =>
        template.category?.toLowerCase() === "education"
    ).length,
  };

  const recentWebsites = [...websites]
    .sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime()
    )
    .slice(0, 5);

  const hasDataError =
    websiteResult.status === "rejected" ||
    templateResult.status === "rejected" ||
    customerResult.status === "rejected";

  return (
    <div className="mx-auto max-w-[1500px] space-y-8 p-8">
      <section className="flex items-end justify-between">
        <div>
          <Badge
            variant="outline"
            className="mb-3 border-blue-200 bg-blue-50 text-blue-700"
          >
            Management Overview
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage all client websites and Comtronics templates.
          </p>
        </div>

        <p className="text-xs text-slate-400">
          Last updated: {formatDate(new Date().toISOString())}
        </p>
      </section>

      {hasDataError && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <Activity size={18} />
          <p>
            Sebagian data Dashboard gagal dimuat. Periksa koneksi API
            untuk Website, Template, atau Customer.
          </p>
        </div>
      )}

      <section className="grid grid-cols-4 gap-4">
        <StatisticCard
          label="Website Total"
          value={websiteTotal ?? 0}
          icon={Globe}
          description="Total registered websites"
        />

        <StatisticCard
          label="Active Website"
          value={websiteActive}
          icon={CheckCircle2}
          description="Active websites"
        />

        <StatisticCard
          label="Template Total"
          value={templateTotal ?? 0}
          icon={PanelsTopLeft}
          description="Available website templates"
        />

        <StatisticCard
          label="Total Clients"
          value={customerTotal ?? 0}
          icon={Users}
          description="Registered customers"
        />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold tracking-tight">
              Template Categories
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Explore available template collections.
            </p>
          </div>

          <a
            href="/templates"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#183d7c] hover:text-[#102c62]"
          >
            All Templates
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {templateCategories.map((category) => {
            const Icon = category.icon;

            return (
              <a
                key={category.name}
                href={`/templates?category=${category.category}`}
                className="group"
              >
                <Card className="h-full gap-4 border-slate-200 bg-white py-5 shadow-none transition-colors group-hover:border-[#b9c9e5]">
                  <CardContent className="px-5">
                    <div className="flex items-start justify-between">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${category.color}`}>
                        <Icon size={21} />
                      </div>

                      <MoreHorizontal
                        size={19}
                        className="text-slate-300"
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <h4 className="font-semibold">
                        {category.name}
                      </h4>

                      <span className="text-sm font-semibold tabular-nums text-slate-500">
                        {categoryCounts[category.category]}
                      </span>
                    </div>

                    <p className="mt-1 min-h-10 text-sm leading-5 text-slate-500">
                      {category.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs text-slate-400">
                        {categoryCounts[category.category]} templates
                      </span>

                      <ArrowRight
                        size={17}
                        className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#183d7c]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-[1.6fr_1fr] gap-5">
        <Card className="gap-0 border-slate-200 bg-white py-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-5 py-5">
            <div>
              <CardTitle className="text-base">
                Recent Websites
              </CardTitle>

              <p className="mt-1 text-xs font-normal text-slate-500">
                Recently registered client websites.
              </p>
            </div>

            <a
              href="/websites"
              className="text-sm font-medium text-[#183d7c] hover:text-[#102c62]"
            >
              View All
            </a>
          </CardHeader>

          <CardContent className="px-5">
            {websiteResult.status === "rejected" ? (
              <EmptyState
                icon={Globe}
                title="Unable to Load Websites"
                description="Website data could not be retrieved from the server."
              />
            ) : recentWebsites.length === 0 ? (
              <EmptyState
                icon={Globe}
                title="No Website Yet"
                description="Newly registered client websites will appear here."
              />
            ) : (
              <div className="divide-y divide-slate-100">
                {recentWebsites.map((website) => {
                  const status =
                    statusConfig[website.status] ||
                    statusConfig.inactive;

                  return (
                    <div
                      key={website.id}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {website.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {website.customer?.company_name || "No customer"}
                          {" · "}
                          {website.template?.name || "No template"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {formatDate(website.created_at)}
                        </p>
                      </div>

                      <Badge
                        variant="outline"
                        className={status.className}
                      >
                        {status.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="gap-0 border-slate-200 bg-white py-0 shadow-none">
          <CardHeader className="border-b border-slate-100 px-5 py-5">
            <CardTitle className="text-base">
              Website Status
            </CardTitle>

            <p className="mt-1 text-xs font-normal text-slate-500">
              Overview of website publication status.
            </p>
          </CardHeader>

          <CardContent className="px-5 py-2">
            {websiteResult.status === "rejected" ? (
              <EmptyState
                icon={Globe}
                title="Unable to Load Status"
                description="Website status data is currently unavailable."
              />
            ) : (
              <>
                <WebsiteStatusRow
                  label="Active"
                  count={websiteActive}
                  icon={CheckCircle2}
                  color="bg-emerald-50 text-emerald-600"
                />

                <Separator />

                <WebsiteStatusRow
                  label="Draft"
                  count={websiteDraft}
                  icon={Clock3}
                  color="bg-amber-50 text-amber-600"
                />

                <Separator />

                <WebsiteStatusRow
                  label="Inactive"
                  count={websiteInactive}
                  icon={CirclePause}
                  color="bg-slate-100 text-slate-500"
                />

                <Separator />

                <div className="flex items-center justify-between py-4">
                  <span className="text-sm font-semibold text-slate-700">
                    Total
                  </span>

                  <span className="text-sm font-bold tabular-nums text-slate-900">
                    {websiteTotal?.toLocaleString("id-ID") ?? "-"}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-2 gap-5">
        <Card className="gap-0 border-slate-200 bg-white py-0 shadow-none">
          <CardHeader className="border-b border-slate-100 px-5 py-5">
            <CardTitle className="text-base">
              Latest Activities
            </CardTitle>

            <p className="mt-1 text-xs font-normal text-slate-500">
              Website management history.
            </p>
          </CardHeader>

          <CardContent className="px-5">
            <EmptyState
              icon={ClipboardList}
              title="No Activity Yet"
              description="Management activities will appear here when activity tracking is available."
            />
          </CardContent>
        </Card>

        <Card className="gap-0 border-slate-200 bg-white py-0 shadow-none">
          <CardHeader className="border-b border-slate-100 px-5 py-5">
            <CardTitle className="text-base">
              Customer Overview
            </CardTitle>

            <p className="mt-1 text-xs font-normal text-slate-500">
              Recently registered customers.
            </p>
          </CardHeader>

          <CardContent className="px-5">
            {customerResult.status === "rejected" ? (
              <EmptyState
                icon={Users}
                title="Unable to Load Customers"
                description="Customer data could not be retrieved."
              />
            ) : customers.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No Customers Yet"
                description="Registered customers will appear here."
              />
            ) : (
              <div className="divide-y divide-slate-100">
                {customers.slice(0, 4).map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {customer.company_name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {customer.contact_name ||
                          customer.email ||
                          "No contact information"}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-slate-500">
                      {customer.websites_count ?? 0} websites
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-slate-100 py-4">
              <a
                href="/clients"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#183d7c] hover:text-[#102c62]"
              >
                Manage Clients
                <ExternalLink size={15} />
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-400">
        <p>© 2026 COMTRONICS.</p>
        <p>Website Management System</p>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc]">
          <p className="text-sm text-slate-500">
            Loading dashboard...
          </p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}