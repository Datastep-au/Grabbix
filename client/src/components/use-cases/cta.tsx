import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
}

export default function CTA({ title, body, buttonLabel, buttonHref }: CTAProps) {
  return (
    <section className="py-16 bg-grabbix-teal">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            {body}
          </p>
          <Button 
            size="lg" 
            className="bg-grabbix-teal hover:bg-grabbix-teal/90 text-white px-8 py-3 text-lg inline-flex items-center gap-2"
            onClick={() => window.location.href = buttonHref}
          >
            {buttonLabel}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}