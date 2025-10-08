import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";
import OnboardingLayout from "@/components/layout/OnboardingLayout";
import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray, type UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  corporateSteps,
  corporateVerificationSchema,
  type CorporateVerificationForm,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useInvestor } from "@/features/shared/contexts/Investor-startupContext";
import BioDataStep from "../components/BioDataStep";
import AcountDetailsStep from "../components/AccountDetailsStep";
import SignatoryStep from "../components/SignatoryStep";
import KYCDocumentsStep from "../components/KYCDocumentsStep";
import { stateAndLga } from "@/utils/stateAndLga";
import { nigerianBanks } from "@/utils/banks";

const CorporateVerification = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<CorporateVerificationForm>({
    resolver: zodResolver(corporateVerificationSchema),
    mode: "onChange",
    defaultValues: {
      company: {
        name: "",
        incorporationNumber: "",
        dateOfIncorporation: "",
        address: "",
        state: "",
        localGovernment: "",
        localGovernmentOther: "",
        phone: "",
        email: "",
        logo: undefined as unknown as File | undefined,
      },
      bankDetails: {
        accountName: "",
        bankName: "",
        accountNumber: "",
        accountType: "Corporate",
        bvnNumber: "",
      },
      documents: {
        certificateOfIncorporation: undefined as unknown as File,
        memorandumAndArticles: undefined as unknown as File | undefined,
        utilityBill: undefined as unknown as File,
        tinCertificate: undefined as unknown as File | undefined,
      },
      signatories: [
        {
          fullName: "",
          position: "",
          phoneNumber: "",
          bvnNumber: "",
          email: "",
          idDocument: undefined as unknown as File,
        },
      ],
      referral: { officerName: "", contact: "" },
    },
  });
  const selectedState = form.watch("company.state");
  const selectedLga = form.watch("company.localGovernment");
  const nigerianStates = useMemo(() => Object.keys(stateAndLga), []);
  const currentLGAs = useMemo(
    () => (selectedState ? stateAndLga[selectedState] ?? [] : []),
    [selectedState]
  );

  useEffect(() => {
    if (selectedLga && selectedLga !== "Other" && currentLGAs.length > 0) {
      if (!currentLGAs.includes(selectedLga)) {
        form.setValue("company.localGovernment", "");
      }
    }
  }, [selectedLga, currentLGAs, form]);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "signatories",
    keyName: "id",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stepFields: (keyof any)[][] = [
    [
      "company.name",
      "company.incorporationNumber",
      "company.dateOfIncorporation",
      "company.address",
      "company.state",
      "company.localGovernment",
      // Optionally include this only when LGA === "Other"
      // "company.localGovernmentOther",
      "company.phone",
      "company.email",
    ],
    [
      "bankDetails.bankName",
      "bankDetails.accountNumber",
      "bankDetails.accountName",
    ],
    [
      ...fields.flatMap((_, i) => [
        `signatories.${i}.fullName`,
        `signatories.${i}.position`,
        `signatories.${i}.phoneNumber`,
        `signatories.${i}.bvnNumber`,
        `signatories.${i}.email`,
        `signatories.${i}.idDocument`,
      ]),
    ],
    ["documents.certificateOfIncorporation", "documents.utilityBill"],
  ];

  const next = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fieldsToValidate = stepFields[currentStep] as any;
    const valid = await form.trigger(fieldsToValidate, { shouldFocus: true });
    if (!valid) {
      return toast.error(
        "Please fill all required fields correctly before proceeding"
      );
    }
    const nextIndex = Math.min(currentStep + 1, corporateSteps.length - 1);
    setCurrentStep(nextIndex);
    queueMicrotask(() => {
      // clear next step errors to avoid instant red
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.clearErrors(stepFields[nextIndex] as any);
    });
    window.scrollTo(0, 0);
  };

  const prev = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
    window.scrollTo(0, 0);
  };

  const { submitCorporateVerification } = useInvestor();

  const onSubmit = async (values: CorporateVerificationForm) => {
    try {
      await submitCorporateVerification(values);
      toast.success("Verification submitted");
      navigate("/verification-success");
    } catch (e) {
      console.error(e);
      toast.error("Failed to submit corporate verification");
    }
  };

  return (
    <OnboardingLayout
      pageTitle="Corporate Investor Verification"
      pageDescription="Complete your company details to verify your account and start investing"
    >
      <PageTransition>
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <div className="block sm:hidden text-center mb-4">
                  <p className="text-sm font-medium">
                    Step {currentStep + 1} of {corporateSteps.length}:{" "}
                    {corporateSteps[currentStep].name}
                  </p>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full w-full mb-3">
                  <div
                    className="absolute top-0 left-0 h-2 bg-brand-primary rounded-full transition-all duration-500 ease-in-out"
                    style={{
                      width: `${
                        ((currentStep + 1) / corporateSteps.length) * 100
                      }%`,
                    }}
                  />
                </div>
                <div className="hidden sm:flex justify-between">
                  {corporateSteps.map((s, i) => (
                    <div key={s.id} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          i <= currentStep
                            ? "bg-brand-primary text-white shadow-md"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {i + 1}
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
                  ))}
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {currentStep === 0 && (
                    <BioDataStep
                      form={form as UseFormReturn<CorporateVerificationForm>}
                      nigerianStates={nigerianStates}
                      selectedState={selectedState}
                      selectedLga={selectedLga}
                      currentLGAs={currentLGAs}
                    />
                  )}

                  {currentStep === 1 && (
                    <AcountDetailsStep
                      form={form as UseFormReturn<CorporateVerificationForm>}
                      banks={nigerianBanks}
                    />
                  )}

                  {/* Step 2 Signatories */}
                  {currentStep === 2 && (
                    <SignatoryStep
                      form={form as UseFormReturn<CorporateVerificationForm>}
                      fields={fields}
                      append={append}
                      remove={remove}
                    />
                  )}
                  {/* Step 3: Documents */}
                  {currentStep === 3 && (
                    <KYCDocumentsStep
                      form={form as UseFormReturn<CorporateVerificationForm>}
                    />
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between pt-4">
                    {currentStep > 0 && (
                      <Button type="button" variant="outline" onClick={prev}>
                        Previous
                      </Button>
                    )}
                    {currentStep < corporateSteps.length - 1 ? (
                      <Button
                        type="button"
                        onClick={next}
                        className="bg-brand-primary hover:bg-brand-primary-dark"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-brand-primary hover:bg-brand-primary-dark"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting
                          ? "Submitting..."
                          : "Submit Verification"}
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
};

export default CorporateVerification;
