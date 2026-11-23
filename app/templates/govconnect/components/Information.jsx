"use client";

import { ArrowUpRight, FileText, Download, ExternalLink } from "lucide-react";

export default function Information({ config = {} }) {
  const information = config.information || {};
  const items = information.items || [];
  const identity = config.identity || {};

  const primaryColor = identity.primaryColor || "#0B3B78";
  const secondaryColor = identity.secondaryColor || "#D9A441";

  if (items.length === 0) return null;

  return (
    <section
      id="information"
      className="bg-slate-50 py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-[2px] w-10"
                style={{ backgroundColor: secondaryColor }}
              />
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: primaryColor }}
              >
                {information.eyebrow || "Informasi Publik"}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 lg:text-[42px]">
              {information.heading || "Informasi untuk Masyarakat"}
            </h2>
          </div>

          {information.description && (
            <p className="max-w-md text-sm leading-7 text-slate-600">
              {information.description}
            </p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="flex flex-col border border-slate-200 bg-white p-7 transition hover:border-slate-300"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center"
                  style={{
                    backgroundColor: `${primaryColor}10`,
                    color: primaryColor,
                  }}
                >
                  <FileText size={23} strokeWidth={1.7} />
                </div>

                {item.category && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: primaryColor }}
                  >
                    {item.category}
                  </span>
                )}
              </div>

              <h3 className="mt-6 text-lg font-bold leading-7 text-slate-900">
                {item.title}
              </h3>

              {item.description && (
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              )}

              {item.date && (
                <p className="mt-4 text-xs text-slate-400">
                  {item.date}
                </p>
              )}

              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold"
                  style={{ color: primaryColor }}
                >
                  {item.type === "document" ? (
                    <>
                      Unduh Dokumen <Download size={15} />
                    </>
                  ) : (
                    <>
                      Baca Selengkapnya <ExternalLink size={15} />
                    </>
                  )}
                  <ArrowUpRight size={14} />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
