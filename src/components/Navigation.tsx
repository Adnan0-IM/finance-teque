import { Menu, X } from "lucide-react";

import logo from "../assets/logo.png";
import { useState } from "react";
import { Button } from "./ui/button";
import { NavLink } from "react-router";
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = [
    { title: "About", path: "/about" },
    { title: "Investment Plans", path: "/plans" },
    { title: "Shari'ah Compliance", path: "/shariah" },
    { title: "Contact", path: "/contact" },
    { title: "Team", path: "/team" },
  ];
  return (
    <>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Finance Teque Logo"
                className="h-10 w-auto"
              />
              <NavLink
                to={"/"}
                className="text-xl font-bold text-brand-dark hover:opacity-80 transition-opacity"
              >
                Finance Teque
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-colors ${
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

            {/* Desktop Get Started Button */}
            <Button className="hidden md:inline-flex bg-brand-primary hover:bg-brand-primary-dark text-white cursor-pointer">
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="cursor-pointer md:hidden p-2 rounded-md text-foreground hover:bg-gray-100 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
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
                    className={({ isActive }) =>
                      `w-full text-left px-4 py-3 rounded-lg text-lg transition-colors ${
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
                      to={link.path}
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
                <Button
                  className="w-full cursor-pointer bg-brand-primary hover:bg-brand-primary-dark text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navigation;
