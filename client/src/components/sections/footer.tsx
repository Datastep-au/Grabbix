import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link, useLocation } from "wouter";
import grabbixLogo from "@assets/Grabbix Logo small_1750991127164.png";

export default function Footer() {
  const [location] = useLocation();

  const handleNavigation = (sectionId: string) => {
    if (location === "/") {
      // On home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // On other pages, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer className="bg-grabbix-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <img src={grabbixLogo} alt="Grabbix Logo" className="h-8 w-auto mb-4" />
            <p className="text-gray-300 mb-4 max-w-md">
              Revolutionising retail convenience through AI-powered smart stores and autonomous checkout technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-grabbix-teal transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-grabbix-teal transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-grabbix-teal transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-grabbix-teal transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button 
                  onClick={() => handleNavigation("products-showcase")}
                  className="hover:text-grabbix-teal transition-colors duration-200 text-left"
                >
                  Smart Store
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("products-showcase")}
                  className="hover:text-grabbix-teal transition-colors duration-200 text-left"
                >
                  Micro Market
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("contact")}
                  className="hover:text-grabbix-teal transition-colors duration-200 text-left"
                >
                  Custom Solution
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-grabbix-teal transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <Link href="/locations" className="hover:text-grabbix-teal transition-colors duration-200">
                  Melbourne Locations
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-grabbix-teal transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="hover:text-grabbix-teal transition-colors duration-200 text-left"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            2025 Grabbix. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-gray-300 hover:text-grabbix-teal text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="text-gray-300 hover:text-grabbix-teal text-sm transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}