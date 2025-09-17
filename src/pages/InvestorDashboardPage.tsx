import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster, toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import PageTransition from "@/components/animations/PageTransition";
import DashboardNavigation from "@/components/DashboardNavigation";

// Minimal types for API responses
interface PortfolioSummary {
  totalValue: string;
  invested: string;
  totalGain: string;
  gainPercentage: string;
  isPositive: boolean;
}

interface Transaction {
  date: string;
  type: string;
  amount: string;
  status: string;
}

export function InvestorDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for dashboard data
  const [portfolioSummary, setPortfolioSummary] =
    useState<PortfolioSummary | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );

  // Check if user is logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true });
      toast.error("Please log in to access your dashboard");
    }
  }, [user, authLoading, navigate]);

  // Fetch dashboard data
  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulating API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Sample data - in a real app, this would come from an API
        const summaryData: PortfolioSummary = {
          totalValue: "₦1,250,000",
          invested: "₦1,000,000",
          totalGain: "₦250,000",
          gainPercentage: "+25%",
          isPositive: true,
        };

        const transactionsData: Transaction[] = [
          {
            date: "2023-11-01",
            type: "Deposit",
            amount: "₦100,000",
            status: "Completed",
          },
          {
            date: "2023-10-15",
            type: "Dividend",
            amount: "₦15,000",
            status: "Completed",
          },
          {
            date: "2023-10-01",
            type: "Deposit",
            amount: "₦50,000",
            status: "Completed",
          },
          {
            date: "2023-09-20",
            type: "Withdrawal",
            amount: "₦25,000",
            status: "Completed",
          },
        ];

        // Update state with fetched data
        setPortfolioSummary(summaryData);
        setRecentTransactions(transactionsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Loading skeleton
  if (loading || !portfolioSummary) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavigation />
        <div className="md:pl-64 pt-16">
          <main className="max-w-6xl mx-auto px-4 py-6">
            <div className="mb-6">
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-5 w-48" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-8 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <Skeleton className="h-10 w-full mb-6" />
            <Skeleton className="h-64 w-full" />
          </main>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavigation />
        <div className="md:pl-64 pt-16">
          <main className="max-w-6xl mx-auto px-4 py-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-red-500 mb-4">Failed to load dashboard data</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTransition>
        <DashboardNavigation />
        <div className="min-h-screen bg-gray-50  md:pl-64">
          <main className="max-w-6xl mx-auto px-6 py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Investment Summary
              </h1>
              <p className="text-gray-500">
                Welcome, {user?.name || "Investor"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6 px-6">
                  <p className="text-sm font-medium text-muted-foreground">
                    Portfolio Value
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {portfolioSummary?.totalValue}
                  </h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 px-6">
                  <p className="text-sm font-medium text-muted-foreground">
                    Gain/Loss
                  </p>
                  <h3 className="text-2xl font-bold mt-1 flex items-center">
                    {portfolioSummary?.totalGain}
                    {portfolioSummary?.isPositive ? (
                      <ArrowUpRight className="ml-1 h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDownRight className="ml-1 h-5 w-5 text-red-500" />
                    )}
                  </h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 px-6">
                  <p className="text-sm font-medium text-muted-foreground">
                    Return Rate
                  </p>
                  <h3
                    className={`text-2xl font-bold mt-1 ${
                      portfolioSummary?.isPositive
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {portfolioSummary?.gainPercentage}
                  </h3>
                </CardContent>
              </Card>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-8"
            >
              <TabsList className="w-full md:w-auto">
                <TabsTrigger
                  value="overview"
                  className="flex-1 md:flex-initial"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="flex-1 md:flex-initial"
                >
                  Transactions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Investment Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-sm text-muted-foreground">
                            Total Portfolio Value
                          </span>
                          <span className="font-medium">
                            {portfolioSummary?.totalValue}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-sm text-muted-foreground">
                            Total Invested
                          </span>
                          <span className="font-medium">
                            {portfolioSummary?.invested}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-sm text-muted-foreground">
                            Total Gain/Loss
                          </span>
                          <span
                            className={`font-medium ${
                              portfolioSummary?.isPositive
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {portfolioSummary?.totalGain}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Return Rate
                          </span>
                          <span
                            className={`font-medium ${
                              portfolioSummary?.isPositive
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {portfolioSummary?.gainPercentage}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Recent Transactions
                    </h3>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="divide-y">
                        {recentTransactions
                          .slice(0, 3)
                          .map((transaction, index) => (
                            <div
                              key={index}
                              className="p-4 flex justify-between items-center"
                            >
                              <div>
                                <p className="font-medium">
                                  {transaction.type}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(
                                    transaction.date
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <p
                                className={
                                  transaction.type === "Withdrawal"
                                    ? "text-red-600"
                                    : "text-green-600"
                                }
                              >
                                {transaction.type === "Withdrawal" ? "-" : "+"}
                                {transaction.amount}
                              </p>
                            </div>
                          ))}
                      </div>
                      <div className="p-4 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          onClick={() => setActiveTab("transactions")}
                        >
                          View All Transactions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Transaction History</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          toast.success("Transactions exported successfully")
                        }
                      >
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentTransactions.map((transaction, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {new Date(
                                  transaction.date
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{transaction.type}</TableCell>
                              <TableCell>{`${transaction.type} - ${
                                transaction.date.split("-")[1] === "10"
                                  ? "Oct"
                                  : transaction.date.split("-")[1] === "09"
                                  ? "Sep"
                                  : "Nov"
                              } ${transaction.date.split("-")[2]}, ${
                                transaction.date.split("-")[0]
                              }`}</TableCell>
                              <TableCell
                                className={`text-right ${
                                  transaction.type === "Withdrawal"
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                {transaction.type === "Withdrawal" ? "-" : "+"}
                                {transaction.amount}
                              </TableCell>
                              <TableCell>{transaction.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="bg-white p-5 rounded-lg shadow border border-gray-100 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Need help with your investments? Contact our support team at
                support@finance-teque.com
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success("Support request submitted")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Request Statement
              </Button>
            </div>
          </main>
          <Toaster position="top-right" duration={3000} />
        </div>
      </PageTransition>
    </>
  );
}
