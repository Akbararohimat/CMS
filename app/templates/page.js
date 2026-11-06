"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutTemplate,
  Building2,
  GraduationCap,
  Landmark,
  Search,
  Plus,
  Eye,
  Pencil,
  Globe,
  Layers3,
} from "lucide-react";

const categories = [
  {
    name: "Government",
    description: "Template untuk instansi pemerintahan.",
    icon: Landmark,
  },
  {
    name: "Corporate",
    description: "Template untuk perusahaan dan bisnis.",
    icon: Building2,
  },
  {
    name: "Education",
    description: "Template untuk sekolah dan institusi pendidikan.",
    icon: GraduationCap,
  },
];

const templates = [
  {
    name: "EduPro Academy",
    category: "Education",
    description:
      "Website pendidikan modern untuk sekolah, akademi, dan institusi pendidikan.",
    version: "1.0.0",
    status: "Draft",
    lastUpdated: "Belum dipublikasikan",
    previewUrl: "/preview",
    manageUrl: "/templates/edupro/edit",
    accent: "from-blue-800 to-slate-950",
    logo: "E",
  },
  {
    name: "CorpPro",
    category: "Corporate",
    description:
      "Website profesional untuk perusahaan, konsultan, dan bisnis modern.",
    version: "1.0.0",
    status: "Draft",
    lastUpdated: "Belum dipublikasikan",
    previewUrl: "/templates/corppro/preview",
    manageUrl: "/templates/corppro/edit",
    accent: "from-blue-900 to-slate-950",
    logo: "C",
  },
  {
    name: "TechNova",
    category: "Corporate",
    description:
      "Website modern untuk perusahaan teknologi dan penyedia solusi digital.",
    version: "1.0.0",
    status: "Draft",
    lastUpdated: "Belum dipublikasikan",
    previewUrl: "/templates/technova/preview",
    manageUrl: "/templates/technova/edit",
    accent: "from-emerald-800 to-emerald-950",
    logo: "T",
  },
];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categoryCounts = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      count: templates.filter(
        (template) => template.category === category.name
      ).length,
    }));
  }, []);

  const filteredTemplates = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return templates;

    return templates.filter(
      (template) =>
        template.name.toLowerCase().includes(query) ||
        template.category.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const stats = [
    {
      title: "Total Templates",
      value: templates.length,
      icon: Layers3,
    },
    {
      title: "Government",
      value: templates.filter((item) => item.category === "Government").length,
      icon: Landmark,
    },
    {
      title: "Corporate",
      value: templates.filter((item) => item.category === "Corporate").length,
      icon: Building2,
    },
    {
      title: "Education",
      value: templates.filter((item) => item.category === "Education").length,
      icon: GraduationCap,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F8FC] p-6 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <LayoutTemplate size={16} />
              <span>CMS COMTRONICS</span>
              <span>/</span>
              <span>Templates</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#102C62] md:text-3xl">
              Template Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Kelola template website yang tersedia untuk pelanggan.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#102C62] px-4 py-3 text-sm font-semibold text-white opacity-50"
            title="Fitur tambah template belum tersedia"
          >
            <Plus size={17} />
            Add Template
          </button>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={String(stat.value).padStart(2, "0")}
              icon={stat.icon}
            />
          ))}
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-[#102C62]">
              Template Categories
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Lihat jumlah template berdasarkan kategori.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {categoryCounts.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#102C62]/30"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#102C62]">
                      <Icon size={21} />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {String(category.count).padStart(2, "0")} Templates
                    </span>
                  </div>

                  <h3 className="mt-4 font-bold text-slate-800">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
        <section className="space-y-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-[#102C62]">
                All Templates
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Daftar seluruh template website yang tersedia.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search template..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#102C62]"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => {
                const CategoryIcon =
                  categories.find(
                    (category) => category.name === template.category
                  )?.icon || LayoutTemplate;

                return (
                  <div
                    key={template.name}
                    className="grid grid-cols-1 gap-5 border-b border-slate-100 p-5 last:border-b-0 lg:grid-cols-[240px_1fr_auto] lg:items-center"
                  >
                    <div
                      className={`flex h-40 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${template.accent} p-5`}
                    >
                      <div className="w-full max-w-[190px] rounded-lg bg-white p-3 shadow-lg">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                          <div
                            className={`flex size-6 items-center justify-center rounded text-xs font-bold text-white bg-gradient-to-br ${template.accent}`}
                          >
                            {template.logo}
                          </div>
                          <div className="h-2 w-20 rounded bg-slate-200" />
                        </div>

                        <div className="mt-3 space-y-2">
                          <div
                            className={`h-3 w-3/4 rounded bg-gradient-to-r ${template.accent}`}
                          />
                          <div className="h-2 w-full rounded bg-slate-100" />
                          <div className="h-2 w-4/5 rounded bg-slate-100" />
                        </div>

                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="h-8 rounded bg-slate-100" />
                          <div className="h-8 rounded bg-slate-100" />
                          <div className="h-8 rounded bg-slate-100" />
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-800">
                          {template.name}
                        </h3>

                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                          {template.status}
                        </span>
                      </div>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                        {template.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <CategoryIcon size={14} />
                          {template.category}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Layers3 size={14} />
                          Version {template.version}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Globe size={14} />
                          {template.lastUpdated}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                      <Link
                        href={template.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        <Eye size={14} />
                        Preview
                      </Link>

                      <Link
                        href={template.manageUrl}
                        className="flex items-center gap-2 rounded-lg bg-[#102C62] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#193D7D]"
                      >
                        <Pencil size={14} />
                        Manage
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-5 py-12 text-center">
                <Search className="mx-auto text-slate-300" size={28} />
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Template tidak ditemukan
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Coba gunakan nama atau kategori template lainnya.
                </p>
              </div>
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
        <p className="text-sm font-medium text-slate-500">{title}</p>

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
