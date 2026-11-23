"use client";

import { useState } from "react";

const DB_NAME = "cms-comtronics-media";
const STORE_NAME = "media";
const DB_VERSION = 1;

export default function BackupMediaPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleBackup() {
    setLoading(true);
    setStatus("Membaca IndexedDB...");

    let db;

    try {
      db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      const records = await new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const request = transaction.objectStore(STORE_NAME).getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      if (!records.length) {
        setStatus("Tidak ada media ditemukan.");
        return;
      }

      let success = 0;

      for (let i = 0; i < records.length; i++) {
        const media = records[i];

        if (!(media.file instanceof Blob)) continue;

        const url = URL.createObjectURL(media.file);
        const link = document.createElement("a");

        link.href = url;
        link.download = media.name || `media-${i + 1}`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(url), 60000);

        success++;

        setStatus(
          `Mengunduh ${success} dari ${records.length} media...`
        );

        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const metadata = records.map(({ file, ...item }) => item);
      const jsonBlob = new Blob(
        [JSON.stringify(metadata, null, 2)],
        { type: "application/json" }
      );

      const jsonUrl = URL.createObjectURL(jsonBlob);
      const jsonLink = document.createElement("a");

      jsonLink.href = jsonUrl;
      jsonLink.download = "ptkmk-media-metadata.json";
      jsonLink.click();

      setTimeout(() => URL.revokeObjectURL(jsonUrl), 60000);

      setStatus(
        `Selesai. ${success} file media berhasil diproses dari ${records.length} data.`
      );
    } catch (error) {
      console.error(error);
      setStatus("Backup gagal: " + error.message);
    } finally {
      db?.close();
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl space-y-5 p-8">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Backup Website Media
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Download seluruh gambar dan video yang tersimpan
          di IndexedDB CMS Comtronics.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 p-5">
        <p className="text-sm text-slate-600">
          Database: cms-comtronics-media
        </p>

        <button
          type="button"
          onClick={handleBackup}
          disabled={loading}
          className="mt-4 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Download Backup Media"}
        </button>

        {status && (
          <p className="mt-4 text-sm text-slate-700">
            {status}
          </p>
        )}
      </div>
    </main>
  );
}
