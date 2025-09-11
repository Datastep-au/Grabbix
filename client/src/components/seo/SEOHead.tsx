import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  robots?: string;
  author?: string;
  articleSection?: string;
  locale?: string;
  alternateLanguages?: { lang: string; url: string }[];
  jsonLd?: object;
}

export default function SEOHead({
  title = "Grabbix - Smart Store Solutions | Where Convenience Meets Innovation",
  description = "Grabbix offers AI-powered smart fridges and micro markets for offices, apartments, and shared spaces. Experience frictionless checkout and 24/7 autonomous retail solutions in Australia.",
  keywords = "smart retail, autonomous stores, micro markets, smart fridges, office amenities, AI retail technology, vending machines, contactless shopping, Melbourne smart stores, Australian retail technology",
  ogTitle,
  ogDescription,
  ogImage = "https://grabbix.com.au/attached_assets/Grabbix_hero_3 (3)-min_1752131714013.jpg",
  ogUrl = "https://grabbix.com.au",
  canonical,
  robots = "index, follow",
  author = "Grabbix Team",
  articleSection,
  locale = "en_AU",
  alternateLanguages = [],
  jsonLd
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    // Update link tags
    const updateLinkTag = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
      let link = document.querySelector(selector) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        if (hreflang) link.hreflang = hreflang;
        document.head.appendChild(link);
      }
      link.href = href;
    };
    
    // Basic SEO tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', robots);
    updateMetaTag('author', author);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Open Graph tags
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', ogUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:locale', locale, true);
    updateMetaTag('og:site_name', 'Grabbix', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:site', '@grabbix');
    updateMetaTag('twitter:creator', '@grabbix');
    
    // Additional SEO tags
    updateMetaTag('theme-color', '#20b2aa');
    updateMetaTag('msapplication-TileColor', '#20b2aa');
    updateMetaTag('application-name', 'Grabbix');
    updateMetaTag('apple-mobile-web-app-title', 'Grabbix');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    updateMetaTag('mobile-web-app-capable', 'yes');
    updateMetaTag('format-detection', 'telephone=no');
    
    // Geo tags for Australia
    updateMetaTag('geo.region', 'AU-VIC');
    updateMetaTag('geo.placename', 'Melbourne, Victoria, Australia');
    updateMetaTag('geo.position', '-37.8136;144.9631');
    updateMetaTag('ICBM', '-37.8136, 144.9631');
    
    // Business tags
    updateMetaTag('classification', 'Business');
    updateMetaTag('category', 'Smart Retail Technology');
    updateMetaTag('coverage', 'Worldwide');
    updateMetaTag('distribution', 'Global');
    updateMetaTag('rating', 'General');
    
    if (articleSection) {
      updateMetaTag('article:section', articleSection, true);
    }
    
    // Canonical link
    if (canonical) {
      updateLinkTag('canonical', canonical);
    }
    
    // Alternate language links
    alternateLanguages.forEach(({ lang, url }) => {
      updateLinkTag('alternate', url, lang);
    });
    
    // JSON-LD structured data
    if (jsonLd) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }
    
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonical, robots, author, articleSection, locale, alternateLanguages, jsonLd]);
  
  return null;
}