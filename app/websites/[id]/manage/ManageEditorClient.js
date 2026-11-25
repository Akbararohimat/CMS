"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CorpProManageEditorClient from "./CorpProManageEditorClient";
import StayoraManageEditorClient from "./StayoraManageEditorClient";

export default function ManageEditorClient() {
    const params = useParams();
    const websiteId = params.id;
    const [templateSlug, setTemplateSlug] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!websiteId) return;

        let cancelled = false;

        async function loadWebsite() {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    `/api/websites/${encodeURIComponent(websiteId)}`,
                    { cache: "no-store"}
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Gagal mengambil data website."
                    );
                }

                const slug = result.data?.template?.slug;

                if (!slug) {
                    throw new Error("Template website tidak ditemukan.");
                }

                if (!cancelled) {
                    setTemplateSlug(slug);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || "Gagal memuat editor website.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadWebsite();

        return () => {
            cancelled = true;
        };
    }, [websiteId]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-sm text-slate-500">
                    Memuat editor website...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screnn items-center justify-center bg-slate-50 p-6">
                <div className="max-w-md text-center">
                    <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
            </main>
        );
    }

    if (templateSlug === "stayora") {
        return <StayoraManageEditorClient />;
    }

    return <CorpProManageEditorClient />;
}