import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBar from "@/components/MarqueeBar";
import Products from "@/components/Products";
import Features from "@/components/Features";
import Ingredients from "@/components/Ingredients";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-cream">
      <Navbar />
      <Hero />
      <MarqueeBar />
      <Products />
      <Features />
      <Ingredients />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
