import { useEffect } from "react";
import SEOHead from "@/components/seo/SEOHead";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TraditionalVending() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is installation free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Install and servicing are free. You only pay for items sold."
        }
      },
      {
        "@type": "Question",
        "name": "Do they support tap to pay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all are cashless by default."
        }
      },
      {
        "@type": "Question",
        "name": "Can we choose the products?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, planograms are co-curated with you."
        }
      },
      {
        "@type": "Question",
        "name": "Can we run smart and traditional together?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, hybrid layouts are common."
        }
      }
    ]
  };

  const specs = [
    "Power: Standard 10A outlet",
    "Connectivity: Cellular telemetry",
    "Dimensions: ~1.0 m W × 0.8 m D × 1.9 m H",
    "Payments: Tap-to-pay, cards, mobile wallets",
    "Capacity: Up to 40 facings",
    "Servicing: Fully managed by Grabbix"
  ];

  const smartStoreFeatures = [
    "Computer vision or sensors",
    "Open door shopping experience",
    "Cart-style checkout",
    "Best for mixed items and meals",
    "Rich analytics"
  ];

  const traditionalFeatures = [
    "Coils with clear selections",
    "One item per vend",
    "Fast single-item purchases",
    "Best for high drink throughput",
    "Simple and robust"
  ];

  const faqs = [
    {
      q: "Is installation free?",
      a: "Yes. Install and servicing are free. You only pay for items sold."
    },
    {
      q: "Do they support tap to pay?",
      a: "Yes, all are cashless by default."
    },
    {
      q: "Can we choose the products?",
      a: "Yes, planograms are co-curated with you."
    },
    {
      q: "Can we run smart and traditional together?",
      a: "Yes, hybrid layouts are common."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Traditional Vending Machines | Grabbix"
        description="Classic vending with cashless payments and full servicing. Grabbix offers traditional machines on their own or alongside smart stores."
        canonical="https://grabbix.com.au/products/traditional-vending"
        jsonLd={faqSchema}
      />
      
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[500px] flex items-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/images/products/traditional-hero.jpg)` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Content Container */}
          <div className="relative z-10 max-w-5xl mx-auto px-4">
            <div className="max-w-2xl">
              {/* Translucent Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Traditional Vending Machines
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  Classic vending with modern payments, fully managed by Grabbix.
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

        {/* Intro Paragraph */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
              Traditional vending is a proven format for snacks and drinks. At Grabbix, we pair classic vending hardware with modern cashless payments, remote monitoring and full servicing. Perfect as a stand-alone machine or in a hybrid roll-out alongside our smart stores.
            </p>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Smart Stores vs Traditional Vending
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Smart Stores */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-grabbix-teal mb-6">Smart Stores</h3>
                <ul className="space-y-3">
                  {smartStoreFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-grabbix-teal flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Traditional Vending */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-grabbix-blue mb-6">Traditional Vending</h3>
                <ul className="space-y-3">
                  {traditionalFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-grabbix-blue flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Specs / Requirements */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Specifications & Requirements
            </h2>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {specs.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <Check className="w-5 h-5 text-grabbix-teal flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-lg">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-grabbix-teal">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-700 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-grabbix-teal">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Get a Traditional Vending Proposal
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Let us recommend the ideal traditional vending solution for your space and requirements.
              </p>
              <Button 
                size="lg" 
                className="bg-grabbix-teal hover:bg-grabbix-teal/90 text-white px-8 py-3 text-lg inline-flex items-center gap-2"
                onClick={() => window.location.href = '/contact'}
              >
                Enquire Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}