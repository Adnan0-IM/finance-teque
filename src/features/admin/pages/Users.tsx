import DashboardNavigation from "@/components/layout/DashboardLayout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import type { optionsType } from "@/types/admin";
import type { User } from "@/types/users";
import {
  useUsers,
  useSetUserRole,
  useVerifyUser,
  useDeleteUser,
} from "../api/adminQueries";
import {
  Ellipsis,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Search,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Users = () => {
  // State for options and user management
  const [options, setoptions] = useState<optionsType>({
    page: 1,
    limit: 20,
  });

  // State for modals
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // API hooks
  const { data, isPending, isError, error, isFetching } = useUsers(options);
  const setUserRole = useSetUserRole();
  const verifyUser = useVerifyUser();
  const deleteUser = useDeleteUser();

  const users = data?.users;
  const pagination = data?.pagination;

  // Handlers for user actions
  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setViewDetailsOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditUserOpen(true);
  };

  const handleApproveUser = () => {
    if (selectedUser) {
      verifyUser.mutate({
        userId: selectedUser._id,
        statusObject: { status: "approved" },
      });
      setApproveDialogOpen(false);
    }
  };

  const handleRejectUser = () => {
    if (selectedUser) {
      verifyUser.mutate({
        userId: selectedUser._id,
        statusObject: {
          status: "rejected",
          rejectionReason: rejectionReason,
        },
      });
      setRejectDialogOpen(false);
      setRejectionReason("");
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      deleteUser.mutate({ userId: selectedUser._id });
      setDeleteDialogOpen(false);
    }
  };

  useEffect(() => {
    setoptions({ page: 1, limit: 20 });
  }, []);

  return (
    <DashboardNavigation>
      <h2>Manage Users</h2>
      <div className="mt-4 flex flex-wrap items-end gap-4 mb-4">
        <div className="grid gap-1.5">
          <Label htmlFor="status">Status</Label>
          <Select
            value={options.status || "all"}
            onValueChange={(v) => {
              const value =
                v === "all"
                  ? undefined
                  : (v as "pending" | "approved" | "rejected");
              setoptions({ ...options, status: value, page: 1 });
            }}
          >
            <SelectTrigger id="status" className="w-44">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              className="pl-10 w-72"
              placeholder="Name, email, phone..."
              value={options.q || ""}
              onChange={(e) => {
                setoptions({ ...options, q: e.target.value, page: 1 });
              }}
            />
          </div>
        </div>
      </div>

      <div className="my-6 w-full overflow-y-auto">
        <Table>
          <TableCaption>
            {isFetching ? "Loading users..." : "A list of Finance Teque Users."}
          </TableCaption>
          <TableHeader>
            <TableRow className="even:bg-muted m-0 border-t p-0">
              <TableHead className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                FULL NAME
              </TableHead>
              <TableHead className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                EMAIL ADDRESS
              </TableHead>
              <TableHead className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                ROLE/TYPE
              </TableHead>
              <TableHead className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                STATUS
              </TableHead>
              <TableHead className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                JOINED
              </TableHead>
              <TableHead className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                ACTIONS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5}>
                  {(error as Error)?.message || "Failed to load users"}
                </TableCell>
              </TableRow>
            ) : users?.length ? (
              users.map((u: User) => (
                <TableRow
                  className="even:bg-brand-light hover:bg-brand-light/50 m-0 border-t p-0"
                  key={u._id}
                >
                  <TableCell className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {u.name || u.email}
                  </TableCell>
                  <TableCell className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {u.email}
                  </TableCell>
                  <TableCell className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {u.role === "investor" && u.investorType}{" "}
                    {u.role === "investor" && u.investorType && "-"} {u.role}
                  </TableCell>
                  <TableCell className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    <Badge
                      variant={
                        u.verification?.status === "approved"
                          ? "default"
                          : u.verification?.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {u.verification?.status || "pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {new Date(u.createdAt ?? "").toLocaleDateString()}
                  </TableCell>
                  <TableCell className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <Ellipsis className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(u)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditUser(u)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {u.verification?.status !== "approved" && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(u);
                                setApproveDialogOpen(true);
                              }}
                            >
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {u.verification?.status !== "rejected" && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(u);
                                setRejectDialogOpen(true);
                              }}
                            >
                              <XCircle className="mr-2 h-4 w-4 text-red-500" />
                              Reject
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-50 focus:bg-red-600"
                            onClick={() => {
                              setSelectedUser(u);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No users found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {users?.length || 0} of {pagination.total} users
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() =>
                  setoptions({ ...options, page: options.page - 1 })
                }
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: Math.min(5, pagination.pages) },
                  (_, i) => {
                    // Logic to show pages around current page
                    let pageNum;
                    const middlePage = Math.min(3, Math.floor(5 / 2) + 1);

                    if (pagination.pages <= 5) {
                      // If total pages are 5 or fewer, show all pages
                      pageNum = i + 1;
                    } else if (pagination.page <= middlePage) {
                      // If current page is near the start
                      pageNum = i + 1;
                    } else if (
                      pagination.page >=
                      pagination.pages - middlePage + 1
                    ) {
                      // If current page is near the end
                      pageNum = pagination.pages - 5 + i + 1;
                    } else {
                      // Current page is in the middle
                      pageNum = pagination.page - middlePage + i + 1;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          pageNum === pagination.page ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setoptions({ ...options, page: pageNum })
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.pages}
                onClick={() =>
                  setoptions({ ...options, page: options.page + 1 })
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* User Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information for{" "}
              {selectedUser?.name || selectedUser?.email}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {selectedUser && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-bold">Full Name:</div>
                  <div className="col-span-2">
                    {selectedUser.name || "Not provided"}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-bold">Email:</div>
                  <div className="col-span-2">{selectedUser.email}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-bold">Phone:</div>
                  <div className="col-span-2">
                    {selectedUser.phone || "Not provided"}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-bold">Role/Type:</div>
                  <div className="col-span-2">
                    {selectedUser.role === "investor" &&
                      selectedUser.investorType &&
                      `${selectedUser.investorType} - `}
                    {selectedUser.role}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-bold">Verification Status:</div>
                  <div className="col-span-2">
                    <Badge
                      variant={
                        selectedUser.verification?.status === "approved"
                          ? "default"
                          : selectedUser.verification?.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {selectedUser.verification?.status || "pending"}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-bold">Joined:</div>
                  <div className="col-span-2">
                    {selectedUser.createdAt
                      ? new Date(selectedUser.createdAt).toLocaleString()
                      : "Unknown"}
                  </div>
                </div>

                {/* Show verification details if available */}
                {selectedUser.verification &&
                  selectedUser.investorType === "personal" &&
                  selectedUser.verification.personal && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-semibold mb-2">
                        Personal Information
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-bold">First Name:</div>
                        <div className="col-span-2">
                          {selectedUser.verification.personal.firstName}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-bold">Surname:</div>
                        <div className="col-span-2">
                          {selectedUser.verification.personal.surname}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-bold">Age Bracket:</div>
                        <div className="col-span-2">
                          {selectedUser.verification.personal.ageBracket}
                        </div>
                      </div>
                    </div>
                  )}

                {selectedUser.verification &&
                  selectedUser.investorType === "corporate" &&
                  selectedUser.verification.corporate && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-semibold mb-2">
                        Company Information
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-bold">Company Name:</div>
                        <div className="col-span-2">
                          {selectedUser.verification.corporate.company.name}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="font-bold">Industry:</div>
                        <div className="col-span-2">
                          {selectedUser.verification.corporate.company.industry}
                        </div>
                      </div>
                    </div>
                  )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information for{" "}
              {selectedUser?.name || selectedUser?.email}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {selectedUser && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Role</label>
                  <select
                    className="w-full rounded-md border border-gray-300 p-2"
                    defaultValue={selectedUser.role}
                    onChange={(e) => {
                      if (selectedUser) {
                        setUserRole.mutate({
                          userId: selectedUser._id,
                          role: e.target.value as
                            | "admin"
                            | "investor"
                            | "startup",
                        });
                      }
                    }}
                  >
                    <option value="investor">Investor</option>
                    <option value="startup">Startup</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Approve User Dialog */}
      <AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve{" "}
              {selectedUser?.name || selectedUser?.email}? This will allow them
              full access to the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApproveUser}
              className="bg-primary hover:bg-primary/90"
            >
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject User Dialog */}
      <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject User</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting{" "}
              {selectedUser?.name || selectedUser?.email}.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <Label htmlFor="rejection-reason" className="mb-2 block">
              Rejection Reason
            </Label>
            <textarea
              id="rejection-reason"
              className="w-full h-24 rounded-md border px-3 py-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
              placeholder="Provide a reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectUser}
              className="bg-destructive hover:bg-destructive/90"
              disabled={!rejectionReason.trim()}
            >
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete User Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              {selectedUser?.name || selectedUser?.email}? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardNavigation>
  );
};

export default Users;
