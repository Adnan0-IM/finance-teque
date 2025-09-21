import { useEffect, useMemo, useState, useRef } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight } from "lucide-react";
import { MotionButton } from "@/components/animations/MotionizedButton";
import { FadeIn } from "@/components/animations/FadeIn";
import PageTransition from "@/components/animations/PageTransition";

const verifySchema = z.object({
  code: z
    .string()
    .min(6, "Enter the 6-digit code")
    .max(6, "Enter the 6-digit code")
    .regex(/^\d{6}$/g, "Code must be 6 digits"),
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

  // A small segmented OTP input component
  function OTPCodeInput({
    value,
    onChange,
    disabled,
    length = 6,
    hasError,
  }: {
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
    length?: number;
    hasError?: boolean;
  }) {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const [digits, setDigits] = useState<string[]>(
      Array.from({ length }, (_, i) => value[i] ?? "")
    );

    useEffect(() => {
      // keep local state in sync with RHF field value (e.g. on reset)
      setDigits(Array.from({ length }, (_, i) => value[i] ?? ""));
    }, [value, length]);

    const focusIndex = (i: number) => {
      const el = inputsRef.current[i];
      if (el) el.focus();
    };

    const commit = (next: string[]) => {
      setDigits(next);
      onChange(next.join(""));
    };

    const handleChange = (i: number, raw: string) => {
      const onlyDigits = raw.replace(/\D+/g, "");
      if (!onlyDigits) {
        // clear current
        const next = [...digits];
        next[i] = "";
        commit(next);
        return;
      }

      // If pasted multiple digits, spread them across cells
      const next = [...digits];
      let idx = i;
      for (const ch of onlyDigits) {
        if (idx >= length) break;
        next[idx] = ch;
        idx++;
      }
      commit(next);

      // Move focus to next empty cell (or last filled)
      const nextIdx =
        i + onlyDigits.length < length ? i + onlyDigits.length : length - 1;
      focusIndex(nextIdx);
    };

    const handleKeyDown = (
      i: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const next = [...digits];
        if (next[i]) {
          next[i] = "";
          commit(next);
        } else if (i > 0) {
          next[i - 1] = "";
          commit(next);
          focusIndex(i - 1);
        }
      } else if (e.key === "ArrowLeft" && i > 0) {
        e.preventDefault();
        focusIndex(i - 1);
      } else if (e.key === "ArrowRight" && i < length - 1) {
        e.preventDefault();
        focusIndex(i + 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        focusIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        focusIndex(length - 1);
      }
    };

    const handlePaste = (
      i: number,
      e: React.ClipboardEvent<HTMLInputElement>
    ) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text").replace(/\D+/g, "");
      if (!text) return;
      const next = [...digits];
      let idx = i;
      for (const ch of text) {
        if (idx >= length) break;
        next[idx] = ch;
        idx++;
      }
      commit(next);
      focusIndex(Math.min(idx, length - 1));
    };

    const base =
      "h-12 w-12 text-center text-2xl font-mono rounded-md border bg-white shadow-sm " +
      "transition-all focus:outline-none tracking-widest placeholder:opacity-60 " +
      "disabled:opacity-60 disabled:cursor-not-allowed";
    const ring = hasError
      ? "border-red-400 focus:ring-2 focus:ring-red-200 focus:border-red-500"
      : "border-gray-300 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary";

    return (
      <div className="grid grid-cols-6 gap-2 justify-center">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d*"
            aria-label={`Digit ${i + 1} of ${length}`}
            aria-invalid={hasError || undefined}
            className={`${base} ${ring}`}
            value={digits[i] ?? ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={(e) => handlePaste(i, e)}
            onFocus={(e) => e.currentTarget.select()}
            disabled={disabled}
            maxLength={1}
          />
        ))}
      </div>
    );
  }

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email is derived from context or URL params; not editable here */}

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-base font-semibold text-gray-700">
                      6-digit code
                    </FormLabel>
                    <FormControl>
                      {/* Segmented OTP input with auto-advance + paste */}
                      <OTPCodeInput
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading || !email}
                        hasError={!!form.formState.errors.code}
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
                disabled={isLoading || !email}
              >
                {isLoading ? "Verifying..." : "Verify email"}
                <ArrowRight className="ml-2 h-4 w-4" />
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

      </FadeIn></PageTransition>
    </div>
  );
}
