import { z } from "zod";
import { fileDocSchema, fileImageSchema } from "@/features/shared/schema";

export const corporateCompanySchema = z.object({
  name: z.string().min(2, "Name must be atleast 2 characters"),
  incorporationNumber: z.string().min(3, "Must be at least 3 digits"),
  dateOfIncorporation: z.string().min(4, "Must be at least four characters"),
  address: z.string().min(2, "Must be at least 2 characters"),
  state: z.string().min(2, "Must be at least 2 characters"),
  localGovernment: z.string().min(2, "Must br at least 2 characters"),
  localGovernmentOther: z.string().optional(),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits (e.g., 8012345678)",
    })
    .max(15, { message: "Phone number must not exceed 15 digits" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone number must contain only digits",
    }),
  email: z.string().email(),
  logo: fileImageSchema.optional(),
});

export const corporateBankSchema = z.object({
  bankName: z.string().min(3, "Must be at least 3 characters"),
  accountNumber: z
    .string()
    .regex(/^\d{10}$/, "Account number must be 10 digits"),
  accountName: z.string().min(2, "Must be at least 2 characters"),
  accountType: z.literal("Corporate"),
  bvnNumber: z.string().regex(/^\d{11}$/, "BVN must be 11 digits"),
});

export const corporateDocumentsSchema = z.object({
  certificateOfIncorporation: fileDocSchema,
  memorandumAndArticles: fileDocSchema.optional(),
  utilityBill: fileDocSchema,
  tinCertificate: fileDocSchema.optional(),
});

export const corporateSignatorySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits (e.g., 8012345678)",
    })
    .max(15, { message: "Phone number must not exceed 15 digits" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone number must contain only digits",
    }),
  bvnNumber: z
    .string()
    .regex(/^\d{11}$/, "BVN must be 11 digits")
    .nonempty(),
  email: z.string().email(),
  idDocument: fileDocSchema,
});

export const corporateVerificationSchema = z.object({
  company: corporateCompanySchema,
  bankDetails: corporateBankSchema,
  documents: corporateDocumentsSchema,
  signatories: z.array(corporateSignatorySchema).min(1),
  referral: z
    .object({
      officerName: z.string().optional(),
      contact: z.string().optional(),
    })
    .optional(),
});

export type CorporateVerificationForm = z.infer<
  typeof corporateVerificationSchema
>;

export const corporateSteps = [
  { id: "company", name: "Company Info" },
  { id: "bank", name: "Bank Details" },
  { id: "signatories", name: "Signatories" },
  { id: "documents", name: "Documents" },
];
