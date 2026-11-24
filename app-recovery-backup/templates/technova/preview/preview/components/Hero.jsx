import { ArrowRight, Play, Users } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[720px] overflow-hidden bg-slate-50 pt-32 sm:min-h-[760px] lg:min-h-[820px]"
    >
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
          alt="Modern glass office building"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/95 to-white/10 lg:via-white/90" />
      <div className="absolute -right-20 top-0 -z-10 h-72 w-72 rounded-full bg-emerald-700/15 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 -z-10 h-80 w-80 rounded-full bg-emerald-700/10 blur-3xl" />
      <div className="mx-auto grid min-h-[590px] max-w-7xl items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-2 lg:px-8 lg:pb-24">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-800/10 bg-emerald-50 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span className="text-xs font-semibold tracking-wide text-emerald-900 sm:text-sm">
              Innovative Technology Solutions
            </span>
          </div>

          <h1 className="text-5xl leading-[1.08] font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Build a Smarter Digital{" "}
            <span className="text-emerald-700">Future</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            We provide cutting-edge technology solutions to help your business
            grow, innovate, and stay ahead in the digital era.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#services"
              className="inline-flex items-center gap-3 rounded-full bg-emerald-950 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              Explore Our Solutions
              <ArrowRight size={17} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-3 px-2 py-3 text-sm font-semibold text-slate-800 transition-colors hover:text-emerald-700"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/80">
                <Play size={14} fill="currentColor" />
              </span>
              Discover TechNova
            </a>
          </div>
        </div>

        <div className="relative hidden min-h-[420px] lg:block">
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-4 rounded-2xl border border-white/80 bg-white/95 px-5 py-4 shadow-xl shadow-slate-900/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
              <Users size={24} />
            </span>

            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-950">
                500+
              </p>
              <p className="text-sm text-slate-500">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1.5 w-full bg-emerald-800" />
    </section>
  );
}