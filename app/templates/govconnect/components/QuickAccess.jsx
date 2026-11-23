"use client";

import {
  Users,
  FileText,
  Megaphone,
  CalendarDays,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const iconMap = {
  users: Users,
  "file-text": FileText,
  megaphone: Megaphone,
  "calendar-days": CalendarDays,
  "shield-check": ShieldCheck,
};

export default function QuickAccess({ config = {} }) {
  const quickAccess = config.quickAccess || {};
  const items = quickAccess.items || [];
  const primaryColor = config.identity?.primaryColor || "#0B3B78";

  if (quickAccess.enabled === false || items.length === 0) {
    return null;
  }

  return (
    <section className="relative z-10 mx-auto -mt-10 max-w-[1440px] px-6 lg:px-12">
      <div className="grid grid-cols-2 border border-slate-200 bg-white shadow-lg md:grid-cols-3 xl:grid-cols-5">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon] || FileText;

          return (
            <a
              key={`${item.label}-${index}`}
              href={item.href || "#"}
              className="group flex min-h-[145px] items-center gap-4 border-b border-r border-slate-200 px-5 py-6 transition hover:bg-slate-50 lg:px-7"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center transition group-hover:bg-blue-100"
                style={{
                  backgroundColor: `${primaryColor}12`,
                  color: primaryColor,
                }}
              >
                <Icon size={23} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-6 text-slate-800">
                  {item.label}
                </p>
                <span className="mt-2 inline-flex items-center text-xs font-semibold text-slate-500 transition group-hover:text-blue-800">
                  Akses Sekarang
                  <ArrowUpRight size={13} className="ml-1" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
