import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import grabbixLogo from "@assets/Grabbix Logo small_1750914621652.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/98 backdrop-blur-sm shadow-sm" : "bg-white/95 backdrop-blur-sm"
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={grabbixLogo} alt="Grabbix Logo" className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-600 hover:text-grabbix-teal transition-colors duration-200"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("products-showcase")}
                className="text-gray-600 hover:text-grabbix-teal transition-colors duration-200"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-gray-600 hover:text-grabbix-teal transition-colors duration-200"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection("use-cases")}
                className="text-gray-600 hover:text-grabbix-teal transition-colors duration-200"
              >
                Use Cases
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-grabbix-teal text-white hover:bg-grabbix-teal/90"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-grabbix-teal"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block px-3 py-2 text-gray-600 hover:text-grabbix-teal w-full text-left"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("products-showcase")}
                className="block px-3 py-2 text-gray-600 hover:text-grabbix-teal w-full text-left"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="block px-3 py-2 text-gray-600 hover:text-grabbix-teal w-full text-left"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection("use-cases")}
                className="block px-3 py-2 text-gray-600 hover:text-grabbix-teal w-full text-left"
              >
                Use Cases
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="block mx-3 bg-grabbix-teal text-white hover:bg-grabbix-teal/90 w-auto"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
