"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  Save,
  Plus,
  Trash2,
  Users,
  LayoutDashboard,
  Image,
  Menu,
  Type,
  BriefcaseBusiness,
  MousePointerClick,
  PanelBottom,
  Check,
  LoaderCircle,
  ChevronUp,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

import WebsiteMediaPicker from "./WebsiteMediaPicker";
import CorpProRenderer from "../../../templates/corppro/preview/CorpProRenderer";

const sectionDefinitions = [
  { id: "header", label: "Header", icon: Menu },
  { id: "hero", label: "Hero", icon: LayoutDashboard },
  { id: "about", label: "About", icon: Type },
  { id: "services", label: "Services", icon: BriefcaseBusiness },
  { id: "whyChooseUs", label: "Why Choose Us", icon: Check },
  { id: "projects", label: "Projects", icon: Image },
  { id: "testimonials", label: "Our Customers", icon: Users },
  { id: "cta", label: "Call to Action", icon: MousePointerClick },
  { id: "footer", label: "Footer", icon: PanelBottom },
];

const defaultSectionSettings = sectionDefinitions.map((section, index) => ({
  id: section.id,
  label: section.label,
  visible: true,
  order: index,
}));

function normalizeSectionSettings(savedSections) {
  return defaultSectionSettings.map((defaultSection) => {
    const savedSection = Array.isArray(savedSections)
      ? savedSections.find((section) => section.id === defaultSection.id)
      : null;

    return {
      ...defaultSection,
      ...(savedSection || {}),
      id: defaultSection.id,
      label: savedSection?.label ?? defaultSection.label,
      visible: savedSection?.visible ?? true,
      order: Number.isFinite(savedSection?.order)
        ? savedSection.order
        : defaultSection.order,
    };
  });
}

function normalizeConfig(rawConfig) {
  const config = rawConfig || {};

  return {
    ...config,

    header: {
      navigation: [],
      ...(config.header || {}),
      navigation: Array.isArray(config.header?.navigation)
        ? config.header.navigation
        : [],
    },

    hero: {
      primaryButton: { text: "", href: "", ...(config.hero?.primaryButton || {}) },
      secondaryButton: { text: "", href: "", ...(config.hero?.secondaryButton || {}) },
      ...(config.hero || {}),
    },

    about: {
      ...(config.about || {}),
    },

    services: {
      items: [],
      ...(config.services || {}),
      items: Array.isArray(config.services?.items)
        ? config.services.items
        : [],
    },

    whyChooseUs: {
      benefits: [],
      ...(config.whyChooseUs || {}),
      benefits: Array.isArray(config.whyChooseUs?.benefits)
        ? config.whyChooseUs.benefits
        : [],
    },

    projects: {
      items: [],
      ...(config.projects || {}),
      items: Array.isArray(config.projects?.items)
        ? config.projects.items
        : [],
    },

    customers: {
      eyebrow: "TRUSTED PARTNERS",
      heading: "Our Customers",
      description: "Trusted by businesses across different industries.",
      animationEnabled: true,
      animationSpeed: 30,
      items: [],
      ...(config.customers || {}),
      items: Array.isArray(config.customers?.items)
        ? config.customers.items
        : [],
    },

    cta: {
      ...(config.cta || {}),
    },

    footer: {
      quickLinks: [],
      resources: [],
      socials: [],
      ...(config.footer || {}),
      quickLinks: Array.isArray(config.footer?.quickLinks)
        ? config.footer.quickLinks
        : [],
      resources: Array.isArray(config.footer?.resources)
        ? config.footer.resources
        : [],
      socials: Array.isArray(config.footer?.socials)
        ? config.footer.socials
        : [],
    },
  };
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 4, placeholder }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-6 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500">{value}</span>
        <input
          type="color"
          value={value || "#000000"}
          onChange={(event) => onChange(event.target.value)}
          className="h-9 w-11 cursor-pointer rounded border-0 bg-transparent"
        />
      </div>
    </label>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <section className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function ItemCard({ title, index, onRemove, children }) {
  return (
    <div className="space-y-4 rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">
          {title} {index + 1}
        </p>

        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
        >
          <Trash2 size={14} />
          Hapus
        </button>
      </div>

      {children}
    </div>
  );
}

export default function ManageEditorClient() {
  const params = useParams();
  const websiteId = params?.id;

  const [config, setConfig] = useState(null);
  const [website, setWebsite] = useState(null);
  const [version, setVersion] = useState(null);

  const [activeSection, setActiveSection] = useState("header");
  const [sectionSettings, setSectionSettings] = useState(
    defaultSectionSettings
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const loadWebsite = useCallback(async () => {
    if (!websiteId) return;

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
        throw new Error("Konfigurasi website tidak ditemukan.");
      }

      const loadedConfig = normalizeConfig(configData.config);

      setWebsite(websiteData);
      setConfig(loadedConfig);
      setVersion(configData.version ?? null);
      setSectionSettings(
        normalizeSectionSettings(loadedConfig.editorSections)
      );
      setSaved(true);
    } catch (err) {
      console.error("Gagal memuat Website Manage:", err);
      setError(err.message || "Gagal memuat website.");
    } finally {
      setLoading(false);
    }
  }, [websiteId]);

  useEffect(() => {
    loadWebsite();
  }, [loadWebsite]);

  const markUnsaved = () => {
    setSaved(false);
  };

  const updateSection = (section, field, value) => {
    setConfig((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }));

    markUnsaved();
  };

  const updateRoot = (field, value) => {
    setConfig((current) => ({
      ...current,
      [field]: value,
    }));

    markUnsaved();
  };

  const updateNested = (section, field, nestedField, value) => {
    setConfig((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: {
          ...current[section][field],
          [nestedField]: value,
        },
      },
    }));

    markUnsaved();
  };

  const updateArrayItem = (section, field, index, key, value) => {
    setConfig((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: current[section][field].map((item, itemIndex) =>
          itemIndex === index ? { ...item, [key]: value } : item
        ),
      },
    }));

    markUnsaved();
  };

  const addArrayItem = (section, field, item) => {
    setConfig((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: [...current[section][field], item],
      },
    }));

    markUnsaved();
  };

  const removeArrayItem = (section, field, index) => {
    setConfig((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: current[section][field].filter(
          (_, itemIndex) => itemIndex !== index
        ),
      },
    }));

    markUnsaved();
  };

  const moveArrayItem = (section, field, index, direction) => {
    setConfig((current) => {
      const items = [...current[section][field]];
      const newIndex = index + direction;

      if (newIndex < 0 || newIndex >= items.length) {
        return current;
      }

      [items[index], items[newIndex]] = [items[newIndex], items[index]];

      return {
        ...current,
        [section]: {
          ...current[section],
          [field]: items,
        },
      };
    });

    markUnsaved();
  };

  const updateSectionSetting = (id, field, value) => {
    setSectionSettings((current) =>
      current.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );

    markUnsaved();
  };

  const moveSidebarSection = (id, direction) => {
    setSectionSettings((current) => {
      const sorted = [...current].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((section) => section.id === id);
      const targetIndex = index + direction;

      if (index < 0 || targetIndex < 0 || targetIndex >= sorted.length) {
        return current;
      }

      [sorted[index], sorted[targetIndex]] = [
        sorted[targetIndex],
        sorted[index],
      ];

      return sorted.map((section, order) => ({ ...section, order }));
    });

    markUnsaved();
  };

  const sortedSections = useMemo(
    () =>
      sectionSettings
        .map((setting) => ({
          ...sectionDefinitions.find(
            (section) => section.id === setting.id,
          ),
          ...setting,
        }))
        .filter((section) => section.icon)
        .sort((a, b) => a.order - b.order),
    [sectionSettings]
  );

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
          result.message || "Gagal menyimpan konfigurasi website."
        );
      }

      setVersion(result.data?.version ?? version);
      setSaved(true);
    } catch (err) {
      console.error("Website config save error:", err);
      setError(err.message || "Gagal menyimpan konfigurasi website.");
    } finally {
      setSaving(false);
    }
  };

  const activeLabel =
    sectionSettings.find((section) => section.id === activeSection)?.label ??
    sectionDefinitions.find((section) => section.id === activeSection)?.label ??
    "";

  const renderEditor = () => {
    if (!config) return null;

    switch (activeSection) {
      case "header":
        return (
          <div className="space-y-5">
            <SectionCard
              title="Website Identity"
              description="Atur identitas website pelanggan."
            >
              <Field
                label="Website Name"
                value={config.siteName}
                onChange={(value) => updateRoot("siteName", value)}
              />

              <Field
                label="Logo URL"
                value={config.logo}
                placeholder="https://example.com/logo.png"
                onChange={(value) => updateRoot("logo", value)}
              />
            </SectionCard>

            <SectionCard title="Header Appearance">
              <div className="grid gap-4 sm:grid-cols-2">
                <ColorField
                  label="Background Color"
                  value={config.header.backgroundColor}
                  onChange={(value) =>
                    updateSection("header", "backgroundColor", value)
                  }
                />

                <ColorField
                  label="Text Color"
                  value={config.header.textColor}
                  onChange={(value) =>
                    updateSection("header", "textColor", value)
                  }
                />
              </div>
            </SectionCard>

            <SectionCard title="Navigation Menu">
              {config.header.navigation.map((item, index) => (
                <ItemCard
                  key={index}
                  title="Navigation"
                  index={index}
                  onRemove={() =>
                    removeArrayItem("header", "navigation", index)
                  }
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Label"
                      value={item.label}
                      onChange={(value) =>
                        updateArrayItem(
                          "header",
                          "navigation",
                          index,
                          "label",
                          value
                        )
                      }
                    />

                    <Field
                      label="Link"
                      value={item.href}
                      onChange={(value) =>
                        updateArrayItem(
                          "header",
                          "navigation",
                          index,
                          "href",
                          value
                        )
                      }
                    />
                  </div>
                </ItemCard>
              ))}

              <button
                type="button"
                onClick={() =>
                  addArrayItem("header", "navigation", {
                    label: "New Menu",
                    href: "#",
                  })
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                <Plus size={16} />
                Tambah Menu
              </button>
            </SectionCard>

            <SectionCard title="Header Button">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Button Text"
                  value={config.header.buttonText}
                  onChange={(value) =>
                    updateSection("header", "buttonText", value)
                  }
                />

                <Field
                  label="Button Link"
                  value={config.header.buttonHref}
                  onChange={(value) =>
                    updateSection("header", "buttonHref", value)
                  }
                />
              </div>
            </SectionCard>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-5">
            <SectionCard title="Hero Content">
              <Field
                label="Badge Text"
                value={config.hero.badgeText}
                onChange={(value) =>
                  updateSection("hero", "badgeText", value)
                }
              />

              <Field
                label="Main Heading"
                value={config.hero.heading}
                onChange={(value) =>
                  updateSection("hero", "heading", value)
                }
              />

              <Field
                label="Highlight Text"
                value={config.hero.highlightText}
                onChange={(value) =>
                  updateSection("hero", "highlightText", value)
                }
              />

              <TextArea
                label="Description"
                value={config.hero.description}
                onChange={(value) =>
                  updateSection("hero", "description", value)
                }
              />
            </SectionCard>

            <SectionCard
              title="Background Media"
              description="Media yang diunggah akan disimpan khusus untuk website ini."
            >
              <WebsiteMediaPicker
                label="Upload Background"
                websiteId={websiteId}
                value={config.hero.backgroundMedia}
                onChange={(value) =>
                  updateSection("hero", "backgroundMedia", value)
                }
              />

              <div className="border-t border-slate-100 pt-4">
                <Field
                  label="Alternative Image URL"
                  value={config.hero.backgroundImage}
                  placeholder="https://example.com/image.jpg"
                  onChange={(value) => {
                    updateSection("hero", "backgroundImage", value);
                    updateSection("hero", "backgroundMedia", null);
                  }}
                />
                <p className="mt-2 text-xs text-slate-500">
                  URL digunakan jika tidak ada media upload yang dipilih.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Background Appearance">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">
                  Background Position
                </span>
                <select
                  value={config.hero.backgroundPosition || "center center"}
                  onChange={(event) =>
                    updateSection(
                      "hero",
                      "backgroundPosition",
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
                >
                  <option value="center center">Center</option>
                  <option value="center top">Top</option>
                  <option value="center bottom">Bottom</option>
                  <option value="left center">Left</option>
                  <option value="right center">Right</option>
                </select>
              </label>

              <ColorField
                label="Overlay Color"
                value={config.hero.overlayColor || "#FFFFFF"}
                onChange={(value) =>
                  updateSection("hero", "overlayColor", value)
                }
              />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    Overlay Opacity
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {config.hero.overlayOpacity ?? 65}%
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.hero.overlayOpacity ?? 65}
                  onChange={(event) =>
                    updateSection(
                      "hero",
                      "overlayOpacity",
                      Number(event.target.value)
                    )
                  }
                  className="w-full accent-blue-600"
                />
              </div>
            </SectionCard>

            <SectionCard title="Primary Button">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Button Text"
                  value={config.hero.primaryButton.text}
                  onChange={(value) =>
                    updateNested("hero", "primaryButton", "text", value)
                  }
                />
                <Field
                  label="Button Link"
                  value={config.hero.primaryButton.href}
                  onChange={(value) =>
                    updateNested("hero", "primaryButton", "href", value)
                  }
                />
              </div>
            </SectionCard>

            <SectionCard title="Secondary Button">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Button Text"
                  value={config.hero.secondaryButton.text}
                  onChange={(value) =>
                    updateNested("hero", "secondaryButton", "text", value)
                  }
                />
                <Field
                  label="Button Link"
                  value={config.hero.secondaryButton.href}
                  onChange={(value) =>
                    updateNested("hero", "secondaryButton", "href", value)
                  }
                />
              </div>
            </SectionCard>
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-5">
            <SectionCard
              title="Customer Logos"
              description="Kelola logo pelanggan yang tampil di website."
            >
              {config.customers.items.map((item, index) => (
                <div
                  key={item.id || index}
                  className="space-y-4 rounded-lg border border-slate-200 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-800">
                      Customer {index + 1}
                    </p>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          moveArrayItem("customers", "items", index, -1)
                        }
                        disabled={index === 0}
                        aria-label="Pindahkan ke atas"
                        className="rounded-md p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                      >
                        <ChevronUp size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          moveArrayItem("customers", "items", index, 1)
                        }
                        disabled={index === config.customers.items.length - 1}
                        aria-label="Pindahkan ke bawah"
                        className="rounded-md p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                      >
                        <ChevronDown size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("customers", "items", index)
                        }
                        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                        Hapus
                      </button>
                    </div>
                  </div>

                  <Field
                    label="Customer Name"
                    value={item.name}
                    onChange={(value) =>
                      updateArrayItem(
                        "customers",
                        "items",
                        index,
                        "name",
                        value
                      )
                    }
                    placeholder="Nama perusahaan"
                  />

                  <WebsiteMediaPicker
                    label="Customer Logo"
                    websiteId={websiteId}
                    value={item.logo}
                    onChange={(value) =>
                      updateArrayItem(
                        "customers",
                        "items",
                        index,
                        "logo",
                        value
                      )
                    }
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  addArrayItem("customers", "items", {
                    id: crypto.randomUUID(),
                    name: "",
                    logo: null,
                  })
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                <Plus size={16} />
                Tambah Customer
              </button>

              {config.customers.items.length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                  <Users className="mx-auto text-slate-400" size={28} />
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    Belum ada customer
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Klik Tambah Customer untuk mulai menambahkan logo.
                  </p>
                </div>
              )}
            </SectionCard>

            <SectionCard title="Marquee Animation">
              <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Enable Animation
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Logo bergerak secara horizontal dan berulang.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={config.customers.animationEnabled}
                  onChange={(event) =>
                    updateSection(
                      "customers",
                      "animationEnabled",
                      event.target.checked
                    )
                  }
                  className="h-4 w-4 accent-blue-600"
                />
              </label>

              <div
                className={`space-y-3 ${
                  !config.customers.animationEnabled
                    ? "pointer-events-none opacity-40"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Animation Speed
                  </label>
                  <span className="text-sm font-semibold text-blue-600">
                    {config.customers.animationSpeed} detik
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="60"
                  step="1"
                  value={config.customers.animationSpeed}
                  disabled={!config.customers.animationEnabled}
                  onChange={(event) =>
                    updateSection(
                      "customers",
                      "animationSpeed",
                      Number(event.target.value)
                    )
                  }
                  className="w-full accent-blue-600"
                />
              </div>
            </SectionCard>
          </div>
        );

      case "about":
        return (
          <SectionCard title="About Content">
            <Field
              label="Eyebrow"
              value={config.about.eyebrow}
              onChange={(value) => updateSection("about", "eyebrow", value)}
            />
            <Field
              label="Heading"
              value={config.about.heading}
              onChange={(value) => updateSection("about", "heading", value)}
            />
            <TextArea
              label="First Description"
              value={config.about.description}
              onChange={(value) =>
                updateSection("about", "description", value)
              }
            />
            <TextArea
              label="Second Description"
              value={config.about.secondaryDescription}
              onChange={(value) =>
                updateSection("about", "secondaryDescription", value)
              }
            />
            <Field
              label="Image URL"
              value={config.about.image}
              onChange={(value) => updateSection("about", "image", value)}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Button Text"
                value={config.about.buttonText}
                onChange={(value) =>
                  updateSection("about", "buttonText", value)
                }
              />
              <Field
                label="Button Link"
                value={config.about.buttonHref}
                onChange={(value) =>
                  updateSection("about", "buttonHref", value)
                }
              />
            </div>
          </SectionCard>
        );

      case "services":
        return (
          <div className="space-y-5">
            <SectionCard title="Section Content">
              <Field
                label="Eyebrow"
                value={config.services.eyebrow}
                onChange={(value) =>
                  updateSection("services", "eyebrow", value)
                }
              />
              <Field
                label="Heading"
                value={config.services.heading}
                onChange={(value) =>
                  updateSection("services", "heading", value)
                }
              />
              <TextArea
                label="Description"
                value={config.services.description}
                onChange={(value) =>
                  updateSection("services", "description", value)
                }
              />
            </SectionCard>

            <SectionCard title="Service Items">
              {config.services.items.map((item, index) => (
                <ItemCard
                  key={index}
                  title="Service"
                  index={index}
                  onRemove={() =>
                    removeArrayItem("services", "items", index)
                  }
                >
                  <Field
                    label="Title"
                    value={item.title}
                    onChange={(value) =>
                      updateArrayItem(
                        "services",
                        "items",
                        index,
                        "title",
                        value
                      )
                    }
                  />
                  <TextArea
                    label="Description"
                    value={item.description}
                    onChange={(value) =>
                      updateArrayItem(
                        "services",
                        "items",
                        index,
                        "description",
                        value
                      )
                    }
                  />
                  <Field
                    label="Icon Name"
                    value={item.icon}
                    placeholder="BriefcaseBusiness"
                    onChange={(value) =>
                      updateArrayItem(
                        "services",
                        "items",
                        index,
                        "icon",
                        value
                      )
                    }
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Button Text"
                      value={item.buttonText}
                      onChange={(value) =>
                        updateArrayItem(
                          "services",
                          "items",
                          index,
                          "buttonText",
                          value
                        )
                      }
                    />
                    <Field
                      label="Button Link"
                      value={item.buttonHref}
                      onChange={(value) =>
                        updateArrayItem(
                          "services",
                          "items",
                          index,
                          "buttonHref",
                          value
                        )
                      }
                    />
                  </div>
                </ItemCard>
              ))}

              <button
                type="button"
                onClick={() =>
                  addArrayItem("services", "items", {
                    icon: "BriefcaseBusiness",
                    title: "New Service",
                    description: "",
                    buttonText: "Learn More",
                    buttonHref: "#contact",
                  })
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                <Plus size={16} />
                Tambah Service
              </button>
            </SectionCard>
          </div>
        );

      case "whyChooseUs": {
        const visionMission = config.whyChooseUs.visionMission ?? {
          vision: {
            title: "Vision",
            description: "",
            hoverContent: "",
            image: null,
          },
          mission: {
            title: "Mission",
            description: "",
            hoverContent: "",
            image: null,
          },
          hoverEffect: "auto",
          hoverDuration: 400,
        };

        const updateVisionMission = (type, field, value) => {
          setConfig((current) => ({
            ...current,
            whyChooseUs: {
              ...current.whyChooseUs,
              visionMission: {
                ...(current.whyChooseUs.visionMission ?? visionMission),
                [type]: {
                  ...(current.whyChooseUs.visionMission?.[type] ??
                    visionMission[type]),
                  [field]: value,
                },
              },
            },
          }));

          markUnsaved();
        };

        return (
          <div className="space-y-5">
            <SectionCard title="Section Content">
              <Field
                label="Eyebrow"
                value={config.whyChooseUs.eyebrow}
                onChange={(value) =>
                  updateSection("whyChooseUs", "eyebrow", value)
                }
              />
              <Field
                label="Heading"
                value={config.whyChooseUs.heading}
                onChange={(value) =>
                  updateSection("whyChooseUs", "heading", value)
                }
              />
              <TextArea
                label="Description"
                value={config.whyChooseUs.description}
                onChange={(value) =>
                  updateSection("whyChooseUs", "description", value)
                }
              />
              <Field
                label="Image URL"
                value={config.whyChooseUs.image}
                onChange={(value) =>
                  updateSection("whyChooseUs", "image", value)
                }
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Button Text"
                  value={config.whyChooseUs.buttonText}
                  onChange={(value) =>
                    updateSection("whyChooseUs", "buttonText", value)
                  }
                />
                <Field
                  label="Button Link"
                  value={config.whyChooseUs.buttonHref}
                  onChange={(value) =>
                    updateSection("whyChooseUs", "buttonHref", value)
                  }
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Vision & Mission"
              description="Gambar dan hover content bersifat opsional."
            >
              {["vision", "mission"].map((type) => {
                const item = visionMission[type];

                return (
                  <div
                    key={type}
                    className="space-y-4 rounded-xl border border-slate-200 p-4"
                  >
                    <h3 className="font-semibold capitalize text-slate-900">
                      {type}
                    </h3>

                    <Field
                      label="Title"
                      value={item.title}
                      onChange={(value) =>
                        updateVisionMission(type, "title", value)
                      }
                    />
                    <TextArea
                      label="Description"
                      value={item.description}
                      onChange={(value) =>
                        updateVisionMission(type, "description", value)
                      }
                    />
                    <TextArea
                      label="Hover Content"
                      value={item.hoverContent}
                      onChange={(value) =>
                        updateVisionMission(type, "hoverContent", value)
                      }
                      rows={3}
                    />

                    <WebsiteMediaPicker
                      label={`${type} Image (Optional)`}
                      websiteId={websiteId}
                      value={item.image}
                      onChange={(value) =>
                        updateVisionMission(type, "image", value)
                      }
                    />
                  </div>
                );
              })}

              <div className="space-y-3 border-t border-slate-200 pt-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Hover Settings
                </h3>
                <Field
                  label="Hover Duration (ms)"
                  type="number"
                  value={visionMission.hoverDuration}
                  onChange={(value) =>
                    setConfig((current) => ({
                      ...current,
                      whyChooseUs: {
                        ...current.whyChooseUs,
                        visionMission: {
                          ...(current.whyChooseUs.visionMission ??
                            visionMission),
                          hoverDuration: Math.max(
                            100,
                            Math.min(1500, Number(value) || 400)
                          ),
                        },
                      },
                    }))
                  }
                />
              </div>
            </SectionCard>

            <SectionCard title="Benefits">
              {config.whyChooseUs.benefits.map((benefit, index) => (
                <ItemCard
                  key={index}
                  title="Benefit"
                  index={index}
                  onRemove={() =>
                    removeArrayItem("whyChooseUs", "benefits", index)
                  }
                >
                  <Field
                    label="Benefit Text"
                    value={benefit}
                    onChange={(value) => {
                      setConfig((current) => ({
                        ...current,
                        whyChooseUs: {
                          ...current.whyChooseUs,
                          benefits: current.whyChooseUs.benefits.map(
                            (item, itemIndex) =>
                              itemIndex === index ? value : item
                          ),
                        },
                      }));
                      markUnsaved();
                    }}
                  />
                </ItemCard>
              ))}

              <button
                type="button"
                onClick={() =>
                  addArrayItem("whyChooseUs", "benefits", "New Benefit")
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                <Plus size={16} />
                Tambah Benefit
              </button>
            </SectionCard>
          </div>
        );
      }

      case "projects":
        return (
          <div className="space-y-5">
            <SectionCard title="Section Content">
              <Field
                label="Eyebrow"
                value={config.projects.eyebrow}
                onChange={(value) =>
                  updateSection("projects", "eyebrow", value)
                }
              />
              <Field
                label="Heading"
                value={config.projects.heading}
                onChange={(value) =>
                  updateSection("projects", "heading", value)
                }
              />
              <TextArea
                label="Description"
                value={config.projects.description}
                onChange={(value) =>
                  updateSection("projects", "description", value)
                }
              />
            </SectionCard>

            <SectionCard title="Project Items">
              {config.projects.items.map((item, index) => (
                <ItemCard
                  key={index}
                  title="Project"
                  index={index}
                  onRemove={() =>
                    removeArrayItem("projects", "items", index)
                  }
                >
                  <Field
                    label="Project Title"
                    value={item.title}
                    onChange={(value) =>
                      updateArrayItem(
                        "projects",
                        "items",
                        index,
                        "title",
                        value
                      )
                    }
                  />
                  <Field
                    label="Category"
                    value={item.category}
                    onChange={(value) =>
                      updateArrayItem(
                        "projects",
                        "items",
                        index,
                        "category",
                        value
                      )
                    }
                  />
                  <Field
                    label="Image URL"
                    value={item.image}
                    onChange={(value) =>
                      updateArrayItem(
                        "projects",
                        "items",
                        index,
                        "image",
                        value
                      )
                    }
                  />
                </ItemCard>
              ))}

              <button
                type="button"
                onClick={() =>
                  addArrayItem("projects", "items", {
                    title: "New Project",
                    category: "General",
                    image: "",
                  })
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                <Plus size={16} />
                Tambah Project
              </button>
            </SectionCard>
          </div>
        );

      case "cta":
        return (
          <div className="space-y-5">
            <SectionCard title="Call to Action Content">
              <Field
                label="Heading"
                value={config.cta.heading}
                onChange={(value) => updateSection("cta", "heading", value)}
              />
              <TextArea
                label="Description"
                value={config.cta.description}
                onChange={(value) =>
                  updateSection("cta", "description", value)
                }
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Button Text"
                  value={config.cta.buttonText}
                  onChange={(value) =>
                    updateSection("cta", "buttonText", value)
                  }
                />
                <Field
                  label="Button Link"
                  value={config.cta.buttonHref}
                  onChange={(value) =>
                    updateSection("cta", "buttonHref", value)
                  }
                />
              </div>
            </SectionCard>

            <SectionCard title="CTA Colors">
              <ColorField
                label="Section Background"
                value={config.cta.backgroundColor}
                onChange={(value) =>
                  updateSection("cta", "backgroundColor", value)
                }
              />
              <ColorField
                label="Button Background"
                value={config.cta.buttonBackgroundColor}
                onChange={(value) =>
                  updateSection("cta", "buttonBackgroundColor", value)
                }
              />
              <ColorField
                label="Button Text"
                value={config.cta.buttonTextColor}
                onChange={(value) =>
                  updateSection("cta", "buttonTextColor", value)
                }
              />
            </SectionCard>
          </div>
        );

      case "footer":
        return (
          <div className="space-y-5">
            <SectionCard title="Company Information">
              <TextArea
                label="Company Description"
                value={config.footer.description}
                onChange={(value) =>
                  updateSection("footer", "description", value)
                }
              />
              <TextArea
                label="Address"
                value={config.footer.address}
                onChange={(value) =>
                  updateSection("footer", "address", value)
                }
                rows={2}
              />
              <Field
                label="Email Address"
                value={config.footer.email}
                onChange={(value) =>
                  updateSection("footer", "email", value)
                }
              />
            </SectionCard>

            {[
              {
                field: "quickLinks",
                title: "Quick Links",
                itemTitle: "Quick Link",
                newItem: { label: "New Link", href: "#" },
              },
              {
                field: "resources",
                title: "Resources",
                itemTitle: "Resource",
                newItem: { label: "New Resource", href: "#" },
              },
              {
                field: "socials",
                title: "Social Media",
                itemTitle: "Social Media",
                newItem: { platform: "Instagram", href: "" },
              },
            ].map((group) => (
              <SectionCard key={group.field} title={group.title}>
                {config.footer[group.field].map((item, index) => (
                  <ItemCard
                    key={index}
                    title={group.itemTitle}
                    index={index}
                    onRemove={() =>
                      removeArrayItem("footer", group.field, index)
                    }
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field
                        label={
                          group.field === "socials" ? "Platform" : "Label"
                        }
                        value={
                          group.field === "socials"
                            ? item.platform
                            : item.label
                        }
                        onChange={(value) =>
                          updateArrayItem(
                            "footer",
                            group.field,
                            index,
                            group.field === "socials" ? "platform" : "label",
                            value
                          )
                        }
                      />
                      <Field
                        label="Link"
                        value={item.href}
                        onChange={(value) =>
                          updateArrayItem(
                            "footer",
                            group.field,
                            index,
                            "href",
                            value
                          )
                        }
                      />
                    </div>
                  </ItemCard>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    addArrayItem(
                      "footer",
                      group.field,
                      group.newItem
                    )
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
                >
                  <Plus size={16} />
                  Tambah {group.itemTitle}
                </button>
              </SectionCard>
            ))}

            <SectionCard title="Footer Bottom">
              <Field
                label="Copyright Text"
                value={config.footer.copyright}
                onChange={(value) =>
                  updateSection("footer", "copyright", value)
                }
              />
              <Field
                label="Credit Name"
                value={config.footer.credit}
                onChange={(value) =>
                  updateSection("footer", "credit", value)
                }
              />
            </SectionCard>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoaderCircle className="animate-spin text-blue-600" size={28} />
      </div>
    );
  }

  if (error && !config) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6">
          <AlertCircle className="mb-3 text-red-600" size={28} />
          <h1 className="font-semibold text-slate-900">
            Gagal memuat Website Manage
          </h1>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
          <button
            type="button"
            onClick={loadWebsite}
            className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </main>
    );
  }

  const previewConfig = {
    ...config,
    editorSections: sectionSettings,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between gap-4 px-5">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href={`/websites/${websiteId}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              aria-label="Kembali ke detail website"
            >
              <ArrowLeft size={17} />
            </Link>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                Manage Website
              </p>
              <p className="truncate text-xs text-slate-500">
                {website?.name || config.siteName || "Website"}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/websites/${websiteId}/preview`}
              target="_blank"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Eye size={16} />
              <span className="hidden sm:inline">Full Preview</span>
            </Link>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || saved}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid min-h-[calc(100vh-64px)] xl:grid-cols-[230px_minmax(380px,0.9fr)_minmax(480px,1.1fr)]">
        <aside className="border-b border-slate-200 bg-white p-4 xl:sticky xl:top-16 xl:h-[calc(100vh-64px)] xl:overflow-y-auto xl:border-r xl:border-b-0">
          <div className="mb-4">
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Website Sections
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              CorpPro Editor
            </h2>
          </div>

          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-1">
            {sortedSections.map((section, index) => {
              const Icon = section.icon;
              const active = activeSection === section.id;

              return (
                <div
                  key={section.id}
                  className={`flex items-center gap-1 rounded-lg pr-1 transition ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  } ${!section.visible ? "opacity-60" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2.5 text-left text-sm font-medium"
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="truncate">{section.label}</span>
                    {!section.visible && (
                      <span className="ml-auto text-[10px] font-semibold uppercase text-slate-400">
                        Hidden
                      </span>
                    )}
                  </button>

                  <div className="flex shrink-0 items-center">
                    <button
                      type="button"
                      onClick={() => moveSidebarSection(section.id, -1)}
                      disabled={index === 0}
                      aria-label={`Move ${section.label} up`}
                      className="rounded p-1 text-slate-400 hover:bg-white disabled:opacity-20"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSidebarSection(section.id, 1)}
                      disabled={index === sortedSections.length - 1}
                      aria-label={`Move ${section.label} down`}
                      className="rounded p-1 text-slate-400 hover:bg-white disabled:opacity-20"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="mt-6 hidden rounded-lg border border-slate-200 bg-slate-50 p-3 xl:block">
            <p className="text-xs font-semibold text-slate-700">
              Editing Website
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {config.siteName || website?.name || "Website"}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Perubahan disimpan sebagai konfigurasi website pelanggan.
            </p>
            {version !== null && (
              <p className="mt-2 text-xs text-slate-400">
                Config version: {version}
              </p>
            )}
          </div>
        </aside>

        <main className="min-w-0 p-4 sm:p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <div>
              <p className="text-sm text-slate-500">
                Websites / {config.siteName || website?.name} / Manage
              </p>

              <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-950">
                    {activeLabel}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Kelola konten dan konfigurasi section {activeLabel}.
                  </p>
                  {sectionSettings.find(
                    (section) => section.id === activeSection
                  )?.visible === false && (
                    <p className="mt-2 text-xs font-medium text-amber-700">
                      Section ini sedang disembunyikan dari website.
                    </p>
                  )}
                </div>

                {saved && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                    <Check size={16} />
                    Tersimpan
                  </span>
                )}
                {!saved && (
                  <span className="text-xs font-medium text-amber-700">
                    Ada perubahan belum disimpan
                  </span>
                )}
              </div>
            </div>

            <SectionCard
              title="Section Settings"
              description="Ubah nama sidebar dan atur visibilitas section."
            >
              <Field
                label="Nama Section di Sidebar"
                value={activeLabel}
                onChange={(value) =>
                  updateSectionSetting(activeSection, "label", value)
                }
                placeholder="Nama section"
              />

              <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Tampilkan Section di Website
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Menyembunyikan section tidak menghapus kontennya.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={
                    sectionSettings.find(
                      (section) => section.id === activeSection
                    )?.visible ?? true
                  }
                  onChange={(event) =>
                    updateSectionSetting(
                      activeSection,
                      "visible",
                      event.target.checked
                    )
                  }
                  className="h-4 w-4 accent-blue-600"
                />
              </label>
            </SectionCard>

            {renderEditor()}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
              <p className="text-xs text-slate-500">
                Pastikan perubahan disimpan sebelum meninggalkan halaman.
              </p>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || saved}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </main>

        <section className="min-w-0 border-t border-slate-200 bg-slate-100 xl:sticky xl:top-16 xl:h-[calc(100vh-64px)] xl:overflow-hidden xl:border-t-0 xl:border-l">
          <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-white px-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Live Preview
              </p>
            </div>
            <span className="text-xs text-slate-500">
              {saved ? "Saved version" : "Unsaved changes"}
            </span>
          </div>

          <div className="h-[75vh] overflow-auto bg-white xl:h-[calc(100%-48px)]">
            <div className="origin-top-left">
              <CorpProRenderer config={previewConfig} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
