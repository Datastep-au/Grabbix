interface StepsProps {
  steps: string[];
}

export default function Steps({ steps }: StepsProps) {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Numbered Card */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 h-full">
                {/* Step Number */}
                <div className="w-12 h-12 bg-grabbix-teal rounded-full flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                
                {/* Step Content */}
                <p className="text-gray-700 leading-relaxed text-lg">
                  {step}
                </p>
              </div>
              
              {/* Connection Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gray-300 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}