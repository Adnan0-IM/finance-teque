import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { MotionButton } from "./animations/MotionizedButton";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const Newsletter = () => {
  const [emailSubscription, setEmailSubscription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      // Send JSON: { email }, not a raw string
      await api.post("/subscribe", { email: emailSubscription.trim() });
      toast.success("Successfully subscribed to our Newsletter");
      setEmailSubscription("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Subscription failed";
      toast.error(msg);
      console.error("[newsletter] subscribe error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-white/90">
              Get the latest investment insights and market updates delivered to
              your inbox.
            </p>
          </div>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col md:flex-row gap-3 w-full md:w-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              value={emailSubscription}
              onChange={(e) => setEmailSubscription(e.target.value)}
              className="bg-white/10 border-white/20 text-white text-[17px] py-[21px] placeholder:text-white/60 min-w-80"
              required
            />
            <MotionButton
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer bg-white text-brand-primary text-[17px] py-[21px] hover:bg-gray-100 flex-shrink-0 disabled:opacity-60"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Send className="size-5 mr-2" />
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </MotionButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
