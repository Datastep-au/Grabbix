import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video className="w-full h-full object-cover opacity-30" autoPlay muted loop playsInline>
          <source src="/attached_assets/Chillbot Video_1750924734635.mp4" type="video/mp4" />
          {/* Fallback background image */}
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-grabbix-dark/80 to-grabbix-blue/60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Where Convenience
          <br />
          <span className="text-grabbix-teal">Meets Innovation</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Smart, secure, and fully autonomous micro-stores for your space.
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
            className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-grabbix-dark transition-all duration-300"
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
