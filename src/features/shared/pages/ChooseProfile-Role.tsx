import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  TrendingUp,
  Coins,
  Building,
  BadgeDollarSign,
} from "lucide-react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";
import { MotionButton } from "@/components/animations/MotionizedButton";
import OnboardingLayout from "@/components/layout/OnboardingLayout";
import ConsultationModal from "@/components/modals/ConsultationModal";

export type roleType = "investor" | "startup";

export default function ProfileChoicePage() {
  const navigate = useNavigate();
  const { user, setRole } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (user.role === "investor") {
      navigate("/investor-verification", { replace: true });
    } else if (user.role === "startup") {
      navigate("/apply-for-funding", { replace: true });
    }
  }, [user, navigate]);

  // Avoid flicker while checking auth/role
  if (!user) return null;

  const choose = async (type: roleType) => {
    try {
      await setRole(type);
      navigate(
        type === "investor" ? "/investor-verification" : "/apply-for-funding",
        {
          replace: true,
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <OnboardingLayout
      pageTitle="What brings you to Finance Teque?"
      pageDescription="Tell us how you want to participate in our financial ecosystem"
    >
      <PageTransition>
        <FadeIn>
          <div className="w-full max-w-4xl mx-auto bg-white border rounded-2xl shadow-md p-8 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Investor Card */}
              <div className="border border-brand-light rounded-xl p-6 hover:shadow-md transition-all group hover:border-brand-primary">
                <div className="flex items-start mb-6">
                  <div className="w-14 h-14 rounded-full bg-brand-light text-brand-primary flex items-center justify-center">
                    <Coins className="h-7 w-7" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-xl text-brand-dark">
                      I want to invest
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Grow your wealth with us
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center ">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                    <span>Access curated investment opportunities</span>
                  </li>
                  <li className="flex items-center ">
                    <BadgeDollarSign className="h-4 w-4 text-green-500 mr-2" />
                    <span>Competitive returns on your investments</span>
                  </li>
                  <li className="flex items-center ">
                    <Building className="h-4 w-4 text-green-500 mr-2" />
                    <span>Support innovative startups and businesses</span>
                  </li>
                </ul>

                <MotionButton
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-full group-hover:bg-brand-primary transition-colors"
                  onClick={() => choose("investor")}
                >
                  Become an Investor <ArrowRight className="ml-2 h-4 w-4" />
                </MotionButton>
              </div>

              {/* Startup Card */}
              <div className="border border-brand-light rounded-xl p-6 hover:shadow-md transition-all group hover:border-brand-primary">
                <div className="flex items-start mb-6">
                  <div className="w-14 h-14 rounded-full bg-brand-light text-brand-primary flex items-center justify-center">
                    <Building className="h-7 w-7" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-xl text-brand-dark">
                      I need funding
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Finance for your business
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center ">
                    <Coins className="h-4 w-4 text-brand-primary mr-2" />
                    <span>Access capital for your business growth</span>
                  </li>
                  <li className="flex items-center ">
                    <BadgeDollarSign className="h-4 w-4 text-brand-primary mr-2" />
                    <span>Flexible business financing options</span>
                  </li>
                  <li className="flex items-center ">
                    <TrendingUp className="h-4 w-4 text-brand-primary mr-2" />
                    <span>Scale your business with expert support</span>
                  </li>
                </ul>

                <MotionButton
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-full group-hover:bg-brand-primary transition-colors"
                  onClick={() => choose("startup")}
                >
                  Apply for Funding <ArrowRight className="ml-2 h-4 w-4" />
                </MotionButton>
              </div>
            </div>

            <p className="text-center text-base text-muted-foreground mt-8">
              Not sure?{" "}
              <span
                className="text-brand-primary cursor-pointer hover:underline bg-none hover:bg-none"
                onClick={() => setShowModal(true)}
              >
                Contact our team to discuss which option is right for you.
              </span>
              <ConsultationModal
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </p>
          </div>
        </FadeIn>
      </PageTransition>
    </OnboardingLayout>
  );
}
