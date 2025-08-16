import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Users,
  Download,
} from "lucide-react";
import ModalButton from "@/components/ModalButton";
import { Toaster } from "sonner";
import { investmentPlans, type InvestmentPlan } from "../data/investmentPlans";

export default function InvestmentPlanDetailPage() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [activePlan, setActivePlan] = useState<InvestmentPlan | null>(null);

  useEffect(() => {
    // Find the plan that matches the ID from the URL
    const plan = investmentPlans.find((p: InvestmentPlan) => p.id === planId);

    if (plan) {
      setActivePlan(plan);
    } else {
      // Redirect to investment plans page if plan not found
      navigate("/plans");
    }
  }, [planId, navigate]);

  if (!activePlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const IconComponent = activePlan.icon;

  // Sample historical performance data
  // const historicalPerformance = {
  //   vci: [
  //     { year: "2024", return: "19.8%" },
  //     { year: "2023", return: "16.2%" },
  //     { year: "2022", return: "-7.4%" },
  //     { year: "2021", return: "24.6%" },
  //     { year: "2020", return: "18.9%" },
  //   ],
  //   efi: [
  //     { year: "2024", return: "5.8%" },
  //     { year: "2023", return: "4.9%" },
  //     { year: "2022", return: "4.2%" },
  //     { year: "2021", return: "3.7%" },
  //     { year: "2020", return: "4.1%" },
  //   ],
  //   nbi: [
  //     { year: "2024", return: "11.3%" },
  //     { year: "2023", return: "9.7%" },
  //     { year: "2022", return: "2.6%" },
  //     { year: "2021", return: "14.2%" },
  //     { year: "2020", return: "10.8%" },
  //   ],
  //   edi: [
  //     { year: "2024", return: "15.6%" },
  //     { year: "2023", return: "12.8%" },
  //     { year: "2022", return: "-3.2%" },
  //     { year: "2021", return: "18.9%" },
  //     { year: "2020", return: "14.2%" },
  //   ],
  // };

  // Sample asset allocation data
  // const assetAllocation = {
  //   vci: [
  //     { category: "Technology Equities", percentage: "35%" },
  //     { category: "Healthcare Equities", percentage: "25%" },
  //     { category: "Financial Equities", percentage: "20%" },
  //     { category: "Emerging Markets", percentage: "15%" },
  //     { category: "Cash & Equivalents", percentage: "5%" },
  //   ],
  //   efi: [
  //     { category: "Government Treasury Bills", percentage: "40%" },
  //     { category: "Certificates of Deposit", percentage: "25%" },
  //     { category: "Commercial Paper", percentage: "20%" },
  //     { category: "Short-term Corporate Bonds", percentage: "10%" },
  //     { category: "Cash", percentage: "5%" },
  //   ],
  //   nbi: [
  //     { category: "Dividend Stocks", percentage: "40%" },
  //     { category: "Corporate Bonds", percentage: "30%" },
  //     { category: "Government Securities", percentage: "15%" },
  //     { category: "REITs", percentage: "10%" },
  //     { category: "Cash & Equivalents", percentage: "5%" },
  //   ],
  //   edi: [
  //     { category: "Sustainable Tech", percentage: "30%" },
  //     { category: "Renewable Energy", percentage: "25%" },
  //     { category: "Healthcare & Wellness", percentage: "20%" },
  //     { category: "Sustainable Consumer Goods", percentage: "15%" },
  //     { category: "Green Bonds", percentage: "10%" },
  //   ],
  // };

  // Fee structure
  const feeStructure = {
    vci: {
      management: "1.75% annually",
      performance: "20% on returns above benchmark",
      entry: "1.5%",
      exit: "1.0% (waived after 3 years)",
      minimum: "₦10,000",
    },
    efi: {
      management: "0.5% annually",
      performance: "None",
      entry: "0%",
      exit: "0%",
      minimum: "₦1,000",
    },
    nbi: {
      management: "1.25% annually",
      performance: "10% on returns above benchmark",
      entry: "1.0%",
      exit: "0.5% (waived after 2 years)",
      minimum: "₦5,000",
    },
    edi: {
      management: "1.5% annually",
      performance: "15% on returns above benchmark",
      entry: "1.25%",
      exit: "0.75% (waived after 3 years)",
      minimum: "₦7,500",
    },
  };

  // Top holdings (sample companies for each investment type)
  // const topHoldings = {
  //   vci: [
  //     "Nvidia Corporation (Tech)",
  //     "ASML Holding (Semiconductors)",
  //     "Eli Lilly (Healthcare)",
  //     "Microsoft (Technology)",
  //     "Alphabet (Technology)",
  //     "Amazon (E-commerce)",
  //     "Tesla (Electric Vehicles)",
  //     "UnitedHealth Group (Healthcare)",
  //     "LVMH (Luxury Goods)",
  //     "Samsung Electronics (Technology)",
  //   ],
  //   efi: [
  //     "US Treasury Bills (Government)",
  //     "JP Morgan Cash Instruments (Banking)",
  //     "Bank of America CD (Banking)",
  //     "HSBC Money Market (Banking)",
  //     "Citigroup Commercial Paper (Banking)",
  //     "Federal Home Loan Bank Notes (Government)",
  //     "Federal Farm Credit Bank (Government)",
  //     "Goldman Sachs Group (Banking)",
  //     "Toyota Motor Credit Corp (Auto)",
  //     "Barclays Negotiable CDs (Banking)",
  //   ],
  //   nbi: [
  //     "Johnson & Johnson (Healthcare)",
  //     "Procter & Gamble (Consumer Goods)",
  //     "Coca-Cola Company (Beverages)",
  //     "Verizon Communications (Telecom)",
  //     "Nestle (Consumer Goods)",
  //     "McDonald's Corporation (Restaurants)",
  //     "PepsiCo Inc. (Food & Beverage)",
  //     "IBM (Technology)",
  //     "Unilever (Consumer Goods)",
  //     "AT&T Inc. (Telecommunications)",
  //   ],
  //   edi: [
  //     "NextEra Energy (Renewable Energy)",
  //     "Tesla (Electric Vehicles)",
  //     "Beyond Meat (Sustainable Food)",
  //     "Vestas Wind Systems (Wind Energy)",
  //     "First Solar (Solar Energy)",
  //     "Orsted (Renewable Energy)",
  //     "Linde plc (Clean Technologies)",
  //     "Waste Management (Recycling)",
  //     "Autodesk (Sustainable Software)",
  //     "Ecolab (Water Solutions)",
  //   ],
  // };

  // Investment strategy extended descriptions
  // const investmentStrategy = {
  //   vci: {
  //     approach:
  //       "Our Venture Capital Investment plan employs an aggressive capital appreciation strategy that seeks to maximize returns through concentrated exposure to high-growth sectors and companies. We utilize both fundamental and technical analysis to identify companies with disruptive potential, market leadership, and strong earnings growth trajectories.",
  //     selectionCriteria: [
  //       "Companies with consistent revenue growth exceeding 15% annually",
  //       "Market leaders with strong competitive advantages",
  //       "Disruptive business models with scaling potential",
  //       "Strong management teams with proven execution abilities",
  //       "Favorable industry trends and expanding market opportunities",
  //     ],
  //     riskManagement:
  //       "We manage risk through position sizing, sector diversification, and active monitoring of market conditions. While this strategy experiences higher volatility, our disciplined approach to entry and exit points helps mitigate downside risk while maximizing growth potential.",
  //     rebalancing:
  //       "Quarterly portfolio rebalancing ensures alignment with market conditions and growth opportunities, with tactical adjustments made as needed based on market developments.",
  //   },
  //   efi: {
  //     approach:
  //       "Our Equity Finance Investment plan focuses on capital preservation and liquidity while generating modest but stable returns. We invest exclusively in high-quality, short-term debt instruments from governments, financial institutions, and top-rated corporations.",
  //     selectionCriteria: [
  //       "Securities with maturities under 13 months",
  //       "Minimum credit ratings of A-1/P-1/F1",
  //       "Diversification across issuers and maturity dates",
  //       "Liquidity assessment for all instruments",
  //       "Yield optimization within risk parameters",
  //     ],
  //     riskManagement:
  //       "Risk is managed through strict credit quality standards, maturity limits, and issuer concentration limits. We continuously monitor market conditions and credit quality to ensure portfolio safety.",
  //     rebalancing:
  //       "Daily liquidity assessments and weekly portfolio reviews ensure optimal yield while maintaining capital preservation objectives.",
  //   },
  //   nbi: {
  //     approach:
  //       "Our Nano Business Investment plan balances growth and income through a diversified portfolio of dividend-paying equities and fixed-income securities. We seek companies with stable earnings, strong balance sheets, and consistent dividend histories, complemented by investment-grade bonds.",
  //     selectionCriteria: [
  //       "Equities with 5+ years of dividend growth",
  //       "Companies with low debt-to-equity ratios",
  //       "Investment-grade bonds (BBB- or higher)",
  //       "Sector diversification for reduced volatility",
  //       "Attractive risk-adjusted return potential",
  //     ],
  //     riskManagement:
  //       "We manage risk through asset allocation, sector diversification, and quality screening. Our balanced approach provides downside protection during market volatility while capturing upside potential.",
  //     rebalancing:
  //       "Quarterly strategic rebalancing maintains target allocations, with tactical adjustments based on economic conditions and market valuations.",
  //   },
  //   edi: {
  //     approach:
  //       "Our Ethical/Development Investment plan combines financial returns with positive social and environmental impact. We apply comprehensive ESG (Environmental, Social, Governance) screening to identify companies contributing to sustainability while excluding those with negative impacts.",
  //     selectionCriteria: [
  //       "Top quartile ESG ratings from recognized agencies",
  //       "Climate change mitigation contributors",
  //       "Strong workplace practices and diversity",
  //       "Transparent governance and ethical business practices",
  //       "Innovative solutions to sustainability challenges",
  //     ],
  //     riskManagement:
  //       "Beyond traditional financial risk management, we assess sustainability risks and opportunities that may impact long-term performance, ensuring both financial returns and positive impact.",
  //     rebalancing:
  //       "Quarterly financial rebalancing is complemented by semi-annual ESG reassessment to ensure continued alignment with ethical criteria and impact objectives.",
  //   },
  // };

  // Plan-specific benefits
  // const benefits = {
  //   vci: [
  //     "Access to high-growth private equity opportunities (for investments over $50,000)",
  //     "Quarterly strategy calls with portfolio managers",
  //     "Early access to IPO allocations",
  //     "Advanced tax optimization strategies",
  //     "Annual personal portfolio review with senior investment team",
  //   ],
  //   efi: [
  //     "Daily liquidity with no withdrawal penalties",
  //     "Online sweep account integration",
  //     "Automatic reinvestment options",
  //     "Corporate cash management solutions",
  //     "Check-writing privileges (for accounts over $25,000)",
  //   ],
  //   nbi: [
  //     "Income distribution options (monthly, quarterly, or annual)",
  //     "Tax-efficient dividend harvesting",
  //     "Retirement income planning tools",
  //     "Portfolio stress testing against market scenarios",
  //     "Annual financial planning session",
  //   ],
  //   edi: [
  //     "Annual impact report detailing ESG metrics",
  //     "Shareholder advocacy participation",
  //     "Community investment allocations",
  //     "Sustainable investing educational resources",
  //     "Carbon footprint assessment of your portfolio",
  //   ],
  // };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-primary to-brand-primary-dark py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            className="mb-8 bg-transparent border-white hover:bg-white hover:text-brand-primary"
            onClick={() => navigate("/plans")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Plans
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                  <IconComponent className="h-8 w-8 text-brand-primary" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">
                    {activePlan.title}
                  </h1>
                  <Badge className="mt-2 bg-white text-brand-primary">
                    {activePlan.riskLevel} Risk
                  </Badge>
                </div>
              </div>
              <p className="text-xl opacity-90 max-w-xl">
                {activePlan.longDescription}
              </p>
            </div>

            <div className="bg-white text-gray-900 rounded-lg p-6 shadow-lg w-full md:w-auto">
              <h3 className="font-bold text-lg mb-4">Plan Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Expected Return:
                  </span>
                  <span className="font-bold text-brand-primary">
                    {activePlan.expectedReturn}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Minimum Investment:
                  </span>
                  <span className="font-bold">
                    {activePlan.minimumInvestment}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Management Fee:</span>
                  <span className="font-bold">
                    {
                      feeStructure[activePlan.id as keyof typeof feeStructure]
                        .management
                    }
                  </span>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <ModalButton className="shadow-sm bg-primary text-white hover:text-gray-900 hover:bg-transparent hover:border" text="Start Investing" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="text-xl h-[30vh] text-center py-8">Content coming soon</div>
      {/* Main Content Tabs */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start mb-8 overflow-x-auto flex-wrap">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="strategy">Strategy & Performance</TabsTrigger>
              <TabsTrigger value="details">Investment Details</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            {/* <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold mb-6">Plan Overview</h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    {activePlan.longDescription}
                  </p>

                  <h3 className="text-xl font-bold mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {activePlan.features.map(
                      (feature: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      )
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-4">Who Should Invest</h3>
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="flex items-start space-x-3">
                      <Users className="h-6 w-6 text-brand-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium mb-2">
                          This plan is suitable for:
                        </p>
                        <p className="text-muted-foreground">
                          {activePlan.suitableFor}
                        </p>
                      </div>
                    </div>
                  </div>

                
                </div>

                <div>
                

                  <Card className="mb-6 border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Getting Started</h3>
                      <ol className="space-y-4">
                        <li className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-sm font-bold text-brand-primary">
                              1
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">
                              Schedule a Consultation
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Discuss your financial goals with our advisors
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-sm font-bold text-brand-primary">
                              2
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">Complete Application</p>
                            <p className="text-sm text-muted-foreground">
                              Fill out our easy online application form
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-sm font-bold text-brand-primary">
                              3
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">Fund Your Account</p>
                            <p className="text-sm text-muted-foreground">
                              Transfer your initial investment securely
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-sm font-bold text-brand-primary">
                              4
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">Track Your Progress</p>
                            <p className="text-sm text-muted-foreground">
                              Monitor performance through our dashboard
                            </p>
                          </div>
                        </li>
                      </ol>
                      <div className="mt-6">
                        <ModalButton text="Schedule a Consultation" />
                      </div>
                    </CardContent>
                  </Card>

              
                </div>
              </div>
            </TabsContent> */} 
            {/* Investment Strategy Tab */}
            {/* <TabsContent value="strategy" className="mt-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold mb-6">
                    Strategy & Performance
                  </h2>

                  {/* Strategy Section */}
                  {/* <div className="mb-10">
                    <h3 className="text-xl font-bold mb-4">
                      Investment Approach
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {
                        investmentStrategy[
                          activePlan.id as keyof typeof investmentStrategy
                        ].approach
                      }
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h4 className="font-bold mb-3">Selection Criteria</h4>
                        <ul className="space-y-2">
                          {investmentStrategy[
                            activePlan.id as keyof typeof investmentStrategy
                          ].selectionCriteria
                            .slice(0, 3)
                            .map((criteria, index) => (
                              <li
                                key={index}
                                className="flex items-start space-x-2"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{criteria}</span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold mb-3">Risk Management</h4>
                        <p className="text-sm text-muted-foreground">
                          {
                            investmentStrategy[
                              activePlan.id as keyof typeof investmentStrategy
                            ].riskManagement
                          }
                        </p>
                      </div>
                    </div> */}

                    {/* Risk level visualization */}
                    {/* <div className="border border-gray-200 rounded-lg p-4 mb-8">
                      <h4 className="font-bold mb-3">Risk Level</h4>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-brand-primary text-white">
                              {activePlan.riskLevel}
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                          <div
                            style={{
                              width:
                                activePlan.id === "efi"
                                  ? "20%"
                                  : activePlan.id === "nbi"
                                  ? "50%"
                                  : activePlan.id === "edi"
                                  ? "75%"
                                  : "90%",
                            }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-primary"
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Conservative</span>
                          <span>Moderate</span>
                          <span>Aggressive</span>
                        </div>
                      </div>
                    </div>
                  </div>  */}

                  {/* Performance Section */}
                  {/* <div>
                    <h3 className="text-xl font-bold mb-4">
                      Historical Performance
                    </h3>

                    <div className="overflow-x-auto mb-6">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Year
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Return
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Benchmark
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {historicalPerformance[
                            activePlan.id as keyof typeof historicalPerformance
                          ]
                            .slice(0, 3)
                            .map((year, index) => (
                              <tr key={index}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {year.year}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                  {year.return}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                  {activePlan.id === "vci"
                                    ? index === 0
                                      ? "17.2%"
                                      : index === 1
                                      ? "13.9%"
                                      : "-9.8%"
                                    : activePlan.id === "efi"
                                    ? index === 0
                                      ? "5.1%"
                                      : index === 1
                                      ? "4.5%"
                                      : "3.9%"
                                    : activePlan.id === "nbi"
                                    ? index === 0
                                      ? "9.8%"
                                      : index === 1
                                      ? "8.9%"
                                      : "1.8%"
                                    : index === 0
                                    ? "13.7%"
                                    : index === 1
                                    ? "11.5%"
                                    : "-5.2%"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="text-sm text-muted-foreground mb-8">
                      <AlertTriangle className="h-4 w-4 inline-block mr-1 text-amber-500" />
                      Past performance is not indicative of future results.
                      Investment involves risk.
                    </p>
                  </div>
                </div>

                <div>
                  <Card className="mb-6 border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Performance Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            1-Year Return
                          </span>
                          <span className="font-medium">
                            {
                              historicalPerformance[
                                activePlan.id as keyof typeof historicalPerformance
                              ][0].return
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            3-Year Annualized
                          </span>
                          <span className="font-medium">
                            {activePlan.id === "vci"
                              ? "12.5%"
                              : activePlan.id === "efi"
                              ? "4.6%"
                              : activePlan.id === "nbi"
                              ? "9.1%"
                              : "10.3%"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Volatility
                          </span>
                          <span className="font-medium">
                            {activePlan.id === "vci"
                              ? "19.2%"
                              : activePlan.id === "efi"
                              ? "0.7%"
                              : activePlan.id === "nbi"
                              ? "8.5%"
                              : "14.8%"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-6 border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Investment Philosophy</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {activePlan.id === "vci" &&
                          "We believe in identifying transformative companies with disruptive potential and strong growth trajectories that can outperform the broader market over the long term."}
                        {activePlan.id === "efi" &&
                          "We prioritize capital preservation and liquidity while seeking competitive yields through high-quality short-term instruments with minimal credit and interest rate risk."}
                        {activePlan.id === "nbi" &&
                          "We focus on building resilient portfolios that can deliver consistent returns across market cycles through a strategic balance of income-generating assets and stable growth investments."}
                        {activePlan.id === "edi" &&
                          "We believe that companies solving important environmental and social challenges while maintaining strong governance practices can deliver superior long-term returns alongside positive impact."}
                      </p>
                    </CardContent>
                  </Card>

                  <div className="bg-brand-light p-6 rounded-lg">
                    <h3 className="font-bold mb-3">Have Questions?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our investment team is ready to discuss our{" "}
                      {activePlan.title} plan with you.
                    </p>
                    <ModalButton text="Schedule a Consultation" />
                  </div>
                </div>
              </div>
            </TabsContent> */}

            {/* Performance Tab */}
            {/* <TabsContent value="performance" className="mt-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold mb-6">
                    Historical Performance
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Review the past performance of our {activePlan.title} plan.
                    While past performance is not indicative of future results,
                    it demonstrates our investment approach across different
                    market conditions.
                  </p>

                  <div className="overflow-x-auto shadow-sm rounded-lg mb-8">
                    <table className="w-full bg-white">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Year
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Plan Return
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Benchmark
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Difference
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {historicalPerformance[
                          activePlan.id as keyof typeof historicalPerformance
                        ].map((item, index) => {
                          // Simulated benchmark and difference values
                          const benchmarkValue =
                            activePlan.id === "growth"
                              ? Number(item.return.replace("%", "")) -
                                Math.random() * 3
                              : activePlan.id === "money-market"
                              ? Number(item.return.replace("%", "")) -
                                Math.random() * 0.5
                              : activePlan.id === "stability"
                              ? Number(item.return.replace("%", "")) -
                                Math.random() * 1.5
                              : Number(item.return.replace("%", "")) -
                                Math.random() * 2;

                          const difference =
                            Number(item.return.replace("%", "")) -
                            benchmarkValue;

                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.year}
                              </td>
                              <td
                                className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                                  Number(item.return.replace("%", "")) >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {item.return}
                              </td>
                              <td
                                className={`px-6 py-4 whitespace-nowrap text-sm ${
                                  benchmarkValue >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {benchmarkValue.toFixed(1)}%
                              </td>
                              <td
                                className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                                  difference >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {difference >= 0 ? "+" : ""}
                                {difference.toFixed(1)}%
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold mb-2">
                          Performance Disclosure
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Past performance is not indicative of future results.
                          Returns shown are net of fees. Benchmark comparison is
                          against{" "}
                          {activePlan.id === "growth"
                            ? "S&P 500"
                            : activePlan.id === "money-market"
                            ? "US Treasury Bill Index"
                            : activePlan.id === "stability"
                            ? "Balanced Composite Index (60% S&P 500, 40% Bloomberg Barclays Aggregate Bond Index)"
                            : "MSCI World ESG Leaders Index"}
                          . Performance calculations follow Global Investment
                          Performance Standards (GIPS).
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4">Growth of $10,000</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 h-80 flex items-center justify-center mb-8">
                    <p className="text-muted-foreground">
                      [Growth Chart Visualization - An initial $10,000
                      investment would be worth approximately{" "}
                      {activePlan.id === "growth"
                        ? "$22,850"
                        : activePlan.id === "money-market"
                        ? "$12,500"
                        : activePlan.id === "stability"
                        ? "$15,950"
                        : "$18,700"}{" "}
                      after 5 years based on historical performance]
                    </p>
                  </div>
                </div>

                <div>
                  <Card className="mb-6 border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Performance Summary</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Annualized 5-Year Return
                          </p>
                          <p className="text-2xl font-bold text-brand-primary">
                            {activePlan.id === "growth"
                              ? "14.8%"
                              : activePlan.id === "money-market"
                              ? "4.5%"
                              : activePlan.id === "stability"
                              ? "9.7%"
                              : "11.6%"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Best Year (Last 5 Years)
                          </p>
                          <p className="text-xl font-bold text-green-600">
                            {activePlan.id === "growth"
                              ? "+24.6% (2021)"
                              : activePlan.id === "money-market"
                              ? "+5.8% (2024)"
                              : activePlan.id === "stability"
                              ? "+14.2% (2021)"
                              : "+18.9% (2021)"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Worst Year (Last 5 Years)
                          </p>
                          <p className="text-xl font-bold text-red-600">
                            {activePlan.id === "growth"
                              ? "-7.4% (2022)"
                              : activePlan.id === "money-market"
                              ? "+3.7% (2021)"
                              : activePlan.id === "stability"
                              ? "+2.6% (2022)"
                              : "-3.2% (2022)"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Benchmark Outperformance
                          </p>
                          <p className="text-xl font-bold text-green-600">
                            {activePlan.id === "growth"
                              ? "+2.2%"
                              : activePlan.id === "money-market"
                              ? "+0.6%"
                              : activePlan.id === "stability"
                              ? "+1.4%"
                              : "+1.8%"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-6 border-0 shadow-sm bg-gray-50">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Risk Metrics (5 Year)</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-sm text-muted-foreground">
                            Sharpe Ratio
                          </span>
                          <span className="font-medium">
                            {activePlan.id === "growth"
                              ? "0.92"
                              : activePlan.id === "money-market"
                              ? "1.45"
                              : activePlan.id === "stability"
                              ? "1.18"
                              : "1.05"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-sm text-muted-foreground">
                            Standard Deviation
                          </span>
                          <span className="font-medium">
                            {activePlan.id === "growth"
                              ? "16.8%"
                              : activePlan.id === "money-market"
                              ? "0.7%"
                              : activePlan.id === "stability"
                              ? "8.5%"
                              : "12.4%"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-sm text-muted-foreground">
                            Beta (vs. Market)
                          </span>
                          <span className="font-medium">
                            {activePlan.id === "growth"
                              ? "1.15"
                              : activePlan.id === "money-market"
                              ? "0.02"
                              : activePlan.id === "stability"
                              ? "0.65"
                              : "0.90"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Maximum Drawdown
                          </span>
                          <span className="font-medium">
                            {activePlan.id === "growth"
                              ? "-18.5%"
                              : activePlan.id === "money-market"
                              ? "-0.2%"
                              : activePlan.id === "stability"
                              ? "-9.7%"
                              : "-14.2%"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-brand-light p-6 rounded-lg">
                    <h3 className="font-bold mb-3">Ready to Invest?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start your investment journey with our {activePlan.title}{" "}
                      plan today.
                    </p>
                    <ModalButton text="Schedule a Consultation" />
                  </div>
                </div>
              </div>
            </TabsContent> */}

            {/* Asset Allocation Tab */}
            {/* <TabsContent value="allocation" className="mt-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold mb-6">Asset Allocation</h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Our {activePlan.title} plan features a carefully constructed
                    asset allocation designed to{" "}
                    {activePlan.id === "growth"
                      ? "maximize growth potential while managing sector-specific risks."
                      : activePlan.id === "money-market"
                      ? "preserve capital while providing stable returns and high liquidity."
                      : activePlan.id === "stability"
                      ? "balance growth and income while reducing overall portfolio volatility."
                      : "deliver competitive returns while investing in environmentally and socially responsible companies."}
                  </p>

                  <div className="bg-white border border-gray-200 rounded-lg p-6 h-80 flex items-center justify-center mb-8">
                    <p className="text-muted-foreground">
                      [Asset Allocation Pie Chart Visualization - Showing
                      percentage distribution across asset categories]
                    </p>
                  </div>

                  <h3 className="text-xl font-bold mb-4">
                    Allocation Breakdown
                  </h3>
                  <div className="overflow-x-auto shadow-sm rounded-lg mb-8">
                    <table className="w-full bg-white">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Asset Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Allocation
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Target Range
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Purpose
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {assetAllocation[
                          activePlan.id as keyof typeof assetAllocation
                        ].map((asset, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {asset.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {asset.percentage}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {activePlan.id === "growth"
                                ? index === 0
                                  ? "30-40%"
                                  : index === 1
                                  ? "20-30%"
                                  : index === 2
                                  ? "15-25%"
                                  : index === 3
                                  ? "10-20%"
                                  : "0-10%"
                                : activePlan.id === "money-market"
                                ? index === 0
                                  ? "30-50%"
                                  : index === 1
                                  ? "20-30%"
                                  : index === 2
                                  ? "15-25%"
                                  : index === 3
                                  ? "5-15%"
                                  : "0-10%"
                                : activePlan.id === "stability"
                                ? index === 0
                                  ? "35-45%"
                                  : index === 1
                                  ? "25-35%"
                                  : index === 2
                                  ? "10-20%"
                                  : index === 3
                                  ? "5-15%"
                                  : "0-10%"
                                : index === 0
                                ? "25-35%"
                                : index === 1
                                ? "20-30%"
                                : index === 2
                                ? "15-25%"
                                : index === 3
                                ? "10-20%"
                                : "5-15%"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {activePlan.id === "growth"
                                ? index === 0
                                  ? "Growth driver"
                                  : index === 1
                                  ? "Sector diversification"
                                  : index === 2
                                  ? "Geographic expansion"
                                  : index === 3
                                  ? "Emerging opportunities"
                                  : "Liquidity buffer"
                                : activePlan.id === "money-market"
                                ? index === 0
                                  ? "Safety and stability"
                                  : index === 1
                                  ? "Enhanced yield"
                                  : index === 2
                                  ? "Short-term income"
                                  : index === 3
                                  ? "Credit diversification"
                                  : "Immediate liquidity"
                                : activePlan.id === "stability"
                                ? index === 0
                                  ? "Income generation"
                                  : index === 1
                                  ? "Stability core"
                                  : index === 2
                                  ? "Inflation protection"
                                  : index === 3
                                  ? "Alternative income"
                                  : "Operational funds"
                                : index === 0
                                ? "Impact focus"
                                : index === 1
                                ? "Climate solutions"
                                : index === 2
                                ? "Social impact"
                                : index === 3
                                ? "Sustainable consumer"
                                : "Green fixed income"}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Account Minimum
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {
                              feeStructure[
                                activePlan.id as keyof typeof feeStructure
                              ].minimum
                            }
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            Minimum investment amount required to open an
                            account
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-xl font-bold mb-4">
                    Additional Services
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start space-x-3">
                        <DollarSign className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Tax Reporting</p>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive annual tax documents and reporting
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Advisory Services</p>
                          <p className="text-sm text-muted-foreground">
                            Access to financial advisors for investment guidance
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Quarterly Reviews</p>
                          <p className="text-sm text-muted-foreground">
                            Regular performance and strategy reviews
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Eye className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">
                            Portfolio Monitoring
                          </p>
                          <p className="text-sm text-muted-foreground">
                            24/7 online access to your investment portfolio
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold mb-2">Fee Transparency</h3>
                        <p className="text-sm text-muted-foreground">
                          At Finance Teque, we believe in complete transparency.
                          You'll never encounter hidden fees or unexpected
                          charges. All fees are clearly disclosed before
                          investment and detailed in your quarterly statements.
                          Our fee structure is designed to align our interests
                          with yours – we succeed when you succeed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Card className="mb-6 border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Fee Calculator</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Estimate your fees based on your investment amount:
                      </p>
                      <div className="p-4 bg-gray-50 rounded-lg mb-4">
                        <p className="text-sm mb-2">
                          For a $100,000 investment:
                        </p>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">
                              Annual Management Fee
                            </span>
                            <span className="font-medium">
                              $
                              {(
                                (100000 *
                                  parseFloat(
                                    feeStructure[
                                      activePlan.id as keyof typeof feeStructure
                                    ].management.replace("% annually", "")
                                  )) /
                                100
                              ).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Initial Entry Fee</span>
                            <span className="font-medium">
                              $
                              {(
                                (100000 *
                                  parseFloat(
                                    feeStructure[
                                      activePlan.id as keyof typeof feeStructure
                                    ].entry.replace("%", "")
                                  )) /
                                100
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This is an example calculation. Actual fees may vary
                        based on specific account details and investment
                        performance. Performance fees are not included in this
                        estimate.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="mb-6 border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Fee Comparison</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-sm">Finance Teque</span>
                          <span className="font-medium">
                            {
                              feeStructure[
                                activePlan.id as keyof typeof feeStructure
                              ].management
                            }
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-sm">Industry Average</span>
                          <span className="font-medium">
                            {activePlan.id === "growth"
                              ? "2.1% annually"
                              : activePlan.id === "money-market"
                              ? "0.7% annually"
                              : activePlan.id === "stability"
                              ? "1.5% annually"
                              : "1.9% annually"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Your Savings</span>
                          <span className="font-medium text-green-600">
                            {activePlan.id === "growth"
                              ? "0.35% annually"
                              : activePlan.id === "money-market"
                              ? "0.2% annually"
                              : activePlan.id === "stability"
                              ? "0.25% annually"
                              : "0.4% annually"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-brand-light p-6 rounded-lg">
                    <h3 className="font-bold mb-3">Need More Information?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our advisors are available to explain our fee structure
                      and help you understand the costs associated with your
                      investment.
                    </p>
                    <ModalButton text="Schedule a Consultation" />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Benefits Tab */}
            {/* <TabsContent value="benefits" className="mt-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold mb-6">Plan Benefits</h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Our {activePlan.title} plan includes a range of exclusive
                    benefits designed to enhance your investment experience and
                    help you achieve your financial goals.
                  </p>

                  <div className="grid grid-cols-1 gap-6 mb-8">
                    {benefits[activePlan.id as keyof typeof benefits].map(
                      (benefit, index) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                              <span className="text-lg font-bold text-brand-primary">
                                {index + 1}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg mb-2">
                                {benefit.split("(")[0].trim()}
                              </h3>
                              <p className="text-muted-foreground">
                                {benefit.includes("(") ? (
                                  <>
                                    {benefit.split("(")[0].trim()}
                                    <span className="text-sm italic">
                                      {" "}
                                      ({benefit.split("(")[1]}
                                    </span>
                                  </>
                                ) : (
                                  benefit
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-4">
                    All Investors Receive
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Secure Online Portal</p>
                          <p className="text-sm text-muted-foreground">
                            24/7 access to your investment dashboard
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Mobile App Access</p>
                          <p className="text-sm text-muted-foreground">
                            Monitor investments on-the-go
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Dedicated Support Team</p>
                          <p className="text-sm text-muted-foreground">
                            Responsive customer service
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Educational Resources</p>
                          <p className="text-sm text-muted-foreground">
                            Webinars, articles, and market insights
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Quarterly Reports</p>
                          <p className="text-sm text-muted-foreground">
                            Detailed performance and holdings updates
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Annual Tax Documents</p>
                          <p className="text-sm text-muted-foreground">
                            Simplified tax reporting
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4">Premium Benefits</h3>
                  <p className="text-muted-foreground mb-4">
                    Investors with portfolios exceeding $250,000 receive
                    additional premium benefits:
                  </p>
                  <div className="bg-gradient-to-r from-brand-primary to-brand-primary-dark p-6 rounded-lg text-white">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            Dedicated Portfolio Manager
                          </p>
                          <p className="text-sm opacity-90">
                            Personal point of contact for your investments
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Enhanced Reporting</p>
                          <p className="text-sm opacity-90">
                            Custom reporting tailored to your needs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            Exclusive Investment Opportunities
                          </p>
                          <p className="text-sm opacity-90">
                            Access to limited-availability investments
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">
                            Complimentary Financial Planning
                          </p>
                          <p className="text-sm opacity-90">
                            Comprehensive financial planning services
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Card className="mb-6 border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Client Testimonials</h3>
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm italic mb-3">
                            "
                            {activePlan.id === "growth"
                              ? "The growth fund has consistently outperformed my expectations. The quarterly strategy calls provide valuable insights into where my money is going and why."
                              : activePlan.id === "money-market"
                              ? "I use the money market fund for my business's operating capital. The flexibility and security are exactly what I need, and the yields are better than what my bank offers."
                              : activePlan.id === "stability"
                              ? "As someone approaching retirement, the stability fund gives me peace of mind while still delivering solid returns. The income distribution options are particularly helpful."
                              : "I appreciate investing in line with my values. The annual impact report helps me see not just financial returns, but the real-world difference my investments are making."}
                            "
                          </p>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div>
                              <p className="text-sm font-medium">
                                {activePlan.id === "growth"
                                  ? "Mohammed A."
                                  : activePlan.id === "money-market"
                                  ? "Sarah T."
                                  : activePlan.id === "stability"
                                  ? "Robert L."
                                  : "Priya M."}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Client since 2021
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm italic mb-3">
                            "
                            {activePlan.id === "growth"
                              ? "The advanced tax optimization strategies have been a game-changer for my portfolio. I'm seeing better after-tax returns than with my previous investment manager."
                              : activePlan.id === "money-market"
                              ? "The online integration makes it seamless to move funds between my checking account and money market fund. Perfect for managing cash flow."
                              : activePlan.id === "stability"
                              ? "The portfolio stress testing gave me confidence that my investments could weather market downturns. This plan perfectly balances growth and security."
                              : "The shareholder advocacy program allows me to have a voice in how companies operate. It's empowering to know my investments are pushing for positive corporate change."}
                            "
                          </p>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div>
                              <p className="text-sm font-medium">
                                {activePlan.id === "growth"
                                  ? "Jennifer K."
                                  : activePlan.id === "money-market"
                                  ? "David R."
                                  : activePlan.id === "stability"
                                  ? "Elena S."
                                  : "Marcus J."}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Client since 2022
                     </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Upcoming Events</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Calendar className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">
                              {activePlan.id === "growth"
                                ? "Emerging Technologies Webinar"
                                : activePlan.id === "money-market"
                                ? "Cash Management Strategies"
                                : activePlan.id === "stability"
                                ? "Retirement Income Planning"
                                : "ESG Investing Masterclass"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              September 15, 2025 • 2:00 PM EST
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Calendar className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">
                              Quarterly Market Outlook
                            </p>
                            <p className="text-xs text-muted-foreground">
                              October 5, 2025 • 11:00 AM EST
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        View All Events
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>  */}

            {/* Investment Details Tab */}
            {/* <TabsContent value="details" className="mt-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold mb-6">
                    Investment Details
                  </h2> */}

                  {/* Asset Allocation Section */}
                  {/* <div className="mb-10">
                    <h3 className="text-xl font-bold mb-4">Asset Allocation</h3>
                    <p className="text-muted-foreground mb-6">
                      Our {activePlan.title} plan features a carefully
                      constructed asset allocation designed to{" "}
                      {activePlan.id === "vci"
                        ? "maximize growth potential while managing sector-specific risks."
                        : activePlan.id === "efi"
                        ? "preserve capital while providing stable returns and high liquidity."
                        : activePlan.id === "nbi"
                        ? "balance income generation with moderate growth potential."
                        : "achieve positive environmental and social impact alongside competitive financial returns."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {assetAllocation[
                        activePlan.id as keyof typeof assetAllocation
                      ].map((asset, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm">{asset.category}</span>
                          <Badge variant="outline" className="bg-brand-light">
                            {asset.percentage}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fee Structure Section */}
                  {/* <div className="mb-10">
                    <h3 className="text-xl font-bold mb-4">Fee Structure</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 mb-6">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Fee Type
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              Management Fee
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {
                                feeStructure[
                                  activePlan.id as keyof typeof feeStructure
                                ].management
                              }
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              Performance Fee
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {
                                feeStructure[
                                  activePlan.id as keyof typeof feeStructure
                                ].performance
                              }
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              Entry Fee
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {
                                feeStructure[
                                  activePlan.id as keyof typeof feeStructure
                                ].entry
                              }
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              Exit Fee
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {
                                feeStructure[
                                  activePlan.id as keyof typeof feeStructure
                                ].exit
                              }
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              Minimum Investment
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {
                                feeStructure[
                                  activePlan.id as keyof typeof feeStructure
                                ].minimum
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>  */}

                  {/* Benefits Section */}
                  {/* <div>
                    <h3 className="text-xl font-bold mb-4">Key Benefits</h3>
                    <div className="space-y-4 mb-8">
                      {benefits[activePlan.id as keyof typeof benefits].map(
                        (benefit, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Card className="mb-6 border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Top Holdings</h3>
                      <div className="space-y-2">
                        {topHoldings[activePlan.id as keyof typeof topHoldings]
                          .slice(0, 5)
                          .map((holding, index) => (
                            <div
                              key={index}
                              className="text-sm flex items-center space-x-2"
                            >
                              <span className="text-xs text-brand-primary font-medium">
                                {index + 1}
                              </span>
                              <span>{holding}</span>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-6 border-0 shadow-sm">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Investment Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Risk Level
                          </span>
                          <Badge
                            variant="outline"
                            className={
                              activePlan.id === "vci"
                                ? "border-red-500 text-red-500"
                                : activePlan.id === "efi"
                                ? "border-green-500 text-green-500"
                                : activePlan.id === "nbi"
                                ? "border-amber-500 text-amber-500"
                                : "border-orange-500 text-orange-500"
                            }
                          >
                            {activePlan.riskLevel}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Minimum Investment
                          </span>
                          <span className="font-medium">
                            {
                              feeStructure[
                                activePlan.id as keyof typeof feeStructure
                              ].minimum
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Recommended Term
                          </span>
                          <span className="font-medium">
                            {activePlan.id === "vci"
                              ? "5+ years"
                              : activePlan.id === "efi"
                              ? "0-1 year"
                              : activePlan.id === "nbi"
                              ? "3-5 years"
                              : "3-7 years"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-brand-light p-6 rounded-lg">
                    <h3 className="font-bold mb-3">Ready to Invest?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start your investment journey with our {activePlan.title}{" "}
                      plan today.
                    </p>
                    <ModalButton text="Start Investing" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section> */}

      {/* Call to Action Section */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Take the first step towards financial growth with our{" "}
                {activePlan.title}.
              </p>
              <div className="flex flex-wrap gap-4">
                <ModalButton
                  text="Start Investing"
                  className="bg-white text-brand-primary hover:bg-gray-100"
                />
                <Button
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-brand-primary"
                >
                  Compare All Plans
                </Button>
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Still Have Questions?</h3>
              <p className="mb-4">
                Our team of investment experts is ready to help you make
                informed decisions about your financial future.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Schedule a Consultation</p>
                    <p className="text-sm opacity-90">
                      One-on-one guidance with our advisors
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Download className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Download Resources</p>
                    <p className="text-sm opacity-90">
                      Detailed guides and documentation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster className="text-base" position="top-right" duration={3000} />
    </div>
  );
}
