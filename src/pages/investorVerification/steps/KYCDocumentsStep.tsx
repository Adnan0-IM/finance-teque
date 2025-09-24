import { AnimatePresence, motion } from "framer-motion";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "../schema";
import { StableFormField } from "@/components/forms/StableFormField";

type Props = { form: UseFormReturn<FormValues> };

export function KYCDocumentsStep({ form }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="kyc"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        <h2 className="text-lg sm:text-xl font-semibold">Required Documents</h2>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4">
          Please upload clear images or PDF files of the following documents:
        </p>
        <div className="space-y-4 sm:space-y-6">
          <div className="border rounded-lg p-3 sm:p-4">
            <StableFormField
              label="1. Means of Identification"
              name="identificationDocument"
              control={form.control}
              description="National ID, Voter's Card, or International Passport"
              isFileInput
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>
          <div className="border rounded-lg p-3 sm:p-4">
            <StableFormField
              label="2. Passport Photograph"
              name="passportPhoto"
              control={form.control}
              description="Recent, with clear background"
              isFileInput
              accept=".jpg,.jpeg,.png"
            />
          </div>
          <div className="border rounded-lg p-3 sm:p-4">
            <StableFormField
              label="3. Utility Bill"
              name="utilityBill"
              control={form.control}
              description="Not older than 3 months"
              isFileInput
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>
        </div>
        <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
          <p className="text-xs sm:text-sm text-blue-700">
            <strong>Note:</strong> All documents must be clear, valid, and
            unaltered. Verification typically takes 1-2 business days.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
