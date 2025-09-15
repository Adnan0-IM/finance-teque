import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Send,
} from "lucide-react";
import dubaiCityscape from "../assets/business-banner@2x.jpg";

import Navigation from "@/components/Navigation";
import ModalButton from "@/components/ModalButton";
import { Toaster } from "@/components/ui/sonner";
export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation  */}
      <Navigation />
      {/* Header Section */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${dubaiCityscape})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center text-primary-foreground max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            We're here to answer your questions and guide your investment
            journey.
          </p>
        </div>
      </section>

      {/* Contact Content Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader className="pb-6">
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and our team will get back to you
                    within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your investment goals and how we can help you..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="cursor-pointer w-full bg-primary hover:bg-primary/90 h-12 text-lg text-primary-foreground"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details Card */}
              <Card className="bg-gray-50 border-0 shadow-lg">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-primary">
                    Contact Information
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-brand-primary-dark" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Office Address</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        18B. Fatima Plaza, Second Floor
                        <br />
                        Murtala Muhammad Way
                        <br />
                        Kano, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-brand-primary-dark" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone Number</h4>
                      <p className="text-muted-foreground text-sm">
                        <a
                          href="tel:+2349165717392"
                          className="hover:text-primary transition-colors"
                        >
                          (+234) 9165717392
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-brand-primary-dark" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email Address</h4>
                      <p className="text-muted-foreground text-sm">
                        <a
                          href="mailto:info@financeteque.com"
                          className="hover:text-primary transition-colors"
                        >
                          info@financetequecv.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-brand-primary-dark" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Business Hours</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Monday - Friday: 8:00 AM - 5:00 PM
                        <br />
                        Saturday - Sunday: Closed
                        
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Links */}
              <Card className="bg-primary text-primary-foreground border-0 shadow-lg">
                <CardHeader>
                  <h3 className="text-2xl font-bold">Follow Us</h3>
                  <p className="opacity-90">
                    Stay connected for the latest updates and insights
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                      <span className="font-medium">LinkedIn</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Facebook className="h-6 w-6" />
                      <span className="font-medium">Facebook</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors  "
                    >
                      <Twitter className="h-6 w-6" />
                      <span className="font-medium text-center mx-4 ">X</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Instagram className="h-6 w-6" />
                      <span className="font-medium">Instagram</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">
              Visit Our Office
            </h2>
            <p className="text-xl text-muted-foreground">
              Located in the heart of Kano's business district
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              {/* Google Maps Embed for Kano */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.2345678!2d8.5156!3d12.0022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae816e5e9c3a7d%3A0x91a8a4b7c8f8e8e8!2sMurtala%20Muhammad%20Way%2C%20Kano%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1647890123456!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Finance Teque Office Location"
              ></iframe>
            </div>
            <div className="p-6 bg-white">
              <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-primary">
                    Finance Teque Investment Growth
                  </h3>
                  <p className="text-muted-foreground">
                    Fatima Plaza, Second Floor, Murtala Muhammad Way, Kano
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="flex  w-full sm:w-fit items-center space-x-2 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Get Directions</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">
              Quick Answers
            </h2>
            <p className="text-xl text-muted-foreground">
              Common questions about getting started with Finance Teque
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-50 border-0">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">
                  How quickly can I start investing?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Once you complete our application and funding process, you can
                  typically start investing within 2-3 business days.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-0">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">
                  What is the minimum investment amount?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Our minimum investment varies by plan, starting from ₦5,000
                  for Money Market investments up to ₦10,000 for Growth
                  investments.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-0">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">
                  Do you offer investment consultations?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we provide free initial consultations to help you choose
                  the right investment strategy for your goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-0">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">Are my investments insured?</h3>
                <p className="text-muted-foreground text-sm">
                  We work with regulated institutions and maintain comprehensive
                  insurance coverage to protect your investments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a consultation with our investment experts today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ModalButton className="w-full" text="Schedule a Consultation" />
            <Button
              size="lg"
              variant="outline"
              className="border-white text-primary hover:bg-transparent hover:text-white px-8 py-4"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              Call Us Now
              <Phone className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      <Toaster className="text-base" position="top-right" duration={3000} />
    </div>
  );
}
