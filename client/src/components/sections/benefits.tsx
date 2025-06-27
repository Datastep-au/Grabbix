import grabbixMachineImage from "@assets/Snacks and Drinks Smart Store (1)_1750992249819.png";

const benefits = [
  {
    number: "1",
    title: "Fully managed",
    description: "Taking care of your Grabbix is 100% \"we got you\" and 0% \"on you\"—from deliveries, to shopper questions, to service needs.",
  },
  {
    number: "2", 
    title: "Co-curated",
    description: "We stock the best products for your space. Your Grabbix will evolve over time based on shoppers' behavior and feedback. Just another perk of smart tech, you know?",
  },
  {
    number: "3",
    title: "Wallet-less",
    description: "Set up an account once, shop 24/7. No messy bills or credit cards; all anyone needs to shop is a phone.",
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
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
