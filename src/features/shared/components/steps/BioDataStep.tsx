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
import { StableFormField } from "@/features/shared/components/forms/StableFormField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SquareCheck } from "lucide-react";

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
        className="space-y-4 transform-gpu will-change-transform"
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
          <FormField
            control={form.control}
            name="ageBracket"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm leading-0 mb-2  sm:text-base">
                  Are you 18 or older?{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value ?? ""} // keep controlled
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    <Label
                      htmlFor="age-adult"
                      className={cn(
                        "flex cursor-pointer border items-center gap-2 py-3 max-h-12 px-4 rounded-lg",
                        field.value === "adult"
                          ? "bg-brand-primary/20 border-brand-primary"
                          : "border-gray-300 bg-gray-100"
                      )}
                    >
                      <RadioGroupItem
                        id="age-adult"
                        value="adult"
                        className="sr-only"
                      />
                      <span className="text-sm sm:text-base flex gap-2 items-center">
                        <SquareCheck
                          size={20}
                          className={cn(
                            "text-gray-400",
                            field.value === "adult" && "text-accent"
                          )}
                        />
                        Yes, 18 or older
                      </span>
                    </Label>

                    <Label
                      htmlFor="age-minor"
                      className={cn(
                        "flex cursor-pointer border items-center gap-2 py-3 max-h-12 px-4 rounded-lg",
                        field.value === "minor"
                          ? "bg-brand-primary/20 border-brand-primary"
                          : "border-gray-300 bg-gray-100"
                      )}
                    >
                      <RadioGroupItem
                        id="age-minor"
                        value="minor"
                        className="sr-only"
                      />
                      <span className="text-sm sm:text-base flex gap-2 items-center">
                        <SquareCheck
                          size={20}
                          className={cn(
                            "text-gray-400",
                            field.value === "minor" && "text-accent"
                          )}
                        />
                        No, under 18
                      </span>
                    </Label>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
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
              <FormItem className="min-[80px]:">
                <FormLabel className="text-sm leading-0 mb-2 sm:text-base">
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
              <FormItem className="min-h-[80px]">
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

          <StableFormField
            label="Residential Address"
            name="residentialAddress"
            autoComplete="resident-address"
            control={form.control}
            placeholder="123 Main Street, Ikeja, Lagos"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
