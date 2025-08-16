import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  ArrowRight,
  Shield,
  CheckCircle,
  Award,
  Heart,
  BookOpen,
  Users,
  Star,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import dubaiCityscape from "../assets/business-banner@2x.jpg";
import Navigation from "@/components/Navigation";
import ModalButton from "@/components/ModalButton";
import { Toaster } from "sonner";
import { useState } from "react";
import { ShariahInvestmentModal } from "@/components/ShariahInvestmentModal";

export function ShariahCompliancePage() {
  const [selectedInvestment, setSelectedInvestment] = useState<
    "growth" | "balanced" | "income" | null
  >(null);

  const complianceFeatures = [
    {
      icon: Shield,
      title: "Riba-Free Investments",
      description:
        "All investments are structured to avoid interest-based transactions, ensuring full compliance with Islamic principles.",
    },
    {
      icon: CheckCircle,
      title: "Halal Business Activities",
      description:
        "We invest only in companies engaged in permissible business activities, excluding sectors like alcohol, gambling, and tobacco.",
    },
    {
      icon: Award,
      title: "Ethical Governance",
      description:
        "Our investment decisions prioritize companies with strong ethical governance and social responsibility practices.",
    },
    {
      icon: Heart,
      title: "Social Impact Focus",
      description:
        "Investments are directed towards businesses that contribute positively to society and align with Islamic values.",
    },
  ];

  const trustBadges = [
    {
      title: "AAOIFI Certified",
      description:
        "Accounting and Auditing Organization for Islamic Financial Institutions",
      year: "2024",
    },
    {
      title: "Shari'ah Board Approved",
      description: "Regular oversight by qualified Islamic scholars",
      year: "Annual",
    },
    {
      title: "ESG Compliant",
      description: "Environmental, Social, and Governance standards",
      year: "A+ Rating",
    },
    {
      title: "Ethical Investment Certification",
      description: "Recognized ethical investment practices",
      year: "2024",
    },
  ];

  const faqData = [
    {
      question: "What makes an investment Shari'ah compliant?",
      answer:
        "Shari'ah compliant investments must avoid riba (interest), gharar (excessive uncertainty), maysir (gambling), and investments in prohibited industries such as alcohol, tobacco, gambling, and conventional banking. Our investments are screened using both qualitative and quantitative criteria to ensure full compliance.",
    },
    {
      question: "How do you ensure ongoing compliance?",
      answer:
        "We conduct quarterly reviews of all portfolio companies with our Shari'ah Advisory Board. Any company that no longer meets our compliance criteria is removed from the portfolio. We also provide annual compliance reports to all investors.",
    },
    {
      question: "What is the role of the Shari'ah Advisory Board?",
      answer:
        "Our Shari'ah Advisory Board consists of qualified Islamic scholars who provide guidance on investment decisions, review portfolio compliance, and ensure our investment processes align with Islamic principles. They meet quarterly and provide ongoing oversight.",
    },
    {
      question: "How do returns compare to conventional investments?",
      answer:
        "Historically, our Shari'ah compliant portfolios have delivered competitive returns comparable to conventional investments. Our ethical screening process often leads to investments in high-quality companies with strong governance, which can contribute to long-term performance.",
    },
    {
      question: "Can non-Muslim investors participate?",
      answer:
        "Absolutely. Our ethical investment approach appeals to all investors who wish to align their investments with values-based criteria. Many non-Muslim investors choose our Shari'ah compliant products for their ethical investment standards.",
    },
    {
      question: "How is Zakat handled?",
      answer:
        "We provide detailed annual statements that help investors calculate their Zakat obligations. While we don't automatically deduct Zakat, we offer guidance and can connect you with qualified scholars for Zakat calculation assistance.",
    },
  ];

  const handleDownload = () => {
    // Replace with your actual brochure file path
    const shariahGuide = "/investing-in-alignment-with-shariah-values.pdf";
    const link = document.createElement("a");
    link.href = shariahGuide;
    link.download = "FinanceTeque-Shariah-Guide.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation  */}
      <Navigation />
      {/* Banner Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${dubaiCityscape})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center text-primary-foreground max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Badge className="bg-green-600 hover:bg-green-700 text-primary-foreground px-4 py-2 text-lg mb-4">
              ✓ Certified Annually for Shari'ah Compliance
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Shari'ah Compliant Investing
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Grow your wealth in accordance with Islamic principles through our
            ethically-screened investment solutions
          </p>
        </div>
      </section>

      {/* Certification Banner */}
      <section className="py-8 bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-green-600" />
              <span className="font-semibold text-green-800">
                Shari'ah Board Certified
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-green-600" />
              <span className="font-semibold text-green-800">
                AAOIFI Compliant
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="font-semibold text-green-800">
                Quarterly Reviews
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
              Our Commitment
            </h3>
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Investing with Faith and Purpose
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At Finance Teque, we understand that your investment choices
              should reflect your values. Our Shari'ah compliant investment
              solutions ensure your wealth grows in accordance with Islamic
              principles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {complianceFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust and Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Trust & Certifications
            </h2>
            <p className="text-xl text-muted-foreground">
              Our commitment to Shari'ah compliance is validated by leading
              Islamic finance institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, index) => (
              <Card
                key={index}
                className="bg-white border-2 border-primary hover:border-primary-dark transition-colors"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-2">{badge.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {badge.description}
                  </p>
                  <Badge
                    variant="outline"
                    className="border-primary text-primary"
                  >
                    {badge.year}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                Our Process
              </h3>
              <h2 className="text-4xl font-bold mb-6 text-primary">
                Rigorous Shari'ah Screening Process
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-light border rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">
                      Business Activity Screening
                    </h4>
                    <p className="text-muted-foreground">
                      We exclude companies involved in prohibited activities
                      such as conventional banking, alcohol, gambling, tobacco,
                      and adult entertainment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-light border rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Financial Ratio Analysis</h4>
                    <p className="text-muted-foreground">
                      Companies must meet specific financial criteria including
                      debt-to-market cap ratios and interest-bearing securities
                      thresholds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-light border rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Ongoing Monitoring</h4>
                    <p className="text-muted-foreground">
                      Quarterly reviews ensure continued compliance, with
                      immediate action taken if companies no longer meet our
                      criteria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-light border rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Shari'ah Board Review</h4>
                    <p className="text-muted-foreground">
                      All investment decisions are validated by our qualified
                      Shari'ah Advisory Board comprising renowned Islamic
                      scholars.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-light to-brand-secondary/10 p-8 rounded-lg">
              <div className="text-center mb-8">
                <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Shari'ah Advisory Board</h3>
                <p className="text-muted-foreground text-sm">
                  Our board consists of internationally recognized Islamic
                  scholars with expertise in Islamic finance and jurisprudence.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="bg-white/80">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">
                          5 Qualified Scholars
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PhD in Islamic Jurisprudence
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Quarterly Reviews</p>
                        <p className="text-xs text-muted-foreground">
                          Regular compliance assessment
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">
                          Annual Certification
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Full compliance verification
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Common questions about Shari'ah compliant investing
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white  rounded-lg border-0 shadow-md"
              >
                <AccordionTrigger className="px-6 cursor-pointer py-4 hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-left font-medium">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Investment Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Shari'ah Compliant Investment Options
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose from our range of ethically-screened investment solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-2 border-primary hover:border-primary-dark transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Shari'ah Growth Fund</h3>
                <p className="text-muted-foreground">
                  Long-term capital appreciation through halal equity
                  investments
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Expected Return</span>
                  <span className="font-bold text-primary">
                    12-18% annually
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Risk Level</span>
                  <Badge
                    variant="outline"
                    className="border-primary text-primary"
                  >
                    Moderate-High
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Min. Investment</span>
                  <span className="font-bold">$5,000</span>
                </div>
                <Button
                  className="w-full cursor-pointer bg-primary hover:bg-primary-dark text-primary-foreground mt-6"
                  onClick={() => setSelectedInvestment("growth")}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-primary hover:border-primary-dark transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Shari'ah Balanced Fund</h3>
                <p className="text-muted-foreground">
                  Balanced approach with Sukuk and halal equities
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Expected Return</span>
                  <span className="font-bold text-primary">8-12% annually</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Risk Level</span>
                  <Badge
                    variant="outline"
                    className="border-primary text-primary"
                  >
                    Moderate
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Min. Investment</span>
                  <span className="font-bold">$3,000</span>
                </div>
                <Button
                  className="w-full cursor-pointer bg-primary hover:bg-primary-dark text-primary-foreground mt-6"
                  onClick={() => setSelectedInvestment("balanced")}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-primary hover:border-primary-dark transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Shari'ah Income Fund</h3>
                <p className="text-muted-foreground">
                  Stable income through Sukuk and dividend-paying halal stocks
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Expected Return</span>
                  <span className="font-bold text-primary">6-10% annually</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Risk Level</span>
                  <Badge
                    variant="outline"
                    className="border-primary text-primary"
                  >
                    Low-Moderate
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Min. Investment</span>
                  <span className="font-bold">$2,000</span>
                </div>
                <Button
                  className="w-full cursor-pointer bg-primary hover:bg-primary-dark text-primary-foreground mt-6"
                  onClick={() => setSelectedInvestment("income")}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-primary-dark text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Shari'ah Compliant Investment Journey
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Grow your wealth according to Islamic principles with our certified
            Shari'ah compliant investment solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ModalButton text="Schedule a Consultation" />
            <Button
              size="lg"
              variant="outline"
              className="border-white text-primary hover:bg-transparent hover:text-white px-8 py-4"
              onClick={handleDownload}
            >
              Download Shari'ah Guide
            </Button>
          </div>

          <div className="mt-8 text-sm opacity-80">
            <p>
              All investments are overseen by our qualified Shari'ah Advisory
              Board
            </p>
          </div>
        </div>
      </section>
      <Toaster className="text-base" position="top-right" duration={3000} />
      <ShariahInvestmentModal
        isOpen={selectedInvestment !== null}
        onClose={() => setSelectedInvestment(null)}
        investmentType={selectedInvestment}
      />
    </div>
  );
}
