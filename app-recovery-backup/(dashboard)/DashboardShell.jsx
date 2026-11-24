"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  PanelsTopLeft,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Website",
    href: "/websites",
    icon: Globe,
  },
  {
    label: "Template",
    href: "/templates",
    icon: PanelsTopLeft,
  },
  {
    label: "Client",
    href: "/clients",
    icon: Users,
  },
];

function getPageTitle(pathname) {
  if (pathname === "/") return "Dashboard";

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  const titles = {
    websites: "Website",
    templates: "Template",
    clients: "Client",
    settings: "Settings",
  };

  return titles[firstSegment] || "Workspace";
}

function isNavigationActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DashboardShell({ children, user }) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  const userInitial =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || "A";

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="flex w-[250px] shrink-0 flex-col border-r border-slate-200 bg-white">
          <Link
            href="/"
            className="flex h-[76px] items-center gap-3 px-6"
          >
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
          </Link>

          <Separator />

          <div className="px-4 pt-7">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Workspace
            </p>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isNavigationActive(
                  pathname,
                  item.href
                );

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-[#102c62] font-medium text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-8 px-4">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Preferences
            </p>

            <Link
              href="/settings"
              aria-current={
                pathname.startsWith("/settings") ? "page" : undefined
              }
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                pathname.startsWith("/settings")
                  ? "bg-[#102c62] font-medium text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Settings size={18} />
              Settings
            </Link>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#102c62]">
                  <Globe size={16} />
                </div>

                <p className="text-sm font-semibold">
                  CMS COMTRONICS
                </p>
              </div>

              <p className="text-xs leading-5 text-slate-500">
                Manage client websites in one place
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-8">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Workspace</span>
                <ChevronRight size={13} />
                <span className="font-medium text-slate-700">
                  {pageTitle}
                </span>
              </div>

              <h1 className="mt-1 text-lg font-bold tracking-tight">
                {pageTitle}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Separator orientation="vertical" className="h-8" />

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {user?.name || "Administrator"}
                  </p>

                  <p className="text-xs text-slate-500">
                    {user?.email || ""}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7edf9] text-sm font-bold text-[#102c62]">
                  {userInitial}
                </div>
              </div>
            </div>
          </header>

          <div className="min-h-[calc(100vh-76px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
