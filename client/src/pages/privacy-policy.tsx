import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Content */}
      <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-grabbix-dark mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg mb-6">
                <strong>Effective Date:</strong> January 1, 2025
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you fill out our contact form, request information about our smart store solutions, or communicate with us. This may include:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Name and contact information</li>
                <li>Company or organization details</li>
                <li>Location and space type information</li>
                <li>Communication preferences</li>
              </ul>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Provide information about our smart store solutions</li>
                <li>Customize and improve our services</li>
                <li>Send you updates about our products and services (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">3. Information Sharing</h2>
              <p className="mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted service providers who assist us in operating our website and conducting our business.
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">4. Data Security</h2>
              <p className="mb-6">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">5. Your Rights</h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to the processing of your personal information</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">6. Cookies and Tracking</h2>
              <p className="mb-6">
                Our website uses cookies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences. For more details, please see our Cookie Policy.
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">7. Changes to This Policy</h2>
              <p className="mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.
              </p>

              <h2 className="text-2xl font-semibold text-grabbix-dark mt-8 mb-4">8. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
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