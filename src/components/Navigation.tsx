import { ArrowRight, Menu, X } from "lucide-react";

import logo from "../assets/logo.png";
import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import InvestorRegistrationButton from "./InvestorRegistrationButton";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import MobileMenuMotion from "./animations/MobileMenuMotion";
import { MotionButton } from "./animations/MotionizedButton";
import { useInvestor } from "@/features/shared/contexts/Investor-startupContext";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { verificationSubmitted } = useInvestor();

  const navLinks = [
    { title: "About", path: "/about" },
    { title: "Business Investment", path: "/asset-financing" },
    { title: "Investment Plans", path: "/plans" },
    { title: "Team", path: "/team" },
    { title: "Contact", path: "/contact" },
  ];

  // Build a single CTA for both desktop and mobile
  const cta = useMemo(() => {
    if (!user) return null;

    const hasSubmitted =
      verificationSubmitted || Boolean(user?.verification?.submittedAt);
    const kycStatus = user?.verification?.status as
      | "approved"
      | "pending"
      | "rejected"
      | undefined;

    if (user.role === "admin") {
      return { to: "/admin", label: "Admin Dashboard", arrow: true };
    }

    if (!user.role || user.role === "none") {
      return { to: "/choose-profile", label: "Choose Profile", arrow: true };
    }

    if (user.role === "investor") {
      if (kycStatus === "approved" || user.isVerified) {
        return { to: "/dashboard", label: "Dashboard", arrow: true };
      }
      if (hasSubmitted && kycStatus === "rejected") {
        return {
          to: "/investor-verification",
          label: "Submit Your Verification",
          arrow: false,
        };
      }
      if (hasSubmitted) {
        return {
          to: "/verification-success",
          label: "Verification is in review",
          arrow: false,
        };
      }
      return {
        to: "/investor-verification",
        label: "Start Investing",
        arrow: true,
      };
    }

    if (user.role === "startup") {
      if (kycStatus === "approved" || user.isVerified) {
        return { to: "/dashboard", label: "Dashboard", arrow: true };
      }
      if (hasSubmitted && kycStatus === "rejected") {
        return {
          to: "/apply-for-funding",
          label: "Submit Your Verification",
          arrow: false,
        };
      }
      if (hasSubmitted) {
        return {
          to: "/verification-success",
          label: "Verification is in review",
          arrow: false,
        };
      }
      return {
        to: "/apply-for-funding",
        label: "Start Investing",
        arrow: true,
      };

    }

    return { to: "/dashboard", label: "Dashboard", arrow: true };
  }, [user, verificationSubmitted]);

  return (
    <>
      <nav className="fixed top-0 w-full  z-50 bg-white/95 backdrop-blur-sm border-b border-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-16 py-2">
            <div className="flex items-center space-x-3 lg:max-w-[30%]">
              <img
                src={logo}
                alt="Finance Teque Logo"
                className="h-9 w-auto md:h-10 lg:h-11"
              />
              <NavLink
                to="/"
                aria-label="Finance Teque home"
                className="group flex flex-col leading-tight "
              >
                <span className="text-lg md:text-xl font-bold text-brand-dark group-hover:opacity-80 transition-opacity">
                  Finance Teque Nigeria Limited
                </span>
                <span className="hidden sm:block text-[10px] md:text-xs text-muted-foreground font-bold">
                  (Venture Capital Manager) <br /> Licensed by Securities and
                  Exchange Commission (SEC), Nigeria
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center md:space-x-4 lg:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-colors text-xl font-medium ${
                      isActive
                        ? "text-brand-primary font-medium"
                        : "text-foreground hover:text-primary"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              ))}
            </div>

            {user ? (
              <NavLink to={cta?.to ?? "/dashboard"}>
                <MotionButton className="hidden lg:inline-flex items-center text-white bg-brand-primary hover:bg-brand-primary-dark px-4 py-2 rounded-md text-lg">
                  {cta?.label}
                  {cta?.arrow && <ArrowRight />}
                </MotionButton>
              </NavLink>
            ) : (
              <InvestorRegistrationButton className="hidden lg:inline-flex" />
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="cursor-pointer lg:hidden p-2 rounded-md text-foreground hover:bg-gray-100 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <MobileMenuMotion>
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <div className="fixed inset-y-0 right-0 w-[95vw] bg-white shadow-xl">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <img
                      src={logo}
                      alt="Finance Teque Logo"
                      className="h-8 w-auto"
                    />
                    <span className="text-lg font-bold text-primary">
                      Finance Teque
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="cursor-pointer p-2 rounded-md text-foreground hover:bg-gray-100 transition-colors"
                    aria-label="Close mobile menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <nav className=" flex flex-col space-y-2">
                    <NavLink
                      to={"/"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `w-full text-left p-4 rounded-lg text-lg transition-colors ${
                          isActive
                            ? "text-brand-primary bg-brand-light font-medium"
                            : "text-foreground hover:bg-gray-50"
                        }`
                      }
                    >
                      Home
                    </NavLink>
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.title}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `w-full text-left px-4 py-3 rounded-lg text-lg transition-colors ${
                            isActive
                              ? "text-brand-primary bg-brand-light font-medium"
                              : "text-foreground hover:bg-gray-50"
                          }`
                        }
                      >
                        {link.title}
                      </NavLink>
                    ))}
                  </nav>
                </div>

                {/* Mobile Get Started Button */}
                <div className="p-6 border-t border-border">
                  {user ? (
                    <NavLink
                      to={cta?.to ?? "/dashboard"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MotionButton className="w-full text-center text-lg py-6 cursor-pointer bg-brand-primary hover:bg-brand-primary-dark text-white rounded-md">
                        {cta?.label}
                        {cta?.arrow && <ArrowRight />}
                      </MotionButton>
                    </NavLink>
                  ) : (
                    <InvestorRegistrationButton className="w-full text-lg py-6 cursor-pointer bg-brand-primary hover:bg-brand-primary-dark text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </MobileMenuMotion>
      )}
    </>
  );
};
export default Navigation;
