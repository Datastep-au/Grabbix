import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import SEOHead from "@/components/seo/SEOHead";

export default function CookiePolicy() {
  const cookieJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage", 
    "name": "Cookie Policy - Grabbix",
    "description": "Cookie policy for Grabbix smart store solutions. Learn about cookies and tracking technologies we use.",
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01"
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Cookie Policy - Grabbix Smart Store Solutions"
        description="Cookie policy for Grabbix smart store solutions in Australia. Learn about cookies and tracking technologies we use on our website."
        keywords="cookie policy, website cookies, tracking technology, Grabbix cookies, web analytics"
        canonical="https://grabbix.com.au/cookie-policy"
        robots="noindex, nofollow"
        jsonLd={cookieJsonLd}
      />
      <Navigation />
      
      {/* Content */}
      <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-grabbix-dark mb-8">Cookie Policy</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg mb-6">
                <strong>Effective Date:</strong> January 1, 2025
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">What Are Cookies?</h2>
              <p className="mb-6">
                Cookies are small text files that are stored on your device when you visit our website. They help us understand how you interact with our site and improve your browsing experience.
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-grabbix-dark mt-6 mb-3">Essential Cookies</h3>
              <p className="mb-4">
                These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas of the website.
              </p>

              <h3 className="text-xl font-semibold text-grabbix-dark mt-6 mb-3">Analytics Cookies</h3>
              <p className="mb-4">
                We use analytics cookies to understand how visitors interact with our website. This helps us improve our website's performance and user experience. These cookies collect information such as:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Number of visitors to our site</li>
                <li>Pages visited and time spent on each page</li>
                <li>How visitors navigate through our site</li>
                <li>Geographic location of visitors (in general terms)</li>
              </ul>

              <h3 className="text-xl font-semibold text-grabbix-dark mt-6 mb-3">Functional Cookies</h3>
              <p className="mb-6">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences and providing a more personalized experience.
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">Third-Party Cookies</h2>
              <p className="mb-6">
                We may also use third-party cookies from trusted partners to help us analyze website traffic and improve our services. These partners have their own privacy policies and cookie practices.
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">Managing Your Cookie Preferences</h2>
              <p className="mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through their settings</li>
                <li><strong>Opt-Out:</strong> You can opt out of analytics cookies through your browser preferences</li>
                <li><strong>Third-Party Tools:</strong> Some third-party tools allow you to manage cookie preferences across multiple websites</li>
              </ul>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">Browser-Specific Instructions</h2>
              
              <h3 className="text-xl font-semibold text-grabbix-dark mt-6 mb-3">Google Chrome</h3>
              <p className="mb-4">
                Go to Settings → Privacy and Security → Cookies and other site data
              </p>

              <h3 className="text-xl font-semibold text-grabbix-dark mt-6 mb-3">Mozilla Firefox</h3>
              <p className="mb-4">
                Go to Preferences → Privacy & Security → Cookies and Site Data
              </p>

              <h3 className="text-xl font-semibold text-grabbix-dark mt-6 mb-3">Safari</h3>
              <p className="mb-6">
                Go to Preferences → Privacy → Cookies and website data
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">Impact of Disabling Cookies</h2>
              <p className="mb-6">
                Please note that disabling certain cookies may affect the functionality of our website and your user experience. Essential cookies cannot be disabled as they are necessary for the website to function properly.
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">Updates to This Policy</h2>
              <p className="mb-6">
                We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any significant changes by posting the updated policy on our website.
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> hello@grabbix.com</p>
                <p><strong>Phone:</strong> 1-800-GRABBIX</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}