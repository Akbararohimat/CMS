import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-[#F2F6F1] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Client Stories
            </span>

            <h2 className="mt-6 text-4xl leading-tight font-bold tracking-tight text-emerald-950 sm:text-5xl lg:text-6xl">
              What People
              <br />
              <span className="text-emerald-700">Say About Us.</span>
            </h2>

            <p className="mt-6 max-w-sm text-base leading-8 text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-900/20 text-emerald-950">
                <ArrowLeft size={19} />
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950 text-white">
                <ArrowRight size={19} />
              </div>

              <span className="ml-3 text-sm font-semibold text-emerald-950">
                01 <span className="text-emerald-700/50">/ 03</span>
              </span>
            </div>
          </div>
          <article className="relative border border-emerald-900/10 bg-white p-8 sm:p-12 lg:p-14">
            <div className="flex items-center justify-between">
              <Quote
                size={48}
                strokeWidth={1.5}
                className="text-emerald-700"
              />

              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={17} fill="currentColor" />
                ))}
              </div>
            </div>

            <blockquote className="mt-9 text-2xl leading-relaxed font-semibold tracking-tight text-emerald-950 sm:text-3xl">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.”
            </blockquote>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-slate-200 pt-8">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                  alt="Client portrait"
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-emerald-950">
                    Sarah Wijaya
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    CEO, Digital Company
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
                Verified Client
              </span>
            </div>

            <span className="absolute -bottom-5 right-8 text-7xl font-bold text-emerald-50">
              ”
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}