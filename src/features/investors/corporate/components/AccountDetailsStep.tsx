import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { corporateSteps, type CorporateVerificationForm } from "../schema";
import { StableFormField } from "@/features/shared/components/forms/StableFormField";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AcountDetailsStep = ({
  form,
  banks,
}: {
  form: UseFormReturn<CorporateVerificationForm>;
  banks: string[];
}) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Step title */}
      <div className="sm:col-span-2 mb-1">
        <h2 className="text-lg sm:text-xl font-semibold">
          {corporateSteps[1].name}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Enter your corporate bank information.
        </p>
      </div>
      <FormField
        control={form.control}
        name="bankDetails.bankName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm leading-0 mb-2 sm:text-base">
              Bank Name <span className="text-destructive">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="h-11 py-5 text-base border-gray-300">
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[200px]">
                {banks.map((bank) => (
                  <SelectItem
                    className="focus:bg-brand-primary"
                    key={bank}
                    value={bank}
                  >
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />
      <StableFormField
        label="Account Number"
        name="bankDetails.accountNumber"
        control={form.control}
        isNinOrBvn
        placeholder="10-digit account number"
      />
      <StableFormField
        label="Account Name"
        name="bankDetails.accountName"
        control={form.control}
        placeholder="e.g. Teque Capital Ltd"
      />
      <FormItem>
        <FormLabel>Account Type</FormLabel>
        <FormControl>
          <Input value="Corporate" readOnly />
        </FormControl>
      </FormItem>
      <StableFormField
        label="Bank Verification Number (BVN)"
        name="bankDetails.bvnNumber"
        control={form.control}
        isNinOrBvn
        placeholder="11-digit BVN"
      />
    </div>
  );
};

export default AcountDetailsStep;
