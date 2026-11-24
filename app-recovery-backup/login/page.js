"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PanelsTopLeft,
  Eye,
  EyeOff,
  ArrowRight,
  Globe,
  LockKeyhole,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Login gagal. Periksa kembali akun Anda.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* Branding Panel */}
      <section className="relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-[#102c62] px-7 py-8 text-white sm:px-12 sm:py-10 lg:min-h-screen lg:px-16 lg:py-14">
        {/* Decorative Geometry */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rotate-45 border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-1/3 h-56 w-56 rotate-45 border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10"
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#102c62]">
            <PanelsTopLeft size={23} />
          </div>

          <div>
            <p className="text-base font-bold tracking-[0.12em]">
              COMTRONICS
            </p>
            <p className="text-xs text-blue-200">
              Website Management
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-12 max-w-lg lg:mt-0">
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            <span className="h-px w-8 bg-blue-200" />
            Website Management System
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Manage your websites
            <br />
            in one workspace.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-blue-100/80 sm:text-base">
            A centralized workspace to manage client websites,
            templates, and website content efficiently.
          </p>
        </div>

        <div className="relative z-10 mt-12 flex items-center justify-between border-t border-white/15 pt-6 text-xs text-blue-200 lg:mt-0">
          <span>© 2026 COMTRONICS</span>
          <span>Internal Management System</span>
        </div>
      </section>

      {/* Login Form */}
      <section className="flex min-h-[560px] items-center justify-center px-6 py-14 sm:px-12 lg:min-h-screen">
        <div className="w-full max-w-md">
          <div className="mb-9">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf2fb] text-[#102c62] lg:hidden">
              <LockKeyhole size={22} />
            </div>

            <p className="text-sm font-semibold text-[#183d7c]">
              Welcome Back
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Sign in to your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your account details to access the CMS workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Globe
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={loading}
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#183d7c] focus:ring-2 focus:ring-[#183d7c]/10 disabled:bg-slate-50"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={loading}
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#183d7c] focus:ring-2 focus:ring-[#183d7c]/10 disabled:bg-slate-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183d7c]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#102c62] px-4 text-sm font-semibold text-white transition hover:bg-[#183d7c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102c62] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="mt-8 text-center text-xs leading-5 text-slate-400">
            Authorized personnel only. Contact your administrator
            if you need account access.
          </p>
        </div>
      </section>
    </main>
  );
}
