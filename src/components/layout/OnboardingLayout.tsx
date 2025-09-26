import { type ReactNode } from "react";
import { NavLink } from "react-router";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import logo from "@/assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";

interface OnboardingLayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageDescription?: string;
}

export default function OnboardingLayout({
  children,
  pageTitle,
  pageDescription,
}: OnboardingLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen  ">
      {/* Simple top navigation */}
      <header className="sticky top-0 z-40 w-full py-1 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Finance Teque Logo"
              className="h-9 w-auto md:h-10 lg:h-11 object-contain"
            />
            <NavLink
              to="/"
              aria-label="Finance Teque home"
              className="group flex flex-col leading-tight"
            >
              <span className="text-lg md:text-xl font-bold text-brand-dark group-hover:opacity-80 transition-opacity">
                Finance Teque Nigeria Limited
              </span>
              <span className="hidden sm:block text-[10px] md:text-sm text-muted-foreground font-bold">
                (Venture Capital Manager) <br /> Licensed by Securities and
                Exchange Commission (SEC), Nigeria
              </span>
            </NavLink>
          </div>
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-brand-primary"
              >
                <Avatar className="size-8">
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-base hidden lg:block">
                  {user?.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-base">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                <User className="mr-2 size-5" />
                <span className="text-base">Profile</span>
              </DropdownMenuItem>
              {/* <DropdownMenuItem
                onClick={() => navigate("/dashboard/settings")}
                className="cursor-pointer"
              >
                <Settings className="mr-2 size-5" />
                <span className="text-base">Settings</span>
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 size-5" />
                <span className="text-base">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Page Content with Title */}
      <main className="px-4 py-8">
        {(pageTitle || pageDescription) && (
          <div className="max-w-4xl mx-auto text-center mb-8">
            {pageTitle && (
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-primary">
                {pageTitle}
              </h1>
            )}
            {pageDescription && (
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                {pageDescription}
              </p>
            )}
          </div>
        )}
        {children}
      </main>

      {/* Simple footer */}
      <footer className="py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Finance Teque Nigeria Limited. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
