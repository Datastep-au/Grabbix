import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    title: "Smart Coolers",
    description: "AI-powered refrigerated units perfect for beverages, snacks, and fresh foods. Temperature-controlled with automatic inventory tracking.",
    features: ["Temperature monitoring", "Fresh food storage", "Energy efficient"],
    gradient: "from-grabbix-teal to-teal-600",
    buttonColor: "text-grabbix-teal",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
  {
    title: "Smart Stores",
    description: "Complete autonomous retail experience with advanced computer vision and sensor technology for seamless shopping.",
    features: ["Computer vision", "Automated checkout", "Full store experience"],
    gradient: "from-grabbix-blue to-blue-600",
    buttonColor: "text-grabbix-blue",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
  {
    title: "Micro Markets",
    description: "Compact convenience stores with self-service kiosks, perfect for smaller spaces requiring diverse product offerings.",
    features: ["Self-service kiosk", "Diverse products", "Compact design"],
    gradient: "from-purple-500 to-purple-600",
    buttonColor: "text-purple-600",
    image: "https://images.unsplash.com/photo-1573164574511-73c773193279?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-grabbix-dark mb-4">Product Offerings</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our range of intelligent retail solutions designed for every space
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${product.gradient} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
            >
              <img
                src={product.image}
                alt={`${product.title} Technology`}
                className="w-full h-48 object-cover"
              />
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{product.title}</h3>
                <p className="mb-6 opacity-90">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`bg-white ${product.buttonColor} font-semibold hover:bg-gray-100 transition-colors duration-200`}
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
