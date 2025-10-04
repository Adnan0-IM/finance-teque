import { Card, CardContent } from "../components/ui/card";
import {
  ArrowRight,
  Target,
  TrendingUp,
  Shield,
  Award,
  Calendar,
  Users2,
} from "lucide-react";
import realEstate from "../assets/real-estate-1536x990.jpg";
import hospitalFacilities from "../assets/hospital-facilities-1367x2048.jpg";
import dubaiCityscapeRed from "../assets/lookingforsupportimage.jpg";
import agricultureImage from "../assets/agric.jpg";
import Navigation from "@/components/Navigation";
import { Link } from "react-router";
import ModalButton from "@/components/ModalButton";
import { MotionButton } from "@/components/animations/MotionizedButton";
import PageTransition from "@/components/animations/PageTransition";
import { FadeIn } from "@/components/animations/FadeIn";
import { motion } from "framer-motion";
import { cardVariantLeft, sectionVariant } from "@/utils/motionVariants";
import BusinessModelCanvas from "@/components/BusinessModelCanvas";

export function AboutPage() {
  const handleDownload = () => {
    // Replace with your actual brochure file path
    const brochureUrl = "/finance-teque-brochure.pdf";
    const link = document.createElement("a");
    link.href = brochureUrl;
    link.download = "FinanceTeque-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Navigation */}
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
              backgroundImage: `url(${dubaiCityscapeRed})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </motion.div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Finance Teque
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Building sustainable wealth through ethical investment strategies
              and innovative financial solutions
            </p>
          </div>
        </motion.section>

        <PageTransition>
          {/* Company Story Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Our Story
                  </h3>
                  <h2 className="text-4xl font-bold mb-6 text-brand-dark">
                    Pioneering the Future of Ethical Investment
                  </h2>

                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground">
                      Founded with a vision to revolutionize investment
                      strategies, Finance Teque Investment Growth has been at
                      the forefront of ethical and sustainable investing for
                      over a decade. We believe that financial growth and social
                      responsibility are not mutually exclusive.
                    </p>

                    <p className="text-lg text-muted-foreground">
                      Our journey began when our founders recognized the need
                      for investment solutions that could deliver competitive
                      returns while maintaining the highest ethical standards.
                      Today, we manage portfolios that span across emerging
                      markets, technology sectors, and sustainable development
                      initiatives.
                    </p>

                    <p className="text-lg text-muted-foreground">
                      We've built our reputation on transparency, innovation,
                      and a deep commitment to our clients' long-term financial
                      success. Our approach combines traditional investment
                      wisdom with cutting-edge financial technology and rigorous
                      ethical screening.
                    </p>
                  </div>

                  <Link to={{ pathname: "/plans", hash: "#process" }}>
                    <MotionButton
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="cursor-pointer bg-brand-primary text-base py-[21px] hover:bg-brand-primary-dark text-white mt-8"
                    >
                      Learn More About Our Process
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </MotionButton>
                  </Link>
                </div>
                <div className="lg:relative lg:h-[400px] w-full grid gap-4 ">
                  {/* Real Estate Image (Top Left) */}
                  <motion.img
                    src={realEstate}
                    alt="Global investment opportunities"
                    className="lg:absolute top-[30px] left-0 lg:w-[200px]  lg:h-[120px]   object-cover rounded-lg shadow-2xl w-full h-[200px] md:h-[250px]"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.2 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                    loading="lazy"
                  />
                  {/* Hospital Facilities Image (Top Right) */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.img
                      src={hospitalFacilities}
                      alt="Innovation in finance"
                      className="lg:absolute top-0 right-[20px] lg:w-[200px]  lg:h-[250px]   object-cover rounded-lg shadow-2xl h-[250px] w-full"
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ amount: 0.2 }}
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.5,
                      }}
                      loading="lazy"
                    />
                    {/* Agriculture Image (Bottom Left, overlapping) */}
                    <motion.img
                      src={agricultureImage}
                      alt="Sustainable investments"
                      className="lg:absolute left-[100px]  top-[160px] lg:w-[200px]  lg:h-[300px]  object-cover rounded-lg shadow-2xl h-[250px] w-full"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.2 }}
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.5,
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <FadeIn>
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl text-center font-bold mb-8 text-brand-dark">
                  Our Business Model Canvas
                </h2>
                <BusinessModelCanvas />
              </div>
            </section>
          </FadeIn>
          {/* Investment Philosophy Section */}
          <FadeIn>
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Investment Philosophy
                  </h3>
                  <h2 className="text-4xl font-bold mb-6 text-brand-dark">
                    Our Core Investment Principles
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    We believe in a balanced approach that combines growth
                    potential with stability, always keeping our clients'
                    ethical values at the forefront.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  <motion.div
                    variants={cardVariantLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
                          <TrendingUp className="h-8 w-8 text-brand-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">
                          Long-term Equity Focus
                        </h3>
                        <p className="text-muted-foreground">
                          We prioritize long-term equity investments in
                          companies with strong fundamentals and sustainable
                          growth potential, avoiding short-term lation.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    variants={cardVariantLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
                          <Shield className="h-8 w-8 text-brand-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">
                          Fixed Income Stability
                        </h3>
                        <p className="text-muted-foreground">
                          Our portfolios blend equity investments with carefully
                          selected fixed income securities to provide stability
                          and consistent returns during market volatility.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div
                    variants={cardVariantLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
                          <Target className="h-8 w-8 text-brand-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">
                          Ethical Investment
                        </h3>
                        <p className="text-muted-foreground">
                          Every investment decision is evaluated through our
                          comprehensive ESG framework, ensuring alignment with
                          our clients' values and ethical standards.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Key Highlights Section */}
          <FadeIn>
            <section className="py-20 bg-brand-primary text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide opacity-90">
                      Investment Highlights
                    </h3>
                    <h2 className="text-4xl font-bold mb-8">
                      Designed for Forward-Thinking Investors
                    </h2>

                    <div className="space-y-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">
                            High-Risk, High-Reward Profile
                          </h4>
                          <p className="opacity-90">
                            Tailored for investors with a higher risk appetite
                            who seek substantial returns through carefully
                            calculated investment strategies in emerging markets
                            and growth sectors.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Users2 className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">
                            Values-Driven Approach
                          </h4>
                          <p className="opacity-90">
                            Perfect for investors who refuse to compromise their
                            ethical values for financial gains. Our screening
                            process ensures every investment aligns with
                            sustainable and responsible practices.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Award className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">
                            Competitive Performance
                          </h4>
                          <p className="opacity-90">
                            Our balanced approach of long-term equity
                            investments complemented by fixed income securities
                            has consistently delivered competitive returns while
                            maintaining portfolio stability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="bg-white/10 border-white/20 text-white">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold">Average Annual Return</h4>
                          <span className="text-2xl font-bold">12.8%</span>
                        </div>
                        <p className="text-sm opacity-90">
                          Over the past 5 years (2019-2024)
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 border-white/20 text-white">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold">ESG Score</h4>
                          <span className="text-2xl font-bold">A+</span>
                        </div>
                        <p className="text-sm opacity-90">
                          Top tier environmental, social, and governance rating
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 border-white/20 text-white">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold">Assets Under Management</h4>
                          <span className="text-2xl font-bold">₦2.8B</span>
                        </div>
                        <p className="text-sm opacity-90">
                          Growing portfolio across 15+ countries
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Company Milestones Timeline */}
          <FadeIn>
            <section className="py-20 bg-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Our Journey
                  </h3>
                  <h2 className="text-4xl font-bold mb-6 text-brand-dark">
                    Key Milestones & Achievements
                  </h2>
                </div>

                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-brand-light"></div>

                  <div className="space-y-12">
                    <div className="flex items-center">
                      <div className="flex-1 text-right pr-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-bold text-lg mb-2">
                            Company Founded
                          </h4>
                          <p className="text-muted-foreground">
                            Finance Teque Investment Growth was established with
                            a mission to provide ethical investment solutions.
                          </p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center z-10">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 pl-8">
                        <span className="text-xl font-bold text-brand-primary">
                          2019
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex-1 text-right pr-8">
                        <span className="text-xl font-bold text-brand-primary">
                          2021
                        </span>
                      </div>
                      <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center z-10">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 pl-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-bold text-lg mb-2">
                            First ₦100M AUM
                          </h4>
                          <p className="text-muted-foreground">
                            Reached our first major milestone of ₦100 million in
                            assets under management, demonstrating strong client
                            trust.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex-1 text-right pr-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-bold text-lg mb-2">
                            ESG Leadership Award
                          </h4>
                          <p className="text-muted-foreground">
                            Recognized as a leader in sustainable investing
                            practices and awarded for our comprehensive ESG
                            framework.
                          </p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center z-10">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 pl-8">
                        <span className="text-xl font-bold text-brand-primary">
                          2023
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex-1 text-right pr-8">
                        <span className="text-xl font-bold text-brand-primary">
                          2024
                        </span>
                      </div>
                      <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center z-10">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 pl-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-bold text-lg mb-2">
                            Global Expansion
                          </h4>
                          <p className="text-muted-foreground">
                            Expanded operations, offering our ethical investment
                            solutions to a global client base.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex-1 text-right pr-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-bold text-lg mb-2">
                            ₦2.8B AUM Milestone
                          </h4>
                          <p className="text-muted-foreground">
                            Achieved $2.8 billion in assets under management,
                            cementing our position as a leading ethical
                            investment firm.
                          </p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center z-10">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 pl-8">
                        <span className="text-xl font-bold text-brand-primary">
                          2025
                        </span>
                      </div>
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
                  Join thousands of investors who trust Finance Teque for their
                  ethical investment needs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ModalButton
                    className="w-full cursor-pointer  px-8 py-5  "
                    text="Schedule a Consultation"
                  />
                  <MotionButton
                    size="lg"
                    variant="outline"
                    className="cursor-pointer text-base py-5 border-white  hover:bg-transparent text-brand-primary hover:text-white px-8 "
                    onClick={handleDownload}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    Download Our Brochure
                  </MotionButton>
                </div>
              </div>
            </section>
          </FadeIn>
        </PageTransition>
      </div>
    </>
  );
}
