import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import grabbixLogo from "@assets/Grabbix_Green_1750924809790.png";

export default function Footer() {
  return (
    <footer className="bg-grabbix-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <img src={grabbixLogo} alt="Grabbix Logo" className="h-8 w-auto mb-4" />
            <p className="text-gray-300 mb-4 max-w-md">
              Revolutionizing retail convenience through AI-powered smart stores and autonomous checkout technology.
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
                <a href="#" className="hover:text-grabbix-teal transition-colors duration-200">
                  Smart Coolers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-grabbix-teal transition-colors duration-200">
                  Smart Stores
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-grabbix-teal transition-colors duration-200">
                  Micro Markets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-grabbix-teal transition-colors duration-200">
                  Custom Solutions
                </a>
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
                <a href="#" className="hover:text-grabbix-teal transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-grabbix-teal transition-colors duration-200">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-grabbix-teal transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; 2024 Grabbix. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-grabbix-teal text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-grabbix-teal text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-grabbix-teal text-sm transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
