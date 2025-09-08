import { Button } from "@/components/ui/button";

interface HeroProps {
  h1: string;
  subhead: string;
  image: string;
  alt: string;
}

export default function UseCaseHero({ h1, subhead, image, alt }: HeroProps) {
  return (
    <div className="relative h-[60vh] min-h-[500px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <div className="max-w-2xl">
          {/* Translucent Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {h1}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              {subhead}
            </p>
            <Button 
              size="lg" 
              className="bg-grabbix-teal hover:bg-grabbix-teal/90 text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}