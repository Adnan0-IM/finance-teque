import { useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import {
  User,
  Home,
  BarChart3,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Wallet,
  User2,
  Verified,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import MobileMenuMotion from "../animations/MobileDashboardMemuMotion";

const DashboardNavigation = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinksAdmin = [
    { title: "Dashboard", path: "/admin", icon: Home },
    { title: "Verification", path: "/admin/verification", icon: Verified },
    { title: "Manage Users", path: "/admin/users", icon: User2 },
  ];

  const navLinksInvestor = [
    { title: "Dashboard", path: "/dashboard", icon: Home },
    { title: "Investments", path: "/dashboard/investments", icon: BarChart3 },
    { title: "Transactions", path: "/dashboard/transactions", icon: Wallet },
    { title: "Documents", path: "/dashboard/documents", icon: FileText },
    { title: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  const navLinksFundRaiser = [
    { title: "Dashboard", path: "/dashboard", icon: Home },
    { title: "Applications", path: "/dashboard/applications", icon: BarChart3 },
    { title: "Documents", path: "/dashboard/documents", icon: FileText },
    { title: "Settings", path: "/dashboard/settings", icon: Settings },
  ];
  let navLinks = navLinksAdmin;
  if (user?.role === "startup") {
    navLinks = navLinksFundRaiser;
  } else if (user?.role === "investor") {
    navLinks = navLinksInvestor;
  }

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
    <div className="min-h-screen bg-background">
      {/* Sidebar Navigation (desktop) and Mobile Navigation */}
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r

        `}
      >
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          <div className="flex gap-4 items-center p-2 border-b-2">
            <img
              src={logo}
              alt="Finance Teque Logo"
              className="h-9 w-auto md:h-10 lg:h-11 object-contain"
            />

            <span className="text-lg md:text-xl font-bold text-brand-dark group-hover:opacity-80 transition-opacity">
              Finance Teque Nigeria Limited
            </span>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={() =>
                    `group flex items-center px-3 py-3 text-base font-medium rounded-md ${
                      location.pathname === item.path
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-brand-light"
                    }`
                  }
                >
                  <Icon
                    className={`mr-3 size-5 ${
                      location.pathname === item.path
                        ? "text-white"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  />
                  {item.title}
                </NavLink>
              );
            })}
          </nav>
          {/* Logout Button in Sidebar */}
          <div className="px-2 py-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-base cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenuMotion>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 z-50 bg-gray-50 bg-opacity-50"
          >
            <div className="fixed inset-y-0 left-0 w-[80%] bg-white shadow-lg">
              <div className="flex items-center justify-between h-20 px-4 border-b">
                <div className="flex items-center space-x-4">
                  <Avatar className="size-10">
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-lg truncate max-w-[150px]">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 cursor-pointer hover:text-gray-700"
                >
                  <X className="size-6" />
                </button>
              </div>
              <nav className="mt-5 px-2 space-y-3">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.title}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={() =>
                        `group flex items-center px-3 py-3 text-lg font-medium rounded-md ${
                          location.pathname === item.path
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          location.pathname === item.path
                            ? "text-white"
                            : "text-gray-500 group-hover:text-gray-700"
                        }`}
                      />
                      {item.title}
                    </NavLink>
                  );
                })}
                {/* Mobile Logout Button */}
                <button
                  onClick={handleLogout}
                  className="group flex items-center cursor-pointer px-3 py-2 text-lg font-medium rounded-md text-red-600 hover:bg-red-50 w-full"
                >
                  <LogOut className="mr-3 h-5 w-5 text-red-500" />
                  Log out
                </button>
              </nav>
            </div>
          </div>
        </MobileMenuMotion>
      )}

      <div className="md:pl-64">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-40 w-full py-1 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Logo and Brand */}

            <div className="flex items-center space-x-3 ">
              <img
                src={logo}
                alt="Finance Teque Logo"
                className="h-9 w-auto md:h-10 md:hidden lg:h-11"
              />
              <NavLink
                to="/"
                aria-label="Finance Teque home"
                className="group flex flex-col leading-tight "
              >
                <span className="text-lg md:hidden md:text-xl font-bold text-brand-dark group-hover:opacity-80 transition-opacity">
                  Finance Teque Nigeria Limited
                </span>
                <span className="hidden sm:block text-[10px] md:text-sm text-muted-foreground font-bold">
                  (Venture Capital Manager) <br /> Licensed by Securities and
                  Exchange Commission (SEC), Nigeria
                </span>
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Right Navigation Items */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>

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
                    <User className="mr-2 size-5 hover:text-white" />
                    <span className="text-base">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/settings")}
                    className="cursor-pointer"
                  >
                    <Settings className="mr-2 size-5 hover:text-white" />
                    <span className="text-base">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="mr-2 size-5 hover:text-white" />
                    <span className="text-base">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardNavigation;
