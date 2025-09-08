import { Check } from "lucide-react";

interface FeatureListProps {
  benefits: string[];
}

export default function FeatureList({ benefits }: FeatureListProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Key Benefits
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex-shrink-0 w-6 h-6 bg-grabbix-teal rounded-full flex items-center justify-center mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}