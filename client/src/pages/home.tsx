import Navigation from "@/components/sections/navigation";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import Products from "@/components/sections/products";
import Benefits from "@/components/sections/benefits";
import UseCases from "@/components/sections/use-cases";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Products />
      <Benefits />
      <UseCases />
      <Contact />
      <Footer />
    </div>
  );
}
