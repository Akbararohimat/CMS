"use client";

import { useEffect, useState } from "react";
import { ImagePlus, Film, Trash2, Upload, LoaderCircle } from "lucide-react";
import { getMediaFile, saveMediaFile } from "../../../../../lib/media-storage";

export default function MediaPicker({
  label = "Background Media",
  value,
  onChange,
}) {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let objectUrl;

    async function loadPreview() {
      if (!value?.id) {
        setPreview("");
        return;
      }

      try {
        const file = await getMediaFile(value.id);

        if (!file) {
          setError("File tidak ditemukan di penyimpanan browser.");
          return;
        }

        objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      } catch {
        setError("Gagal memuat media.");
      }
    }

    loadPreview();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [value?.id]);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    const validType =
      file.type.startsWith("image/") ||
      file.type.startsWith("video/");

    if (!validType) {
      setError("File harus berupa gambar atau video.");
      event.target.value = "";
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("Ukuran file maksimal 50 MB.");
      event.target.value = "";
      return;
    }

    setLoading(true);

    try {
      const media = await saveMediaFile(file);

      onChange(media);
    } catch (error) {
      console.error("Gagal menyimpan media:", error);
      setError("Gagal menyimpan file. Silakan coba lagi.");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  const isVideo = value?.type?.startsWith("video/");

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="mt-1 text-xs text-slate-500">
          Pilih gambar atau video maksimal 50 MB.
        </p>
      </div>

      {preview ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {isVideo ? (
            <video
              src={preview}
              controls
              className="h-52 w-full bg-black object-contain"
            />
          ) : (
            <img
              src={preview}
              alt="Media preview"
              className="h-52 w-full object-contain"
            />
          )}

          <div className="flex items-center justify-between gap-3 border-t border-slate-200 p-3">
            <div className="flex min-w-0 items-center gap-2">
              {isVideo ? (
                <Film size={17} className="shrink-0 text-slate-500" />
              ) : (
                <ImagePlus size={17} className="shrink-0 text-slate-500" />
              )}

              <span className="truncate text-xs text-slate-600">
                {value?.name}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onChange(null);
                setPreview("");
              }}
              className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
            >
              <Trash2 size={14} />
              Hapus
            </button>
          </div>
        </div>
      ) : (
        <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
          {loading ? (
            <LoaderCircle
              size={26}
              className="animate-spin text-blue-600"
            />
          ) : (
            <Upload size={26} className="text-slate-400" />
          )}

          <span className="mt-3 text-sm font-semibold text-slate-700">
            {loading ? "Menyimpan media..." : "Pilih foto atau video"}
          </span>

          <span className="mt-1 text-xs text-slate-500">
            PNG, JPG, WEBP, MP4, WEBM
          </span>

          <input
            type="file"
            accept="image/*,video/mp4,video/webm"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
          />
        </label>
      )}

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}