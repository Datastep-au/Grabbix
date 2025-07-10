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

const locationData: { [key: string]: { title: string; description: string; benefits: string[] } } = {
  "melbourne-cbd": {
    title: "Melbourne CBD",
    description: "Transform your CBD location with smart vending solutions perfect for busy office workers, tourists, and city dwellers who need convenient access to snacks and beverages.",
    benefits: [
      "Perfect for high-traffic office buildings",
      "Ideal for corporate environments",
      "24/7 service for shift workers",
      "Contactless payment options",
      "Premium product selection"
    ]
  },
  "south-yarra": {
    title: "South Yarra",
    description: "Bring cutting-edge smart vending to South Yarra's trendy lifestyle with solutions tailored for young professionals and fashion-conscious residents.",
    benefits: [
      "Trendy product selection",
      "Health-conscious options",
      "Perfect for gyms and wellness centers",
      "Stylish design integration",
      "Quick grab-and-go solutions"
    ]
  },
  "richmond": {
    title: "Richmond",
    description: "Enhance Richmond's creative atmosphere with smart vending solutions that complement the area's innovative spirit and diverse community.",
    benefits: [
      "Creative industry-focused products",
      "Artisan snack selections",
      "Eco-friendly options",
      "Community-centered approach",
      "Flexible placement options"
    ]
  }
};

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  // Generate location data for any slug
  const locationName = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Melbourne Location";
  const location = locationData[slug!] || {
    title: locationName,
    description: `Transform your ${locationName} location with smart vending solutions perfect for busy residents, workers, and visitors who need convenient access to snacks and beverages.`,
    benefits: [
      "Perfect for high-traffic areas",
      "Ideal for office environments",
      "24/7 contactless service",
      "Customizable product selection",
      "Professional installation"
    ]
  };

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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Smart Vending Solutions in {location.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {location.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Benefits Section */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-grabbix-teal">
                    Why Choose Grabbix in {location.title}?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {location.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-grabbix-teal mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
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
                    Fill out the form below and we'll contact you within 24 hours to discuss your smart vending solution for {location.title}.
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