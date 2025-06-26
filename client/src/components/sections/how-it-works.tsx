import { Search, Wrench, Package, Smartphone, BarChart3, Headphones } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Selection",
    description: "Choose the perfect smart store solution tailored to your space and needs.",
    icon: Search,
    color: "bg-grabbix-teal",
  },
  {
    number: 2,
    title: "Installation",
    description: "Our expert team handles professional installation with minimal disruption.",
    icon: Wrench,
    color: "bg-grabbix-blue",
  },
  {
    number: 3,
    title: "Stocking",
    description: "We curate and stock your smart store with popular products and essentials.",
    icon: Package,
    color: "bg-grabbix-teal",
  },
  {
    number: 4,
    title: "Customer Use",
    description: "Users simply grab items and go with automatic checkout and payment processing.",
    icon: Smartphone,
    color: "bg-grabbix-blue",
  },
  {
    number: 5,
    title: "Real-Time Monitoring",
    description: "Track inventory, sales, and usage patterns through our comprehensive dashboard.",
    icon: BarChart3,
    color: "bg-grabbix-teal",
  },
  {
    number: 6,
    title: "Support",
    description: "Enjoy ongoing maintenance, restocking, and 24/7 technical support.",
    icon: Headphones,
    color: "bg-grabbix-blue",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-grabbix-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-grabbix-dark mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to transform your space with autonomous retail technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
              >
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white h-8 w-8" />
                </div>
                <div className={`w-8 h-8 ${step.color} text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-grabbix-dark mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
