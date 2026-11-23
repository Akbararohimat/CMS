
"use client";

import { useState } from "react";
import { Download, FileJson, CheckCircle2 } from "lucide-react";

export default function BackupConfigPage() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleBackup() {
    setLoading(true);
    setStatus("");

    try {
      const STORAGE_KEY = "corppro-site-config";
      const savedConfig = localStorage.getItem(STORAGE_KEY);

      if (!savedConfig) {
        throw new Error("Konfigurasi CorpPro tidak ditemukan.");
      }

      const config = JSON.parse(savedConfig);

      if (!config.siteName || !config.hero || !config.header) {
        throw new Error("Struktur konfigurasi tidak lengkap.");
      }

      const json = JSON.stringify(config, null, 2);

      const blob = new Blob([json], {
        type: "application/json;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "ptkmk-backup.json";

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);

      setStatus(
        `Berhasil! ${Object.keys(config).length} bagian konfigurasi diekspor.`
      );
    } catch (error) {
      console.error("Backup config gagal:", error);
      setStatus("Gagal: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-8">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Backup Website Configuration
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Export konfigurasi website PT KMK langsung dari LocalStorage.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <FileJson size={28} className="text-blue-600" />
          <div>
            <p className="font-medium text-slate-900">
              PT KMK Configuration
            </p>
            <p className="text-xs text-slate-500">
              corppro-site-config
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleBackup}
          disabled={loading}
          className="mt-6 flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          <Download size={16} />
          {loading ? "Mengekspor..." : "Download Config JSON"}
        </button>

        {status && (
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-700">
            <CheckCircle2 size={17} className="text-green-600" />
            {status}
          </div>
        )}
      </div>
    </main>
  );
}
