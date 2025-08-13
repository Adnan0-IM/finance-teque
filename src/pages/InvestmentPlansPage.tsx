import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  ArrowRight,
  TrendingUp,
  Banknote,
  Shield,
  Heart,
  BarChart3,
  Star,
  Info,
} from "lucide-react";
import dubaiCityscape from "../assets/business-banner@2x.jpg";
import Navigation from "@/components/Navigation";
export function InvestmentPlansPage() {
  const investmentPlans = [
    {
      id: "growth",
      title: "Growth Investment",
      icon: TrendingUp,
      description:
        "Maximize your wealth potential with our aggressive growth strategy focused on high-performing equity markets and emerging technologies.",
      longDescription:
        "Our Growth Investment plan is designed for investors seeking maximum capital appreciation over the long term. We focus on equity investments in high-growth companies, particularly in technology, healthcare, and emerging markets. This plan is ideal for investors with a long investment horizon who can tolerate significant market volatility.",
      expectedReturn: "15-22% annually",
      riskLevel: "High",
      riskColor: "destructive",
      minimumInvestment: "$10,000",
      features: [
        "Equity-focused portfolio (80-95%)",
        "Technology and innovation sector exposure",
        "Emerging markets opportunities",
        "Active portfolio management",
        "Quarterly performance reviews",
      ],
      suitableFor: "Aggressive investors with 7+ year investment horizon",
    },
    {
      id: "money-market",
      title: "Money Market Investment",
      icon: Banknote,
      description:
        "Secure short-term returns with high liquidity through carefully selected money market instruments and government securities.",
      longDescription:
        "Our Money Market Investment plan offers stability and liquidity for investors who need quick access to their funds while earning competitive returns. We invest in high-quality, short-term debt securities including treasury bills, commercial paper, and certificates of deposit.",
      expectedReturn: "4-6% annually",
      riskLevel: "Low",
      riskColor: "default",
      minimumInvestment: "$1,000",
      features: [
        "High liquidity and flexibility",
        "Government and corporate bonds",
        "Short-term debt securities",
        "Capital preservation focus",
        "Monthly dividend distributions",
      ],
      suitableFor: "Conservative investors seeking liquidity and safety",
    },
    {
      id: "stability",
      title: "Stability Investment",
      icon: Shield,
      description:
        "Balanced approach combining growth potential with capital protection through diversified fixed income and stable equity investments.",
      longDescription:
        "Our Stability Investment plan strikes the perfect balance between growth and security. We combine stable dividend-paying stocks with high-grade bonds and fixed income securities to provide steady returns with moderate risk.",
      expectedReturn: "8-12% annually",
      riskLevel: "Moderate",
      riskColor: "secondary",
      minimumInvestment: "$5,000",
      features: [
        "Balanced portfolio (60% equity, 40% bonds)",
        "Dividend-focused equity selection",
        "Investment-grade fixed income",
        "Regular rebalancing",
        "Bi-annual performance reports",
      ],
      suitableFor: "Moderate investors with 3-5 year investment horizon",
    },
    {
      id: "ethical",
      title: "Ethical Investment",
      icon: Heart,
      description:
        "Invest with purpose through ESG-compliant companies that align with your values while delivering competitive returns.",
      longDescription:
        "Our Ethical Investment plan allows you to grow your wealth while supporting companies that prioritize environmental sustainability, social responsibility, and good governance. We apply rigorous ESG screening to ensure your investments align with your values.",
      expectedReturn: "10-16% annually",
      riskLevel: "Moderate-High",
      riskColor: "default",
      minimumInvestment: "$7,500",
      features: [
        "ESG-compliant investment screening",
        "Sustainable and renewable energy focus",
        "Social impact measurement",
        "Environmental responsibility criteria",
        "Annual impact reporting",
      ],
      suitableFor: "Values-driven investors seeking social impact",
    },
  ];

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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation  */}
      <Navigation/>
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Investment Plans
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Choose from our carefully crafted investment strategies designed to
            meet your financial goals and risk appetite
          </p>
        </div>
      </section>

      {/* Investment Plans Overview */}
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
              From conservative money market investments to aggressive growth
              strategies, we offer comprehensive solutions that align with your
              financial objectives and risk tolerance.
            </p>
          </div>

          {/* Investment Plans Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {investmentPlans.map((plan) => {
              const IconComponent = plan.icon;
              return (
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
                    <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-brand-primary" />
                        <span className="font-medium">Expected Return</span>
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
                        <span className="font-medium">Suitable for:</span>{" "}
                        {plan.suitableFor}
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1 bg-brand-primary hover:bg-brand-primary-dark text-white">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-brand-dark">
              Compare Investment Plans
            </h2>
            <p className="text-xl text-muted-foreground">
              Side-by-side comparison to help you choose the right investment
              strategy
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-brand-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Growth
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Money Market
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Stability
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Ethical
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-medium">Expected Return</td>
                  <td className="px-6 py-4 text-center">15-22%</td>
                  <td className="px-6 py-4 text-center">4-6%</td>
                  <td className="px-6 py-4 text-center">8-12%</td>
                  <td className="px-6 py-4 text-center">10-16%</td>
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
                  <td className="px-6 py-4 font-medium">Minimum Investment</td>
                  <td className="px-6 py-4 text-center">$10,000</td>
                  <td className="px-6 py-4 text-center">$1,000</td>
                  <td className="px-6 py-4 text-center">$5,000</td>
                  <td className="px-6 py-4 text-center">$7,500</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="px-6 py-4 font-medium">Liquidity</td>
                  <td className="px-6 py-4 text-center">Medium</td>
                  <td className="px-6 py-4 text-center">High</td>
                  <td className="px-6 py-4 text-center">Medium</td>
                  <td className="px-6 py-4 text-center">Medium</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Investment Horizon</td>
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

      {/* Investment Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-brand-dark">
              Simple Investment Process
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started with your investment journey in just a few easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-primary">1</span>
              </div>
              <h3 className="font-bold mb-2">Choose Your Plan</h3>
              <p className="text-muted-foreground text-sm">
                Select the investment plan that matches your goals and risk
                tolerance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-primary">2</span>
              </div>
              <h3 className="font-bold mb-2">Complete Application</h3>
              <p className="text-muted-foreground text-sm">
                Fill out our simple online application with your investment
                preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-primary">3</span>
              </div>
              <h3 className="font-bold mb-2">Fund Your Account</h3>
              <p className="text-muted-foreground text-sm">
                Transfer funds securely through our multiple funding options.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-primary">4</span>
              </div>
              <h3 className="font-bold mb-2">Start Investing</h3>
              <p className="text-muted-foreground text-sm">
                Watch your portfolio grow with our expert management and regular
                updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Disclaimer */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-start space-x-4">
              <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-3">Investment Risk Disclaimer</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  All investments carry risk and may lose value. Past
                  performance does not guarantee future results. Expected
                  returns are estimates based on historical data and market
                  projections. Please carefully consider your investment
                  objectives, risk tolerance, and financial situation before
                  investing. Consult with a financial advisor if you have
                  questions about which investment plan is right for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-brand-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards financial growth with Finance Teque's
            expertly managed investment plans.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-brand-primary hover:bg-gray-100 px-8 py-4"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-brand-primary hover:bg-transparent hover:text-white px-8 py-4"
            >
              Compare All Plans
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
