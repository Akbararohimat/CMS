"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  GraduationCap,
  ImagePlus,
  Palette,
  Globe,
  Plus,
  Trash2,
} from "lucide-react";

import {
  getSiteConfig,
  saveSiteConfig,
} from "../../../../lib/site-config";

export default function EduProEditorPage() {
  const [config, setConfig] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8FC]">
        Loading editor...
      </div>
    );
  }

  function updateConfig(field, value) {
    setConfig((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateHeader(field, value) {
    setConfig((current) => ({
      ...current,
      header: {
        ...current.header,
        [field]: value,
      },
    }));
  }

  function updateNavigation(index, field, value) {
    setConfig((current) => ({
      ...current,
      navigation: current.navigation.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  }

  function addNavigation() {
    setConfig((current) => ({
      ...current,
      navigation: [
        ...current.navigation,
        {
          label: "New Menu",
          href: "/preview",
        },
      ],
    }));
  }

  function removeNavigation(index) {
    setConfig((current) => ({
      ...current,
      navigation: current.navigation.filter((_, i) => i !== index),
    }));
  }

  function handleSave() {
    setSaving(true);

    try {
      saveSiteConfig(config);
      window.alert("Konfigurasi website berhasil disimpan.");
    } catch {
      window.alert("Gagal menyimpan konfigurasi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] p-5 lg:p-9">
      <div className="mx-auto max-w-6xl space-y-7">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/templates"
              className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-blue-700"
            >
              <ArrowLeft size={16} />
              Back to Templates
            </Link>

            <h1 className="text-2xl font-bold text-slate-900">
              EduPro Website Editor
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your website identity and appearance.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/preview"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Eye size={17} />
              Preview
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#102C62] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#193D7D] disabled:opacity-60"
            >
              <Save size={17} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* WEBSITE INFORMATION */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
              <Globe size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Website Information
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Configure your website identity.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Website Name
              </label>

              <input
                value={config.siteName}
                onChange={(e) =>
                  updateConfig("siteName", e.target.value)
                }
                placeholder="Enter website name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Logo URL
              </label>

              <input
                value={config.logo || ""}
                onChange={(e) =>
                  updateConfig("logo", e.target.value)
                }
                placeholder="https://example.com/logo.png"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
            </div>
          </div>

          {config.logo && (
            <div className="mt-5 flex items-center gap-4 rounded-xl bg-slate-50 p-4">
              <img
                src={config.logo}
                alt="Website logo preview"
                className="h-14 w-14 rounded-lg border border-slate-200 bg-white object-contain p-2"
              />
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Logo Preview
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Preview of your website logo.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* HEADER APPEARANCE */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 p-3 text-purple-700">
              <Palette size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Header Appearance
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Customize your website header colors.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Header Background Color
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={config.header.backgroundColor}
                  onChange={(e) =>
                    updateHeader("backgroundColor", e.target.value)
                  }
                  className="h-12 w-16 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
                />

                <input
                  value={config.header.backgroundColor}
                  onChange={(e) =>
                    updateHeader("backgroundColor", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Header Text Color
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={config.header.textColor}
                  onChange={(e) =>
                    updateHeader("textColor", e.target.value)
                  }
                  className="h-12 w-16 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
                />

                <input
                  value={config.header.textColor}
                  onChange={(e) =>
                    updateHeader("textColor", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* HEADER LIVE PREVIEW */}
          <div className="mt-7">
            <p className="mb-3 text-sm font-medium text-slate-700">
              Header Preview
            </p>

            <div
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl px-6 py-5"
              style={{
                backgroundColor: config.header.backgroundColor,
                color: config.header.textColor,
              }}
            >
              <div className="flex items-center gap-3">
                {config.logo ? (
                  <img
                    src={config.logo}
                    alt="Logo"
                    className="h-9 w-9 object-contain"
                  />
                ) : (
                  <GraduationCap size={28} />
                )}

                <span className="font-bold">
                  {config.siteName || "Website Name"}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-xs">
                {config.navigation.map((item, index) => (
                  <span key={index}>{item.label}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NAVIGATION */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                <MenuIcon />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Navigation Menu
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Manage the links displayed in your website header.
                </p>
              </div>
            </div>

            <button
              onClick={addNavigation}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              <Plus size={15} />
              Add Menu
            </button>
          </div>

          <div className="space-y-4">
            {config.navigation.map((item, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-[1fr_1.5fr_auto] md:items-end"
              >
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Menu Label
                  </label>

                  <input
                    value={item.label}
                    onChange={(e) =>
                      updateNavigation(index, "label", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Menu Link
                  </label>

                  <input
                    value={item.href}
                    onChange={(e) =>
                      updateNavigation(index, "href", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={() => removeNavigation(index)}
                  aria-label="Remove menu"
                  className="flex h-10 items-center justify-center rounded-lg px-3 text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM SAVE */}
        <div className="flex justify-end gap-3 pb-8">
          <Link
            href="/templates"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#102C62] px-5 py-3 text-sm font-semibold text-white hover:bg-[#193D7D] disabled:opacity-60"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}

function MenuIcon() {
  return <ImagePlus size={21} />;
}
