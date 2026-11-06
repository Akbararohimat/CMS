"use client";

import { useEffect, useState } from "react";
import { getCorpProConfig } from "../../../../lib/site-config";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

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

export default function CorpProPReviewPage() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setConfig(getCorpProConfig());
  }, []);

  if (!config) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Loading preview...</p>
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
    .filter((section) => section.visible !== false)
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
            scetionLabel={section.label}
          />
        );
      })}
    </main>
  );
}