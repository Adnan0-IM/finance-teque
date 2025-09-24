import { AnimatePresence, motion } from "framer-motion";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "../schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { StableFormField } from "@/components/forms/StableFormField";

type Props = {
  form: UseFormReturn<FormValues>;
  banks: string[];
};

export function AccountDetailsStep({ form, banks }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="acct"
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
            isNinOrBvn
          />
          <FormField
            control={form.control}
            name="bankName"
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
                      <SelectItem className="focus:bg-brand-primary" key={bank} value={bank}>
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
            label="Bank Verification Number (BVN)"
            name="bvnNumber"
            autoComplete="bvn-number"
            control={form.control}
            placeholder="12345678901"
            isNinOrBvn
          />
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm leading-0 mb-2 sm:text-base">
                  Account Type <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 py-5 text-base border-gray-300">
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
                      <SelectItem className="focus:bg-brand-primary" key={opt} value={opt}>
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
              placeholder="e.g., Joint Account"
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
