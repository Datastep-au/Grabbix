import { Package } from "lucide-react";

interface ProductMixProps {
  productMix: string[];
}

export default function ProductMix({ productMix }: ProductMixProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          What's Available
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {productMix.map((product, index) => (
            <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
              <Package className="w-5 h-5 text-grabbix-teal flex-shrink-0" />
              <span className="text-gray-700">
                {product}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}