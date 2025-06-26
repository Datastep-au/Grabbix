import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  location: z.string().min(2, "Location is required"),
  spaceType: z.string().min(1, "Please select a space type"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      spaceType: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your interest!",
        description: "We will contact you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-grabbix-dark to-grabbix-blue">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Bring Grabbix to Your Space</h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Ready to revolutionize convenience in your location? Let's discuss your smart store solution.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-6 lg:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
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
                          <Input type="email" placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State/Province, Country" {...field} />
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
                            <SelectItem value="apartment">Apartment/Condo</SelectItem>
                            <SelectItem value="coworking">Co-working Space</SelectItem>
                            <SelectItem value="gym">Gym/Fitness Center</SelectItem>
                            <SelectItem value="student-housing">Student Housing</SelectItem>
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
                    disabled={isSubmitting}
                    className="w-full bg-grabbix-teal text-white py-4 px-6 font-semibold hover:bg-grabbix-teal/90 transition-colors duration-200 transform hover:scale-105"
                  >
                    {isSubmitting ? "Submitting..." : "Get Your Free Consultation"}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-grabbix-teal to-grabbix-blue p-6 lg:p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Let's Get Started</h3>
              <p className="mb-8 opacity-90">
                Our team of experts will work with you to design the perfect smart store solution for your unique space and requirements.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-8 w-8 mr-4" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="opacity-90">1-800-GRABBIX</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-8 w-8 mr-4" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="opacity-90">hello@grabbix.com</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-8 w-8 mr-4" />
                  <div>
                    <div className="font-semibold">Response Time</div>
                    <div className="opacity-90">Within 24 hours</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="font-semibold mb-4">What Happens Next?</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Free consultation call within 24 hours</li>
                  <li>• Custom proposal for your space</li>
                  <li>• Site visit and technical assessment</li>
                  <li>• Installation timeline and support plan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
