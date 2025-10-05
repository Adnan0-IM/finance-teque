import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import PageTransition from "@/components/animations/PageTransition";
import { FadeIn } from "@/components/animations/FadeIn";
import OnboardingLayout from "@/components/layout/OnboardingLayout";

export function VerificationSuccessPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <OnboardingLayout
      pageTitle="Verification Submitted"
      pageDescription="Thanks for submitting your details. We’ll review and get back to you shortly."
    >
      <PageTransition>
        <FadeIn>\
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-md md:rounded-xl shadow-sm border border-brand-accent/20 p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-14 w-14 text-green-600" />
              </div>
              <h1 className="text-lg md:text-2xl font-semibold mb-2">
                Thank you{user?.name ? `, ${user.name}` : ""}!
              </h1>
              <p className="text-gray-600 mb-6 text-base">
                Your verification has been submitted successfully. Our team is
                reviewing your information. You’ll receive an email update once
                it’s approved.
              </p>

              <div className="flex gap-3 justify-center">
                <Button
                disabled={!user?.isVerified}
                  onClick={() => navigate("/dashboard")}
                  className="bg-brand-primary hover:bg-brand-primary-dark"
                >
                  Go to Dashboard
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                Need help? Contact{" "}
                <a className="hover:text-brand-primary transition-colors" href="mailto:support@financetequecv.com">
                  support@financetequecv.com
                </a>
              </p>
            </div>
          </div>
        </FadeIn>
      </PageTransition>
    </OnboardingLayout>
  );
}

export default VerificationSuccessPage;
