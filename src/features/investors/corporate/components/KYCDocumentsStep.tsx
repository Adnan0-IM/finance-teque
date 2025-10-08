import { StableFormField } from "@/features/shared/components/forms/StableFormField";
import { corporateSteps, type CorporateVerificationForm } from "../schema";
import type { UseFormReturn } from "react-hook-form";

const KYCDocumentsStep = ({
  form,
}: {
  form: UseFormReturn<CorporateVerificationForm>;
}) => {
  return (
    <div>
      <div className="grid gap-4">
        {/* Step title */}
        <div className="mb-1">
          <h2 className="text-lg sm:text-xl font-semibold">
            {corporateSteps[3].name}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Upload clear scans of your corporate documents.
          </p>
        </div>

        <div className="border rounded-lg p-3 sm:p-4">
          <StableFormField
            label="Certificate of Incorporation"
            name="documents.certificateOfIncorporation"
            control={form.control}
            isFileInput
            accept=".pdf,.jpg,.jpeg,.png"
            placeholder="Upload certificate (PDF/JPG/PNG)"
          />
        </div>
        <div className="border rounded-lg p-3 sm:p-4">
          <StableFormField
            label="Utility Bill"
            name="documents.utilityBill"
            control={form.control}
            isFileInput
            accept=".pdf,.jpg,.jpeg,.png"
            placeholder="Upload utility bill (PDF/JPG/PNG)"
          />
        </div>
        <div className="border rounded-lg p-3 sm:p-4">
          <StableFormField
            label="TIN Certificate (optional)"
            name="documents.tinCertificate"
            control={form.control}
            isFileInput
            accept=".pdf,.jpg,.jpeg,.png"
            placeholder="Upload TIN certificate (PDF/JPG/PNG)"
          />
        </div>
      </div>
      <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
        <p className="text-xs sm:text-sm text-blue-700">
          <strong>Note:</strong> All documents must be clear, valid, and
          unaltered. Verification typically takes 1-2 business days.
        </p>
      </div>
    </div>
  );
};

export default KYCDocumentsStep;
