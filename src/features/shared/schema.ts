import { z } from "zod";
import type { LucideIcon } from "lucide-react";
import { User, Users, CreditCard, FileText } from "lucide-react";
import { stateAndLga } from "@/utils/stateAndLga";

// File constraints
const allowedImageTypes = ["image/jpeg", "image/png"];
const allowedDocTypes = ["application/pdf", ...allowedImageTypes];
const maxFileSize = 5 * 1024 * 1024; // 5MB

export const fileDocSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((f) => f.size <= maxFileSize, { message: "Max file size is 5MB" })
  .refine((f) => allowedDocTypes.includes(f.type), {
    message: "Allowed types: PDF, JPG, PNG",
  });

export const fileImageSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((f) => f.size <= maxFileSize, { message: "Max file size is 5MB" })
  .refine((f) => allowedImageTypes.includes(f.type), {
    message: "Allowed types: JPG, PNG",
  });

export const formSchema = z
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
    ageBracket: z.enum(["adult", "minor"], "Please select an option"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    localGovernment: z
      .string()
      .min(2, "Local government must be atleast 2 characters"),
    localGovernmentOther: z.string().optional(),
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
    accountType: z.enum([
      "Savings",
      "Current",
      "Domiciliary",
      "Corporate",
      "Other",
    ]),
    accountTypeOther: z.string().optional(),

    // KYC Documents
    identificationDocument: fileDocSchema,
    passportPhoto: fileImageSchema,
    utilityBill: fileDocSchema,
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

    // LGA must match chosen state (or require Other text)
    const lgas = stateAndLga[data.stateOfResidence] ?? [];
    if (lgas.length > 0) {
      if (data.localGovernment === "Other") {
        if (!data.localGovernmentOther?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["localGovernmentOther"],
            message: "Please specify your Local Government",
          });
        }
      } else if (!lgas.includes(data.localGovernment)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["localGovernment"],
          message: "Select a valid Local Government for the chosen state",
        });
      }
    }
  });

export type FormValues = z.infer<typeof formSchema>;

export type StepDef = {
  id: string;
  name: string;
  icon: LucideIcon;
  fields: (keyof FormValues)[];
};

export const steps: StepDef[] = [
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
      "localGovernmentOther",
      "residentialAddress",
      "ninNumber",
      "stateOfResidence",
      "ageBracket",
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
      "kinRelationshipOther",
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
      "accountTypeOther",
    ],
  },
  {
    id: "kyc-documents",
    name: "KYC Documents",
    icon: FileText,
    fields: ["identificationDocument", "passportPhoto", "utilityBill"],
  },
];
