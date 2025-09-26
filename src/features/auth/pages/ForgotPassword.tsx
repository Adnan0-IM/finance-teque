import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
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
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type Values = z.infer<typeof schema>;

export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: Values) => {
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, {
        email: data.email,
      });
      toast.success("If the email exists, a reset link was sent");
    } catch (error) {
      const message =
        (axios.isAxiosError(error) &&
          (error.response?.data?.message || error.message)) ||
        "Failed to request password reset";
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
              Forgot password
            </h1>
            <p className="text-muted-foreground">
              Enter your email to receive a reset link
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <MotionButton
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98, y: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                type="submit"
                className="w-full h-11 py-5 text-base bg-brand-primary hover:bg-brand-primary-dark focus:ring-2 focus:ring-brand-primary/50 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send reset link"}
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
      </FadeIn></PageTransition>
    </div>
  );
}

export default ForgotPasswordPage;
