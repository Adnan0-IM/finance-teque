import { TrendingUp, Banknote, Shield, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface InvestmentPlan {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  longDescription: string;
  expectedReturn: string;
  riskLevel: string;
  riskColor: string;
  minimumInvestment: string;
  features: string[];
  suitableFor: string;
}

export const investmentPlans: InvestmentPlan[] = [
  {
    id: "vci",
    title: "Venture Capital Investment",
    icon: TrendingUp,
    description:
      "Maximize your wealth potential with our aggressive growth strategy focused on high-performing equity markets and emerging technologies.",
    longDescription:
      "Our Venture Capital Investment plan is designed for investors seeking maximum capital appreciation over the long term. We focus on equity investments in high-growth companies, particularly in technology, healthcare, and emerging markets. This plan is ideal for investors with a long investment horizon who can tolerate significant market volatility.",
    expectedReturn: "15-22% annually",
    riskLevel: "High",
    riskColor: "destructive",
    minimumInvestment: "₦10,000",
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
    id: "efi",
    title: "Equity Finance Investment",
    icon: Banknote,
    description:
      "Secure short-term returns with high liquidity through carefully selected money market instruments and government securities.",
    longDescription:
      "Our Equity Finance Investment plan offers stability and liquidity for investors who need quick access to their funds while earning competitive returns. We invest in high-quality, short-term debt securities including treasury bills, commercial paper, and certificates of deposit.",
    expectedReturn: "4-6% annually",
    riskLevel: "Low",
    riskColor: "default",
    minimumInvestment: "₦1,000",
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
    id: "nbi",
    title: "Nano Business Investment",
    icon: Shield,
    description:
      "Balanced approach combining growth potential with capital protection through diversified fixed income and stable equity investments.",
    longDescription:
      "Our Nano Business Investment plan strikes the perfect balance between growth and security. We combine stable dividend-paying stocks with high-grade bonds and fixed income securities to provide steady returns with moderate risk.",
    expectedReturn: "8-12% annually",
    riskLevel: "Moderate",
    riskColor: "secondary",
    minimumInvestment: "₦5,000",
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
    id: "edi",
    title: "Ethical/Development Investment",
    icon: Heart,
    description:
      "Invest with purpose through ESG-compliant companies that align with your values while delivering competitive returns.",
    longDescription:
      "Our Ethical/Development Investment plan allows you to grow your wealth while supporting companies that prioritize environmental sustainability, social responsibility, and good governance. We apply rigorous ESG screening to ensure your investments align with your values.",
    expectedReturn: "10-16% annually",
    riskLevel: "Moderate-High",
    riskColor: "default",
    minimumInvestment: "₦7,500",
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
