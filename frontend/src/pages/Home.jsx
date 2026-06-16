import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Courses from "@/components/site/Courses";
import Learning from "@/components/site/Learning";
import Gurus from "@/components/site/Gurus";
import Gallery from "@/components/site/Gallery";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]" data-testid="home-page">
      <Navbar />
      <Hero />
      <About />
      <Courses />
      <Learning />
      <Gurus />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
