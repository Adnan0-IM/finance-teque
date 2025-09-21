import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams, Link } from "react-router";
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
import { MotionButton } from "@/components/animations/MotionizedButton";
import { ArrowRight, EyeIcon, EyeOff } from "lucide-react";
import { API_URL } from "@/utils/constants";
import axios from "axios";
import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";

const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token") || "";

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset token");
    }
  }, [token]);

  const onSubmit = async (data: ResetFormValues) => {
    if (!token) return;
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        password: data.password,
      });
      toast.success("Password reset successful. Please log in.");
      navigate("/login");
    } catch (error) {
      const message =
        (axios.isAxiosError(error) &&
          (error.response?.data?.message || error.message)) ||
        "Failed to reset password";
      toast.error(message);
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
                  Reset your password
                </h1>
                <p className="text-muted-foreground">
                  Enter your new password below
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-base font-semibold text-gray-700">
                          New password
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
                              onClick={() => setShowPassword((s) => !s)}
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
                          Confirm password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirm ? "text" : "password"}
                              placeholder="••••••••"
                              autoComplete="new-password"
                              className="h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirm((s) => !s)}
                              className="absolute right-2 sm:right-5 top-3 sm:size-4 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showConfirm ? <EyeIcon /> : <EyeOff />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-destructive" />
                      </FormItem>
                    )}
                  />

                  <MotionButton
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    type="submit"
                    className="w-full h-11 py-5 text-base bg-brand-primary hover:bg-brand-primary-dark focus:ring-2 focus:ring-brand-primary/50 transition-all duration-200"
                    disabled={isLoading || !token}
                  >
                    {isLoading ? "Resetting..." : "Reset password"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </MotionButton>
                </form>
              </Form>

              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Remembered it?{" "}
                  <Link
                    to="/login"
                    className="text-brand-primary font-medium hover:underline"
                  >
                    Back to login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </PageTransition>
    </div>
  );
}

export default ResetPasswordPage;
