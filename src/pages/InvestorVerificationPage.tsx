import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Users,
  CreditCard,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

// Create a custom FormField wrapper component to ensure consistent spacing
interface StableFormFieldProps {
  label: string;
  name: FieldPath<z.infer<typeof formSchema>>;
  control: Control<z.infer<typeof formSchema>, unknown>;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  description?: string;
  accept?: string;
  isFileInput?: boolean;
  autoComplete?: string;
}

const StableFormField: React.FC<StableFormFieldProps> = ({
  label,
  name,
  control,
  placeholder = "",
  type = "text",
  required = true,
  className = "",
  description,
  accept,
  isFileInput = false,
  autoComplete,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <FormItem className="min-h-[80px]">
          <FormLabel className="text-sm sm:text-base">
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>

          {description && (
            <p className="text-xs text-muted-foreground mb-2">{description}</p>
          )}

          <FormControl>
            {isFileInput ? (
              <div className="mt-2">
                <Input
                  type="file"
                  autoComplete={autoComplete}
                  accept={accept}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file || null);
                  }}
                  className={`text-xs sm:text-sm bg-gray-50 focus:bg-white ${className}`}
                  {...fieldProps}
                />
              </div>
            ) : (
              <Input
                placeholder={placeholder}
                type={type}
                autoComplete={autoComplete}
                className={`h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition ${className}`}
                onChange={onChange}
                value={value || ""}
                {...fieldProps}
              />
            )}
          </FormControl>

          <div className="min-h-[6px]">
            <FormMessage className="text-xs sm:text-sm" />
          </div>
        </FormItem>
      )}
    />
  );
};

// Create form steps and their validation schemas
const steps = [
  {
    id: "bio-data",
    name: "Bio Data",
    icon: User,
    fields: [
      "firstName",
      "surname",
      "phoneNumber",
      "email",
      "dateOfBirth",
      "localGovernment",
      "residentialAddress",
      "ninNumber",
      "stateOfResidence",
    ],
  },
  {
    id: "next-of-kin",
    name: "Next of Kin",
    icon: Users,
    fields: [
      "kinFullName",
      "kinPhoneNumber",
      "kinEmail",
      "kinResidentialAddress",
      "kinRelationship",
    ],
  },
  {
    id: "account-details",
    name: "Account Details",
    icon: CreditCard,
    fields: [
      "accountName",
      "accountNumber",
      "bankName",
      "bvnNumber",
      "accountType",
    ],
  },
  {
    id: "kyc-documents",
    name: "KYC Documents",
    icon: FileText,
    fields: ["identificationDocument", "passportPhoto", "utilityBill"],
  },
];

// Form schema
const formSchema = z.object({
  // Bio Data
  firstName: z.string().min(2, "First name is required"),
  surname: z.string().min(2, "Surname is required"),
  phoneNumber: z
    .string()
    .regex(
      /^(\+234|0)[0-9]{9,10}$/,
      "Enter a valid Nigerian phone number (e.g., +2348012345678 or 08012345678)"
    ),
  email: z.string().email("Valid email is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  localGovernment: z.string().min(2, "Local government is required"),
  residentialAddress: z.string().min(5, "Residential address is required"),
  ninNumber: z.string().min(10, "Valid NIN number is required"),
  stateOfResidence: z.string().min(2, "State of residence is required"),

  // Next of Kin
  kinFullName: z.string().min(2, "Full name is required"),
  kinPhoneNumber: z
    .string()
    .regex(
      /^(\+234|0)[0-9]{9,10}$/,
      "Enter a valid Nigerian phone number (e.g., +2348012345678 or 08012345678)"
    ),
  kinEmail: z.string().email("Valid email is required"),
  kinResidentialAddress: z.string().min(5, "Residential address is required"),
  kinRelationship: z.string().min(2, "Relationship is required"),

  // Account Details
  accountName: z.string().min(2, "Account name is required"),
  accountNumber: z.string().min(10, "Valid account number is required"),
  bankName: z.string().min(2, "Bank name is required"),
  bvnNumber: z.string().min(10, "Valid BVN number is required"),
  accountType: z.string().min(2, "Account type is required"),

  // KYC Documents - use optional() with custom validation
  identificationDocument: z.any().refine((file) => file instanceof File, {
    message: "Identification document is required",
  }),
  passportPhoto: z.any().refine((file) => file instanceof File, {
    message: "Passport photo is required",
  }),
  utilityBill: z.any().refine((file) => file instanceof File, {
    message: "Utility bill is required",
  }),
});

export function InvestorVerificationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // This enables validation as the user types
    defaultValues: {
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
      kinRelationship: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
      bvnNumber: "",
      accountType: "",
    },
  });

  // Update the nextStep function with stricter validation
  const nextStep = async () => {
    try {
      const currentStepFields = steps[currentStep].fields as Array<
        keyof z.infer<typeof formSchema>
      >;

      // Use validateAsync instead of trigger for more thorough validation
      const result = await form.trigger(currentStepFields, {
        shouldFocus: true,
      });

      if (result) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
          // Scroll to top when changing steps on mobile
          window.scrollTo(0, 0);
        }
      } else {
        // When validation fails, focus the first field with an error
        const errorFields = currentStepFields.filter(
          (field) => !!form.formState.errors[field]
        );

        if (errorFields.length > 0) {
          // Focus the first field with an error
          form.setFocus(errorFields[0]);
          toast.error(
            "Please fill all required fields correctly before proceeding"
          );
        }
      }
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("An error occurred during validation");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Scroll to top when changing steps on mobile
      window.scrollTo(0, 0);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Send data to your API

    toast.success("Verification submitted successfully!");
    form.reset({
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
      kinRelationship: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
      bvnNumber: "",
      accountType: "",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navigation /> */}

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary">
              Investor Verification
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Please complete all details to verify your account and start
              investing
            </p>
          </div>

          {/* Progress Steps - Hidden on very small screens, simplified on small screens */}
          <div className="mb-6 sm:mb-8">
            {/* Mobile step indicator */}
            <div className="block sm:hidden text-center mb-4">
              <p className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}:{" "}
                {steps[currentStep].name}
              </p>
            </div>

            {/* Progress bar - always visible */}
            <div className="relative h-2 bg-gray-200 rounded-full w-full mb-3">
              <div
                className="absolute top-0 left-0 h-2 bg-brand-primary rounded-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>

            {/* Desktop/tablet step indicators */}
            <div className="hidden sm:flex justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        index < currentStep
                          ? "bg-brand-primary text-white shadow-md"
                          : index === currentStep
                          ? "bg-brand-primary text-white ring-4 ring-brand-primary/20 shadow-md"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <StepIcon size={20} />
                    </div>
                    <span
                      className={`text-sm mt-2 font-medium ${
                        index <= currentStep
                          ? "text-brand-primary"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Bio Data */}
              {currentStep === 0 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h2 className="text-lg sm:text-xl font-semibold">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-4">
                      <StableFormField
                        label="First Name"
                        name="firstName"
                        control={form.control}
                        autoComplete="name"
                        placeholder="John"
                      />

                      <StableFormField
                        label="Surname"
                        name="surname"
                        control={form.control}
                        autoComplete="surname"
                        placeholder="Doe"
                      />

                      <StableFormField
                        label="Phone Number"
                        name="phoneNumber"
                        control={form.control}
                        autoComplete="tel"
                        placeholder="+2348000000000 or 08000000000"
                        type="tel"
                      />

                      <StableFormField
                        label="Email Address"
                        name="email"
                        control={form.control}
                        autoComplete="email"
                        placeholder="name@example.com"
                        type="email"
                      />

                      <StableFormField
                        label="Date of Birth"
                        name="dateOfBirth"
                        autoComplete="dob"
                        control={form.control}
                        type="date"
                      />

                      <StableFormField
                        label="Local Government"
                        name="localGovernment"
                        autoComplete="lga-name"
                        control={form.control}
                        placeholder="Ikeja"
                      />

                      <StableFormField
                        label="State of Residence"
                        name="stateOfResidence"
                        autoComplete="state-name"
                        control={form.control}
                        placeholder="Lagos"
                      />

                      <StableFormField
                        label="NIN Number"
                        name="ninNumber"
                        autoComplete="nin-number"
                        control={form.control}
                        placeholder="12345678901"
                      />
                    </div>

                    <StableFormField
                      label="Residential Address"
                      name="residentialAddress"
                      autoComplete="resident-address"
                      control={form.control}
                      placeholder="123 Main Street, Ikeja, Lagos"
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Step 2: Next of Kin */}
              {currentStep === 1 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h2 className="text-lg sm:text-xl font-semibold">
                      Next of Kin Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2">
                      <StableFormField
                        label="Full Name"
                        name="kinFullName"
                        autoComplete="name"
                        control={form.control}
                        placeholder="Jane Doe"
                      />

                      <StableFormField
                        label="Phone Number"
                        name="kinPhoneNumber"
                        autoComplete="tel"
                        control={form.control}
                        placeholder="+2348000000000 or 08000000000"
                        type="tel"
                      />

                      <StableFormField
                        label="Email Address"
                        name="kinEmail"
                        autoComplete="email"
                        control={form.control}
                        placeholder="name@example.com"
                        type="email"
                      />

                      <StableFormField
                        label="Relationship"
                        name="kinRelationship"
                        control={form.control}
                        autoComplete="relationship"
                        placeholder="Spouse / Sibling / Parent"
                      />
                    </div>

                    <StableFormField
                      label="Residential Address"
                      name="kinResidentialAddress"
                      autoComplete="address"
                      control={form.control}
                      placeholder="123 Main Street, Ikeja, Lagos"
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Step 3: Account Details */}
              {currentStep === 2 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h2 className="text-lg sm:text-xl font-semibold">
                      Bank Account Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2">
                      <StableFormField
                        label="Account Name"
                        name="accountName"
                        autoComplete="account-name"
                        control={form.control}
                        placeholder="John Doe"
                      />

                      <StableFormField
                        label="Account Number"
                        name="accountNumber"
                        autoComplete="account-number"
                        control={form.control}
                        placeholder="0123456789"
                      />

                      <StableFormField
                        label="Bank Name"
                        name="bankName"
                        autoComplete="bank-name"
                        control={form.control}
                        placeholder="First Bank of Nigeria"
                      />

                      <StableFormField
                        label="Account Type"
                        name="accountType"
                        control={form.control}
                        placeholder="Savings / Current"
                      />

                      <StableFormField
                        label="BVN Number"
                        name="bvnNumber"
                        autoComplete="bvn-number"
                        control={form.control}
                        placeholder="12345678901"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Step 4: KYC Documents */}
              {currentStep === 3 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h2 className="text-lg sm:text-xl font-semibold">
                      Required Documents
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      Please upload clear images or PDF files of the following
                      documents:
                    </p>

                    <div className="space-y-4 sm:space-y-6">
                      <div className="border rounded-lg p-3 sm:p-4">
                        <StableFormField
                          label="1. Means of Identification"
                          name="identificationDocument"
                          control={form.control}
                          description="National ID, Voter's Card, or International Passport"
                          isFileInput={true}
                          accept=".jpg,.jpeg,.png,.pdf"
                        />
                      </div>

                      <div className="border rounded-lg p-3 sm:p-4">
                        <StableFormField
                          label="2. Passport Photograph"
                          name="passportPhoto"
                          control={form.control}
                          description="Recent, with clear background"
                          isFileInput={true}
                          accept=".jpg,.jpeg,.png"
                        />
                      </div>

                      <div className="border rounded-lg p-3 sm:p-4">
                        <StableFormField
                          label="3. Utility Bill"
                          name="utilityBill"
                          control={form.control}
                          description="Not older than 3 months"
                          isFileInput={true}
                          accept=".jpg,.jpeg,.png,.pdf"
                        />
                      </div>
                    </div>

                    <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-blue-700">
                        <strong>Note:</strong> All documents must be clear,
                        valid, and unaltered. Verification process typically
                        takes 1-2 business days.
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between pt-4">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="w-full sm:w-auto order-2 sm:order-1 border-gray-300 hover:text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-brand-primary/30"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
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
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full sm:w-auto order-1 sm:order-2 sm:ml-auto bg-brand-primary hover:bg-brand-primary-dark focus:ring-2 focus:ring-brand-primary/50"
                  >
                    Submit Verification
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Toaster position="top-right" duration={3000} />
    </div>
  );
}
