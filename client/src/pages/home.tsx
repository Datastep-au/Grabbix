import Navigation from "@/components/sections/navigation";
import Hero from "@/components/sections/hero";
import ProductsShowcase from "@/components/sections/products-showcase";
import VideoShowcase from "@/components/sections/video-showcase";
import HowItWorks from "@/components/sections/how-it-works";
import Benefits from "@/components/sections/benefits";
import UseCases from "@/components/sections/use-cases";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProductsShowcase />
      <VideoShowcase />
      <HowItWorks />
      <Benefits />
      <UseCases />
      <Contact />
      <Footer />
    </div>
  );
}
