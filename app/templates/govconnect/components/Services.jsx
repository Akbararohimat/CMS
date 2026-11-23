"use client";

import {
  ArrowUpRight,
  FileText,
  HeartPulse,
  GraduationCap,
  Scale,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

const iconMap = {
  "file-text": FileText,
  "heart-pulse": HeartPulse,
  "graduation-cap": GraduationCap,
  scale: Scale,
  building: Building2,
  briefcase: BriefcaseBusiness,
};

export default function Services({ config = {} }) {
  const services = config.services || {};
  const items = services.items || [];
  const identity = config.identity || {};

  const primaryColor = identity.primaryColor || "#0B3B78";
  const secondaryColor = identity.secondaryColor || "#D9A441";

  if (items.length === 0) return null;

  return (
    <section id="services" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-[2px] w-10"
                style={{ backgroundColor: secondaryColor }}
              />
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: primaryColor }}
              >
                {services.eyebrow || "Layanan Utama"}
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-slate-900 lg:text-[42px]">
              {services.heading || "Layanan Publik untuk Anda"}
            </h2>
          </div>

          {services.description && (
            <p className="max-w-md text-sm leading-7 text-slate-600">
              {services.description}
            </p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || FileText;

            return (
              <a
                key={`${item.title}-${index}`}
                href={item.href || "#"}
                className="group flex min-h-[220px] flex-col border border-slate-200 p-8 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center"
                    style={{
                      backgroundColor: `${primaryColor}10`,
                      color: primaryColor,
                    }}
                  >
                    <Icon size={27} strokeWidth={1.7} />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-slate-300 transition group-hover:text-slate-700"
                  />
                </div>

                <h3 className="mt-7 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                )}

                <span
                  className="mt-auto pt-6 text-xs font-bold"
                  style={{ color: primaryColor }}
                >
                  Selengkapnya
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
