
"use client";

import { useEffect, useState } from "react";
import { getKmkWebsiteConfig } from "../../lib/site-config";

import Header from "../templates/corppro/preview/components/Header";
import Hero from "../templates/corppro/preview/components/Hero";
import About from "../templates/corppro/preview/components/About";
import Services from "../templates/corppro/preview/components/Services";
import WhyChooseUs from "../templates/corppro/preview/components/WhyChooseUs";
import Projects from "../templates/corppro/preview/components/Projects";
import Testimonials from "../templates/corppro/preview/components/Testimonials";
import CTA from "../templates/corppro/preview/components/CTA";
import Footer from "../templates/corppro/preview/components/Footer";

const sectionComponents = {
  header: Header,
  hero: Hero,
  about: About,
  services: Services,
  whyChooseUs: WhyChooseUs,
  projects: Projects,
  testimonials: Testimonials,
  cta: CTA,
  footer: Footer,
};

export default function KmkPreviewPage() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setConfig(getKmkWebsiteConfig());
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

  const editorSections = Array.isArray(config.editorSections)
    ? config.editorSections
    : Object.keys(sectionComponents).map((id, index) => ({
        id,
        label: id,
        visible: true,
        order: index,
      }));

  const orderedSections = [...editorSections]
    .filter(
      (section) =>
        section.id !== "customers" &&
        section.visible !== false
    )
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-white font-sans">
      {orderedSections.map((section) => {
        const SectionComponent = sectionComponents[section.id];

        if (!SectionComponent) return null;

        return (
          <SectionComponent
            key={section.id}
            config={config}
            sectionLabel={section.label}
          />
        );
      })}
    </main>
  );
}
