"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Save,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const initialForm = {
  company_name: "",
  contact_name: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
  status: "active",
};

export default function CreateClientPage() {
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setFieldErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 422 && result.errors) {
          setFieldErrors(result.errors);
          setError(
            result.message || "Periksa kembali data yang dimasukkan."
          );
          return;
        }

        if (response.status === 401) {
          setError("Sesi login berakhir. Silakan login kembali.");
          return;
        }

        throw new Error(
          result.message || "Gagal menambahkan client."
        );
      }

      router.push("/clients");
      router.refresh();
    } catch (err) {
      setError(
        err.message || "Terjadi kesalahan saat menyimpan client."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] p-6 text-slate-900 md:p-8">
      <div className="mx-auto max-w-5xl space-y-7">

        {/* Header */}
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
            <Building2 size={16} />
            <span>CMS COMTRONICS</span>
            <span>/</span>
            <Link
              href="/clients"
              className="transition hover:text-[#102C62]"
            >
              Clients
            </Link>
            <span>/</span>
            <span className="text-slate-700">Add Client</span>
          </div>

          <Link
            href="/clients"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#102C62]"
          >
            <ArrowLeft size={16} />
            Back to Clients
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-[#102C62]">
            Add New Client
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Tambahkan informasi perusahaan pelanggan ke CMS COMTRONICS.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div>
              <p className="text-sm font-semibold text-red-700">
                Gagal menyimpan data
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Company Information */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#102C62]">
                  <Building2 size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-[#102C62]">
                    Company Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Informasi dasar perusahaan pelanggan.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 p-6">

              <FormField
                label="Company Name"
                required
                icon={Building2}
                error={fieldErrors.company_name?.[0]}
              >
                <input
                  name="company_name"
                  value={form.company_name}
                  onChange={handleChange}
                  placeholder="Contoh: PT Comtronics Systems"
                  required
                  maxLength={255}
                  className={inputClass(fieldErrors.company_name)}
                />
              </FormField>

              <FormField
                label="Contact Person"
                icon={User}
                error={fieldErrors.contact_name?.[0]}
              >
                <input
                  name="contact_name"
                  value={form.contact_name}
                  onChange={handleChange}
                  placeholder="Nama PIC perusahaan"
                  maxLength={255}
                  className={inputClass(fieldErrors.contact_name)}
                />
              </FormField>

              <FormField
                label="Email Address"
                icon={Mail}
                error={fieldErrors.email?.[0]}
              >
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="contact@company.com"
                  maxLength={255}
                  className={inputClass(fieldErrors.email)}
                />
              </FormField>

              <FormField
                label="Phone Number"
                icon={Phone}
                error={fieldErrors.phone?.[0]}
              >
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+62 812 xxxx xxxx"
                  maxLength={30}
                  className={inputClass(fieldErrors.phone)}
                />
              </FormField>

              <div className="col-span-2">
                <FormField
                  label="Company Address"
                  icon={MapPin}
                  error={fieldErrors.address?.[0]}
                >
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Masukkan alamat lengkap perusahaan..."
                    rows={3}
                    className={`${inputClass(fieldErrors.address)} resize-y`}
                  />
                </FormField>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#EEF2FA] text-[#102C62]">
                  <FileText size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-[#102C62]">
                    Additional Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Status dan catatan internal pelanggan.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 p-6">

              <FormField
                label="Client Status"
                error={fieldErrors.status?.[0]}
              >
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={inputClass(fieldErrors.status)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </FormField>

              <div className="col-span-2">
                <FormField
                  label="Internal Notes"
                  icon={FileText}
                  error={fieldErrors.notes?.[0]}
                >
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Catatan tambahan mengenai pelanggan..."
                    rows={4}
                    className={`${inputClass(fieldErrors.notes)} resize-y`}
                  />
                </FormField>
              </div>
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-4">
            <p className="text-xs text-slate-500">
              <span className="text-red-500">*</span> Wajib diisi
            </p>

            <div className="flex items-center gap-3">
              <Link
                href="/clients"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-[#102C62] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193D7D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Client
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function FormField({
  label,
  required = false,
  icon: Icon,
  error,
  children,
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
        {Icon && (
          <Icon size={14} className="text-slate-400" />
        )}

        {label}

        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      {children}

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(error) {
  return `w-full rounded-xl border ${
    error ? "border-red-300" : "border-slate-200"
  } bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#102C62] focus:ring-2 focus:ring-[#102C62]/10`;
}
