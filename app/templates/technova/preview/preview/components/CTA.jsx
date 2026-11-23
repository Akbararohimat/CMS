import { ArrowUpRight, MoveUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="bg-white px-6 py-20 lg:px-8 lg:py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden bg-emerald-800 px-8 py-14 sm:px-12 lg:px-16 lg:py-20">
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-8 -top-20 h-56 w-56 rounded-full border border-white/10" />

        <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Let's Work Together
            </span>

            <h2 className="mt-5 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Transform Your Digital Future?
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-100/80 sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <a
            href="mailto:hello@technova.com"
            className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-white px-7 py-4 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-100 lg:self-center"
          >
            Get in Touch
            <ArrowUpRight size={18} />
          </a>
        </div>

        <MoveUpRight
          size={100}
          strokeWidth={0.7}
          className="pointer-events-none absolute -bottom-9 right-4 text-white/10"
        />
      </div>
    </section>
  );
}