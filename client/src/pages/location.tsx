import { useState } from "react";
import { useParams } from "wouter";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Users, Building2, Coffee, CheckCircle } from "lucide-react";
import SEOHead from "@/components/seo/SEOHead";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { melbourneLocations } from "@shared/locations";

// Per-suburb enrichment data for differentiated content
const suburbData: Record<string, { emphasis: string; uniqueNote: string }> = {
  "Clayton": { emphasis: "students", uniqueNote: "Home to Monash University's Clayton campus, making it ideal for student-focused vending with late-night snacks, study essentials and affordable meal options." },
  "South Yarra": { emphasis: "apartments", uniqueNote: "One of Melbourne's most densely populated apartment suburbs. Residents expect premium amenities — a lobby vending machine adds genuine value to high-rise living." },
  "Richmond": { emphasis: "offices", uniqueNote: "A thriving hub of creative agencies and tech offices along Church Street and Bridge Road. Office vending keeps teams onsite and productive." },
  "Prahran": { emphasis: "coworking", uniqueNote: "Popular with freelancers and co-working spaces around Greville and Chapel Streets. A micro-market fits the flexible work culture." },
  "St Kilda": { emphasis: "hotels", uniqueNote: "Melbourne's beachside tourism hub with hotels and backpacker accommodation. Late-night vending is a genuine guest amenity." },
  "Brunswick": { emphasis: "apartments", uniqueNote: "A mix of student share houses and new apartment developments along Sydney Road. Vending in common areas serves a diverse resident base." },
  "Hawthorn": { emphasis: "students", uniqueNote: "Close to Swinburne University and surrounded by student accommodation. Vending machines stocked with affordable meals and study snacks are a natural fit." },
  "Brighton": { emphasis: "apartments", uniqueNote: "Upscale apartment living with residents who value convenience. A smart vending machine in the lobby adds a premium touch." },
  "Camberwell": { emphasis: "offices", uniqueNote: "A well-established commercial centre with professional offices along Burke and Riversdale Roads." },
  "Doncaster": { emphasis: "offices", uniqueNote: "Growing commercial precinct in Melbourne's east with corporate offices and medical suites that benefit from break-room vending." },
  "Essendon": { emphasis: "gyms", uniqueNote: "Active sporting community with gyms and fitness centres along Keilor Road. Protein bars, energy drinks and hydration vending fit right in." },
  "Caulfield": { emphasis: "students", uniqueNote: "Home to Monash University's Caulfield campus and surrounded by student housing. Affordable, accessible vending is in high demand." },
  "Glen Waverley": { emphasis: "offices", uniqueNote: "A major suburban commercial centre with office parks and retail precincts that suit break-room and lobby vending." },
  "Northcote": { emphasis: "coworking", uniqueNote: "A creative suburb with co-working spaces and independent businesses along High Street. Compact vending fits the local vibe." },
  "Toorak": { emphasis: "apartments", uniqueNote: "Melbourne's most prestigious suburb with luxury apartment buildings where residents expect seamless amenities." },
  "Kew": { emphasis: "healthcare", uniqueNote: "Home to several aged care and healthcare facilities. Staff on rotating shifts need reliable 24/7 access to meals and refreshments." },
  "Box Hill": { emphasis: "healthcare", uniqueNote: "A major health precinct centred around Box Hill Hospital. Staff and visitor vending supports round-the-clock care teams." },
  "Cremorne": { emphasis: "offices", uniqueNote: "Melbourne's tech and startup corridor along Church Street. Office vending keeps fast-paced teams fuelled and focused." },
};

// Contact form schema for location pages
const locationContactSchema = insertContactSchema.extend({
  customerSize: z.string().min(1, "Please select customer size"),
  location: z.string().optional(),
  spaceType: z.string().optional()
});

type LocationContactData = z.infer<typeof locationContactSchema>;

// Helper function to get nearby suburbs
const getNearbySuburbs = (currentSuburb: string): string[] => {
  const filtered = melbourneLocations.filter(s => s !== currentSuburb);
  return filtered.slice(0, 3); // Return first 3 different suburbs
};

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate location data for any slug
  const locationName = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Melbourne Location";
  const enrichment = suburbData[locationName];
  const nearbySuburbs = getNearbySuburbs(locationName);

  const locationJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Grabbix Smart Stores - ${locationName}`,
    "description": `Smart store solutions in ${locationName}, Melbourne. AI-powered fridges and micro markets for offices and apartments.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": locationName,
      "addressRegion": "Victoria",
      "addressCountry": "AU"
    },
    "telephone": "+61-4311-854-35",
    "email": "info@grabbix.com.au",
    "areaServed": {
      "@type": "City",
      "name": `${locationName}, Victoria, Australia`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://grabbix.com.au/" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://grabbix.com.au/locations" },
      { "@type": "ListItem", "position": 3, "name": locationName }
    ]
  };

  const form = useForm<LocationContactData>({
    mode: "onBlur",
    resolver: zodResolver(locationContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      customerSize: "",
      location: locationName,
      spaceType: ""
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: LocationContactData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: (_data, variables) => {
      window.dataLayer?.push({
        event: 'form_submission',
        form_location: 'location',
        space_type: variables.spaceType,
        customer_size: variables.customerSize
      });
      setIsSuccess(true);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: LocationContactData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={`Free Vending Machine Service in ${locationName} - Grabbix Smart Stores`}
        description={`Professional vending machine service in ${locationName}, Melbourne. Smart, contactless vending machines for offices, apartments, and businesses. Free installation and fully managed service. Call +61 4311 854 35.`}
        keywords={`vending machine ${locationName}, smart vending ${locationName}, office vending ${locationName}, apartment vending machines, contactless vending Melbourne, free vending service ${locationName}`}
        canonical={`https://grabbix.com.au/location/${slug}`}
        jsonLd={[locationJsonLd, breadcrumbSchema]}
      />
      <Navigation />
      <div className="pt-16">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-grabbix-teal">Home</a></li>
            <li>/</li>
            <li><a href="/locations" className="hover:text-grabbix-teal">Locations</a></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{locationName}</li>
          </ol>
        </nav>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Free Vending Machine Service in {locationName}
            </h1>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Content Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Introduction */}
              <section>
                <p className="text-lg text-gray-700 mb-6">
                  Looking for a <strong>free vending machine service in {locationName}</strong> that's modern, reliable, and hassle-free? Grabbix installs smart, cashless vending machines in offices, apartments, gyms, schools, and hotels across {locationName} — and we do it all at no cost to you.
                </p>
                {enrichment && (
                  <p className="text-lg text-gray-700 mb-6">
                    {enrichment.uniqueNote}
                  </p>
                )}
              </section>

              {/* Why Choose */}
              <section>
                <h2 className="text-2xl font-bold text-grabbix-teal mb-4">
                  Why More Places in {locationName} Choose Grabbix
                </h2>
                <p className="text-gray-700 mb-4">
                  Grabbix isn't your old-school vending supplier. We bring:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal">✔️</span>
                    <span>Smart, contactless machines with secure cashless payments</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal">✔️</span>
                    <span>A curated mix of snacks, drinks, and essentials — including protein bars, energy drinks, healthy snacks, frozen meals, condoms, Tide Pods, and more</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal">✔️</span>
                    <span>Custom product selection based on your staff or residents' preferences, updated anytime</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal">✔️</span>
                    <span>Professional installation, restocking, and maintenance — all free</span>
                  </li>
                </ul>
              </section>

              {/* Modern Lifestyles */}
              <section>
                <h2 className="text-2xl font-bold text-grabbix-teal mb-4">
                  Designed for Modern Lifestyles
                </h2>
                <p className="text-gray-700">
                  We know your people are busy. That's why we help you offer convenient, on-site access to the things they need most — whether that's a midday snack, a post-workout protein boost, or late-night essentials. Forget driving to the store or paying delivery fees. Grabbix is convenience, reinvented.
                </p>
              </section>

              {/* How It Works */}
              <section>
                <h2 className="text-2xl font-bold text-grabbix-teal mb-4">
                  How Our Free Vending Machine Service Works
                </h2>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal font-semibold">1.</span>
                    <span>We visit your site in {locationName} to check access and recommend the best setup</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal font-semibold">2.</span>
                    <span>We install the machine, tailored to your location's needs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal font-semibold">3.</span>
                    <span>We restock and maintain it — you never lift a finger or pay a cent</span>
                  </li>
                </ol>
              </section>

              {/* Where We Work */}
              <section>
                <h2 className="text-2xl font-bold text-grabbix-teal mb-4">
                  Where We Work in {locationName}
                </h2>
                <p className="text-gray-700 mb-4">
                  We provide free vending machine services across:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal">✔️</span>
                    <span>Residential apartment buildings</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal">✔️</span>
                    <span>Corporate offices</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal">✔️</span>
                    <span>Fitness studios and gyms</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal">✔️</span>
                    <span>Schools and universities</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-grabbix-teal">✔️</span>
                    <span>Hotels, motels, and co-living spaces</span>
                  </li>
                </ul>
              </section>

              {/* Why Grabbix Stands Out */}
              <section>
                <h2 className="text-2xl font-bold text-grabbix-teal mb-4">
                  Why Grabbix Stands Out
                </h2>
                <p className="text-gray-700">
                  With Grabbix, you get more than a vending machine — you get a partner focused on delivering an exceptional, modern experience. We believe vending should be simple, flexible, and add value to your space. That's why we handle everything, so you can focus on what matters to you.
                </p>
              </section>

              {/* Get Started */}
              <section>
                <h2 className="text-2xl font-bold text-grabbix-teal mb-4">
                  Get Started with Grabbix in {locationName}
                </h2>
                <p className="text-gray-700">
                  Interested in bringing a <strong>free vending machine service to your {locationName} location</strong>? Reach out today to schedule your free site assessment — and let's make it happen.
                </p>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-grabbix-teal">
                    Get Your Free Consultation
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll contact you within 24 hours to discuss your smart vending solution for {locationName}.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-grabbix-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-grabbix-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Thanks! We'll be in touch within 24 hours.</h3>
                      <p className="text-gray-600 mb-6">One of our team will reach out to discuss the best vending solution for your space.</p>
                      <Button
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                        className="border-grabbix-teal text-grabbix-teal hover:bg-grabbix-teal hover:text-white"
                      >
                        Submit Another Enquiry
                      </Button>
                    </div>
                  ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+61 4XX XXX XXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company/Building Name</FormLabel>
                            <FormControl>
                              <Input placeholder="ABC Company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="spaceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type of Space *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select space type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="office">Office Building</SelectItem>
                                <SelectItem value="apartment">Apartment Complex</SelectItem>
                                <SelectItem value="coworking">Co-working Space</SelectItem>
                                <SelectItem value="university">University Campus</SelectItem>
                                <SelectItem value="hospital">Hospital/Medical Center</SelectItem>
                                <SelectItem value="hotel">Hotel</SelectItem>
                                <SelectItem value="gym">Gym/Fitness Center</SelectItem>
                                <SelectItem value="retail">Retail Location</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="customerSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How many potential customers or staff? *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Less than 50">Less than 50</SelectItem>
                                <SelectItem value="50+">50+</SelectItem>
                                <SelectItem value="80+">80+</SelectItem>
                                <SelectItem value="150+">150+</SelectItem>
                                <SelectItem value="500+">500+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Details</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your space, expected foot traffic, and any specific requirements..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-grabbix-teal hover:bg-teal-600 text-white"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? "Sending..." : "Get Free Consultation"}
                      </Button>
                    </form>
                  </Form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back to Locations */}
          <div className="mt-12 text-center">
            <Button
              onClick={() => window.location.href = '/locations'}
              variant="outline"
              className="border-grabbix-teal text-grabbix-teal hover:bg-grabbix-teal hover:text-white"
            >
              ← Back to All Locations
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}