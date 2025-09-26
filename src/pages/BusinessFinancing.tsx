import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import {
  CheckCircle,
  BarChart,
  ArrowRight,
  Target,
  Shield,
} from "lucide-react";
import dubaiCityscape from "@/assets/business-banner@2x.jpg";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import PageTransition from "@/components/animations/PageTransition";
import { FadeIn } from "@/components/animations/FadeIn";
import { MotionButton } from "@/components/animations/MotionizedButton";
import { motion } from "framer-motion";
import { sectionVariant } from "@/utils/motionVariants";

export function AssetFinancingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      {/* Navigation */}
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Banner Section */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative h-[75vh] flex items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${dubaiCityscape})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </motion.div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering Your Business Through Venture Capital Financing
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              At Finance Teque Nigeria Limited, we believe the right asset at
              the right time can redefine your business success. Whether you're
              just starting out or expanding, our business solutions are
              designed to meet your needs.
            </p>
          </div>
        </motion.section>

        <PageTransition>
          {/* Financing Tracks */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                  Tailored Solutions
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                  Our Four Specialized Products
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  We offer customized business solutions for businesses at every
                  growth stage
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4">
                      <Target className="h-8 w-8 text-brand-primary" />
                    </div>
                    <CardTitle className="text-xl">
                      <span className="text-brand-primary">
                        Venture Capital Support
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Kickstart your innovative ideas with assets that attract
                      investor interest — from production tools to critical
                      infrastructure.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4">
                      <BarChart className="h-8 w-8 text-brand-primary" />
                    </div>
                    <CardTitle className="text-xl">
                      <span className="text-brand-primary">
                        Private Equity Partnership
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Acquire the machinery or equipment that positions your
                      business for higher valuation and strategic partnerships.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4">
                      <Shield className="h-8 w-8 text-brand-primary" />
                    </div>
                    <CardTitle className="text-xl">
                      <span className="text-brand-primary">
                        Nano Business Empowerment
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Start small, dream big. We provide financing for essential
                      items or small-scale tools to fuel your daily operations.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-brand-primary" />
                    </div>
                    <CardTitle className="text-xl">
                      <span className="text-brand-primary">
                        Ethical & Development Financing
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Running a socially responsible or community-based
                      business? We offer favorable terms to help you create a
                      lasting impact.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          {/* Why Choose Us */}
          <FadeIn>
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Our Advantages
                  </h3>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                    Why Choose Us?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Finance Teque provides flexible business solutions with
                    competitive advantages
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                    <CardContent className="pt-10 pb-8">
                      <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-brand-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">
                        Flexible repayment plans
                      </h3>
                      <p className="text-muted-foreground">
                        Customize your payment schedule to match your business's
                        cash flow and revenue cycles.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                    <CardContent className="pt-10 pb-8">
                      <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-brand-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">
                        Transparent terms
                      </h3>
                      <p className="text-muted-foreground">
                        Clear documentation with no hidden charges or surprise
                        fees throughout your financing period.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                    <CardContent className="pt-10 pb-8">
                      <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-brand-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">
                        Fast approval process
                      </h3>
                      <p className="text-muted-foreground">
                        Streamlined application and evaluation with quick
                        decisions to get your business moving faster.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </FadeIn>
          {/* How It Works */}
          <FadeIn>
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Simple Process
                  </h3>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                    How It Works
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Our straightforward process gets you from application to
                    asset acquisition quickly
                  </p>
                </div>

                <div className="relative">
                  {/* Connection line */}
                  <div className="absolute top-24 left-0 right-0 h-1 bg-gray-200 hidden md:block"></div>

                  <div className="grid md:grid-cols-4 gap-8">
                    <div className="relative text-center">
                      <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                        <span className="text-xl font-bold">1</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        Fill Application
                      </h3>
                      <p className="text-muted-foreground">
                        Complete our secure online application with your
                        business details.
                      </p>
                    </div>

                    <div className="relative text-center">
                      <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                        <span className="text-xl font-bold">2</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        Upload Documents
                      </h3>
                      <p className="text-muted-foreground">
                        Provide your business documentation for verification and
                        assessment.
                      </p>
                    </div>

                    <div className="relative text-center">
                      <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                        <span className="text-xl font-bold">3</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        Get Matched
                      </h3>
                      <p className="text-muted-foreground">
                        We'll match you with the right financing track for your
                        business needs.
                      </p>
                    </div>

                    <div className="relative text-center">
                      <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                        <span className="text-xl font-bold">4</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        Receive Approval
                      </h3>
                      <p className="text-muted-foreground">
                        Get approval and access your asset with complete peace
                        of mind.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Success Stories Section */}

          {/* <FadeIn>
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Client Success
                  </h3>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                    Businesses We've Empowered
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    See how our business solutions have helped businesses
                    grow
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="bg-white border-0 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-brand-light rounded-full"></div>
                        <div className="ml-4">
                          <h4 className="font-semibold">ABC Manufacturing</h4>
                          <p className="text-sm text-muted-foreground">
                            Lagos, Nigeria
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        "Finance Teque helped us acquire essential machinery
                        that increased our production capacity by 40%. The
                        flexible payment terms allowed us to manage our cash
                        flow effectively."
                      </p>
                      <p className="text-sm font-medium">
                        Machinery Financing • ₦2.5M
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-brand-light rounded-full"></div>
                        <div className="ml-4">
                          <h4 className="font-semibold">XYZ Tech Startup</h4>
                          <p className="text-sm text-muted-foreground">
                            Abuja, Nigeria
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        "As a growing tech startup, we needed specialized
                        equipment but couldn't afford the upfront cost. Finance
                        Teque's venture capital support track was the perfect
                        solution."
                      </p>
                      <p className="text-sm font-medium">
                        IT Equipment Financing • ₦4.8M
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-brand-light rounded-full"></div>
                        <div className="ml-4">
                          <h4 className="font-semibold">
                            Green Earth Cooperative
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Kano, Nigeria
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        "Our community farming initiative needed sustainable
                        equipment. Finance Teque's ethical financing option not
                        only provided the assets but also aligned with our
                        mission."
                      </p>
                      <p className="text-sm font-medium">
                        Agricultural Equipment • ₦3.2M
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </FadeIn> */}

          {/* CTA Section */}
          <FadeIn>
            <section className="py-20 bg-gray-900 text-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Your growth story starts here.
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Ready to acquire the assets your business needs? Apply today
                  and take the next step toward sustainable growth and success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MotionButton
                    size="lg"
                    className="bg-brand-primary md:w-fit text-lg  text-white hover:bg-gray-100 px-8 py-5"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!user) {
                        navigate("/login", {
                          state: { from: "/applications/new" },
                        });
                        return;
                      }
                      if (user.role === "startup") {
                        navigate("/applications/new");
                      } else {
                        navigate("/dashboard");
                      }
                    }}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </MotionButton>
                  <Link to="/contact">
                    <MotionButton
                      size="lg"
                      variant="outline"
                      className="border-white text-gray-900 text-lg py-5 bg-white  w-full hover:text-white  hover:bg-transparent px-8"
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      Contact Us
                    </MotionButton>
                  </Link>
                </div>
              </div>
            </section>
          </FadeIn>
        </PageTransition>
      </div>
    </>
  );
}

export default AssetFinancingPage;
