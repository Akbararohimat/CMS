"use client";

import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";

export default function Footer({ config = {} }) {
  const footer = config.footer || {};
  const identity = config.identity || {};
  const primaryColor = identity.primaryColor || "#0B3B78";
  const secondaryColor = identity.secondaryColor || "#D9A441";

  return (
    <footer id="contact" style={{ backgroundColor: primaryColor }}>
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              {config.logo ? (
                <img
                  src={config.logo}
                  alt={config.siteName || "Logo instansi"}
                  className="h-12 w-12 object-contain"
                />
              ) : (
                <div
                  className="flex h-12 w-12 items-center justify-center text-xl font-bold text-white"
                  style={{ backgroundColor: "rgba(255,255,255,0.14)" }}
                >
                  {config.siteName?.charAt(0) || "G"}
                </div>
              )}

              <div>
                <h2 className="text-lg font-bold text-white">
                  {config.siteName || "Nama Instansi"}
                </h2>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/60">
                  {identity.tagline || "Melayani untuk Negeri"}
                </p>
              </div>
            </div>

            {footer.description && (
              <p className="mt-7 max-w-sm text-sm leading-7 text-white/70">
                {footer.description}
              </p>
            )}

            <div className="mt-7 space-y-4">
              {footer.address && (
                <p className="flex items-start gap-3 text-sm leading-6 text-white/75">
                  <MapPin size={17} className="mt-1 shrink-0" />
                  {footer.address}
                </p>
              )}

              {footer.email && (
                <a
                  href={`mailto:${footer.email}`}
                  className="flex items-center gap-3 text-sm text-white/75 hover:text-white"
                >
                  <Mail size={17} />
                  {footer.email}
                </a>
              )}

              {footer.phone && (
                <a
                  href={`tel:${footer.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/75 hover:text-white"
                >
                  <Phone size={17} />
                  {footer.phone}
                </a>
              )}
            </div>
          </div>

          {footer.linkGroups?.map((group, index) => (
            <div key={`${group.title}-${index}`}>
              <h3
                className="mb-7 text-sm font-bold text-white"
                style={{ borderBottom: `2px solid ${secondaryColor}`, paddingBottom: "14px" }}
              >
                {group.title}
              </h3>

              <ul className="space-y-4">
                {(group.links || []).map((link, linkIndex) => (
                  <li key={`${link.label}-${linkIndex}`}>
                    <a
                      href={link.href || "#"}
                      className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-6 text-white/60">
            {footer.copyright || ""}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            {(footer.socialLinks || []).map((social, index) => (
              social.href ? (
                <a
                  key={`${social.label}-${index}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-white/70 transition hover:text-white"
                >
                  {social.label}
                </a>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
