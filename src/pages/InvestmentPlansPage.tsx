import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BarChart3, Star, Info } from "lucide-react";
import dubaiCityscape from "../assets/business-banner@2x.jpg";
import Navigation from "@/components/Navigation";
import ModalButton from "@/components/ModalButton";
import { Toaster } from "sonner";
import { investmentPlans } from "../data/investmentPlans";
import InvestorRegistrationButton from "@/components/InvestorRegistrationButton";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { MotionButton } from "@/components/animations/MotionizedButton";
import PageTransition from "@/components/animations/PageTransition";
import { motion } from "framer-motion";
import { FadeIn } from "../components/animations/FadeIn";
import { sectionVariant } from "@/utils/motionVariants";
import CardMotion from "@/components/animations/CardMotion";

export function InvestmentPlansPage() {
  const getRiskBadgeVariant = (riskColor: string) => {
    switch (riskColor) {
      case "destructive":
        return "destructive";
      case "secondary":
        return "secondary";
      default:
        return "default";
    }
  };
  const location = useLocation();
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      {/* Navigation  */}
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

          <div className="relative z-10 text-center text-primary-foreground max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Investment Plans
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Choose from our carefully crafted investment strategies designed
              to meet your financial goals and risk appetite
            </p>
          </div>
        </motion.section>

        <PageTransition>
          {/* Investment Plans Overview */}
          <FadeIn mode="mount">
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Our Investment Solutions
                  </h3>
                  <h2 className="text-4xl font-bold mb-6 text-brand-dark">
                    Tailored Investment Plans for Every Investor
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    From conservative equity finance investments to aggressive
                    venture capital strategies, we offer comprehensive solutions
                    that align with your financial objectives and risk
                    tolerance.
                  </p>
                </div>

                {/* Investment Plans Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  {investmentPlans.map((plan) => {
                    const IconComponent = plan.icon;
                    return (
                      <CardMotion>
                        <Card
                          key={plan.id}
                          className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center group-hover:bg-brand-light transition-colors">
                                <IconComponent className="h-8 w-8 text-brand-primary" />
                              </div>
                              <div className="text-right">
                                <Badge
                                  variant={getRiskBadgeVariant(plan.riskColor)}
                                  className="mb-2"
                                >
                                  {plan.riskLevel} Risk
                                </Badge>
                                <p className="text-sm text-muted-foreground">
                                  Min. {plan.minimumInvestment}
                                </p>
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">
                              {plan.title}
                            </h3>
                            <div className="relative">
                              <p className="text-muted-foreground">
                                {plan.description.length > 180
                                  ? `${plan.description.substring(0, 180)}...`
                                  : plan.description}
                              </p>
                              {plan.description.length > 150 && (
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-brand-primary text-base absolute right-0 bottom-0"
                                  onClick={() =>
                                    (window.location.href = `/plans/${plan.id}`)
                                  }
                                >
                                  Read more
                                </Button>
                              )}
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <BarChart3 className="h-5 w-5 text-brand-primary" />
                                <span className="font-medium">
                                  Expected Return
                                </span>
                              </div>
                              <span className="font-bold text-lg text-brand-primary">
                                {plan.expectedReturn}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3 flex items-center">
                                <Star className="h-5 w-5 text-brand-primary mr-2" />
                                Key Features
                              </h4>
                              <ul className="space-y-2">
                                {plan.features.map((feature, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start space-x-2 text-sm text-muted-foreground"
                                  >
                                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-4 bg-brand-light rounded-lg">
                              <p className="text-sm">
                                <span className="font-medium">
                                  Suitable for:
                                </span>{" "}
                                {plan.suitableFor}
                              </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                              <InvestorRegistrationButton className="flex-1 " />
                              <MotionButton
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.98, y: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 30,
                                }}
                                variant="outline"
                                className="flex-1 text-base py-5 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                                onClick={() =>
                                  (window.location.href = `/plans/${plan.id}`)
                                }
                              >
                                Learn More
                              </MotionButton>
                            </div>
                          </CardContent>
                        </Card>
                      </CardMotion>
                    );
                  })}
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Comparison Section */}
          <FadeIn>
            <section id="comparison" className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-6 text-brand-dark">
                    Compare Investment Plans
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Side-by-side comparison to help you choose the right
                    investment strategy
                  </p>
                </div>

                <div className="overflow-x-auto shadow-sm">
                  <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden ">
                    <thead className="bg-brand-primary text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">
                          Features
                        </th>
                        <th className="px-6 py-4 text-center font-semibold">
                          Venture Capital
                        </th>
                        <th className="px-6 py-4 text-center font-semibold">
                          Equity Finance
                        </th>
                        <th className="px-6 py-4 text-center font-semibold">
                          Nano Business
                        </th>
                        <th className="px-6 py-4 text-center font-semibold">
                          Ethical/Development
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 font-medium">
                          Expected Return
                        </td>
                        <td className="px-6 py-4 text-center">12-18%</td>
                        <td className="px-6 py-4 text-center">12-18%</td>
                        <td className="px-6 py-4 text-center">12-18%</td>
                        <td className="px-6 py-4 text-center">12-18%</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="px-6 py-4 font-medium">Risk Level</td>
                        <td className="px-6 py-4 text-center">
                          <Badge variant="destructive">High</Badge>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Badge variant="default">Low</Badge>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Badge variant="secondary">Moderate</Badge>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Badge variant="default">Moderate-High</Badge>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 font-medium">
                          Minimum Investment
                        </td>
                        <td className="px-6 py-4 text-center">₦10,000</td>
                        <td className="px-6 py-4 text-center">₦5,000</td>
                        <td className="px-6 py-4 text-center">₦5,000</td>
                        <td className="px-6 py-4 text-center">₦5,000</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="px-6 py-4 font-medium">Liquidity</td>
                        <td className="px-6 py-4 text-center">Medium</td>
                        <td className="px-6 py-4 text-center">High</td>
                        <td className="px-6 py-4 text-center">Medium</td>
                        <td className="px-6 py-4 text-center">Medium</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">
                          Investment Horizon
                        </td>
                        <td className="px-6 py-4 text-center">7+ years</td>
                        <td className="px-6 py-4 text-center">Short-term</td>
                        <td className="px-6 py-4 text-center">3-5 years</td>
                        <td className="px-6 py-4 text-center">5+ years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Investment Process Section */}
          <FadeIn>
            <section id="process" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-6 text-brand-dark">
                    Simple Investment Process
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Get started with your investment journey in just a few easy
                    steps
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-brand-primary">
                        1
                      </span>
                    </div>
                    <h3 className="font-bold mb-2">Choose Your Plan</h3>
                    <p className="text-muted-foreground text-sm">
                      Select the investment plan that matches your goals and
                      risk tolerance.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-brand-primary">
                        2
                      </span>
                    </div>
                    <h3 className="font-bold mb-2">Complete Application</h3>
                    <p className="text-muted-foreground text-sm">
                      Fill out our simple online application with your
                      investment preferences.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-brand-primary">
                        3
                      </span>
                    </div>
                    <h3 className="font-bold mb-2">Fund Your Account</h3>
                    <p className="text-muted-foreground text-sm">
                      Transfer funds securely through our multiple funding
                      options.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-brand-primary">
                        4
                      </span>
                    </div>
                    <h3 className="font-bold mb-2">Start Investing</h3>
                    <p className="text-muted-foreground text-sm">
                      Watch your portfolio grow with our expert management and
                      regular updates.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Risk Disclaimer */}
          <FadeIn>
            <section className="py-16 bg-gray-100">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-3">
                        Investment Risk Disclaimer
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        All investments carry risk and may lose value. Past
                        performance does not guarantee future results. Expected
                        returns are estimates based on historical data and
                        market projections. Please carefully consider your
                        investment objectives, risk tolerance, and financial
                        situation before investing. Consult with a financial
                        advisor if you have questions about which investment
                        plan is right for you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Call to Action Section */}
          <FadeIn>
            <section className="py-20 bg-brand-primary text-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold mb-6">
                  Ready to Start Your Investment Journey?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Take the first step towards financial growth with Finance
                  Teque's expertly managed investment plans.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ModalButton
                    className="w-full"
                    text="Schedule a Consultation"
                  />
                  <MotionButton
                    size="lg"
                    variant="outline"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="border-white py-5 text-base text-brand-primary hover:bg-transparent hover:text-white px-8"
                    onClick={() => {
                      const comparisonSection =
                        document.getElementById("comparison");
                      if (comparisonSection) {
                        comparisonSection.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                  >
                    Compare All Plans
                  </MotionButton>
                </div>
              </div>
            </section>
          </FadeIn>
        </PageTransition>
        <Toaster className="text-base" position="top-right" duration={3000} />
      </div>
    </>
  );
}
