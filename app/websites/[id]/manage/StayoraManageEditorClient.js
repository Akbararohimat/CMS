"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Eye,
  Palette,
  Menu,
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  BedDouble,
  Sparkles,
  Utensils,
  Waves,
  Tag,
  Images,
  MapPin,
  Mail,
  PanelBottom,
  ChevronUp,
  ChevronDown,
  Plus,
  Trash2,
  LoaderCircle,
  AlertCircle,
  Check,
} from "lucide-react";

import WebsiteMediaPicker from "./WebsiteMediaPicker";
import StayoraRenderer from "../../../templates/stayora/components/StayoraRenderer";

const sectionDefinitions = [
  { id: "header", label: "Header", icon: Menu },
  { id: "hero", label: "Hero", icon: LayoutDashboard },
  { id: "booking", label: "Booking", icon: CalendarDays },
  { id: "story", label: "Our Story", icon: BookOpen },
  { id: "rooms", label: "Rooms", icon: BedDouble },
  { id: "experiences", label: "Experiences", icon: Sparkles },
  { id: "dining", label: "Dining", icon: Utensils },
  { id: "amenities", label: "Amenities", icon: Waves },
  { id: "offers", label: "Offers", icon: Tag },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "location", label: "Location", icon: MapPin },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "footer", label: "Footer", icon: PanelBottom },
];

const defaultSectionSettings = sectionDefinitions.map((section, index) => ({
  ...section,
  visible: true,
  order: index,
}));

const arrayTemplates = {
  "header.navigation": { label: "", href: "#" },
  "rooms.items": {
    name: "",
    category: "",
    description: "",
    image: "",
    size: "",
    capacity: "",
    href: "#contact",
  },
  "experiences.items": {
    number: "",
    title: "",
    description: "",
    image: "",
    href: "#contact",
  },
  "amenities.items": {
    number: "",
    title: "",
    description: "",
  },
  "offers.items": {
    label: "",
    title: "",
    description: "",
    image: "",
    buttonText: "",
    href: "#contact",
  },
  "gallery.items": {
    image: "",
    alt: "",
  },
  "footer.linkGroups": {
    title: "",
    links: [],
  },
  "footer.linkGroups.links": {
    label: "",
    href: "#contact",
  },
};

function titleCase(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeSectionSettings(savedSections) {
  if (!Array.isArray(savedSections)) {
    return defaultSectionSettings.map((item) => ({ ...item }));
  }

  return defaultSectionSettings
    .map((definition) => {
      const saved = savedSections.find(
        (item) => item.id === definition.id
      );

      return {
        ...definition,
        label: saved?.label || definition.label,
        visible: saved?.visible !== false,
        order:
          typeof saved?.order === "number"
            ? saved.order
            : definition.order,
      };
    })
    .sort((a, b) => a.order - b.order)
    .map((item, index) => ({ ...item, order: index }));
}

function normalizePreviewValue(value) {
  if (Array.isArray(value)) {
    return value.map(normalizePreviewValue);
  }

  if (value && typeof value === "object") {
    if (typeof value.url === "string") {
      return value.url;
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        normalizePreviewValue(child),
      ])
    );
  }

  return value;
}

function updateAtPath(source, path, value) {
  if (path.length === 0) return value;

  const [key, ...remaining] = path;

  if (Array.isArray(source)) {
    const next = [...source];
    next[Number(key)] = updateAtPath(
      next[Number(key)],
      remaining,
      value
    );
    return next;
  }

  return {
    ...(source || {}),
    [key]: updateAtPath(source?.[key], remaining, value),
  };
}

function getArrayTemplate(path, currentItems) {
  const key = path
    .filter((part) => typeof part !== "number")
    .join(".");

  const template = arrayTemplates[key];

  if (template) {
    return structuredClone(template);
  }

  if (currentItems?.length > 0) {
    return structuredClone(currentItems[0]);
  }

  return { label: "", href: "" };
}

function FieldEditor({
  label,
  fieldKey,
  value,
  path,
  websiteId,
  onChange,
}) {
  const isMedia =
    fieldKey === "image" ||
    fieldKey === "backgroundImage" ||
    fieldKey === "logo";

  const inputClass =
    "w-full rounded-none border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-slate-500";

  if (isMedia) {
    return (
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-600">
          {label}
        </label>
        <WebsiteMediaPicker
          websiteId={websiteId}
          label={label}
          value={value ?? ""}
          onChange={onChange}
          collection="stayora"
        />
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex cursor-pointer items-center gap-3 py-1 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
          className="size-4 accent-slate-800"
        />
        {label}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-600">
          {label}
        </label>
        <input
          type="number"
          value={value}
          onChange={(event) =>
            onChange(event.target.value === "" ? 0 : Number(event.target.value))
          }
          className={inputClass}
        />
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="space-y-3 border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between gap-3">
          <label className="text-xs font-semibold text-slate-700">
            {label} ({value.length})
          </label>

          <button
            type="button"
            onClick={() =>
              onChange([
                ...value,
                getArrayTemplate(path, value),
              ])
            }
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-black"
          >
            <Plus size={14} />
            Add Item
          </button>
        </div>

        {value.length === 0 && (
          <p className="border border-dashed border-slate-300 px-4 py-6 text-center text-xs text-slate-400">
            Belum ada item. Klik Add Item untuk menambahkan.
          </p>
        )}

        {value.map((item, index) => (
          <div
            key={`${path.join(".")}-${index}`}
            className="border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-600">
                Item {index + 1}
              </p>

              <button
                type="button"
                onClick={() =>
                  onChange(value.filter((_, itemIndex) => itemIndex !== index))
                }
                className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700"
              >
                <Trash2 size={13} />
                Remove
              </button>
            </div>

            <FieldEditor
              label={`Item ${index + 1}`}
              fieldKey={String(index)}
              value={item}
              path={[...path, index]}
              websiteId={websiteId}
              onChange={(nextValue) => {
                const next = [...value];
                next[index] = nextValue;
                onChange(next);
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="space-y-4 border-t border-slate-200 pt-4">
        <p className="text-xs font-semibold text-slate-700">{label}</p>

        <div className="space-y-4">
          {Object.entries(value).map(([key, child]) => (
            <FieldEditor
              key={key}
              label={titleCase(key)}
              fieldKey={key}
              value={child}
              path={[...path, key]}
              websiteId={websiteId}
              onChange={(nextValue) =>
                onChange({
                  ...value,
                  [key]: nextValue,
                })
              }
            />
          ))}
        </div>
      </div>
    );
  }

  const textValue = value ?? "";
  const isLongText =
    typeof textValue === "string" &&
    (textValue.length > 100 ||
      /description|note|tagline|copyright/i.test(fieldKey));

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-slate-600">
        {label}
      </label>

      {isLongText ? (
        <textarea
          rows={4}
          value={textValue}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} resize-y leading-6`}
        />
      ) : (
        <input
          type="text"
          value={textValue}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        />
      )}
    </div>
  );
}

export default function StayoraManageEditorClient() {
  const params = useParams();
  const websiteId = params.id;

  const [website, setWebsite] = useState(null);
  const [config, setConfig] = useState(null);
  const [version, setVersion] = useState(null);
  const [sectionSettings, setSectionSettings] = useState(
    defaultSectionSettings
  );
  const [activeSection, setActiveSection] = useState("hero");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!websiteId) return;

    let cancelled = false;

    async function loadEditor() {
      setLoading(true);
      setError("");

      try {
        const [websiteResponse, configResponse] = await Promise.all([
          fetch(`/api/websites/${encodeURIComponent(websiteId)}`, {
            cache: "no-store",
          }),
          fetch(`/api/websites/${encodeURIComponent(websiteId)}/config`, {
            cache: "no-store",
          }),
        ]);

        const websiteResult = await websiteResponse.json();
        const configResult = await configResponse.json();

        if (!websiteResponse.ok) {
          throw new Error(
            websiteResult.message || "Gagal mengambil data website."
          );
        }

        if (!configResponse.ok) {
          throw new Error(
            configResult.message || "Gagal mengambil konfigurasi website."
          );
        }

        const websiteData = websiteResult.data;
        const configData = configResult.data;

        if (!configData?.config) {
          throw new Error("Konfigurasi Stayora tidak ditemukan.");
        }

        if (websiteData?.template?.slug !== "stayora") {
          throw new Error("Website ini tidak menggunakan template Stayora.");
        }

        if (!cancelled) {
          setWebsite(websiteData);
          setConfig(configData.config);
          setVersion(configData.version ?? null);
          setSectionSettings(
            normalizeSectionSettings(configData.config.editorSections)
          );
          setSaved(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Gagal memuat editor Stayora.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEditor();

    return () => {
      cancelled = true;
    };
  }, [websiteId]);

  const previewConfig = useMemo(() => {
    if (!config) return null;
    return normalizePreviewValue(config);
  }, [config]);

  const handleConfigChange = useCallback((path, value) => {
    setConfig((current) => updateAtPath(current, path, value));
    setSaved(false);
  }, []);

  const handleSectionSettingsChange = useCallback((nextSettings) => {
    setSectionSettings(
      nextSettings.map((item, index) => ({
        ...item,
        order: index,
      }))
    );
    setSaved(false);
  }, []);

  const handleSave = async () => {
    if (!config || !websiteId || saving) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        `/api/websites/${encodeURIComponent(websiteId)}/config`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            config: {
              ...config,
              editorSections: sectionSettings,
            },
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal menyimpan konfigurasi Stayora."
        );
      }

      setVersion(result.data?.version ?? version);
      setSaved(true);
    } catch (err) {
      console.error("Stayora config save error:", err);
      setError(err.message || "Gagal menyimpan konfigurasi Stayora.");
    } finally {
      setSaving(false);
    }
  };

  const moveSection = (index, direction) => {
    const next = [...sectionSettings];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= next.length) return;

    [next[index], next[targetIndex]] = [
      next[targetIndex],
      next[index],
    ];

    handleSectionSettingsChange(next);
  };

  const activeDefinition = sectionDefinitions.find(
    (item) => item.id === activeSection
  );

  const activeSettings = sectionSettings.find(
    (item) => item.id === activeSection
  );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle size={17} className="animate-spin" />
          Memuat editor Stayora...
        </div>
      </main>
    );
  }

  if (error && !config) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md border border-slate-200 bg-white p-7">
          <AlertCircle className="mx-auto mb-3 text-red-500" size={25} />
          <p className="text-center text-sm text-slate-700">{error}</p>
          <Link
            href="/websites"
            className="mt-5 block text-center text-sm font-medium text-slate-700 underline"
          >
            Kembali ke Websites
          </Link>
        </div>
      </main>
    );
  }

  if (!config) return null;

  const renderSectionFields = () => {
    if (activeSection === "theme") {
      return (
        <FieldEditor
          label="Theme"
          fieldKey="theme"
          value={config.theme || {}}
          path={["theme"]}
          websiteId={websiteId}
          onChange={(value) => handleConfigChange(["theme"], value)}
        />
      );
    }

    if (activeSection === "header") {
      return (
        <div className="space-y-6">
          <FieldEditor
            label="Site Name"
            fieldKey="siteName"
            value={config.siteName}
            path={["siteName"]}
            websiteId={websiteId}
            onChange={(value) => handleConfigChange(["siteName"], value)}
          />

          <FieldEditor
            label="Logo"
            fieldKey="logo"
            value={config.logo}
            path={["logo"]}
            websiteId={websiteId}
            onChange={(value) => handleConfigChange(["logo"], value)}
          />

          <FieldEditor
            label="Announcement Bar"
            fieldKey="announcement"
            value={config.announcement}
            path={["announcement"]}
            websiteId={websiteId}
            onChange={(value) =>
              handleConfigChange(["announcement"], value)
            }
          />

          <FieldEditor
            label="Header"
            fieldKey="header"
            value={config.header}
            path={["header"]}
            websiteId={websiteId}
            onChange={(value) => handleConfigChange(["header"], value)}
          />
        </div>
      );
    }

    return (
      <FieldEditor
        label={activeDefinition?.label || "Section"}
        fieldKey={activeSection}
        value={config[activeSection]}
        path={[activeSection]}
        websiteId={websiteId}
        onChange={(value) =>
          handleConfigChange([activeSection], value)
        }
      />
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/websites"
            className="flex size-9 shrink-0 items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Kembali ke websites"
          >
            <ArrowLeft size={17} />
          </Link>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {website?.name || "Stayora Editor"}
            </p>
            <p className="text-[11px] text-slate-500">
              Stayora · Website Editor
              {version !== null ? ` · Version ${version}` : ""}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-xs text-slate-500 sm:inline">
            {saved ? (
              <span className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600" />
                Saved
              </span>
            ) : (
              "Unsaved changes"
            )}
          </span>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || saved}
            className="inline-flex h-9 items-center gap-2 bg-slate-900 px-4 text-xs font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {saving ? (
              <LoaderCircle size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </header>

      {error && (
        <div className="border-b border-red-200 bg-red-50 px-6 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid min-h-[calc(100vh-64px)] xl:grid-cols-[230px_minmax(390px,0.85fr)_minmax(500px,1.15fr)]">
        <aside className="border-b border-slate-200 bg-white p-4 xl:border-b-0 xl:border-r">
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Website Sections
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveSection("theme")}
            className={`mb-3 flex w-full items-center gap-3 border px-3 py-3 text-left text-sm transition ${
              activeSection === "theme"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Palette size={16} />
            Theme Settings
          </button>

          <div className="space-y-1">
            {sectionSettings.map((section, index) => {
              const definition = sectionDefinitions.find(
                (item) => item.id === section.id
              );
              const Icon = definition?.icon || LayoutDashboard;

              return (
                <div
                  key={section.id}
                  className={`flex items-center gap-1 border transition ${
                    activeSection === section.id
                      ? "border-slate-300 bg-slate-100"
                      : "border-transparent hover:bg-slate-50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left"
                  >
                    <Icon size={15} className="shrink-0 text-slate-500" />
                    <span
                      className={`truncate text-xs ${
                        activeSection === section.id
                          ? "font-semibold text-slate-900"
                          : "text-slate-600"
                      }`}
                    >
                      {section.label}
                    </span>
                  </button>

                  <div className="flex shrink-0 items-center pr-1">
                    <button
                      type="button"
                      onClick={() =>
                        moveSection(index, -1)
                      }
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-slate-900 disabled:opacity-25"
                      aria-label={`Move ${section.label} up`}
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        moveSection(index, 1)
                      }
                      disabled={index === sectionSettings.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-900 disabled:opacity-25"
                      aria-label={`Move ${section.label} down`}
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        <section className="min-w-0 bg-slate-50 p-5 lg:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Editing
              </p>
              <h1 className="mt-1 text-xl font-semibold text-slate-900">
                {activeSection === "theme"
                  ? "Theme Settings"
                  : activeSettings?.label || activeDefinition?.label}
              </h1>
            </div>
          </div>

          {activeSection !== "theme" && activeSettings && (
            <div className="mb-6 space-y-4 border border-slate-200 bg-white p-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-600">
                  Sidebar Label
                </label>
                <input
                  type="text"
                  value={activeSettings.label}
                  onChange={(event) => {
                    const next = sectionSettings.map((item) =>
                      item.id === activeSection
                        ? { ...item, label: event.target.value }
                        : item
                    );
                    handleSectionSettingsChange(next);
                  }}
                  className="w-full border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={activeSettings.visible}
                  onChange={(event) => {
                    const next = sectionSettings.map((item) =>
                      item.id === activeSection
                        ? { ...item, visible: event.target.checked }
                        : item
                    );
                    handleSectionSettingsChange(next);
                  }}
                  className="size-4 accent-slate-900"
                />
                Show this section on website
              </label>
            </div>
          )}

          <div className="space-y-5 border border-slate-200 bg-white p-5 lg:p-6">
            {renderSectionFields()}
          </div>
        </section>

        <section className="min-w-0 border-t border-slate-200 bg-slate-100 xl:sticky xl:top-16 xl:h-[calc(100vh-64px)] xl:overflow-hidden xl:border-t-0 xl:border-l">
          <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-white px-4">
            <div className="flex items-center gap-2">
              <Eye size={15} className="text-slate-500" />
              <p className="text-sm font-semibold text-slate-800">
                Live Preview
              </p>
            </div>
            <span className="text-xs text-slate-500">
              {saved ? "Saved version" : "Unsaved changes"}
            </span>
          </div>

          <div className="h-[75vh] overflow-auto bg-white xl:h-[calc(100%-48px)]">
            <StayoraRenderer
              config={{
                ...previewConfig,
                editorSections: sectionSettings,
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
