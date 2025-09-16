import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { MotionButton } from "./animations/MotionizedButton";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
type InvestorRegistrationButtonProps = ButtonProps & {
  children?: React.ReactNode;
};

export default function InvestorRegistrationButton({
  className,
  children = "Get Started",
}: InvestorRegistrationButtonProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    if (user) {
      // If user is already logged in, take them to the verification form
      navigate("/investor-verification");
    } else {
      // If not logged in, take them to registration with a return URL parameter
      navigate("/register?returnTo=investor-verification");
    }
  };

  return (
    <MotionButton
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`text-base py-5 ${className}`}
      onClick={handleClick}
    >
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </MotionButton>
  );
}
