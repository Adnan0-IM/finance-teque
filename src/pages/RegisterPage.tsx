import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, EyeIcon, EyeOff } from "lucide-react";
import { MotionButton } from "@/components/animations/MotionizedButton";
import PageTransition from "@/components/animations/PageTransition";
import { FadeIn } from "@/components/animations/FadeIn";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 digits (e.g., 8012345678)",
      })
      .max(15, { message: "Phone number must not exceed 15 digits" })
      .refine((val) => /^\d+$/.test(val), {
        message: "Phone number must contain only digits",
      }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get return URL from query parameters
  //   const searchParams = new URLSearchParams(location.search);
  //   const returnTo = searchParams.get("returnTo") || "/dashboard";

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await register(data.email, data.password, data.name, data.phone);

      toast.success("Account created successfully!");

      // Send user to verify page with their email prefilled
      navigate(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      toast.error(
        <p className="text-base text-red-500">{(error as Error).message}</p>
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navigation /> */}
   <PageTransition>
          <FadeIn>
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-12">
        <div className="mx-auto max-w-md w-full p-6 sm:p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-brand-primary">
              Create an account
            </h1>
            <p className="text-muted-foreground">
              Enter your information to get started with Finance Teque
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-base font-semibold text-gray-700">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-base font-semibold text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        className="h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-base font-semibold text-gray-700">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+234 704 123 4567"
                        className="h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                        autoComplete="tel"
                        {...field}
                        onChange={(e) => {
                          let value = e.target.value;
                          // Remove all non-digits
                          value = value.replace(/\D/g, "");
                          // Remove leading zero
                          if (value.startsWith("0")) value = value.slice(1);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-base font-semibold text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 sm:right-5 top-3 sm:size-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeIcon /> : <EyeOff />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-base font-semibold text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 sm:right-5 top-3  sm:size-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeIcon /> : <EyeOff />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-gray-300 data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I accept the{" "}
                        <Link
                          to="/terms"
                          className="text-brand-primary font-medium hover:underline"
                        >
                          terms and conditions
                        </Link>
                      </FormLabel>
                      <FormMessage className="text-xs text-destructive" />
                    </div>
                  </FormItem>
                )}
              />
              <MotionButton
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                type="submit"
                className="w-full h-11 bg-brand-primary py-5 text-base hover:bg-brand-primary-dark focus:ring-2 focus:ring-brand-primary/50 transition-all duration-200 mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Register"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </MotionButton>
            </form>
          </Form>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                to={`/login${location.search}`}
                className="text-brand-primary font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      </FadeIn></PageTransition>
    </div>
  );
}
