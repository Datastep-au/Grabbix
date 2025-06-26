import { Zap, Clock, CreditCard, BarChart3, Shield, Leaf, Settings } from "lucide-react";

const mainBenefits = [
  {
    title: "Frictionless Checkout",
    description: "Just grab and go - no lines, no scanning, no hassle. AI handles everything automatically.",
    icon: Zap,
    color: "text-grabbix-teal",
  },
  {
    title: "24/7 Access",
    description: "Available around the clock to meet your needs, whether it's early morning or late night.",
    icon: Clock,
    color: "text-grabbix-blue",
  },
  {
    title: "Cashless Payment",
    description: "Secure, contactless payments through mobile apps, cards, or digital wallets.",
    icon: CreditCard,
    color: "text-green-500",
  },
  {
    title: "Remote Monitoring",
    description: "Real-time inventory tracking and analytics dashboard for complete visibility and control.",
    icon: BarChart3,
    color: "text-purple-500",
  },
];

const additionalBenefits = [
  {
    title: "Secure & Safe",
    description: "Advanced security features including cameras, access controls, and fraud prevention.",
    icon: Shield,
    color: "text-grabbix-teal",
  },
  {
    title: "Eco-Friendly",
    description: "Energy-efficient design with smart power management and sustainable operations.",
    icon: Leaf,
    color: "text-green-500",
  },
  {
    title: "Easy Maintenance",
    description: "Self-diagnosing systems with predictive maintenance and remote troubleshooting.",
    icon: Settings,
    color: "text-grabbix-blue",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-grabbix-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-grabbix-dark mb-4">Why Choose Grabbix</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of retail with our innovative smart store technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {mainBenefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-shadow duration-300">
                  <IconComponent className={`h-12 w-12 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-grabbix-dark mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Additional Benefits Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalBenefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <IconComponent className={`h-16 w-16 ${benefit.color} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold text-grabbix-dark mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
