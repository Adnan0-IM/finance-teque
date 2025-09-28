import { useState, useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useInvestor } from "@/features/investors/contexts/InvestorContext";
import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LoaderCircle } from "lucide-react";
import { stateAndLga } from "@/utils/stateAndLga";
import { omitKeys } from "@/utils/omitKeys";
import {
  formSchema,
  steps,
  type FormValues,
} from "../schema";

import OnboardingLayout from "@/components/layout/OnboardingLayout";
import { BioDataStep } from "../components/steps/BioDataStep";
import { NextOfKinStep } from "../components/steps/NextOfKinStep";
import { AccountDetailsStep } from "../components/steps/AccountDetailsStep";
import { nigerianBanks } from "@/utils/banks";
import { KYCDocumentsStep } from "../components/steps/KYCDocumentsStep";

export function InvestorVerificationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const {submitVerification } = useInvestor();
  const [isSaving, setIsSaving] = useState(false);

  const [savedFormData, setSavedFormData] = useLocalStorage<
    Partial<FormValues>
  >("investor-verification-form", null);

  // Build base defaults once
  const baseDefaults: Partial<FormValues> = {
    firstName: "",
    surname: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    localGovernment: "",
    residentialAddress: "",
    ninNumber: "",
    stateOfResidence: "",
    kinFullName: "",
    kinPhoneNumber: "",
    kinEmail: "",
    kinResidentialAddress: "",
    kinRelationship: "Spouse",
    kinRelationshipOther: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
    bvnNumber: "",
    accountType: "Savings",
    accountTypeOther: "",
  };

  // Pre-merge saved data (migrate invalid LGA if needed)
  const restoredDefaults = useMemo(() => {
    if (!savedFormData) return null;

    const dataToRestore = omitKeys(
      savedFormData as Record<string, unknown>,
      ["identificationDocument", "passportPhoto", "utilityBill"] as const
    ) as Partial<FormValues>;

    const state = dataToRestore.stateOfResidence as string | undefined;
    const savedLga = dataToRestore.localGovernment as string | undefined;
    const lgas = state ? stateAndLga[state] ?? [] : [];

    if (state && savedLga && lgas.length > 0 && !lgas.includes(savedLga)) {
      dataToRestore.localGovernmentOther = savedLga;
      dataToRestore.localGovernment = "Other";
    }

    return dataToRestore;
  }, [savedFormData]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    // Use saved values as initial defaults so they render immediately on refresh
    defaultValues: { ...baseDefaults, ...(restoredDefaults ?? {}) },
  });

  const selectedState = form.watch("stateOfResidence");
  const selectedLga = form.watch("localGovernment");
  const nigerianStates = useMemo(() => Object.keys(stateAndLga), []);
  const currentLGAs = useMemo(
    () => (selectedState ? stateAndLga[selectedState] ?? [] : []),
    [selectedState]
  );

  useEffect(() => {
    if (selectedLga && selectedLga !== "Other" && currentLGAs.length > 0) {
      if (!currentLGAs.includes(selectedLga)) {
        form.setValue("localGovernment", "");
      }
    }
  }, [selectedLga, currentLGAs, form]);

  const saveProgress = async () => {
    try {
      setIsSaving(true);
      const currentValues = form.getValues();
      const dataToSave = omitKeys(currentValues, [
        "identificationDocument",
        "passportPhoto",
        "utilityBill",
      ] as const);
      setSavedFormData(dataToSave);
      toast.success("Progress saved successfully");
    } catch (error) {
      console.error("Error saving progress:", error);
      toast.error("Failed to save progress");
    } finally {
      setIsSaving(false);
    }
  };

  const clearSavedProgress = () => setSavedFormData(null);

  const nextStep = async () => {
    const fields = steps[currentStep].fields as (keyof FormValues)[];
    const valid = await form.trigger(fields, { shouldFocus: true });
    if (valid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((s) => s + 1);
        window.scrollTo(0, 0);
      }
    } else {
      const firstError = fields.find((f) => form.formState.errors[f]);
      if (firstError) {
        // Cast to FieldPath<FormValues> to avoid `any` and satisfy RHF typing
        form.setFocus(
          firstError as unknown as import("react-hook-form").FieldPath<FormValues>
        );
      }
      toast.error(
        "Please fill all required fields correctly before proceeding"
      );
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo(0, 0);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await submitVerification(data);
      navigate("/verification-success");
      toast.success("Verification submitted successfully!");
      form.reset();
      clearSavedProgress();
    } catch (error) {
      console.error("Verification submission error:", error);
      toast.error("Failed to submit verification data. Please try again.");
    }
  };

  return (
    <OnboardingLayout
      pageTitle="Investor Verification"
      pageDescription="Please complete all details to verify your account and start investing"
    >
      <PageTransition>
        <FadeIn>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <div className="block sm:hidden text-center mb-4">
                  <p className="text-sm font-medium">
                    Step {currentStep + 1} of {steps.length}:{" "}
                    {steps[currentStep].name}
                  </p>
                </div>

                <div className="relative h-2 bg-gray-200 rounded-full w-full mb-3">
                  <div
                    className="absolute top-0 left-0 h-2 bg-brand-primary rounded-full transition-all duration-500 ease-in-out"
                    style={{
                      width: `${((currentStep + 1) / steps.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="hidden sm:flex justify-between">
                  {steps.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.id} className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            i < currentStep
                              ? "bg-brand-primary text-white shadow-md"
                              : i === currentStep
                              ? "bg-brand-primary text-white ring-4 ring-brand-primary/20 shadow-md"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <span
                          className={`text-sm mt-2 font-medium ${
                            i <= currentStep
                              ? "text-brand-primary"
                              : "text-gray-500"
                          }`}
                        >
                          {s.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {currentStep === 0 && (
                    <BioDataStep
                      form={form as UseFormReturn<FormValues>}
                      nigerianStates={nigerianStates}
                      selectedState={selectedState}
                      selectedLga={selectedLga}
                      currentLGAs={currentLGAs}
                    />
                  )}

                  {currentStep === 1 && (
                    <NextOfKinStep form={form as UseFormReturn<FormValues>} />
                  )}

                  {currentStep === 2 && (
                    <AccountDetailsStep
                      form={form as UseFormReturn<FormValues>}
                      banks={nigerianBanks}
                    />
                  )}

                  {currentStep === 3 && (
                    <KYCDocumentsStep
                      form={form as UseFormReturn<FormValues>}
                    />
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between pt-4">
                    <Button
                      type="button"
                      onClick={saveProgress}
                      variant="outline"
                      className="w-full sm:w-auto order-3 border-green-300 text-green-700 hover:bg-green-50 hover:text-green-800 focus:ring-2 focus:ring-green-500/30"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Saving...
                        </>
                      ) : (
                        <>
                          <span className="mr-2">💾</span> Save Progress
                        </>
                      )}
                    </Button>

                    {currentStep > 0 && (
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="w-full sm:w-auto order-2 sm:order-1 border-gray-300 hover:text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-brand-primary/30"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                      </Button>
                    )}

                    {currentStep < steps.length - 1 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className={`w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-dark focus:ring-2 focus:ring-brand-primary/50 ${
                          currentStep > 0
                            ? "order-1 sm:order-2 sm:ml-auto"
                            : "order-1"
                        }`}
                      >
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="w-full sm:w-auto order-1 sm:order-2 sm:ml-auto bg-brand-primary hover:bg-brand-primary-dark focus:ring-2 focus:ring-brand-primary/50"
                      >
                        Submit Verification{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </FadeIn>
      </PageTransition>
    </OnboardingLayout>
  );
}

export default InvestorVerificationPage;
