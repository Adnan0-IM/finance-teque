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
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Users,
  CreditCard,
  FileText,
  Upload,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
  isPhone?: boolean;
  isNinOrBvn?: boolean;
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
  isPhone = false,
  isNinOrBvn = false,
  autoComplete,
}) => {
  // Only used for file input styling
  const [dragOver, setDragOver] = useState(false);
  const inputId = `file-${String(name)}`;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...fieldProps } }) => {
        const selectedFile = value instanceof File ? value : null;
        const prettySize = selectedFile
          ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
          : "";

        return (
          <FormItem className="min-h-[80px]">
            {isFileInput ? (
              <FormLabel htmlFor={inputId} className="text-sm sm:text-base">
                {label}{" "}
                {required && <span className="text-destructive">*</span>}
              </FormLabel>
            ) : (
              <FormLabel className="text-sm sm:text-base">
                {label}{" "}
                {required && <span className="text-destructive">*</span>}
              </FormLabel>
            )}

            {description && (
              <p className="text-sm text-muted-foreground mb-2">
                {description}
              </p>
            )}

            <FormControl>
              {isFileInput ? (
                <div className="mt-2">
                  {/* Hidden native input */}
                  <input
                    id={inputId}
                    type="file"
                    accept={accept}
                    autoComplete={autoComplete}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      onChange(file);
                    }}
                    // keep RHF props except value
                    {...fieldProps}
                    className="hidden"
                  />

                  {/* Dropzone / pretty input */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => document.getElementById(inputId)?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        document.getElementById(inputId)?.click();
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) onChange(file);
                    }}
                    className={[
                      "flex flex-col items-center justify-center w-full",
                      "rounded-lg border-2 border-dashed transition",
                      dragOver
                        ? "border-brand-primary bg-brand-primary/5"
                        : "border-gray-300 bg-gray-50 hover:bg-white",
                      "px-4 py-4  cursor-pointer",
                    ].join(" ")}
                  >
                    <Upload
                      className={`mb-2 ${
                        dragOver ? "text-brand-primary" : "text-gray-500"
                      }`}
                      size={22}
                    />
                    <p className="text-xs sm:text-sm text-gray-700 text-center">
                      <span className="font-medium">Click to upload</span> or
                      drag and drop
                    </p>
                    {accept && (
                      <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">
                        Allowed: {accept.replaceAll(".", "").toUpperCase()} •
                        Max 5MB
                      </p>
                    )}
                  </div>

                  {/* Selected file preview row */}
                  {selectedFile && (
                    <div className="mt-3 flex items-center justify-between rounded-md border bg-white px-3 py-2">
                      <div className="min-w-0">
                        <p className="sm:hidden text-sm font-medium text-gray-900">
                          {selectedFile.name.length > 22
                            ? selectedFile.name.slice(0, 22)
                            : selectedFile.name}
                          <br />
                          {selectedFile.name.length > 22 &&
                            selectedFile.name.slice(22, 48)}
                        </p>

                        <p className="hidden sm:block text-sm font-medium text-gray-900">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {prettySize}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange(null);
                        }}
                        className="ml-3 inline-flex items-center rounded-md border px-2 py-1 text-xs text-gray-600 hover:text-red-500 hover:bg-red-50"
                        aria-label="Remove file"
                        title="Remove file"
                      >
                        <X size={14} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ) : isPhone ? (
                <Input
                  placeholder={placeholder}
                  type={type}
                  autoComplete={autoComplete}
                  className={`h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition ${className}`}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "");
                    if (v.startsWith("0")) v = v.slice(1);
                    onChange(v);
                  }}
                  value={value || ""}
                  {...fieldProps}
                />
              ) : isNinOrBvn ? (
                <Input
                  placeholder={placeholder}
                  type={type}
                  autoComplete={autoComplete}
                  className={`h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition ${className}`}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    onChange(v);
                  }}
                  value={value || ""}
                  {...fieldProps}
                />
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
        );
      }}
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
      "kinRelationshipOther", // include so validation runs on this step
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
      "accountTypeOther", // include so validation runs on this step
    ],
  },
  {
    id: "kyc-documents",
    name: "KYC Documents",
    icon: FileText,
    fields: ["identificationDocument", "passportPhoto", "utilityBill"],
  },
];

const allowedImageTypes = ["image/jpeg", "image/png"];
const allowedDocTypes = ["application/pdf", ...allowedImageTypes];
const maxFileSize = 5 * 1024 * 1024; // 5MB

// Form schema
const formSchema = z
  .object({
    // Bio Data
    firstName: z.string().min(2, "First name must be atleast 2 characters"),
    surname: z.string().min(2, "Surname must be atleast 2 characters"),
    phoneNumber: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 digits (e.g., 8012345678)",
      })
      .max(15, { message: "Phone number must not exceed 15 digits" })
      .refine((val) => /^\d+$/.test(val), {
        message: "Phone number must contain only digits",
      }),
    email: z.string().email("Valid email is required"),
    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required")
      .refine(
        (v) => {
          const dob = new Date(v);
          if (Number.isNaN(dob.getTime())) return false;
          const today = new Date();
          const age =
            today.getFullYear() -
            dob.getFullYear() -
            (today <
            new Date(today.getFullYear(), dob.getMonth(), dob.getDate())
              ? 1
              : 0);
          return age >= 18 && dob <= today;
        },
        { message: "You must be at least 18 years old" }
      ),
    localGovernment: z
      .string()
      .min(2, "Local government must be atleast 2 characters"),
    residentialAddress: z
      .string()
      .min(5, "Residential address must be atleast 5 characters"),
    ninNumber: z.string().regex(/^\d{11}$/, "NIN must be 11 digits"),
    stateOfResidence: z
      .string()
      .min(2, "State of residence must be atleast 2 characters"),

    // Next of Kin
    kinFullName: z.string().min(2, "Full name must be atleast 2 characters"),
    kinPhoneNumber: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 digits (e.g., 8012345678)",
      })
      .max(15, { message: "Phone number must not exceed 15 digits" })
      .refine((val) => /^\d+$/.test(val), {
        message: "Phone number must contain only digits",
      }),
    kinEmail: z.string().email("Valid email is required"),
    kinResidentialAddress: z
      .string()
      .min(5, "Residential address must be atleast 5 characters"),

    // Replace free-text with enum + optional other
    kinRelationship: z.enum([
      "Spouse",
      "Sibling",
      "Parent",
      "Guardian",
      "Friend",
      "Other",
    ]),
    kinRelationshipOther: z.string().optional(),

    // Account Details
    accountName: z.string().min(2, "Account name must be atleast 2 characters"),
    accountNumber: z
      .string()
      .regex(/^\d{10}$/, "Account number must be 10 digits"),
    bankName: z.string().min(2, "Bank name must be atleast 2 characters"),
    bvnNumber: z.string().regex(/^\d{11}$/, "BVN must be 11 digits"),

    // Replace free-text with enum + optional other
    accountType: z.enum([
      "Savings",
      "Current",
      "Domiciliary",
      "Corporate",
      "Other",
    ]),
    accountTypeOther: z.string().optional(),

    // KYC Documents - use optional() with custom validation
    identificationDocument: z
      .any()
      .refine((f) => f instanceof File, {
        message: "Identification document is required",
      })
      .refine((f) => f && f.size <= maxFileSize, {
        message: "Max file size is 5MB",
      })
      .refine((f) => f && allowedDocTypes.includes(f.type), {
        message: "Allowed types: PDF, JPG, PNG",
      }),
    passportPhoto: z
      .any()
      .refine((f) => f instanceof File, {
        message: "Passport photo is required",
      })
      .refine((f) => f && f.size <= maxFileSize, {
        message: "Max file size is 5MB",
      })
      .refine((f) => f && allowedImageTypes.includes(f.type), {
        message: "Allowed types: JPG, PNG",
      }),
    utilityBill: z
      .any()
      .refine((f) => f instanceof File, { message: "Utility bill is required" })
      .refine((f) => f && f.size <= maxFileSize, {
        message: "Max file size is 5MB",
      })
      .refine((f) => f && allowedDocTypes.includes(f.type), {
        message: "Allowed types: PDF, JPG, PNG",
      }),
  })
  .superRefine((data, ctx) => {
    if (
      data.kinRelationship === "Other" &&
      !data.kinRelationshipOther?.trim()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["kinRelationshipOther"],
        message: "Please specify the relationship",
      });
    }
    if (data.accountType === "Other" && !data.accountTypeOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["accountTypeOther"],
        message: "Please specify the account type",
      });
    }
  });

export function InvestorVerificationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { submitVerification } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
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
      kinRelationship: "Spouse", // sensible default
      kinRelationshipOther: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
      bvnNumber: "",
      accountType: "Savings", // default
      accountTypeOther: "",
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await submitVerification(data);
      toast.success("Verification submitted successfully!");
      form.reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("Verification submission error:", error);
      toast.error("Failed to submit verification data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
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
                        placeholder="+234801827228"
                        type="tel"
                        isPhone={true}
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
                        isNinOrBvn={true}
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
                        placeholder="+2348073729324"
                        type="tel"
                        isPhone={true}
                      />

                      <StableFormField
                        label="Email Address"
                        name="kinEmail"
                        autoComplete="email"
                        control={form.control}
                        placeholder="name@example.com"
                        type="email"
                      />

                      {/* Step 2: Next of Kin - always render Select; show extra input when "Other" */}
                      <FormField
                        control={form.control}
                        name="kinRelationship"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel className="text-sm sm:text-base mb-2 leading-0  ">
                              Relationship{" "}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="py-5  border sm:text-base border-gray-300">
                                  <SelectValue placeholder="Select relationship" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[
                                  "Spouse",
                                  "Sibling",
                                  "Parent",
                                  "Guardian",
                                  "Friend",
                                  "Other",
                                ].map((opt) => (
                                  <SelectItem
                                    className="focus:bg-brand-primary"
                                    key={opt}
                                    value={opt}
                                  >
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs sm:text-sm" />
                          </FormItem>
                        )}
                      />

                      {form.watch("kinRelationship") === "Other" && (
                        <StableFormField
                          label="Specify Relationship"
                          name="kinRelationshipOther"
                          control={form.control}
                          placeholder="e.g., Cousin"
                          className=""
                        />
                      )}
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
                        isNinOrBvn={true}
                      />

                      <StableFormField
                        label="Bank Name"
                        name="bankName"
                        autoComplete="bank-name"
                        control={form.control}
                        placeholder="First Bank of Nigeria"
                      />

                      {/* Account Type as Select */}

                      <FormField
                        control={form.control}
                        name="accountType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm mb-3 leading-0 sm:text-base">
                              Account Type{" "}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="py-5  border sm:text-base border-gray-300">
                                  <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[
                                  "Savings",
                                  "Current",
                                  "Domiciliary",
                                  "Corporate",
                                  "Other",
                                ].map((opt) => (
                                  <SelectItem
                                    className="focus:bg-brand-primary"
                                    key={opt}
                                    value={opt}
                                  >
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs sm:text-sm" />
                          </FormItem>
                        )}
                      />

                      {form.watch("accountType") === "Other" && (
                        <StableFormField
                          label="Specify Account Type"
                          name="accountTypeOther"
                          control={form.control}
                          placeholder="e.g., Joint"
                          className="md:col-span-1"
                        />
                      )}

                      <StableFormField
                        label="BVN Number"
                        name="bvnNumber"
                        autoComplete="bvn-number"
                        control={form.control}
                        placeholder="12345678901"
                        isNinOrBvn={true}
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
    </div>
  );
}
