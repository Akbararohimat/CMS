import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Our Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
  ],
  Solutions: [
    { label: "Software Development", href: "#services" },
    { label: "Cloud Solutions", href: "#services" },
    { label: "IT Consulting", href: "#services" },
    { label: "Contact Us", href: "#contact" },
  ],
};

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-white">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <Link href="#home" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-xl font-bold text-white">
                N
              </span>

              <span className="text-2xl font-bold tracking-tight">
                Tech<span className="text-emerald-400">Nova</span>
              </span>
            </Link>

            <p className="mt-6 text-sm leading-7 text-emerald-100/65">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Integer nec odio. Praesent libero.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-emerald-100 transition-colors hover:border-emerald-400 hover:bg-emerald-800 hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold">{title}</h3>

              <ul className="mt-6 space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-emerald-100/65 transition-colors hover:text-emerald-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-bold">Get in Touch</h3>

            <div className="mt-6 space-y-4 text-sm leading-6 text-emerald-100/65">
              <p>hello@technova.com</p>
              <p>+62 812 3456 7890</p>
              <p>Bandung, Indonesia</p>
            </div>

            <a
              href="mailto:hello@technova.com"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition-colors hover:text-white"
            >
              Send an Email
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-emerald-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TechNova. All rights reserved.</p>

          <p>
            Designed with care by{" "}
            <span className="font-semibold text-emerald-300">
              Comtronics
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}