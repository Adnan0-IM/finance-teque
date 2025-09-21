import { Menu, X } from "lucide-react";

import logo from "../assets/logo.png";
import { useState } from "react";
import { NavLink } from "react-router";
import InvestorRegistrationButton from "./InvestorRegistrationButton";
import { useAuth } from "@/contexts/AuthContext";
import MobileMenuMotion from "./animations/MobileMenuMotion";
import { MotionButton } from "./animations/MotionizedButton";
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navLinks = [
    { title: "About", path: "/about" },
    { title: "Business Investment", path: "/asset-financing" },
    { title: "Investment Plans", path: "/plans" },
    { title: "Team", path: "/team" },
    { title: "Contact", path: "/contact" },
  ];

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
              <NavLink
                to="/dashboard"
                className="hidden lg:inline-flex items-center text-white bg-brand-primary hover:bg-brand-primary-dark px-4 py-2 rounded-md text-lg"
              >
                Dashboard
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
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MotionButton
                      
                      className="w-full  text-center text-lg py-6 cursor-pointer bg-brand-primary hover:bg-brand-primary-dark text-white rounded-md"
                      >

                      Dashboard
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
