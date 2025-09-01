import { useParams, useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, Download } from "lucide-react";
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
                  <ModalButton
                    className="shadow-sm bg-primary text-white hover:text-gray-900 hover:bg-transparent hover:border"
                    text="Start Investing"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start mb-8 overflow-x-auto flex-wrap">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features & Benefits</TabsTrigger>
              <TabsTrigger value="fees">Fees & Details</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold mb-6">Plan Overview</h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    {activePlan.longDescription}
                  </p>

                  <h3 className="text-xl font-bold mb-4">Who Should Invest</h3>
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="flex items-start space-x-3">
                      <Users className="h-6 w-6 text-brand-primary flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground">
                        {activePlan.suitableFor}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="font-bold mb-4">Getting Started</h3>
                    <ol className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-bold text-brand-primary">
                            1
                          </span>
                        </div>
                        <p className="font-medium">Schedule a Consultation</p>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-bold text-brand-primary">
                            2
                          </span>
                        </div>
                        <p className="font-medium">Complete Application</p>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-bold text-brand-primary">
                            3
                          </span>
                        </div>
                        <p className="font-medium">Fund Your Account</p>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-bold text-brand-primary">
                            4
                          </span>
                        </div>
                        <p className="font-medium">Track Your Progress</p>
                      </li>
                    </ol>
                    <div className="mt-6">
                      <ModalButton text="Schedule a Consultation" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="mt-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {activePlan.features.map((feature, index) => (
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
                          <p className="text-muted-foreground">{feature}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-brand-light p-6 rounded-lg mb-6">
                    <h3 className="font-bold mb-4">Expected Performance</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Expected Return
                        </span>
                        <span className="font-bold text-brand-primary">
                          {activePlan.expectedReturn}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Risk Level
                        </span>
                        <Badge
                          variant={
                            activePlan.riskColor === "destructive"
                              ? "destructive"
                              : activePlan.riskColor === "secondary"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {activePlan.riskLevel}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Minimum Term
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
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Fees Tab */}
            <TabsContent value="fees" className="mt-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold mb-6">Fee Structure</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 mb-6">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fee Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                </div>

                <div>
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="font-bold mb-4">Fee Calculator</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      For a ₦100,000 investment:
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Annual Management Fee</span>
                        <span className="font-medium">
                          ₦
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
                          ₦
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
      </section>

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
                <Link to={"/plans"}>
                  <Button
                    variant="outline"
                    className="border-white text-white bg-transparent hover:bg-white hover:text-brand-primary
                  "
                    onClick={() => {
                      setTimeout(() => {
                      const comparisonSection =
                        document.getElementById("comparison");
                      if (comparisonSection) {
                        comparisonSection.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                      }, 1000);
                    }}
                  >
                    Compare All Plans
                  </Button>
                </Link>
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
