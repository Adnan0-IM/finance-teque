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

type Props = { form: UseFormReturn<FormValues> };

export function NextOfKinStep({ form }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="nok"
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
            isPhone
          />
          <StableFormField
            label="Email Address"
            name="kinEmail"
            autoComplete="email"
            control={form.control}
            placeholder="name@example.com"
            type="email"
          />

          <FormField
            control={form.control}
            name="kinRelationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm leading-0 mb-2 sm:text-base">
                  Relationship <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="py-5 border sm:text-base border-gray-300">
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

          {form.watch("kinRelationship") === "Other" && (
            <StableFormField
              label="Specify Relationship"
              name="kinRelationshipOther"
              control={form.control}
              placeholder="e.g., Cousin"
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
  );
}
