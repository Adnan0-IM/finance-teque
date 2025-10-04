import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Target,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Send,
  Youtube,
  Linkedin,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import dubaiCityscape from "../assets/business-banner@2x.jpg";
import dubaiCityscapeRed from "../assets/lookingforsupportimage.jpg";
import agricultureImage from "../assets/agric.jpg";
import realEstate from "../assets/real-estate-1536x990.jpg";
import hospitalFacilities from "../assets/hospital-facilities-1367x2048.jpg";
import logo from "../assets/logo.png";
import Navigation from "@/components/Navigation";
import { Link, useNavigate } from "react-router";
import { MotionButton } from "@/components/animations/MotionizedButton";
import { motion } from "framer-motion";
import PageTransition from "@/components/animations/PageTransition";
import { FadeIn } from "../components/animations/FadeIn";
import { sectionVariant } from "@/utils/motionVariants";
import CardMotion from "@/components/animations/CardMotion";
import HomeCarousel from "@/components/HomeCarousel";

const HomePage = () => {
  const [emailSubscription, setEmailSubscription] = useState("");
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", emailSubscription);
    setEmailSubscription("");
  };

  const navigate = useNavigate();

  return (
    <>
      {/* Navigation */}
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundImage: `url(${dubaiCityscape})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
          </motion.div>

          <div className="relative z-10 text-white w-full max-w-7xl mx-auto px-6 py-12 pt-24 ">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left side - Heading and subtitle */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl  font-bold mb-6 leading-tight tracking-tight">
                  Venture Capital Investment <br />
                  <span className="text-brand-primary">And Financing</span>
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl mb-8 font-light">
                  Need to grow your income, business, or investment to scale
                  your business?
                  <span className="font-medium block mt-2">
                    Finance Teque Nigeria Limited offers flexible asset
                    financing for all growth stages.
                  </span>
                </p>

                <p className="text-xl md:text-2xl mb-8 font-medium ">
                  Apply today and own the assets your business deserves.
                </p>

                <div className="">
                  <MotionButton
                    size="lg"
                    variant="default"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    className=" text-base md:text-lg px-6 py-6 font-semibold bg-brand-primary hover:bg-brand-primary/90 transition-all duration-300 shadow-lg"
                    onClick={() => {
                      // Guide user into the correct journey explicitly
                      navigate("/asset-financing");
                    }}
                  >
                    Apply for Business Financing{" "}
                    <motion.span
                      aria-hidden
                      initial={false}
                      whileHover={{ x: 4 }}
                      className="i-lucide-arrow-right"
                    >
                      <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.span>
                  </MotionButton>
                </div>
              </div>

              {/* Right side - List items */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-xl hidden md:block">
                <h3 className="text-xl md:text-2xl mb-6 font-medium">
                  Our Financing Solutions:
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-brand-primary text-white rounded-full h-8 w-8 min-w-8 mr-4 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-xl text-brand-primary">
                        Startups
                      </strong>
                      <p className="text-lg text-white/90">
                        Secure key assets to attract venture funding.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-brand-primary text-white rounded-full h-8 w-8 min-w-8 mr-4 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-xl text-brand-primary">
                        Growing businesses
                      </strong>
                      <p className="text-lg text-white/90">
                        Boost your value for private equity opportunities.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-brand-primary text-white rounded-full h-8 w-8 min-w-8 mr-4 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-xl text-brand-primary">
                        Micro & Nano entrepreneurs
                      </strong>
                      <p className="text-lg text-white/90">
                        Get started with affordable equipment financing.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-brand-primary text-white rounded-full h-8 w-8 min-w-8 mr-4 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-xl text-brand-primary">
                        Impact-driven enterprises
                      </strong>
                      <p className="text-lg text-white/90">
                        Access ethical financing for community-focused projects.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <PageTransition>
          {/* Our Story Section */}
          <FadeIn>
            <section id="about" className="py-20 bg-brand-primary text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold mb-6">Our story</h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-2xl opacity-95">
                      Finance Teque Investment Growth invests primarily in
                      equities and as such seeks to provide superior long-term
                      protection against inflation to investors with a high-risk
                      appetite. The high risk of equities is lowered by also
                      investing in business financing investment, which provide
                      a fairly predictable income stream and easy access to your
                      money.
                    </p>
                    <Link to={"/contact"}>
                      <MotionButton
                        variant="outline"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className="cursor-pointer text-base text-left border-white text-brand-primary hover:bg-transparent hover:text-white mt-6 py-5 w-1/2 md:w-1/3 lg:w-1/4"
                      >
                        Contact Us
                      </MotionButton>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* Carousel  */}
          <FadeIn>
            <div className="py-12">
              <HomeCarousel />
            </div>
          </FadeIn>
          {/* Portfolio Section */}
          <section id="portfolio" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="lg:relative lg:w-[500px] lg:h-[400px] w-full grid gap-4">
                  {/* Real Estate Image (Top Left) */}
                  <motion.img
                    src={realEstate}
                    alt="Global investment opportunities"
                    className="lg:absolute top-[30px] left-0 lg:w-[200px] lg:h-[120px] object-cover rounded-lg shadow-2xl w-full h-[200px] md:h-[250px]"
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
                      className="lg:absolute top-0 right-[20px] lg:w-[200px] lg:h-[250px] object-cover rounded-lg shadow-2xl h-[250px] w-full"
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
                      className="lg:absolute left-[100px] top-[160px] lg:w-[200px] lg:h-[300px] object-cover rounded-lg shadow-2xl h-[250px] w-full"
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

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Competitive Returns
                  </h3>
                  <h2 className="text-3xl font-bold mb-6 text-brand-dark">
                    The Fund aims to provide competitive returns comparable to
                    conventional investments with a stronger growth profile.
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div>
                      <h4 className="font-semibold mb-2">Investment Outlook</h4>
                      <p className="text-muted-foreground">
                        Suitable for investing towards long term goals such as
                        housing, education, innovative startup, bussiness
                        expansion and developmental project.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Inclusive</h4>
                      <p className="text-muted-foreground">
                        The Fund is certified annually for compliance and is
                        excellent for investors with faith-based or ethical
                        preferences.
                      </p>
                    </div>
                  </div>
                  <Link to={"/plans"}>
                    <MotionButton
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="cursor-pointer bg-brand-primary text-base py-5 hover:bg-brand-primary-dark text-white"
                    >
                      View Investment Plans
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </MotionButton>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          {/* Key Milestones & Achievements Section */}
          <FadeIn>
            <section
              id="achievements"
              className="py-16 sm:py-20 bg-gray-900 text-white"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                      Finance Teque focuses on investing in growing businesses
                      at their earliest operational stage.
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                      <Link className="w-full sm:w-fit" to={"/team"}>
                        <MotionButton
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98, y: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className="cursor-pointer text-[17px] py-5 w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-dark text-white px-6 sm:px-8"
                        >
                          Meet Our Team
                        </MotionButton>
                      </Link>
                      <Link className="w-full sm:w-fit" to={"/about"}>
                        <MotionButton
                          variant="outline"
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98, y: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className="cursor-pointer w-full text-[17px] py-5 sm:w-auto border-white text-gray-900 hover:bg-transparent hover:text-white px-6 sm:px-8"
                        >
                          Learn More
                        </MotionButton>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Achievement Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  <CardMotion>
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-200">
                      <CardContent className="p-4 sm:p-6 text-center">
                        <div className="mb-4 sm:mb-6">
                          <Users className="h-10 w-10 sm:h-12 sm:w-12 text-brand-secondary mx-auto" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">
                          Expert Team
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          Professionals with decades of investment experience
                        </p>
                      </CardContent>
                    </Card>
                  </CardMotion>
                  <CardMotion>
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-200">
                      <CardContent className="p-4 sm:p-6 text-center">
                        <div className="mb-4 sm:mb-6">
                          <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 text-brand-secondary mx-auto" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">
                          Growth Investment
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          Strategic investments in high-growth technology
                          companies
                        </p>
                      </CardContent>
                    </Card>
                  </CardMotion>

                  <CardMotion>
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-200">
                      <CardContent className="p-4 sm:p-6 text-center">
                        <div className="mb-4 sm:mb-6">
                          <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-brand-secondary mx-auto" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">
                          Risk Management
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          Comprehensive risk assessment and portfolio
                          diversification
                        </p>
                      </CardContent>
                    </Card>
                  </CardMotion>
                  <CardMotion>
                    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-200">
                      <CardContent className="p-4 sm:p-6 text-center">
                        <div className="mb-4 sm:mb-6">
                          <Target className="h-10 w-10 sm:h-12 sm:w-12 text-brand-secondary mx-auto" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">
                          Strategic Focus
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          Targeted investments in emerging technology sectors
                        </p>
                      </CardContent>
                    </Card>
                  </CardMotion>
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Ethics Section */}
          <FadeIn>
            <section className="py-16 bg-gray-100">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-brand-dark">
                  Finance Teque Ethical Investment is mutual fund suitable for
                  investors
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Our commitment to ethical investing ensures that your
                  portfolio aligns with your values while delivering strong
                  returns.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link to={"/plans"}>
                    <MotionButton
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="cursor-pointer text-[17px] py-[21px]  bg-brand-primary hover:bg-brand-primary-dark text-white"
                    >
                      Explore Ethical Investment Plan
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </MotionButton>
                  </Link>
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Contact Section */}
          <FadeIn>
            <section id="contact" className="py-20 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${dubaiCityscapeRed})`,
                }}
              >
                <div className="absolute inset-0 bg-black/50"></div>
              </div>

              <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-brand-primary rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                </div>

                <h2 className="text-4xl font-bold mb-6">
                  Looking for a support?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Looking for collaboration? Send an
                  <br />
                  email and describe your project.
                </p>
                <Link to={"/contact"}>
                  <MotionButton
                    size="lg"
                    className="cursor-pointer bg-brand-primary text-[17px] py-5 hover:bg-brand-primary-dark text-white px-8"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </MotionButton>
                </Link>
              </div>
            </section>
          </FadeIn>
          {/* Enhanced Footer */}
          <FadeIn>
            <footer className="bg-gray-900 text-white">
              {/* Newsletter Section */}
              <div className="bg-brand-primary py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Stay Updated
                      </h3>
                      <p className="text-white/90">
                        Get the latest investment insights and market updates
                        delivered to your inbox.
                      </p>
                    </div>
                    <form
                      onSubmit={handleNewsletterSubmit}
                      className="flex flex-col md:flex-row gap-3 w-full md:w-auto"
                    >
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={emailSubscription}
                        onChange={(e) => setEmailSubscription(e.target.value)}
                        className="bg-white/10 border-white/20 text-white text-[17px] py-[21px] placeholder:text-white/60 min-w-80"
                        required
                      />
                      <MotionButton
                        type="submit"
                        className="cursor-pointer bg-white text-brand-primary text-[17px] py-[21px] hover:bg-gray-100 flex-shrink-0"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <Send className="size-5 mr-2" />
                        Subscribe
                      </MotionButton>
                    </form>
                  </div>
                </div>
              </div>

              {/* Main Footer Content */}
              <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center space-x-3 mb-6">
                        <img
                          src={logo}
                          alt="Finance Teque Logo"
                          className="h-12 w-auto"
                        />
                        <h3 className="font-bold text-xl">Finance Teque</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Investment growth through strategic technology
                        partnerships and innovative financial solutions. We
                        specialize in ethical investing that aligns with your
                        values while delivering competitive returns.
                      </p>

                      {/* Contact Information */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-brand-primary flex-shrink-0" />
                          <span className="text-gray-400 text-sm">
                            18B. Fatima Plaza, Second Floor, Murtala Muhammad
                            Way, Kano, Nigeria
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-brand-primary flex-shrink-0" />
                          <span className="text-gray-400 text-sm">
                            <a
                              href="tel:+2349165717392"
                              className="hover:text-primary transition-colors"
                            >
                              (+234) 9165717392
                            </a>
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-brand-primary flex-shrink-0" />
                          <span className="text-gray-400 text-sm">
                            <a
                              href="mailto:info@financeteque.com"
                              className="hover:text-primary transition-colors"
                            >
                              info@financetequecv.com
                            </a>
                          </span>
                        </div>
                      </div>

                      {/* Social Media Links */}
                      <div className="flex space-x-4">
                        <a
                          target="_blank"
                          href="https://www.youtube.com/@financetequeventurecapital"
                          className="w-10 h-10 bg-gray-800 hover:bg-[#FF0000] rounded-full flex items-center justify-center transition-colors"
                        >
                          <Youtube className="h-5 w-5" />
                        </a>
                        <a
                          href="https://www.facebook.com/financeteq/about"
                          target="_blank"
                          className="w-10 h-10 bg-gray-800 hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-colors"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                        <a
                          href="https://x.com/FinanceTeque"
                          target="_blank"
                          className="w-10 h-10 bg-gray-800 hover:bg-black rounded-full flex items-center justify-center transition-colors"
                        >
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              fill="currentColor"
                              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                            />
                          </svg>
                        </a>
                        <a
                          href="https://www.instagram.com/financetequecv/"
                          target="_blank"
                          className="w-10 h-10 bg-gray-800  rounded-full hover:bg-[#d62976] flex items-center justify-center transition-colors"
                        >
                          <Instagram className="h-5 w-5 " />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/finance-teque-nigeria-limited-2ab022331/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                          target="_blank"
                          className="w-10 h-10 bg-gray-800  rounded-full hover:bg-[#d62976] flex items-center justify-center transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </div>
                    </div>

                    {/* Company Links */}
                    <div>
                      <h4 className="font-semibold mb-4 text-brand-primary">
                        Company
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-400">
                        <li>
                          <Link to={"/about"}>
                            <button className="cursor-pointer hover:text-white transition-colors text-left">
                              About Us
                            </button>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/team"}>
                            <button className="cursor-pointer hover:text-white transition-colors text-left">
                              Our Team
                            </button>
                          </Link>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            Careers
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            News & Updates
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            Awards
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Investment Services */}
                    <div>
                      <h4 className="font-semibold mb-4 text-brand-primary">
                        Investment Services
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-400">
                        <li>
                          <Link to={"/plans"}>
                            <button className="hover:text-white transition-colors text-left">
                              Investment Plans
                            </button>
                          </Link>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            Portfolio Management
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            Financial Advisory
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            Risk Assessment
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Resources & Support */}
                    <div>
                      <h4 className="font-semibold mb-4 text-brand-primary">
                        Resources & Support
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-400">
                        <li>
                          <Link to={"/contact"}>
                            <button className="hover:text-white transition-colors text-left">
                              Contact Us
                            </button>
                          </Link>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            Help Center
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            Investment Guides
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            Market Reports
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            FAQ
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            Privacy Policy
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="hover:text-white transition-colors"
                          >
                            Terms of Service
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                      <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Finance Teque
                        Investment Growth. All rights reserved.
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Licensed and regulated financial services provider
                      </p>
                    </div>
                    <div className="flex items-center space-x-6 text-xs text-gray-500">
                      <span>SEC Registered</span>
                      <span>•</span>
                      <span>SIPC Protected</span>
                      <span>•</span>
                      <span>ISO 27001 Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </FadeIn>
        </PageTransition>
      </div>
    </>
  );
};

export default HomePage;
