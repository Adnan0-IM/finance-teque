import { AnimatePresence, motion } from "framer-motion";
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
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "../../schema";
import { StableFormField } from "@/features/investors/components/forms/StableFormField";

type Props = {
  form: UseFormReturn<FormValues>;
  nigerianStates: string[];
  selectedState?: string;
  selectedLga?: string;
  currentLGAs: string[];
};

export function BioDataStep({
  form,
  nigerianStates,
  selectedState,
  selectedLga,
  currentLGAs,
}: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="bio"
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
            isPhone
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

          <FormField
            control={form.control}
            name="stateOfResidence"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm leading-0 mb-3 sm:text-base">
                  State of Residence <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 text-base py-5 border-gray-300">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[260px]">
                    {nigerianStates.map((state) => (
                      <SelectItem
                        className="focus:bg-brand-primary"
                        key={state}
                        value={state}
                      >
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="localGovernment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm leading-0 mb-2 sm:text-base">
                  Local Government <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!selectedState || currentLGAs.length === 0}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 py-5 text-base border-gray-300">
                      <SelectValue
                        placeholder={
                          !selectedState
                            ? "Select state first"
                            : currentLGAs.length === 0
                            ? "No LGAs found; choose Other"
                            : "Select Local Government"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[260px]">
                    {currentLGAs.map((lga) => (
                      <SelectItem
                        className="focus:bg-brand-primary"
                        key={lga}
                        value={lga}
                      >
                        {lga}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          {selectedLga === "Other" && (
            <StableFormField
              label="Specify Local Government"
              name="localGovernmentOther"
              control={form.control}
              placeholder="Enter your Local Government"
            />
          )}

          <StableFormField
            label="NIN Number"
            name="ninNumber"
            autoComplete="nin-number"
            control={form.control}
            placeholder="12345678901"
            isNinOrBvn
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
  );
}
