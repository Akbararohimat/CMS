import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const highlights = [
  "Innovative Digital Solutions",
  "Experienced Technology Team",
  "Reliable Business Partnership",
];

export default function About() {
  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-2xl bg-emerald-100 sm:-left-6 sm:-top-6" />

          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
              alt="Modern technology company office workspace"
              className="h-[380px] w-full object-cover sm:h-[480px]"
            />
          </div>

          <div className="absolute -bottom-7 right-5 rounded-xl bg-emerald-950 px-6 py-5 text-white shadow-lg sm:right-8">
            <p className="text-3xl font-bold">10+</p>
            <p className="mt-1 text-sm text-emerald-100">
              Years of Innovation
            </p>
          </div>
        </div>

        <div className="pt-5 lg:pt-0">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            About TechNova
          </span>

          <h2 className="mt-5 text-3xl leading-tight font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Empowering Businesses Through{" "}
            <span className="text-emerald-700">Technology</span>
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <ul className="mt-7 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className="shrink-0 text-emerald-700"
                />
                <span className="text-sm font-semibold text-slate-800">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#services"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-emerald-950 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
          >
            Discover More
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}