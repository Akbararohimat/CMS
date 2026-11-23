"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  Building2,
  LayoutTemplate,
  FileText,
  Link2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  Info,
  Plus,
} from "lucide-react";

async function fetchAllPages(endpoint) {
  const allItems = [];
  let page = 1;
  let lastPage = 1;

  do {
    const response = await fetch(`${endpoint}?page=${page}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    const responseText = await response.text();

    let result;

    try {
      result = responseText ? JSON.parse(responseText) : null;
    } catch {
      throw new Error(
        `${endpoint} mengembalikan respons yang bukan JSON (HTTP ${response.status}).`
      );
    }

    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Gagal mengambil data dari ${endpoint} (HTTP ${response.status}).`
      );
    }

    if (!result || typeof result !== "object") {
      throw new Error(
        `${endpoint} mengembalikan respons kosong (HTTP ${response.status}).`
      );
    }

    allItems.push(
      ...(Array.isArray(result.data) ? result.data : [])
    );

    lastPage = Number(result.last_page) || 1;
    page++;
  } while (page <= lastPage);

  return allItems;
}

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CreateWebsitePage() {
  const [customers, setCustomers] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    template_id: "",
    name: "",
    slug: "",
    domain: "",
    status: "draft",
  });

  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState({});

  async function fetchFormOptions() {
    try {
      setLoading(true);
      setError("");

      const [customerData, templateData] = await Promise.all([
        fetchAllPages("/api/customers"),
        fetchAllPages("/api/templates"),
      ]);

      setCustomers(
        customerData.filter(
          (customer) => customer.status === "active"
        )
      );

      setTemplates(
        templateData.filter(
          (template) => template.is_active
        )
      );
    } catch (err) {
      setError(
        err.message ||
          "Gagal mengambil data customer dan template."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFormOptions();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => {
      const updated = {
        ...previous,
        [name]: value,
      };

      if (name === "name" && !slugEdited) {
        updated.slug = createSlug(value);
      }

      return updated;
    });

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setNotice("");
  }

  function handleSlugChange(event) {
    const value = createSlug(event.target.value);

    setSlugEdited(true);

    setForm((previous) => ({
      ...previous,
      slug: value,
    }));

    setErrors((previous) => ({
      ...previous,
      slug: "",
    }));

    setNotice("");
  }

  function validateForm() {
    const newErrors = {};

    if (!form.customer_id) {
      newErrors.customer_id =
        "Pilih customer terlebih dahulu.";
    }

    if (!form.template_id) {
      newErrors.template_id =
        "Pilih template website.";
    }

    if (!form.name.trim()) {
      newErrors.name =
        "Nama website wajib diisi.";
    }

    if (!form.slug.trim()) {
      newErrors.slug =
        "Slug website wajib diisi.";
    } else if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)
    ) {
      newErrors.slug =
        "Slug hanya boleh menggunakan huruf kecil, angka, dan tanda hubung.";
    }

    if (
      form.domain.trim() &&
      !/^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
        form.domain.trim()
      )
    ) {
      newErrors.domain =
        "Masukkan domain yang valid, contoh: example.com.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNotice("");

    if (!validateForm()) return;

    setNotice(
      "Form sudah valid. Integrasi penyimpanan website akan dibuat pada tahap berikutnya."
    );
  }

  const selectedCustomer = customers.find(
    (customer) =>
      String(customer.id) === form.customer_id
  );

  const selectedTemplate = templates.find(
    (template) =>
      String(template.id) === form.template_id
  );

  return (
    <main className="min-h-screen bg-[#F7F8FC] p-6 text-slate-900 md:p-8">
      <div className="mx-auto max-w-5xl space-y-7">

        {/* Header */}
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
            <Globe size={16} />
            <span>CMS COMTRONICS</span>
            <span>/</span>

            <Link
              href="/websites"
              className="transition hover:text-[#102C62]"
            >
              Websites
            </Link>

            <span>/</span>
            <span className="text-[#102C62]">
              Add Website
            </span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#102C62]">
                Add New Website
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Tambahkan website baru untuk customer.
              </p>
            </div>

            <Link
              href="/websites"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft size={16} />
              Back to Websites
            </Link>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center">
            <RefreshCw
              size={26}
              className="animate-spin text-[#102C62]"
            />

            <p className="mt-4 text-sm font-semibold text-slate-700">
              Memuat data form...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Mengambil customer dan template dari server.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
            <AlertCircle
              size={30}
              className="mx-auto text-red-500"
            />

            <h2 className="mt-3 font-semibold text-slate-800">
              Gagal memuat data
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchFormOptions}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#102C62] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193D7D]"
            >
              <RefreshCw size={15} />
              Coba Lagi
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Empty Options */}
            {(customers.length === 0 ||
              templates.length === 0) && (
              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <Info
                  size={19}
                  className="mt-0.5 shrink-0 text-amber-600"
                />

                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    Data belum lengkap
                  </p>

                  <p className="mt-1 text-sm leading-6 text-amber-700">
                    {customers.length === 0 &&
                    templates.length === 0
                      ? "Belum ada customer aktif dan template aktif yang tersedia."
                      : customers.length === 0
                      ? "Belum ada customer aktif. Tambahkan atau aktifkan customer terlebih dahulu."
                      : "Belum ada template aktif yang dapat digunakan."}
                  </p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Website Information */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#102C62]">
                      <Globe size={19} />
                    </div>

                    <div>
                      <h2 className="font-bold text-[#102C62]">
                        Website Information
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Informasi dasar website yang akan dibuat.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-6">

                  {/* Website Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Website Name
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FileText
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Contoh: PT KMK Plastics Indonesia"
                        className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#102C62] ${
                          errors.name
                            ? "border-red-300"
                            : "border-slate-200"
                        }`}
                      />
                    </div>

                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Slug */}
                  <div>
                    <label
                      htmlFor="slug"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Website Slug
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Link2
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="slug"
                        name="slug"
                        type="text"
                        value={form.slug}
                        onChange={handleSlugChange}
                        placeholder="pt-kmk-plastics-indonesia"
                        className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#102C62] ${
                          errors.slug
                            ? "border-red-300"
                            : "border-slate-200"
                        }`}
                      />
                    </div>

                    {errors.slug ? (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.slug}
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs text-slate-400">
                        Slug dibuat otomatis dari nama website dan bisa diedit.
                      </p>
                    )}
                  </div>

                  {/* Domain */}
                  <div>
                    <label
                      htmlFor="domain"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Custom Domain
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        (Optional)
                      </span>
                    </label>

                    <div className="relative">
                      <Globe
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="domain"
                        name="domain"
                        type="text"
                        value={form.domain}
                        onChange={handleChange}
                        placeholder="www.example.com"
                        className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#102C62] ${
                          errors.domain
                            ? "border-red-300"
                            : "border-slate-200"
                        }`}
                      />
                    </div>

                    {errors.domain ? (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.domain}
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs text-slate-400">
                        Domain bisa ditambahkan atau dikonfigurasi kemudian.
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Assignment */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#102C62]">
                      <Building2 size={19} />
                    </div>

                    <div>
                      <h2 className="font-bold text-[#102C62]">
                        Website Assignment
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Tentukan customer dan template website.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 p-6">

                  {/* Customer */}
                  <div>
                    <label
                      htmlFor="customer_id"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Select Customer
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Building2
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        id="customer_id"
                        name="customer_id"
                        value={form.customer_id}
                        onChange={handleChange}
                        disabled={customers.length === 0}
                        className={`w-full appearance-none rounded-xl border bg-white py-3 pl-10 pr-10 text-sm outline-none transition focus:border-[#102C62] disabled:cursor-not-allowed disabled:bg-slate-50 ${
                          errors.customer_id
                            ? "border-red-300"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="">
                          Select a customer
                        </option>

                        {customers.map((customer) => (
                          <option
                            key={customer.id}
                            value={String(customer.id)}
                          >
                            {customer.company_name}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>

                    {errors.customer_id && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.customer_id}
                      </p>
                    )}

                    {selectedCustomer && (
                      <div className="mt-3 rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          Contact Person
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {selectedCustomer.contact_name || "-"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Template */}
                  <div>
                    <label
                      htmlFor="template_id"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Select Template
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <LayoutTemplate
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        id="template_id"
                        name="template_id"
                        value={form.template_id}
                        onChange={handleChange}
                        disabled={templates.length === 0}
                        className={`w-full appearance-none rounded-xl border bg-white py-3 pl-10 pr-10 text-sm outline-none transition focus:border-[#102C62] disabled:cursor-not-allowed disabled:bg-slate-50 ${
                          errors.template_id
                            ? "border-red-300"
                            : "border-slate-200"
                        }`}
                      >
                        <option value="">
                          Select a template
                        </option>

                        {templates.map((template) => (
                          <option
                            key={template.id}
                            value={String(template.id)}
                          >
                            {template.name} — {template.category}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>

                    {errors.template_id && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.template_id}
                      </p>
                    )}

                    {selectedTemplate && (
                      <div className="mt-3 rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          Template Category
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {selectedTemplate.category}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Status */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#102C62]">
                      <CheckCircle2 size={19} />
                    </div>

                    <div>
                      <h2 className="font-bold text-[#102C62]">
                        Website Status
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Tentukan status awal website.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Initial Status
                  </label>

                  <div className="relative max-w-md">
                    <select
                      id="status"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-[#102C62]"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Status default adalah Draft.
                  </p>
                </div>
              </section>

              {/* Notice */}
              {notice && (
                <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <Info
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-sm leading-6 text-blue-700">
                    {notice}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs text-slate-400">
                  <span className="text-red-500">*</span> Required fields
                </p>

                <div className="flex items-center gap-3">
                  <Link
                    href="/websites"
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={
                      customers.length === 0 ||
                      templates.length === 0
                    }
                    className="flex items-center gap-2 rounded-xl bg-[#102C62] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#193D7D] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={17} />
                    Create Website
                  </button>
                </div>
              </div>

            </form>
          </>
        )}
      </div>
    </main>
  );
}
