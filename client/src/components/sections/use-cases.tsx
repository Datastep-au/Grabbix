import { Check } from "lucide-react";
import smartStoreImage from "@assets/Smart Store-min_1750924967033.png";
import studentHousingImage from "@assets/rut-miit-hpRGrfOIybc-unsplash-min.jpg";

const useCases = [
  {
    title: "Offices",
    description: "Boost employee satisfaction and productivity with convenient access to snacks, beverages, and essentials. No more long lunch lines or vending machine hassles.",
    features: [
      "Increase employee productivity",
      "Reduce time away from desk",
      "Improve workplace amenities",
      "24/7 availability for all shifts",
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    checkColor: "text-grabbix-teal",
  },
  {
    title: "Apartments & Condos",
    description: "Enhance resident experience with convenient micro-markets in lobbies and common areas. Perfect for late-night cravings or forgotten essentials.",
    features: [
      "Increase property value",
      "Resident convenience amenity",
      "Generate additional revenue",
      "Reduce trips to convenience stores",
    ],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    checkColor: "text-grabbix-blue",
    reverse: true,
  },
];

const additionalUseCases = [
  {
    title: "Co-working Spaces",
    description: "Attract and retain members with premium convenience amenities that set you apart from competitors.",
    image: smartStoreImage,
  },
  {
    title: "Gyms & Fitness",
    description: "Provide healthy snacks, protein bars, and sports drinks for members before and after workouts.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  },
  {
    title: "Student Housing",
    description: "Late-night study sessions made easier with 24/7 access to snacks, drinks, and school supplies.",
    image: "https://images.unsplash.com/photo-1606761940869-e12114a8e978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-20 bg-grabbix-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-grabbix-dark mb-4">Perfect For Every Space</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Grabbix smart stores enhance convenience across diverse environments
          </p>
        </div>

        {useCases.map((useCase, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 ${
              useCase.reverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className={useCase.reverse ? "order-2 lg:order-1" : ""}>
              <h3 className="text-3xl font-bold text-grabbix-dark mb-6">{useCase.title}</h3>
              <p className="text-lg text-gray-600 mb-6">{useCase.description}</p>
              <ul className="space-y-3">
                {useCase.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <Check className={`h-5 w-5 ${useCase.checkColor} mr-3`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className={useCase.reverse ? "order-1 lg:order-2" : ""}>
              <img
                src={useCase.image}
                alt={`${useCase.title} Environment`}
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalUseCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center flex flex-col h-full"
            >
              <img
                src={useCase.image}
                alt={`${useCase.title}`}
                className="rounded-lg mb-4 w-full h-40 object-cover flex-shrink-0"
              />
              <h4 className="text-lg font-semibold text-grabbix-dark mb-3 flex-shrink-0">{useCase.title}</h4>
              <p className="text-gray-600 text-sm flex-grow">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}