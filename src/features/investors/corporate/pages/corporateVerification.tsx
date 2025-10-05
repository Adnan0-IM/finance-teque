// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import { useInvestor } from "@/features/shared/contexts/Investor-startupContext";
// import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";
import OnboardingLayout from "@/components/layout/OnboardingLayout";
// import {
//   corporateFormSchema,
//   corporateSteps,
//   type CorporateFormValues,
// } from "../schemas/corporateSchema";

const CorporateVerification = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const navigate = useNavigate();
//   const { submitCorporateVerification } = useInvestor();
//   const [isSaving, setIsSaving] = useState(false);

//   const [savedFormData, setSavedFormData] = useLocalStorage<
//     Partial<CorporateFormValues>
//   >("corporate-verification-form", null);

  // Similar structure to InvestorVerificationPage but with corporate fields
  // ...

  return (
    <OnboardingLayout
      pageTitle="Corporate Investor Verification"
      pageDescription="Complete your company details to verify your account and start investing"
    >
      <PageTransition>
        <FadeIn>
          {/* <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8"> */}
            <div>
                <div className="text-center">
              {/* Progress indicator */}
              {/* Form steps */}
              {/* Navigation buttons */}
              coming soon
            </div>
          </div>
        </FadeIn>
      </PageTransition>
    </OnboardingLayout>
  );
};

export default CorporateVerification;
