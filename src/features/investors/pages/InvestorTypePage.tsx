import { useNavigate } from "react-router";
import { ArrowRight, User, Building2 } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";
import { MotionButton } from "@/components/animations/MotionizedButton";
import OnboardingLayout from "@/components/layout/OnboardingLayout";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export type InvestorType = "personal" | "corporate" | "none";

export default function InvestorTypePage() {
  const navigate = useNavigate();
  const { user, setInvestorType } = useAuth(); // Add this to your AuthContext

  if (!user) return null;

  const chooseInvestorType = async (type: InvestorType) => {
    try {
      await setInvestorType(type); // Store this in user profile
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
          <div className="w-full max-w-4xl mx-auto bg-white border rounded-2xl shadow-md p-8 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Personal Investor Card */}
              <div className="border border-brand-light rounded-xl p-6 hover:shadow-md transition-all group hover:border-brand-primary">
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
                    <span>Invest with your personal funds</span>
                  </li>
                  <li className="flex items-center">
                    <span>Suitable for individual investors</span>
                  </li>
                  <li className="flex items-center">
                    <span>Streamlined verification process</span>
                  </li>
                </ul>

                <MotionButton
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-full py-5 group-hover:bg-brand-primary transition-colors"
                  onClick={() =>{ chooseInvestorType("personal"); navigate("/investor-verification")}}
                >
                  Continue as Personal Investor{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MotionButton>
              </div>

              {/* Corporate Investor Card */}
              <div className="border border-brand-light rounded-xl p-6 hover:shadow-md transition-all group hover:border-brand-primary">
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
                    <span>Invest on behalf of your company</span>
                  </li>
                  <li className="flex items-center">
                    <span>Additional business documentation required</span>
                  </li>
                  <li className="flex items-center">
                    <span>Access corporate-level investment opportunities</span>
                  </li>
                </ul>

                <MotionButton
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-full py-5 group-hover:bg-brand-primary transition-colors"
                  onClick={() => {chooseInvestorType("corporate"); navigate("/corporate-verification")}}
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
