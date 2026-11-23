
import Header from "../components/Header";
import Hero from "../components/Hero";
import QuickAccess from "../components/QuickAccess";
import About from "../components/About";
import Values from "../components/Values";
import Services from "../components/Services";
import Information from "../components/Information";
import Announcements from "../components/Announcements";
import Agenda from "../components/Agenda";
import Transparency from "../components/Transparency";
import Footer from "../components/Footer";

import govConnectConfig from "../../../../backend/database/seeders/data/govconnect-template-master.json";

export default function GovConnectPreviewPage() {
  const config = govConnectConfig;

  return (
    <main className="min-h-screen bg-white font-sans">
      <Header config={config} />
      <Hero config={config} />
      <QuickAccess config={config} />
      <About config={config} />
      <Values config={config} />
      <Services config={config} />
      <Information config={config} />
      <Announcements config={config} />
      <Agenda config={config} />
      <Transparency config={config} />
      <Footer config={config} />
    </main>
  );
}
