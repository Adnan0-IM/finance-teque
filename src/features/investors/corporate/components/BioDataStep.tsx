import { StableFormField } from "@/features/shared/components/forms/StableFormField";
import { corporateSteps, type CorporateVerificationForm } from "../schema";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BioDataStepProps = {
  form: UseFormReturn<CorporateVerificationForm>;
  nigerianStates: string[];
  selectedState?: string;
  selectedLga?: string;
  currentLGAs: string[];
};

const BioDataStep = ({
  form,
  nigerianStates,
  selectedLga,
  selectedState,
  currentLGAs,
}: BioDataStepProps) => {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Step title */}
        <div className="sm:col-span-2 mb-1">
          <h2 className="text-lg sm:text-xl font-semibold">
            {corporateSteps[0].name}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tell us about your company’s registration and contact.
          </p>
        </div>
        <StableFormField
          label="Company Name"
          name="company.name"
          control={form.control}
          placeholder="e.g. Teque Capital Ltd"
        />
        <StableFormField
          label="Incorporation Number"
          name="company.incorporationNumber"
          control={form.control}
          placeholder="RC/CAC e.g. 1234567"
        />
        <StableFormField
          label="Date of Incorporation"
          name="company.dateOfIncorporation"
          control={form.control}
          type="date"
          placeholder="YYYY-MM-DD"
        />
        <FormField
          control={form.control}
          name="company.state"
          render={({ field }) => (
            <FormItem className="min-h-[80px]">
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
          name="company.localGovernment"
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
            name="company.localGovernmentOther"
            control={form.control}
            placeholder="Enter your Local Government"
          />
        )}
        <StableFormField
          label="Contact Phone"
          name="company.phone"
          control={form.control}
          isPhone
          placeholder="e.g. 8012345678"
        />
        <StableFormField
          label="Email Address"
          name="company.email"
          control={form.control}
          type="email"
          placeholder="e.g. company@domain.com"
        />
        <StableFormField
          label="Registered Address"
          name="company.address"
          control={form.control}
          className="sm:col-span-2"
          placeholder="e.g. 12 Adeola Odeku St, VI, Lagos"
        />
      </div>
      <div className="border rounded-lg p-3 sm:p-4 mt-2">
        <StableFormField
          label="Company Logo (JPG/PNG)"
          name="company.logo"
          control={form.control}
          isFileInput
          accept=".jpg,.jpeg,.png"
          placeholder="Upload company logo"
        />
      </div>
    </div>
  );
};

export default BioDataStep;
