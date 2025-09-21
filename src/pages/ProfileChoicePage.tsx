import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/contexts/AuthContext";

export type roleType = "investor" | "startup";

export default function ProfileChoicePage() {
  const navigate = useNavigate();
  const { user, setRole } = useAuth();

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
  if (!user || user?.role) return null;

  const choose = async (type: roleType) => {
    try {
      await setRole(type);
      navigate(type === "investor" ? "/investor-verification" : "/apply-for-funding", {
        replace: true,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white border rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-brand-dark">
            Choose your profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pick how you want to use Finance Teque. You can request a change
            later.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Investor */}
          <div className="border rounded-xl p-5 hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-brand-light text-brand-primary flex items-center justify-center mb-4">
              <User className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-brand-dark mb-1">Investor</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete KYC, explore plans, and track your portfolio.
            </p>
            <Button className="w-full" onClick={() => choose("investor")}>
              Continue as Investor <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Startup */}
          <div className="border rounded-xl p-5 hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-brand-light text-brand-primary flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-brand-dark mb-1">Startup</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your business profile and apply for asset financing.
            </p>
            <Button className="w-full" onClick={() => choose("startup")}>
              Continue as Startup <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          You can contact support to request a profile change later.
        </p>
      </div>
    </div>
  );
}
