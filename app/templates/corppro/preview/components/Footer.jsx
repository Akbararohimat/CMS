import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const socialIcons = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  YouTube: FaYoutube,
  X: FaXTwitter,
};

export default function Footer({ config }) {
  const footer = config?.footer ?? {};
  const siteName = config?.siteName || "CorpPro";
  const logo = config?.logo;

  const quickLinks = footer.quickLinks ?? [];
  const resources = footer.resources ?? [];
  const socials = footer.socials ?? [];

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="#home"
              className="inline-flex items-center text-2xl font-bold tracking-tight"
            >
              {logo ? (
                <img
                  src={logo}
                  alt={siteName}
                  className="max-h-12 max-w-40 object-contain"
                />
              ) : (
                siteName
              )}
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              {footer.description}
            </p>

            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map((social, index) => {
                  const Icon = socialIcons[social.label];

                  if (!Icon) return null;

                  return (
                    <a
                      key={`${social.label}-${index}`}
                      href={social.href || "#contact"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center border border-slate-700 text-slate-300 transition-colors hover:border-blue-500 hover:text-blue-400"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold">Quick Links</h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link, index) => (
                <li key={`${link.label}-${index}`}>
                  <a
                    href={link.href || "#"}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold">Resources</h3>

            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              {resources.map((resource, index) => (
                <li key={`${resource.label}-${index}`}>
                  <a
                    href={resource.href || "#"}
                    className="transition-colors hover:text-white"
                  >
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold">Contact Us</h3>

            <p className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-400">
              {footer.address}
            </p>

            {footer.email && (
              <a
                href={`mailto:${footer.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                {footer.email}
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-slate-800 pt-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>

          <p>
            Made with care by{" "}
            <span className="font-semibold text-slate-300">
              {footer.credit}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}