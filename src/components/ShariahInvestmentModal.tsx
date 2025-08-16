import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  Shield,
  Heart,
  BarChart3,
  Calendar,
  DollarSign,
  Info,
} from "lucide-react";
import ModalButton from "@/components/ModalButton";

interface ShariahInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  investmentType: "growth" | "balanced" | "income" | null;
}

const investmentDetails = {
  growth: {
    title: "Shari'ah Growth Fund",
    icon: TrendingUp,
    description:
      "Long-term capital appreciation through halal equity investments focused on emerging sectors and growth companies.",
    expectedReturn: "12-18% annually",
    riskLevel: "Moderate-High",
    minInvestment: "₦5,000",
    recommendedTerm: "7+ years",
    zakat: "Eligible for annual Zakat calculation",
    assetAllocation: [
      { category: "Shariah-compliant Equities", percentage: "70-85%" },
      { category: "Islamic REITs", percentage: "10-15%" },
      { category: "Sukuk", percentage: "5-10%" },
      { category: "Cash/Liquidity", percentage: "0-5%" },
    ],
    topHoldings: [
      "Jabal Technologies (Technology)",
      "Salaam Healthcare (Healthcare)",
      "Manzil Development (Real Estate)",
      "Tayyib Consumer Goods (Consumer)",
      "Maaden Resources (Natural Resources)",
    ],
    investmentStrategy:
      "The Shari'ah Growth Fund employs an active management strategy focusing on high-growth sectors that comply with Islamic principles. We select companies with strong fundamentals, competitive advantages, and growth potential while ensuring they pass our rigorous Shari'ah screening process.",
    managementFee: "1.5% annually",
    performanceFee: "15% of profits above benchmark",
    redemptionTerms: "Monthly redemption with 15-day notice",
    suitableFor:
      "Investors seeking long-term capital growth who can tolerate market volatility and have a longer investment horizon.",
    shariahCompliance:
      "All investments undergo quarterly screening by our Shari'ah Advisory Board to ensure ongoing compliance with Islamic finance principles.",
  },
  balanced: {
    title: "Shari'ah Balanced Fund",
    icon: Shield,
    description:
      "Balanced approach with Sukuk and halal equities designed to provide moderate growth with reduced volatility.",
    expectedReturn: "8-12% annually",
    riskLevel: "Moderate",
    minInvestment: "₦3,000",
    recommendedTerm: "3-5 years",
    zakat: "Eligible for annual Zakat calculation",
    assetAllocation: [
      { category: "Shariah-compliant Equities", percentage: "40-60%" },
      { category: "Sukuk", percentage: "30-50%" },
      { category: "Islamic REITs", percentage: "5-15%" },
      { category: "Cash/Liquidity", percentage: "0-10%" },
    ],
    topHoldings: [
      "Government of Malaysia Sukuk",
      "Takaful Insurance Group (Financial)",
      "Al-Manar Infrastructure (Infrastructure)",
      "Amanah Foods (Consumer Staples)",
      "Baraka Pharmaceuticals (Healthcare)",
    ],
    investmentStrategy:
      "The Shari'ah Balanced Fund employs a diversified approach, balancing between equity for growth and Sukuk for stability. This strategy aims to capture market upside while providing downside protection during market volatility, all while maintaining strict Shari'ah compliance.",
    managementFee: "1.2% annually",
    performanceFee: "10% of profits above benchmark",
    redemptionTerms: "Bi-weekly redemption with 10-day notice",
    suitableFor:
      "Investors seeking moderate growth with reduced volatility, ideal for medium-term financial goals.",
    shariahCompliance:
      "All investments undergo quarterly screening by our Shari'ah Advisory Board to ensure ongoing compliance with Islamic finance principles.",
  },
  income: {
    title: "Shari'ah Income Fund",
    icon: Heart,
    description:
      "Stable income through Sukuk and dividend-paying halal stocks with a focus on capital preservation and regular distributions.",
    expectedReturn: "6-10% annually",
    riskLevel: "Low-Moderate",
    minInvestment: "₦2,000",
    recommendedTerm: "1-3 years",
    zakat: "Eligible for annual Zakat calculation",
    assetAllocation: [
      { category: "Sukuk", percentage: "60-75%" },
      { category: "Dividend-paying Shariah Equities", percentage: "15-30%" },
      { category: "Islamic Money Market Instruments", percentage: "5-15%" },
      { category: "Cash/Liquidity", percentage: "0-10%" },
    ],
    topHoldings: [
      "Dubai Islamic Bank Sukuk",
      "Saudi Electricity Sukuk",
      "Qatar Global Sukuk",
      "Takaful Emarat (Insurance)",
      "Jabal Utility Services (Utilities)",
    ],
    investmentStrategy:
      "The Shari'ah Income Fund focuses on generating consistent income through a diversified portfolio of Sukuk and high-dividend yielding Shari'ah compliant equities. The fund prioritizes capital preservation while providing regular income distributions to investors.",
    managementFee: "1.0% annually",
    performanceFee: "None",
    redemptionTerms: "Weekly redemption with 5-day notice",
    suitableFor:
      "Conservative investors seeking regular income and capital preservation with minimal market exposure.",
    shariahCompliance:
      "All investments undergo quarterly screening by our Shari'ah Advisory Board to ensure ongoing compliance with Islamic finance principles.",
  },
};

export function ShariahInvestmentModal({
  isOpen,
  onClose,
  investmentType,
}: ShariahInvestmentModalProps) {
  if (!investmentType) return null;

  const details = investmentDetails[investmentType];
  const IconComponent = details.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-fit max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <IconComponent className="h-5 w-5 text-green-600" />
            </div>
            <DialogTitle className="text-2xl">{details.title}</DialogTitle>
          </div>
          <DialogDescription >{details.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="font-medium">Expected Return</span>
              </div>
              <span className="font-bold text-primary">
                {details.expectedReturn}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-primary" />
                <span className="font-medium">Risk Level</span>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                {details.riskLevel}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="font-medium">Minimum Investment</span>
              </div>
              <span className="font-bold">{details.minInvestment}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">Recommended Term</span>
              </div>
              <span className="font-bold">{details.recommendedTerm}</span>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold mb-3 text-green-800">Asset Allocation</h3>
            <div className="space-y-3">
              {details.assetAllocation.map((asset, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{asset.category}</span>
                  <div className="flex items-center">
                    <div className="w-32 h-3 bg-gray-200 rounded-full mr-2 overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{
                          width: `₦{
                            parseInt(
                              asset.percentage.split("-")[1] || asset.percentage
                            ) || 0
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {asset.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-3 text-primary">Investment Strategy</h3>
            <p className="text-muted-foreground">
              {details.investmentStrategy}
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-primary">Top Holdings</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {details.topHoldings.map((holding, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{holding}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-primary">Fund Details</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Management Fee</TableCell>
                  <TableCell>{details.managementFee}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Performance Fee</TableCell>
                  <TableCell>{details.performanceFee}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Redemption Terms
                  </TableCell>
                  <TableCell>{details.redemptionTerms}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Zakat</TableCell>
                  <TableCell>{details.zakat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Suitable For</TableCell>
                  <TableCell>{details.suitableFor}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1 text-green-800">
                  Shari'ah Compliance
                </h3>
                <p className="text-sm text-green-800">
                  {details.shariahCompliance}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-none"
          >
            Close
          </Button>
          <ModalButton
            text="Schedule Consultation"
            className="flex-1 sm:flex-none border"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
