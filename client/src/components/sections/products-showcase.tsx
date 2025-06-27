import { Button } from "@/components/ui/button";
import snacksStoreImage from "@assets/Snacks and Drinks Smart Store (1)_1750992249819.png";
import microMarketImage from "@assets/Smart Stores - Micro Market_1750922185685.png";

const products = [
  {
    title: "Snacks and Drinks Smart Store",
    description: "AI-powered refrigerated units perfect for beverages, snacks, and fresh foods. Temperature-controlled with automatic inventory tracking and seamless checkout experience.",
    image: snacksStoreImage,
    features: ["Temperature monitoring", "Fresh food storage", "Energy efficient", "Automatic checkout"]
  },
  {
    title: "Smart Stores - Micro Market",
    description: "Complete autonomous retail experience with advanced computer vision and sensor technology. Multiple units create a comprehensive micro-market solution.",
    image: microMarketImage,
    features: ["Computer vision", "Multiple product categories", "Scalable solution", "Real-time analytics"]
  }
];

export default function ProductsShowcase() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="products-showcase" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-grabbix-dark mb-4">Our Smart Solutions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our range of intelligent retail solutions designed for modern convenience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="h-96 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain object-center bg-gray-50"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-grabbix-dark mb-4">{product.title}</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-grabbix-teal rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-grabbix-teal text-white hover:bg-grabbix-teal/90 font-semibold px-6 py-3"
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