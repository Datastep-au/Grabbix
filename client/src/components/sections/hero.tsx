import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/Grabbix_hero_3 (3)-min_1752131714013.jpg";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="hero-container">
      {/* Background Image */}
      <div className="hero-bg">
        <img
          src={heroImage}
          alt="Grabbix Smart Store"
          className="hero-img"
          width="1920"
          height="1080"
          decoding="async"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Where Convenience
          <br />
          Meets Innovation
        </h1>
        <p className="hero-subtitle">
          Smart, Secure, and Fully managed, customizable retail for apartments, offices, hotels, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-grabbix-teal text-white px-8 py-4 text-lg font-semibold hover:bg-grabbix-teal/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get a Grabbix
          </Button>
          <Button
            onClick={() => scrollToSection("how-it-works")}
            variant="outline"
            className="border-2 border-white text-[#1ecec1] bg-white px-8 py-4 text-lg font-semibold hover:scale-110 hover:shadow-xl hover:text-[#1ecec1] hover:bg-white transition-all duration-300"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
}
