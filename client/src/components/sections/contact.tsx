import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  phone: z.string().optional(),
  company: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  spaceType: z.string().min(1, "Please select a space type"),
  message: z.string().optional(),
  customerSize: z.string().min(1, "Please select customer size"),
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
      phone: "",
      company: "",
      location: "",
      spaceType: "",
      message: "",
      customerSize: "",
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
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-grabbix-dark mb-4">Bring Grabbix to Your Space</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to revolutionize convenience in your location? Let's discuss your smart store solution.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
          <div className="p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-gray-700">Full Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          className="h-12 text-base border-gray-300 focus:border-grabbix-teal focus:ring-grabbix-teal/20" 
                          {...field} 
                        />
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
                      <FormLabel className="text-base font-medium text-gray-700">Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email address" 
                          className="h-12 text-base border-gray-300 focus:border-grabbix-teal focus:ring-grabbix-teal/20" 
                          {...field} 
                        />
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
                      <FormLabel className="text-base font-medium text-gray-700">Location *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="City, State/Province, Country" 
                          className="h-12 text-base border-gray-300 focus:border-grabbix-teal focus:ring-grabbix-teal/20" 
                          {...field} 
                        />
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
                      <FormLabel className="text-base font-medium text-gray-700">Type of Space *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-grabbix-teal focus:ring-grabbix-teal/20">
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
                      <FormLabel className="text-base font-medium text-gray-700">How many potential customers or staff? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-grabbix-teal focus:ring-grabbix-teal/20">
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
                      <FormLabel className="text-base font-medium text-gray-700">Additional Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your space, expected foot traffic, and any specific requirements..."
                          rows={4}
                          className="text-base border-gray-300 focus:border-grabbix-teal focus:ring-grabbix-teal/20 resize-none"
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
                  className="w-full bg-grabbix-teal text-white py-4 px-6 text-base font-semibold hover:bg-grabbix-teal/90 transition-all duration-200 transform hover:scale-[1.02] shadow-lg h-14"
                >
                  {isSubmitting ? "Submitting..." : "Get Your Free Consultation"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}