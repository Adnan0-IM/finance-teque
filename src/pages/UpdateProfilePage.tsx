import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
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
import { MotionButton } from "@/components/animations/MotionizedButton";
import { ArrowRight, Trash2, Pencil, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import PageTransition from "@/components/animations/PageTransition";
import { FadeIn } from "@/components/animations/FadeIn";
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

const updateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(20, "Phone seems too long"),
});

type UpdateFormValues = z.infer<typeof updateSchema>;

export function UpdateProfilePage() {
  const navigate = useNavigate();
  const { user, updateMe, deleteMe, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

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
    <div className="min-h-screen bg-gray-50">
      <PageTransition>
        <FadeIn>
          <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-12 px-4">
            <div className="mx-auto w-full max-w-2xl p-6 sm:p-8 space-y-6 bg-white rounded-xl shadow-lg border">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="size-12">
                    <AvatarFallback className="text-base">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-brand-primary">
                      My Profile
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      View and manage your account
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="gap-2"
                    onClick={() => setEditing((v) => !v)}
                  >
                    <Pencil className="h-4 w-4" />
                    {editing ? "Cancel" : "Edit"}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="gap-2"
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete account?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action is permanent and will remove your account
                          and data. You can’t undo this.
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
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">Full name</p>
                  <p className="mt-1 font-medium text-brand-dark">
                    {user?.name || "—"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="mt-1 font-medium text-brand-dark">
                    {user?.email || "—"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="mt-1 font-medium text-brand-dark">
                    {user?.phone || "—"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="mt-1 font-medium text-brand-dark">
                    {user?.role || "—"}
                  </p>
                </div>
              </div>

              {/* Edit form */}
              {editing && (
                <div className="pt-2 border-t">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-base font-semibold text-gray-700">
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
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-base font-semibold text-gray-700">
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

                      <MotionButton
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        type="submit"
                        className="w-full h-11 py-5 text-base bg-brand-primary hover:bg-brand-primary-dark focus:ring-2 focus:ring-brand-primary/50 transition-all duration-200"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save changes"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </MotionButton>
                    </form>
                  </Form>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/dashboard"
                  className="text-sm text-brand-primary hover:underline"
                >
                  Back to Dashboard
                </Link>
                <Button
                  variant="ghost"
                  className="gap-2"
                  onClick={async () => {
                    await logout?.();
                    navigate("/login", { replace: true });
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </PageTransition>
    </div>
  );
}

export default UpdateProfilePage;
