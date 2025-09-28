import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate, Link } from "react-router";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input"; // remove if unused
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { ArrowRight } from "lucide-react";
import { MotionButton } from "@/components/animations/MotionizedButton";
import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const verifySchema = z.object({
  code: z
    .string()
    .min(6, "Enter the 6-digit code")
    .max(6, "Enter the 6-digit code")
    .regex(/^\d{6}$/, "Code must be 6 digits"), // removed the global 'g' flag
});

type VerifyFormValues = z.infer<typeof verifySchema>;

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { verifyEmail, resendCode, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const prefillEmail = params.get("email") || "";
  const email = useMemo(
    () => prefillEmail || userEmail || user?.email || "",
    [prefillEmail, userEmail, user?.email]
  );

  useEffect(() => {
    if (prefillEmail) setUserEmail(prefillEmail);
  }, [prefillEmail]);

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const onSubmit = async (data: VerifyFormValues) => {
    setIsLoading(true);
    try {
      if (!email) {
        toast.error(
          <p className="text-base text-red-500">
            Missing email. Please register again.
          </p>
        );
        return;
      }
      await verifyEmail(email, data.code);
      toast.success("Email verified! You can now log in.");

      navigate("/login");
    } catch (error) {
      toast.error(
        <p className="text-base text-red-500">{(error as Error).message}</p>
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageTransition>
        <FadeIn>
          <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-18">
            <div className="mx-auto max-w-md w-full p-6 sm:p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-brand-primary">
                  Verify email
                </h1>
                <p className="text-muted-foreground">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-base font-semibold text-gray-700">
                          6-digit code
                        </FormLabel>
                        <FormControl>
                          <div className="flex justify-center">
                            <InputOTP
                              maxLength={6}
                              value={field.value}
                              onChange={field.onChange}
                              disabled={isLoading || !email}
                              onComplete={() => form.handleSubmit(onSubmit)()}
                              inputMode="numeric" // mobile keypad
                              pattern="\d*" // numeric only
                              autoFocus // focus first slot
                              aria-label="Verification code"
                            >
                              <InputOTPGroup className="gap-2">
                                <InputOTPSlot
                                  index={0}
                                  className={`w-12 h-14 text-xl font-semibold rounded-lg border-2 transition-all focus-visible:ring-2 ${
                                    form.formState.errors.code
                                      ? "border-red-500 focus-visible:ring-red-500/50"
                                      : "border-gray-300 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20"
                                  }`}
                                />
                                <InputOTPSlot
                                  index={1}
                                  className={`w-12 h-14 text-xl font-semibold rounded-lg border-2 transition-all focus-visible:ring-2 ${
                                    form.formState.errors.code
                                      ? "border-red-500 focus-visible:ring-red-500/50"
                                      : "border-gray-300 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20"
                                  }`}
                                />
                                <InputOTPSlot
                                  index={2}
                                  className={`w-12 h-14 text-xl font-semibold rounded-lg border-2 transition-all focus-visible:ring-2 ${
                                    form.formState.errors.code
                                      ? "border-red-500 focus-visible:ring-red-500/50"
                                      : "border-gray-300 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20"
                                  }`}
                                />
                              </InputOTPGroup>

                              <InputOTPSeparator className="w-4 sm:w-6 sm:mx-2 flex justify-center">
                                <div className="w-2 h-0.5 bg-gray-400 rounded-full"></div>
                              </InputOTPSeparator>

                              <InputOTPGroup className="gap-2">
                                <InputOTPSlot
                                  index={3}
                                  className={`w-12 h-14 text-xl font-semibold rounded-lg border-2 transition-all focus-visible:ring-2 ${
                                    form.formState.errors.code
                                      ? "border-red-500 focus-visible:ring-red-500/50"
                                      : "border-gray-300 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20"
                                  }`}
                                />
                                <InputOTPSlot
                                  index={4}
                                  className={`w-12 h-14 text-xl font-semibold rounded-lg border-2 transition-all focus-visible:ring-2 ${
                                    form.formState.errors.code
                                      ? "border-red-500 focus-visible:ring-red-500/50"
                                      : "border-gray-300 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20"
                                  }`}
                                />
                                <InputOTPSlot
                                  index={5}
                                  className={`w-12 h-14 text-xl font-semibold rounded-lg border-2 transition-all focus-visible:ring-2 ${
                                    form.formState.errors.code
                                      ? "border-red-500 focus-visible:ring-red-500/50"
                                      : "border-gray-300 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20"
                                  }`}
                                />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs md:text-sm text-destructive text-center" />
                      </FormItem>
                    )}
                  />

                  <MotionButton
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full h-11 text-base bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-50 transition-all duration-200"
                    disabled={
                      isLoading || !email || form.watch("code").length < 6
                    }
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Code
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </MotionButton>
                </form>
              </Form>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={async () => {
                    if (!email) {
                      toast.error("Missing email. Please register or login.");

                      return;
                    }
                    try {
                      await resendCode(email);
                      toast.success("Verification code sent.");
                      setCooldown(60);
                    } catch (error) {
                      toast.error((error as Error).message);
                    }
                  }}
                  disabled={cooldown > 0 || !email}
                  className="text-brand-primary cursor-pointer text-base font-medium hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
                </button>

                <Link
                  to="/login"
                  className="text-brand-primary text-base font-medium hover:underline"
                >
                  Back to login
                </Link>
              </div>

              {!email && (
                <p className="text-center text-sm text-red-500">
                  Missing email. Please{" "}
                  <Link to="/register" className="underline">
                    register again
                  </Link>
                  .
                </p>
              )}
            </div>
          </div>
        </FadeIn>
      </PageTransition>
    </div>
  );
}
