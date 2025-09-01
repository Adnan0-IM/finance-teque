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
      "Venture capital provides funding to startups and innovative businesses with high growth potential, often in exchange for equity. Through a Venture Capital Manager, investors can participate in these opportunities across sectors such as technology, agriculture, health care, and SMEs. This allows investors to benefit from the long-term growth of portfolio companies while also receiving periodic returns through structured investment models, supported by professional management and networks that enhance success.",
    longDescription:
      "Venture capital provides funding to startups and innovative businesses with high growth potential, often in exchange for equity. Through a Venture Capital Manager, investors can participate in these opportunities across sectors such as technology, agriculture, health care, and SMEs. This allows investors to benefit from the long-term growth of portfolio companies while also receiving periodic returns through structured investment models, supported by professional management and networks that enhance success.",
    expectedReturn: "12-18% annually",
    riskLevel: "High",
    riskColor: "destructive",
    minimumInvestment: "₦10,000",
    features: [
      "Access to High-Potential Startups Businesses",
      "Equity Ownership for Long-Term Wealth creation",
      "Structured Periodic Returns",
      "Risk-Manage Diversification",
    ],
    suitableFor: "Aggressive investors with 7+ year investment horizon",
  },
  {
    id: "efi",
    title: "Equity Finance Investment",
    icon: Banknote,
    description:
      "At Finance Teque VC we provide strategic private equity investments that create long-term value for businesses and investors. Our focus is on identifying high-potential companies, supporting their growth with capital, expertise, and governance, and driving sustainable returns. We partner with entrepreneurs and management teams to scale operations, strengthen competitiveness, and unlock opportunities across key sectors of the economy.",
    longDescription:
      "At Finance Teque VC we provide strategic private equity investments that create long-term value for businesses and investors. Our focus is on identifying high-potential companies, supporting their growth with capital, expertise, and governance, and driving sustainable returns. We partner with entrepreneurs and management teams to scale operations, strengthen competitiveness, and unlock opportunities across key sectors of the economy.",
    expectedReturn: "4-6% annually",
    riskLevel: "Low",
    riskColor: "default",
    minimumInvestment: "₦1,000",
    features: [
      "Strategic Acquisition and Expansion Funding",
      "Ownership Stake in Established Businesses",
      "Diversified Investment Portfolio",
      "Long-Term Capital Growth Opportunities ",
    ],
    suitableFor: "Conservative investors seeking liquidity and safety",
  },
  {
    id: "nbi",
    title: "Nano Business Investment",
    icon: Shield,
    description:
      "We believe big opportunities start small. Our investments portfolios are designed to support nano and micro businesses with the capital, mentorship, and resources they need to grow. By partnering with everyday entrepreneurs, we help transform promising ideas into sustainable enterprises, creating jobs, building wealth, and strengthening communities",
    longDescription:
      "We believe big opportunities start small. Our investments portfolios are designed to support nano and micro businesses with the capital, mentorship, and resources they need to grow. By partnering with everyday entrepreneurs, we help transform promising ideas into sustainable enterprises, creating jobs, building wealth, and strengthening communities",
    expectedReturn: "8-12% annually",
    riskLevel: "Moderate",
    riskColor: "secondary",
    minimumInvestment: "₦5,000",
    features: [
      "Support for Small and Emerging Enterprises",
      "Low Capital Entry with High Growth Potential",
      "Quick Turnaround Opportunities ",
      "Hands-On Business Mentorship and Guidance ",
    ],
    suitableFor: "Moderate investors with 3-5 year investment horizon",
  },
  {
    id: "edi",
    title: "Ethical/Development Investment",
    icon: Heart,
    description:
      "This investment solution designed in line with SEC regulations, offering investors the opportunity to channel funds through a Venture Capital Manager into screened, infrastructural developments and other ethical businesses. The fund serves as a short-term vehicle that preserves capital, provides liquidity, and delivers competitive returns, while ensuring compliance with societal principles. For potential investors, this structure not only enables periodic returns but also supports the growth of ethical enterprises development, allowing wealth creation to remain fully aligned with jurisdictional values",
    longDescription:
      "This investment solution designed in line with SEC regulations, offering investors the opportunity to channel funds through a Venture Capital Manager into screened, infrastructural developments and other ethical businesses. The fund serves as a short-term vehicle that preserves capital, provides liquidity, and delivers competitive returns, while ensuring compliance with societal principles. For potential investors, this structure not only enables periodic returns but also supports the growth of ethical enterprises development, allowing wealth creation to remain fully aligned with jurisdictional values",
    expectedReturn: "10-16% annually",
    riskLevel: "Moderate-High",
    riskColor: "default",
    minimumInvestment: "₦7,500",
    features: [
      "Investments Aligned with Social and Ethical Standards",
      "Focus on Sustainable and Impact-Driven Projects",
      "Environmentally Responsible Funding Opportunities",
      " Contribution to Community and Social Growth",
    ],
    suitableFor: "Values-driven investors seeking social impact",
  },
];
