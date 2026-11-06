"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import {
  getCorpProConfig,
  saveCorpProConfig,
} from "../../../../lib/site-config";
import MediaPicker from "../preview/components/MediaPicker";

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
  if (!Array.isArray(savedSections)) return defaultSectionSettings;
  return defaultSectionSettings.map((defaultSection) => {
    const savedSection = savedSections.find(
      (section) => section.id === defaultSection.id
    );
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

export default function CorpProEditorPage() {
  const [config, setConfig] = useState(null);
  const [activeSection, setActiveSection] = useState("header");
  const [sectionSettings, setSectionSettings] = useState(defaultSectionSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const loadedConfig = getCorpProConfig();
      setSectionSettings(
        normalizeSectionSettings(loadedConfig.editorSections)
      );

      setConfig({
        ...loadedConfig,
        customers: {
          eyebrow: "TRUSTED PARTNERS",
          heading: "Our Customers",
          description: "Trusted by businesses across different industries.",
          animationEnabled: true,
          animationSpeed: 30,
          items: [],
          ...loadedConfig.customers,
        },
      });
    } catch (error) {
      console.error("Gagal memuat konfigurasi CorpPro:", error);
    }
  }, []);

  const updateSection = (section, field, value) => {
    setConfig((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }));

    setSaved(false);
  };

  const updateRoot = (field, value) => {
    setConfig((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
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

    setSaved(false);
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

    setSaved(false);
  };

  const addArrayItem = (section, field, item) => {
    setConfig((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: [...current[section][field], item],
      },
    }));

    setSaved(false);
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

    setSaved(false);
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

    setSaved(false);
  };

  const updateSectionSetting = (id, field, value) => {
    setSectionSettings((current) =>
      current.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
    setSaved(false);
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
    setSaved(false);
  };

  const sortedSections = sectionSettings
    .map((setting) => ({
      ...sectionDefinitions.find((section) => section.id === setting.id),
      ...setting,
    }))
    .filter((section) => section.icon)
    .sort((a, b) => a.order - b.order);

  const handleSave = () => {
    if (!config) {
      alert("Konfigurasi belum siap.");
      return;
    }

    try {
      saveCorpProConfig({
        ...config,
        editorSections: sectionSettings,
      });
      setSaved(true);
      alert("CorpPro berhasil disimpan!");
    } catch (error) {
      console.error("SAVE ERROR:", error);
      alert(`Gagal menyimpan: ${error.message}`);
    }
  };

  const activeLabel =
    sectionSettings.find((section) => section.id === activeSection)?.label ??
    sectionDefinitions.find((section) => section.id === activeSection)?.label ??
    "";

  const renderEditor = () => {
    switch (activeSection) {
      case "header":
        return (
          <div className="space-y-5">
            <SectionCard
              title="Website Identity"
              description="Atur identitas website CorpPro."
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

            <SectionCard
              title="Navigation Menu"
              description="Atur menu navigasi di bagian atas website."
            >
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
                        updateArrayItem("header", "navigation", index, "label", value)
                      }
                    />

                    <Field
                      label="Link"
                      value={item.href}
                      onChange={(value) =>
                        updateArrayItem("header", "navigation", index, "href", value)
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
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
                onChange={(value) => updateSection("hero", "badgeText", value)}
              />

              <Field
                label="Main Heading"
                value={config.hero.heading}
                onChange={(value) => updateSection("hero", "heading", value)}
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
              description="Pilih foto atau video untuk background Hero."
            >
              <MediaPicker
                label="Upload Background"
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

            <SectionCard
              title="Background Appearance"
              description="Atur posisi media dan transparansi overlay."
            >
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

                <div className="flex justify-between text-xs text-slate-400">
                  <span>Media lebih terlihat</span>
                  <span>Overlay lebih kuat</span>
                </div>
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
              description="Tambahkan logo pelanggan yang ingin ditampilkan di website."
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
                        className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
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
                        className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ChevronDown size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("customers", "items", index)
                        }
                        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
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

                  <MediaPicker
                    label="Customer Logo"
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
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

            <SectionCard
              title="Marquee Animation"
              description="Atur pergerakan logo pelanggan di halaman website."
            >
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

                <div className="flex justify-between text-xs text-slate-400">
                  <span>Lebih cepat</span>
                  <span>Lebih lambat</span>
                </div>
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

            <SectionCard
              title="Service Items"
              description="Kelola kartu layanan yang tampil di website."
            >
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
                      updateArrayItem("services", "items", index, "title", value)
                    }
                  />

                  <TextArea
                    label="Description"
                    value={item.description}
                    onChange={(value) =>
                      updateArrayItem("services", "items", index, "description", value)
                    }
                  />

                  <Field
                    label="Icon Name"
                    value={item.icon}
                    placeholder="BriefcaseBusiness"
                    onChange={(value) =>
                      updateArrayItem("services", "items", index, "icon", value)
                    }
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Button Text"
                      value={item.buttonText}
                      onChange={(value) =>
                        updateArrayItem("services", "items", index, "buttonText", value)
                      }
                    />

                    <Field
                      label="Button Link"
                      value={item.buttonHref}
                      onChange={(value) =>
                        updateArrayItem("services", "items", index, "buttonHref", value)
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <Plus size={16} />
                Tambah Service
              </button>
            </SectionCard>
          </div>
        );

      
    case "whyChooseUs": {
        const visionMission =
          config.whyChooseUs.visionMission ?? {
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

          setSaved(false);
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
              description="Tambahkan visi dan misi perusahaan. Gambar dan hover content bersifat opsional."
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
                      placeholder={`Our ${type}`}
                    />

                    <TextArea
                      label="Description"
                      value={item.description}
                      onChange={(value) =>
                        updateVisionMission(type, "description", value)
                      }
                      placeholder={`Tulis ${type} perusahaan...`}
                    />

                    <TextArea
                      label="Hover Content"
                      value={item.hoverContent}
                      onChange={(value) =>
                        updateVisionMission(type, "hoverContent", value)
                      }
                      placeholder="Tulis konten tambahan yang muncul saat hover..."
                      rows={3}
                    />

                    <MediaPicker
                      label={`${type} Image (Optional)`}
                      value={item.image}
                      onChange={(value) =>
                        updateVisionMission(type, "image", value)
                      }
                    />

                    {item.image && (
                      <button
                        type="button"
                        onClick={() =>
                          updateVisionMission(type, "image", null)
                        }
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove Image
                      </button>
                    )}
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

                <p className="text-xs leading-5 text-slate-500">
                  Durasi transisi hover. Contoh: 400 ms untuk animasi yang
                  smooth dan responsif.
                </p>
              </div>
            </SectionCard>

            <SectionCard
              title="Benefits"
              description="Daftar keunggulan perusahaan."
            >
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

                      setSaved(false);
                    }}
                  />
                </ItemCard>
              ))}

              <button
                type="button"
                onClick={() =>
                  addArrayItem("whyChooseUs", "benefits", "New Benefit")
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
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

            <SectionCard
              title="Project Items"
              description="Tambah dan kelola portfolio proyek."
            >
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
                      updateArrayItem("projects", "items", index, "title", value)
                    }
                  />

                  <Field
                    label="Category"
                    value={item.category}
                    onChange={(value) =>
                      updateArrayItem("projects", "items", index, "category", value)
                    }
                  />

                  <Field
                    label="Image URL"
                    value={item.image}
                    onChange={(value) =>
                      updateArrayItem("projects", "items", index, "image", value)
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
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
              <div className="grid gap-3">
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
              </div>
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

            <SectionCard title="Quick Links">
              {config.footer.quickLinks.map((item, index) => (
                <ItemCard
                  key={index}
                  title="Quick Link"
                  index={index}
                  onRemove={() =>
                    removeArrayItem("footer", "quickLinks", index)
                  }
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Label"
                      value={item.label}
                      onChange={(value) =>
                        updateArrayItem("footer", "quickLinks", index, "label", value)
                      }
                    />

                    <Field
                      label="Link"
                      value={item.href}
                      onChange={(value) =>
                        updateArrayItem("footer", "quickLinks", index, "href", value)
                      }
                    />
                  </div>
                </ItemCard>
              ))}

              <button
                type="button"
                onClick={() =>
                  addArrayItem("footer", "quickLinks", {
                    label: "New Link",
                    href: "#",
                  })
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                <Plus size={16} />
                Tambah Quick Link
              </button>
            </SectionCard>

            <SectionCard title="Resources">
              {config.footer.resources.map((item, index) => (
                <ItemCard
                  key={index}
                  title="Resource"
                  index={index}
                  onRemove={() =>
                    removeArrayItem("footer", "resources", index)
                  }
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Label"
                      value={item.label}
                      onChange={(value) =>
                        updateArrayItem("footer", "resources", index, "label", value)
                      }
                    />

                    <Field
                      label="Link"
                      value={item.href}
                      onChange={(value) =>
                        updateArrayItem("footer", "resources", index, "href", value)
                      }
                    />
                  </div>
                </ItemCard>
              ))}

              <button
                type="button"
                onClick={() =>
                  addArrayItem("footer", "resources", {
                    label: "New Resource",
                    href: "#",
                  })
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                <Plus size={16} />
                Tambah Resource
              </button>
            </SectionCard>

            <SectionCard title="Social Media">
              {config.footer.socials.map((item, index) => (
                <ItemCard
                  key={index}
                  title="Social Media"
                  index={index}
                  onRemove={() =>
                    removeArrayItem("footer", "socials", index)
                  }
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Platform"
                      value={item.platform}
                      onChange={(value) =>
                        updateArrayItem("footer", "socials", index, "platform", value)
                      }
                    />

                    <Field
                      label="URL"
                      value={item.href}
                      onChange={(value) =>
                        updateArrayItem("footer", "socials", index, "href", value)
                      }
                    />
                  </div>
                </ItemCard>
              ))}

              <button
                type="button"
                onClick={() =>
                  addArrayItem("footer", "socials", {
                    platform: "Instagram",
                    href: "",
                  })
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                <Plus size={16} />
                Tambah Social Media
              </button>
            </SectionCard>

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

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoaderCircle className="animate-spin text-blue-600" size={28} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 scrollbar-hide">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/templates"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              aria-label="Back to templates"
            >
              <ArrowLeft size={17} />
            </Link>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                Manage Template
              </p>
              <p className="text-xs text-slate-500">CorpPro / Corporate</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/templates/corppro/preview"
              target="_blank"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Eye size={16} />
              <span className="hidden sm:inline">Preview</span>
            </Link>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-white p-4 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:overflow-y-auto scrollbar-hide lg:border-r lg:border-b-0 lg:p-5">
          <div className="mb-4">
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Template Sections
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              CorpPro Editor
            </h2>
          </div>

          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {sortedSections.map((section, index) => {
              const Icon = section.icon;
              const active = activeSection === section.id;

              return (
                <div
                  key={section.id}
                  className={`flex items-center gap-1 rounded-lg pr-1 transition ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  } ${!section.visible ? "opacity-60" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-left text-sm font-medium"
                  >
                    <Icon size={17} className="shrink-0" />
                    <span className="truncate">{section.label}</span>
                    {!section.visible && (
                      <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-slate-400">
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

          <div className="mt-6 hidden rounded-lg border border-slate-200 bg-slate-50 p-3 lg:block">
            <p className="text-xs font-semibold text-slate-700">
              Editing Template
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">CorpPro</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Perubahan disimpan sebagai konfigurasi template.
            </p>
          </div>
        </aside>

        <main className="min-w-0 p-4 sm:p-6 lg:p-8 scrollbar-hide">
          <div className="mx-auto max-w-4xl space-y-6">
            <div>
              <p className="text-sm text-slate-500">
                Templates / Corporate / CorpPro
              </p>

              <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    {activeLabel}
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Kelola konten dan konfigurasi section {activeLabel}.
                  </p>
                  {sectionSettings.find(
                    (section) => section.id === activeSection
                  )?.visible === false && (
                    <p className="mt-2 text-xs font-medium text-amber-700">
                      Section ini sedang disembunyikan dari pengaturan sidebar.
                    </p>
                  )}
                </div>

                {saved && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                    <Check size={16} />
                    Tersimpan
                  </span>
                )}
              </div>
            </div>

            <SectionCard
              title="Section Settings"
              description="Ubah nama yang tampil di sidebar dan atur apakah section ditampilkan pada website."
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
                    Menyembunyikan section tidak menghapus konten yang sudah diisi.
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
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
