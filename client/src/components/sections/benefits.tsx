import grabbixMachineImage from "@assets/Snacks and Drinks Smart Store (1)_1750992249819.png";

const benefits = [
  {
    number: "1",
    title: "Fully managed",
    description: "Complete hands-off operation for you. We handle everything from restocking and maintenance to customer support, so you can focus on what matters most.",
  },
  {
    number: "2", 
    title: "Smart inventory",
    description: "Our AI learns your community's preferences and automatically adjusts product selection. Fresh, popular items are always available when your people need them.",
  },
  {
    number: "3",
    title: "24/7 frictionless access",
    description: "Round-the-clock availability with seamless mobile payments. Simply tap your phone to unlock, grab what you need, and walk away - no cards, no cash, no waiting.",
  },
  {
    number: "4",
    title: "Enterprise security",
    description: "Advanced monitoring systems with real-time alerts, secure access controls, and comprehensive transaction tracking ensure complete protection for your space and users.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-grabbix-dark mb-4">The benefits of having a Grabbix</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Benefits List - Left Side */}
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                {/* Number Circle */}
                <div className="flex-shrink-0 w-8 h-8 bg-grabbix-teal text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {benefit.number}
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-2xl font-bold text-grabbix-dark mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Machine Image - Right Side */}
          <div className="flex justify-center lg:justify-end">
            <div className="max-w-lg w-full">
              <img
                src={grabbixMachineImage}
                alt="Grabbix Smart Store Machine"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
