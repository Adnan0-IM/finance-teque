import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { VariantProps } from "class-variance-authority";


type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }
type InvestorRegistrationButtonProps = ButtonProps & {
  children?: React.ReactNode;
};

export default function InvestorRegistrationButton({
  className,
  children = "Get Started",
  ...props
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
    <Button className={`text-base py-5 ${className}`} onClick={handleClick} {...props}>
      {children}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}
