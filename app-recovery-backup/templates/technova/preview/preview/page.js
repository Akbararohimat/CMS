import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function TechNovaPreviewPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />
      <Hero />
      <About/>
      <Services/>
      <Projects/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </main>
  );
}