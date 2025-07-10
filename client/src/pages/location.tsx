import { useParams } from "wouter";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Users, Building2, Coffee, CheckCircle } from "lucide-react";
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

// Contact form schema for location pages
const locationContactSchema = insertContactSchema.extend({
  customerSize: z.string().min(1, "Please select customer size"),
  location: z.string().optional(),
  spaceType: z.string().optional()
});

type LocationContactData = z.infer<typeof locationContactSchema>;

// Helper function to get nearby suburbs
const getNearbySuburbs = (currentSuburb: string): string[] => {
  const suburbs = [
    "Abbotsford", "Armadale", "Ashburton", "Balwyn", "Bentleigh", "Blackburn", "Box Hill", "Brighton", "Brunswick",
    "Bulleen", "Burwood", "Camberwell", "Canterbury", "Caulfield", "Chadstone", "Cheltenham", "Clayton", "Coburg",
    "Cremorne", "Dingley Village", "Doncaster", "Elsternwick", "Essendon", "Glen Iris", "Glen Waverley", "Hampton",
    "Hawthorn", "Highett", "Kew", "Keysborough", "Kooyong", "Malvern", "Mentone", "Moorabbin", "Mordialloc",
    "Mulgrave", "Noble Park", "Northcote", "Notting Hill", "Oakleigh", "Parkdale", "Pascoe Vale", "Prahran",
    "Richmond", "Sandringham", "South Yarra", "Springvale", "St Kilda", "Strathmore", "Templestowe", "Toorak"
  ];
  
  const filtered = suburbs.filter(s => s !== currentSuburb);
  return filtered.slice(0, 3); // Return first 3 different suburbs
};

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  // Generate location data for any slug
  const locationName = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Melbourne Location";
  const nearbySuburbs = getNearbySuburbs(locationName);

  const form = useForm<LocationContactData>({
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
    onSuccess: () => {
      toast({
        title: "Thank you for your interest!",
        description: "We will contact you within 24 hours to discuss your smart vending solution.",
      });
      form.reset();
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
      <Navigation />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Free Vending Service in {locationName}, Victoria – Smart, Custom & Contactless
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Tired of overpaying on DoorDash or making late-night runs to the store? Grabbix offers a <strong>fully managed, free vending machine service in {locationName}</strong> — with AI-powered smart stores that serve snacks, drinks, essentials, and more. Our custom vending solution is perfect for residential buildings, gyms, offices, schools, and shared spaces.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Content Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Why Choose Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-grabbix-teal flex items-center">
                    🧠 Why Choose Grabbix Smart Vending in {locationName}?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-grabbix-teal">💸</span>
                      <span>Cheaper than food delivery or store trips — instant access, 24/7</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-grabbix-teal">⚙️</span>
                      <span>Free Installation, Servicing & Replenishment</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-grabbix-teal">🧃</span>
                      <span>Custom Product Range – drinks, chips, healthy snacks, protein bars, chocolates</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-grabbix-teal">📦</span>
                      <span>Essential Goods – condoms, Tide Pods, frozen items, shampoo, more!</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-grabbix-teal">🧠</span>
                      <span>Smart Tech – secure, cashless, contactless access</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-grabbix-teal">🛠️</span>
                      <span>Flexible Stocking – change items anytime based on your staff or residents' feedback</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Customised Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-grabbix-teal flex items-center">
                    🛒 Fully Customised, Always Stocked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We work closely with your team to handpick a product mix that matches your preferences — including healthy options, energy drinks, protein snacks, or everyday essentials. Our machines are flexible, and we'll adjust the contents anytime based on what your team actually wants.
                  </p>
                </CardContent>
              </Card>

              {/* Locations Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-grabbix-teal flex items-center">
                    🏢 Ideal for Any Location in {locationName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>• Residential Apartments</li>
                    <li>• Office Buildings</li>
                    <li>• Schools, Colleges, & TAFEs</li>
                    <li>• Hotels & Motels</li>
                    <li>• Gyms & Fitness Studios</li>
                  </ul>
                </CardContent>
              </Card>

              {/* No Cost Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-grabbix-teal flex items-center">
                    🚚 No Cost. No Catch. Just Convenience.
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Grabbix is a <strong>100% free service</strong> for your building or business. We handle everything — install, restock, monitor, and maintain. You just enjoy the perks.
                  </p>
                </CardContent>
              </Card>

              {/* Next Steps Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-grabbix-teal flex items-center">
                    🔧 Next Steps: Easy Site Visit & Install
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    We'll schedule a quick <strong>site visit in {locationName}</strong> to:
                  </p>
                  <ul className="space-y-2">
                    <li>• Check doorway and lift access</li>
                    <li>• Confirm the best install location</li>
                    <li>• Schedule your machine install (often within days)</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Nearby Suburbs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-grabbix-teal flex items-center">
                    📍 Nearby Suburbs We Also Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Grabbix also operates in surrounding areas like {nearbySuburbs.join(', ')}.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-grabbix-teal">
                    ✅ Ready to Get Started?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Contact us today to book your free site assessment in {locationName} and bring smart, contactless vending to your community.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-grabbix-teal">
                    Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-grabbix-teal" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-gray-600">+61 3 XXXX XXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-grabbix-teal" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">hello@grabbix.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-grabbix-teal" />
                    <div>
                      <p className="font-semibold">Response Time</p>
                      <p className="text-gray-600">Within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-grabbix-teal">
                    Get Your Free Consultation
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll contact you within 24 hours to discuss your smart vending solution for {locationName}.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
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
                      </div>

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