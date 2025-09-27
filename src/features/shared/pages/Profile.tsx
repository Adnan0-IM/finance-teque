import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
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
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Trash2,
  Pencil,
  LogOut,
  ShieldCheck,
  ShieldAlert,
  Clock,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useInvestor, type StatusResponse } from "@/features/investors/contexts/InvestorContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import DashboardNavigation from "@/components/layout/DashboardLayout";

const updateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(20, "Phone seems too long"),
});

type UpdateFormValues = z.infer<typeof updateSchema>;



export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateMe, deleteMe, logout } = useAuth();
  const { verificationStatus } = useInvestor();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [response, setResponse] = useState<StatusResponse>({
    success: false,
    data: {
      status: "pending",
      isVerified: false,
    },
  });

  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
    values: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  useEffect(() => {
    form.reset({ name: user?.name || "", phone: user?.phone || "" });
  }, [user, form]);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const response = await verificationStatus();
        setResponse(response);
      } catch (error) {
        console.error("Failed to fetch verification status:", error);
      }
    };

    fetchVerificationStatus();
  }, [verificationStatus]);

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const onSubmit = async (data: UpdateFormValues) => {
    setIsLoading(true);
    try {
      await updateMe(data);
      toast.success("Profile updated");
      setEditing(false);
    } catch (error) {
      const message = (error as Error)?.message || "Failed to update profile";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMe();
      toast.success("Account deleted");
      await logout?.();
      navigate("/login", { replace: true });
    } catch (e) {
      toast.error((e as Error).message || "Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DashboardNavigation>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar with avatar and actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-24 w-24 mb-4 text-2xl">
                  <AvatarFallback className="bg-brand-primary text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-bold text-xl text-gray-800">
                  {user?.name || "User"}
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  {user?.email || "No email"}
                </p>
                <Badge
                  variant={
                    response.data.status === "approved"
                      ? "default"
                      : response.data.status === "pending"
                      ? "secondary"
                      : "outline"
                  }
                  className="mt-1 font-medium"
                >
                  {response.data.status === "approved" ? (
                    <span className="flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
                      Account
                    </span>
                  ) : response.data.status === "pending" ? (
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" /> Verification
                      Pending
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Unverified
                    </span>
                  )}
                </Badge>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => setEditing(!editing)}
                  className="w-full justify-between border-gray-200 hover:text-gray-900 hover:border-brand-primary hover:bg-brand-light"
                >
                  <span className="flex items-center">
                    <Pencil className="w-4 h-4 mr-2" />
                    {editing ? "Cancel Editing" : "Edit Profile"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-between border-gray-200 hover:text-gray-900 hover:border-brand-primary hover:bg-brand-light"
                  onClick={() => navigate("/dashboard/settings")}
                >
                  <span className="flex items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.9332 9.5333C12.8444 9.73705 12.8222 9.96425 12.8701 10.1819C12.918 10.3996 13.0334 10.5941 13.1999 10.7333L13.2532 10.7866C13.3879 10.9214 13.4943 11.0827 13.5661 11.2609C13.638 11.4392 13.6738 11.6303 13.6717 11.8233C13.6695 12.0163 13.6294 12.2066 13.5536 12.3832C13.4778 12.5598 13.3678 12.7188 13.2299 12.8506C13.092 12.9825 12.9288 13.0856 12.7493 13.1538C12.5698 13.2219 12.3775 13.2537 12.1847 13.2476C11.9918 13.2416 11.8022 13.1977 11.6277 13.1186C11.4531 13.0396 11.2972 12.9269 11.1685 12.7866L11.1152 12.7333C10.976 12.5668 10.7816 12.4513 10.5638 12.4034C10.3461 12.3555 10.1189 12.3777 9.91522 12.4666C9.71506 12.5515 9.54911 12.6991 9.44236 12.887C9.33562 13.075 9.29316 13.2933 9.3199 13.5099V13.6666C9.3199 14.0575 9.16418 14.432 8.8873 14.7088C8.61041 14.9857 8.23595 15.1415 7.8451 15.1415C7.45425 15.1415 7.07979 14.9857 6.8029 14.7088C6.52602 14.432 6.3703 14.0575 6.3703 13.6666V13.5866C6.39233 13.3723 6.3472 13.1567 6.23963 12.971C6.13207 12.7853 5.96684 12.6393 5.76838 12.5553C5.56471 12.4663 5.33751 12.4442 5.11983 12.492C4.90215 12.5399 4.70766 12.6554 4.5685 12.8219L4.51522 12.8753C4.3834 13.0099 4.22206 13.1164 4.04386 13.1882C3.86566 13.2601 3.67449 13.2959 3.48151 13.2938C3.28852 13.2916 3.09824 13.2515 2.9217 13.1757C2.74515 13.0999 2.58613 12.9899 2.45428 12.8519C2.32243 12.714 2.21928 12.5508 2.15114 12.3714C2.08301 12.1919 2.0512 11.9995 2.05724 11.8067C2.06327 11.6138 2.1072 11.4243 2.18626 11.2497C2.26532 11.0751 2.37809 10.9192 2.51836 10.7906L2.57164 10.7373C2.73814 10.5981 2.85362 10.4037 2.90149 10.186C2.94936 9.96826 2.92719 9.74106 2.83833 9.5409C2.75341 9.34074 2.60577 9.17479 2.41784 9.06805C2.22991 8.9613 2.01159 8.91884 1.7949 8.94558H1.63804C1.24723 8.94558 0.872801 8.78986 0.595957 8.51298C0.319113 8.23609 0.163391 7.86163 0.163391 7.47078C0.163391 7.07993 0.319113 6.70547 0.595957 6.42858C0.872801 6.1517 1.24723 5.99598 1.63804 5.99598H1.71803C1.93236 6.018 2.14804 5.97288 2.33367 5.86531C2.51929 5.75775 2.66533 5.59251 2.74931 5.39406C2.83817 5.19389 2.86035 4.96669 2.81247 4.74901C2.7646 4.53133 2.64912 4.33684 2.48262 4.19767L2.42935 4.1444C2.29467 4.01258 2.18821 3.85124 2.11638 3.67304C2.04454 3.49484 2.00877 3.30367 2.01089 3.11069C2.01301 2.9177 2.05313 2.72742 2.12891 2.55087C2.20469 2.37432 2.31472 2.21531 2.45267 2.08345C2.59063 1.9516 2.75383 1.84846 2.93326 1.78032C3.11269 1.71218 3.30513 1.68038 3.49792 1.68642C3.69071 1.69245 3.88028 1.73638 4.05485 1.81543C4.22942 1.89449 4.3854 2.00726 4.51403 2.14754L4.5673 2.20081C4.70647 2.36731 4.90096 2.48279 5.11864 2.53066C5.33632 2.57853 5.56352 2.55636 5.76368 2.46749H5.83834C6.0385 2.38258 6.20445 2.23493 6.3112 2.047C6.41794 1.85907 6.4604 1.64075 6.43366 1.42406V1.33075C6.43366 0.939898 6.58938 0.56547 6.86626 0.288626C7.14315 0.0117824 7.51761 -0.14394 7.90846 -0.14394C8.29931 -0.14394 8.67377 0.0117824 8.95065 0.288626C9.22754 0.56547 9.38326 0.939898 9.38326 1.33075V1.41074C9.36 1.62743 9.40245 1.84575 9.5092 2.03368C9.61595 2.22161 9.7819 2.36926 9.98206 2.45417C10.1822 2.54303 10.4094 2.5652 10.6271 2.51733C10.8448 2.46946 11.0393 2.35398 11.1785 2.18748L11.2317 2.13421C11.3636 2.00002 11.5249 1.89356 11.7031 1.82172C11.8813 1.74988 12.0725 1.71412 12.2655 1.71623C12.4584 1.71835 12.6487 1.75847 12.8253 1.83425C13.0018 1.91003 13.1608 2.02007 13.2927 2.15802C13.4245 2.29597 13.5277 2.45917 13.5958 2.6386C13.664 2.81803 13.6958 3.01047 13.6897 3.20326C13.6837 3.39606 13.6398 3.58562 13.5607 3.76019C13.4816 3.93476 13.3689 4.09074 13.2286 4.21937L13.1753 4.27264C13.0088 4.41181 12.8933 4.6063 12.8455 4.82398C12.7976 5.04166 12.8198 5.26886 12.9086 5.46902V5.54368C12.9935 5.74384 13.1412 5.90979 13.3291 6.01654C13.5171 6.12329 13.7354 6.16574 13.9521 6.13901H14.0454C14.4362 6.13901 14.8107 6.29473 15.0876 6.57161C15.3644 6.8485 15.5202 7.22296 15.5202 7.61381C15.5202 8.00466 15.3644 8.37912 15.0876 8.656C14.8107 8.93289 14.4362 9.08861 14.0454 9.08861H13.9654C13.7487 9.06587 13.5304 9.10833 13.3425 9.21507C13.1545 9.32182 13.0069 9.48777 12.9332 9.6866V9.5333Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Account Settings
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {!user?.isVerified && (
                  <Button
                    variant="outline"
                    className="w-full justify-between border-gray-200 hover:text-gray-900 hover:border-brand-primary hover:bg-brand-light"
                    onClick={() => navigate("/investor-verification")}
                  >
                    <span className="flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Complete Verification
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                    >
                      <span className="flex items-center">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete account?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action is permanent and will remove your account
                        and data. You can't undo this.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeleting}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                      >
                        {isDeleting ? "Deleting..." : "Yes, delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  variant="outline"
                  className="w-full justify-between border-gray-200 hover:text-gray-900 hover:border-brand-primary hover:bg-brand-light"
                  onClick={async () => {
                    await logout?.();
                    navigate("/login", { replace: true });
                  }}
                >
                  <span className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right content area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Details Card */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Personal Information
                  </h3>
                  {!editing && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditing(true)}
                      className="text-brand-primary hover:text-brand-primary-dark hover:bg-brand-light"
                    >
                      <Pencil className="w-4 h-4 mr-1.5" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>

              {editing ? (
                <div className="p-6">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="font-medium text-gray-700">
                              Full name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                className="h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                                autoComplete="name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="font-medium text-gray-700">
                              Phone
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="08012345678"
                                className="h-11 rounded-md border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                                autoComplete="tel"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-destructive" />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-gray-300"
                          onClick={() => setEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-brand-primary hover:bg-brand-primary-dark text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving..." : "Save changes"}
                          {!isLoading && (
                            <ArrowRight className="ml-2 h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                    <div className="p-4 sm:p-6">
                      <p className="text-sm font-medium text-gray-500">
                        Full Name
                      </p>
                      <p className="mt-1 text-gray-900">
                        {user?.name || "Not set"}
                      </p>
                    </div>
                    <div className="p-4 sm:p-6">
                      <p className="text-sm font-medium text-gray-500">
                        Email Address
                      </p>
                      <p className="mt-1 text-gray-900">
                        {user?.email || "Not set"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                    <div className="p-4 sm:p-6">
                      <p className="text-sm font-medium text-gray-500">
                        Phone Number
                      </p>
                      <p className="mt-1 text-gray-900">
                        {user?.phone || "Not set"}
                      </p>
                    </div>
                    <div className="p-4 sm:p-6">
                      <p className="text-sm font-medium text-gray-500">Role</p>
                      <p className="mt-1 text-gray-900 capitalize">
                        {user?.role || "User"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* KYC Verification data.status */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">
                  Verification data.status
                </h3>
              </div>

              <div className="p-6">
                <div
                  className={cn(
                    "rounded-lg border p-5",
                    response.data.status === "approved"
                      ? "bg-green-50 border-green-100"
                      : response.data.status === "pending"
                      ? "bg-yellow-50 border-yellow-100"
                      : "bg-gray-50 border-gray-100"
                  )}
                >
                  {response.data.status === "approved" ? (
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-green-100 p-2 mt-1">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-700 mb-1">
                          Account Fully Verified
                        </h4>
                        <p className="text-sm text-green-600 mb-3">
                          Your account has been verified and you have full
                          access to all features.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">
                              Identity verification complete
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">
                              Address verification complete
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">
                              Banking information verified
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 text-xs text-green-600">
                          Verified on:{" "}
                          {new Date(
                            response?.data?.reviewedAt || Date.now()
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ) : response.data.status === "pending" ? (
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-yellow-100 p-2 mt-1">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-700 mb-1">
                          Verification In Progress
                        </h4>
                        <p className="text-sm text-yellow-600 mb-3">
                          We're reviewing your verification documents. This
                          typically takes 1-2 business days.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-yellow-600">
                              Documents submitted successfully
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-yellow-600">
                              Verification in review
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 text-xs text-yellow-600">
                          Submitted on:{" "}
                          {new Date(
                            response?.data?.submittedAt || Date.now()
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-gray-200 p-2 mt-1">
                        <XCircle className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">
                          Account Not Verified
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Please complete the verification process to access all
                          platform features including investment opportunities.
                        </p>
                        <Button
                          onClick={() => navigate("/investor-verification")}
                          className="bg-brand-primary hover:bg-brand-primary-dark text-white mt-2"
                        >
                          Start Verification
                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Security Settings Card */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">
                  Security
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-gray-500">Last updated: Never</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/reset-password")}
                    className="border-gray-200 hover:text-900 hover:border-brand-primary hover:bg-brand-light"
                  >
                    Change password
                  </Button>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Two-factor Authentication</h4>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      disabled
                      className="border-gray-200"
                    >
                      Coming soon
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardNavigation>
  );
}

export default ProfilePage;
