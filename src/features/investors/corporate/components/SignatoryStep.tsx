import { StableFormField } from "@/features/shared/components/forms/StableFormField";
import { corporateSteps, type CorporateVerificationForm } from "../schema";
import { Button } from "@/components/ui/button";
import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";

type SignatoryProps = {
  form: UseFormReturn<CorporateVerificationForm>;
  append: UseFieldArrayAppend<CorporateVerificationForm, "signatories">;
  remove: UseFieldArrayRemove;
  fields: FieldArrayWithId<CorporateVerificationForm, "signatories", "id">[];
};

const SignatoryStep = ({ form, fields, append, remove }: SignatoryProps) => {
  return (
    <div className="space-y-6">
      {/* Step title */}
      <div className="mb-1">
        <h2 className="text-lg sm:text-xl font-semibold">
          {corporateSteps[2].name}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Add at least one signatory and their identification.
        </p>
      </div>

      {fields.map((f, i) => (
        <div key={f.id} className="border rounded-md p-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <StableFormField
              label="Full Name"
              name={`signatories.${i}.fullName`}
              control={form.control}
              placeholder="e.g. Kabiru Musa"
            />
            <StableFormField
              label="Position"
              name={`signatories.${i}.position`}
              control={form.control}
              placeholder="e.g. Director"
            />
            <StableFormField
              label="Phone Number"
              name={`signatories.${i}.phoneNumber`}
              control={form.control}
              isPhone
              placeholder="e.g. 8012345678"
            />
            <StableFormField
              label="Bank Verification Number (BVN)"
              name={`signatories.${i}.bvnNumber`}
              control={form.control}
              isNinOrBvn
              placeholder="11-digit BVN"
              required
            />
            <StableFormField
              label="Email"
              name={`signatories.${i}.email`}
              control={form.control}
              type="email"
              placeholder="e.g. kabiru@company.com"
            />
          </div>

          <div className="border rounded-lg p-3 sm:p-4 mt-3">
            <StableFormField
              label="Means of Identification"
              description="National ID, Voter's Card, or International Passport"
              name={`signatories.${i}.idDocument`}
              control={form.control}
              isFileInput
              accept=".pdf,.jpg,.jpeg,.png"
              placeholder="Upload ID (PDF/JPG/PNG)"
              formItemClassName="mt-2"
              required
            />
          </div>
        </div>
      ))}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              fullName: "",
              position: "",
              phoneNumber: "",
              bvnNumber: "",
              email: "",
              idDocument: undefined as unknown as File,
            })
          }
        >
          + Add Signatory
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={fields.length === 1}
          onClick={() => {
            if (fields.length > 1) remove(fields.length - 1);
          }}
        >
          - Remove Last
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StableFormField
          label="Relationship Officer Name (optional)"
          name="referral.officerName"
          control={form.control}
          placeholder="e.g. Michael Kabiru"
        />
        <StableFormField
          label="Relationship Officer Contact (optional)"
          name="referral.contact"
          control={form.control}
          placeholder="Phone or email"
        />
      </div>
    </div>
  );
};

export default SignatoryStep;
