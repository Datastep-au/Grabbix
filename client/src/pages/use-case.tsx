import { useParams } from "wouter";
import { useEffect } from "react";
import pagesData from "@/data/use-cases-pages.json";
import SEOHead from "@/components/seo/SEOHead";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import UseCaseHero from "@/components/use-cases/hero";
import SmartOrTraditional from "@/components/use-cases/smart-or-traditional";
import FeatureList from "@/components/use-cases/feature-list";
import Steps from "@/components/use-cases/steps";
import ProductMix from "@/components/use-cases/product-mix";
import LocalNote from "@/components/use-cases/local-note";
import MiniCaseStudy from "@/components/use-cases/mini-case-study";
import FAQ from "@/components/use-cases/faq";
import CTA from "@/components/use-cases/cta";
import NotFound from "./not-found";

export default function UseCasePage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the page data by slug
  const pageData = pagesData.pages.find(page => page.slug === slug);
  
  // If no page found, return 404
  if (!pageData) {
    return <NotFound />;
  }

  // Extract JSON-LD schema for SEO
  const jsonLdSchema = pageData.faqSchema;

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Handle hash navigation when coming from external links
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Wait a bit for the page to fully load
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [slug]);

  return (
    <div className="min-h-screen">
      <SEOHead
        title={pageData.metaTitle}
        description={pageData.metaDescription}
        canonical={pageData.canonical}
        jsonLd={jsonLdSchema}
      />
      
      <Navigation />
      
      <div className="pt-16">
        {/* Hero */}
        <UseCaseHero 
          h1={pageData.hero.h1}
          subhead={pageData.hero.subhead}
          image={pageData.hero.image}
          alt={pageData.hero.alt}
        />
        
        {/* Intro Paragraph */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
              {pageData.intro.split(/\b(with zero cost to you)\b/i).map((part, index) => {
                if (part.toLowerCase() === 'with zero cost to you') {
                  return <strong key={index} className="font-bold">{part}</strong>;
                }
                return part;
              })}
            </p>
          </div>
        </section>
        
        {/* Benefits/Features List */}
        <FeatureList benefits={pageData.benefits} />
        
        {/* Steps */}
        <Steps steps={pageData.steps} />
        
        {/* Product Mix */}
        <ProductMix productMix={pageData.productMix} />
        
        {/* Local Note (if present) */}
        {pageData.localNote && (
          <LocalNote note={pageData.localNote} />
        )}
        
        {/* Mini Case Study (if enabled) */}
        {pageData.miniCaseStudy?.enabled && (
          <MiniCaseStudy 
            title={pageData.miniCaseStudy.title}
            body={pageData.miniCaseStudy.body}
          />
        )}
        
        {/* Smart or Traditional Block */}
        <SmartOrTraditional 
          title={pageData.smartOrTraditional.title}
          body={pageData.smartOrTraditional.body}
          links={pageData.smartOrTraditional.links}
        />
        
        {/* FAQ */}
        <FAQ faqs={pageData.faqs} />
        
        {/* CTA */}
        <CTA 
          title={pageData.cta.title}
          body={pageData.cta.body}
          buttonLabel={pageData.cta.buttonLabel}
          buttonHref={pageData.cta.buttonHref}
        />
      </div>
      
      <Footer />
    </div>
  );
}