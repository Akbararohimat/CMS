import {
  LayoutDashboard,
  Globe,
  PanelsTopLeft,
  Users,
  Images,
  Settings,
  Bell,
  Plus,
  ArrowRight,
  ExternalLink,
  MoreHorizontal,
  FileText,
  Clock3,
  CheckCircle2,
  CircleDashed,
  GraduationCap,
  Building2,
  Landmark,
  ClipboardList,
  Search,
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
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Website", icon: Globe },
  { label: "Template", icon: PanelsTopLeft },
  { label: "Client", icon: Users },
];
const statistics = [
  {
    label: "Website Total",
    icon: Globe,
  },
  {
    label: "Active Website",
    icon: CheckCircle2,
  },
  {
    label: "Template Total",
    icon: PanelsTopLeft,
  },
  {
    label: "Client",
    icon: Users,
  },
];
const templateCategories = [
  {
    name: "Goverment",
    description: "Goverment agency and Public service Websites.",
    icon: Landmark,
    color: "bg-blue-50 text-blue-700",
  },
  {
    name: "Corporate",
    description: "Websites for Companies,Bussines,and Organizations. ",
    icon: Building2,
    color: "bg-violet-50 text-violet-700",
  },
  {
    name: "Education",
    description: "Websites for Schools and Educational institutions.",
    icon: GraduationCap,
    color: "bg-emerald-50 text-emerald-700",
  },
];

function EmptyState({
  icon: Icon,
  title,
  description,
}) {
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

export default function DashboardPage() {
  return (
    <div className="min--screen bg-[#f6f8fc] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-[250px] shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
          <div className="flex h-[76px] items-center gap-3 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102c62] text-white">
              <PanelsTopLeft size={21} />
            </div>

            <div>
              <p className="text-base font-bold tracking-tight">
                COMTRONICS
              </p>
              <p className="text-xs text-slate-500">
                Website Management
              </p>
            </div>
          </div>

          <Separator />

          <div className="px-4 pt-7">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Workspace
            </p>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href="#"
                    aria-current={item.active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                      item.active
                      ? "bg-[#102c62] font-medium text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="mt-8 px-4">
            <p className="mb-3 px-3 text-[10px] font-bold uppercasse tracking-[0.18em] text-slate-400">
              Preferences
            </p>

            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100">
                <Settings size={18} />
                Settings
              </a>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#102c62] shadow-sm">
                  <Globe size={16} />
                </div>

                <p className="text-sm font-smibold">
                  CMS COMTRONICS
                </p>
              </div>

              <p className="text-xs leading-5 text-slate-500">
                Manage Client Websites in one place
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur md:px-8">
          <div>
            <p className="text-xs text-slate-500">
              Workspace / Overview
            </p>

            <h1 className="mt-1 text-lg font-bold tracking-tight">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              className= "relative border-slate-200"
              aria-label="Notifikasi"
            >
              <Bell size={17} />
            </Button>

            <Separator
              orientation="vertical"
              className="hidden h-8 sm:block"
            />

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">
                  Administrator
                </p>

                <p className="text-xs text-slate-500">
                  Admin CMS
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7edf9] text-sm font-bold text-[#102c62]">
                A
              </div>
            </div>
          </div>
      </header>
      
      <div className="mx-auto max-w[1500px] space-y-8 p-5 md:p-8">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Badge
              variant="outline"
              className="mb-3 border-blue-200 bg-blue-50 texxt-blue-700">
                Management Overview
              </Badge>

              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Dashboard Overview
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Manage All Client Webistes and Template Comtronics.
              </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="gap-4 border-slate-200 bg-white py-5 shadow-none">
                  <CardContent className="px-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-500">
                          {stat.label}
                        </p>

                        <p className="mt-3 text-3xl font-bold tracking-tight text-slate-400">
                          -
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2fb] text-[#183d7c]">
                        <Icon size={19} />
                      </div>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                      Data Not yet Available
                    </p>
                  </CardContent>
                </Card>
            );
          })}
        </section>
        
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-bold tracking-tight">
                Template Categories
              </h3>
              <p className="mt-1 tex-sm text-slate-500">
                Manage Template colletions by Categories.
              </p>
            </div>

            <Button
              variant="ghost"
              className="gap-2 text-sm text-[#183d7c]"
            >
              All Templates
              <ArrowRight size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {templateCategories.map((category) => {
              const Icon = category.icon;

              return (
                <Card
                  key={category.name}
                  className="gap-4 border-slate-200 bg-white py-5 shadow-none transition hover:-translate-y-0.5 hover:shadow-md">
                    <CardContent className="px-5">
                      <div className="flex items-start justify-between">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${category.color}`}>
                          <Icon size={21} />
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Menu ${category.name}`}>
                            <MoreHorizontal size={19} />
                          </Button>
                      </div>

                      <h4 className="mt-5 font-semibold">
                        {category.name}
                      </h4>

                      <p className="mt-1 min-h-10 text-sm leading-5 text-slate-500">
                        {category.description}
                      </p>

                      <div className="mt-4 flex items-center justify-end border-t border-slate-100 pt-4">
                        <ArrowRight
                          size={17}
                          className="text-slate-400"
                        />
                      </div>
                    </CardContent>
                  </Card>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
          <Card className="gap-0 border-slate-200 bg-white py-0 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-5 py-5">
              <div>
                <CardTitle className="text-base">
                  Latest Activites
                </CardTitle>

                <p className="mt-1 text-xs font-normal text-slate-500">
                  Website Management History.
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Activity Menu">
                  <MoreHorizontal size={19} />
                </Button>
            </CardHeader>

            <CardContent className="px-5">
              <EmptyState
                icon={ClipboardList}
                title="No Activity Yet"
                description="Website Management activities will appear here."
              />
            </CardContent>
          </Card>

          <Card className="gap-0 border-slate-200 bg-white py-0 shadow-none">
            <CardHeader className="border-b border-slate-100 px-5 py-5">
              <CardTitle className="text-base">
                Website Status
              </CardTitle>

              <p className="mt-1 text-xs font-normal text-slate-500">
                Summary of Website Publication Status.
              </p>
            </CardHeader>

            <CardContent className="px-5">
              <EmptyState
                icon={Globe}
                title="No Website Yet"
                description="The Client website status will be displayed once the data becomes available."
              />
            </CardContent>
          </Card>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
             © 2026 COMTRONICS.
          </p>

          <p>
            Website Management System
          </p>
        </footer>
      </div>
    </main>
      </div>
    </div>
  )
}