import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "../ui/button";

// Create schema for form validation with Zod
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must not exceed 15 digits" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone number must contain only digits",
    })
    .refine((val) => val.charAt(0) !== "0", {
      message: "Phone number should not start with 0",
    }),
  investmentInterest: z.string().optional(),
  message: z.string().optional(),
});

// Type for form values based on the schema
type FormValues = z.infer<typeof formSchema>;

const ConsultationModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (open: boolean) => void;
}) => {
  // Initialize React Hook Form with Zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      investmentInterest: "",
      message: "",
    },
  });

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    // Here you would handle the form submission (e.g., API call)

    // Close the modal after successful submission
    setShowModal(false);
    form.reset({
      fullName: "",
      email: "",
      phone: "",
      investmentInterest: "",
      message: "",
    });
    toast.success("Consultation request submitted successfully!");
    // Optionally show a success message or redirect
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto text-base p-5">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-2xl font-bold text-center">
            Schedule a Consultation
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-base text-center max-w-md mx-auto">
            Complete the form below and our investment advisor will contact you
            within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=""
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="">
                  
                  <FormControl>
                    <Input
                      className="placeholder:text-base text-2xl h-10"
                      placeholder="Full Name"
                      {...field}
                    />
                  </FormControl>
                  <div className="h-4">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                 
                    <FormControl>
                      <Input
                        className="text-base h-10 placeholder:text-base"
                        placeholder="example@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <div className="h-4">
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="">
                    
                    <FormControl>
                      <Input
                        className="text-base h-10"
                        placeholder="7XXXXXXXX"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <div className="h-4">
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="investmentInterest"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base font-medium">
                    Investment Interest
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-base h-10">
                        <SelectValue placeholder="Select your primary interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-base">
                      <SelectItem className="focus:bg-primary" value="equities">
                        Equity Investments
                      </SelectItem>
                      <SelectItem className="focus:bg-primary" value="fixed-income">Fixed Income</SelectItem>
                      <SelectItem className="focus:bg-primary" value="real-estate">Real Estate</SelectItem>
                      <SelectItem className="focus:bg-primary" value="healthcare">Healthcare</SelectItem>
                      <SelectItem className="focus:bg-primary" value="agriculture">
                        Agricultural Investments
                      </SelectItem>
                      <SelectItem className="focus:bg-primary" value="mixed">
                        Diversified Portfolio
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="h-2">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base font-medium">
                    Additional Information
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-base min-h-[80px] resize-none"
                      placeholder="Tell us about your investment goals..."
                      {...field}
                    />
                  </FormControl>
                  <div className="h-4">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="">
              <Button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white text-base h-10"
              >
                Request Consultation
              </Button>
            </DialogFooter>

            <p className="text-xs text-gray-500 text-center mt-2">
              By submitting this form, you agree to our{" "}
              <a href="#" className="text-brand-primary hover:underline">
                Privacy Policy
              </a>{" "}
              and consent to being contacted.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;
