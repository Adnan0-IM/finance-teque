import { useNavigate } from "react-router"; // Fix import path
import {
  ArrowRight,
  User,
  Building2,
  BadgeDollarSign,
  ShieldCheck,
  FileSignature,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";
import { MotionButton } from "@/components/animations/MotionizedButton";
import OnboardingLayout from "@/components/layout/OnboardingLayout";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useEffect } from "react";

export type InvestorType = "personal" | "corporate" | "none";

export default function InvestorTypePage() {
  const navigate = useNavigate();
  const { user, setInvestorType } = useAuth();

  useEffect(() => {
    if (user?.investorType === "corporate") {
      navigate("/corporate-verification");
    } else if (user?.investorType === "personal") {
      navigate("/investor-verification");
    }
  }, [user?.investorType, navigate]);
  if (!user) return null;
  const chooseInvestorType = async (type: InvestorType) => {
    try {
      console.log(type);
      await setInvestorType(type);
      navigate(
        type === "personal"
          ? "/investor-verification"
          : "/corporate-verification",
        { replace: true }
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <OnboardingLayout
      pageTitle="How would you like to invest?"
      pageDescription="Choose the investment entity type that best fits your needs"
    >
      <PageTransition>
        <FadeIn>
          <div className="w-full max-w-4xl mx-auto bg-white border rounded-2xl shadow-md p-6 sm:p-10">
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
              {/* Personal Investor Card */}
              <div className="border border-brand-light rounded-xl p-4 sm:p-6 hover:shadow-md transition-all group hover:border-brand-primary">
                <div className="flex items-start mb-6">
                  <div className="w-14 h-14 rounded-full bg-brand-light text-brand-primary flex items-center justify-center">
                    <User className="h-7 w-7" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-xl text-brand-dark">
                      Personal Investor
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Invest as an individual
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <BadgeDollarSign className="h-4 w-4 text-green-500 mr-2" />
                    <span>Invest with your personal funds</span>
                  </li>
                  <li className="flex items-center">
                    <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                    <span>Suitable for individual investors</span>
                  </li>
                  <li className="flex items-center">
                    <FileSignature className="h-4 w-4 text-green-500 mr-2" />
                    <span>Streamlined verification process</span>
                  </li>
                </ul>

                <MotionButton
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-full text-base py-5 group-hover:bg-brand-primary transition-colors"
                  onClick={() => {
                    chooseInvestorType("personal");
                  }}
                >
                  Continue as Personal Investor{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MotionButton>
              </div>

              {/* Corporate Investor Card */}
              <div className="border border-brand-light rounded-xl p-4 sm:p-6 hover:shadow-md transition-all group hover:border-brand-primary">
                <div className="flex items-start mb-6">
                  <div className="w-14 h-14 rounded-full bg-brand-light text-brand-primary flex items-center justify-center">
                    <Building2 className="h-7 w-7" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-xl text-brand-dark">
                      Corporate Investor
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Invest as a business entity
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <BadgeDollarSign className="h-4 w-4 text-brand-primary mr-2" />
                    <span>Invest on behalf of your company</span>
                  </li>
                  <li className="flex items-center">
                    <FileSignature className="h-4 w-4 text-brand-primary mr-2" />
                    <span>Additional business documentation required</span>
                  </li>
                  <li className="flex items-center">
                    <ShieldCheck className="h-4 w-4 text-brand-primary mr-2" />
                    <span>Access corporate-level investment opportunities</span>
                  </li>
                </ul>

                <MotionButton
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-full text-base py-5 group-hover:bg-brand-primary transition-colors"
                  onClick={() => {
                    chooseInvestorType("corporate");
                  }}
                >
                  Continue as Corporate Investor{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MotionButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </PageTransition>
    </OnboardingLayout>
  );
}
