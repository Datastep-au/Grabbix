import { useEffect } from "react";
import Navigation from "@/components/sections/navigation";
import Hero from "@/components/sections/hero";
import ProductsShowcase from "@/components/sections/products-showcase";
import VideoShowcase from "@/components/sections/video-showcase";
import HowItWorks from "@/components/sections/how-it-works";
import Benefits from "@/components/sections/benefits";
import UseCases from "@/components/sections/use-cases";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import SEOHead from "@/components/seo/SEOHead";

export default function Home() {
  useEffect(() => {
    // Handle hash navigation when coming from external links
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Wait a bit for the page to fully load
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Grabbix",
    "url": "https://grabbix.com",
    "logo": "https://grabbix.com/attached_assets/Grabbix Logo small_1750991127164.png",
    "description": "AI-powered smart store solutions for offices, apartments, and shared spaces",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Melbourne",
      "addressRegion": "Victoria",
      "addressCountry": "AU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+61-4311-854-35",
      "contactType": "sales",
      "email": "info@grabbix.com.au"
    },
    "sameAs": [
      "https://linkedin.com/company/grabbix",
      "https://twitter.com/grabbix"
    ]
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Grabbix - Smart Store Solutions | Where Convenience Meets Innovation"
        description="Australia's leading AI-powered smart fridges and micro markets for offices, apartments, and shared spaces. Experience frictionless checkout, 24/7 autonomous retail solutions, and fully managed service across Melbourne and beyond."
        keywords="smart retail Australia, autonomous stores Melbourne, micro markets office, smart fridges apartments, AI retail technology, vending machines contactless, smart store solutions, office amenities Australia, Melbourne retail technology, contactless shopping"
        canonical="https://grabbix.com.au/"
        jsonLd={homeJsonLd}
      />
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
