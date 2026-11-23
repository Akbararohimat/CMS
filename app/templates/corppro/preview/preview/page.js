"use client";

import { useEffect, useState } from "react";
import { getCorpProTemplateConfig } from "../../../../lib/site-config";
import CorpProRenderer from "./CorpProRenderer";

export default function CorpProPreviewPage() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setConfig(getCorpProTemplateConfig());
  }, []);

  if (!config) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-500">
          Loading preview...
        </p>
      </main>
    );
  }

  return <CorpProRenderer config={config} />;
}
