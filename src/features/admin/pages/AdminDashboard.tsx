import DashboardNavigation from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  UserCheck,
  Building2,
  Search,
  ChevronRight,
  Calendar,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useUsers } from "../api/adminQueries";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import type { User } from "@/types/users";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Fetch all users for dashboard stats
  const { data, isPending, isError } = useUsers({
    page: 1,
    limit: 100, // Get more users for better stats
  });

  // Memoize users array to prevent unnecessary recalculations
  const users = useMemo(() => data?.users || [], [data?.users]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const adminUsers = users.filter((u) => u.role === "admin").length;
    const startupUsers = users.filter((u) => u.role === "startup").length;
    const investorUsers = users.filter((u) => u.role === "investor").length;
    const verifiedUsers = users.filter((u) => u.isVerified).length;
    const pendingVerification = users.filter(
      (u) => u.verification?.status === "pending"
    ).length;

    return {
      totalUsers,
      adminUsers,
      startupUsers,
      investorUsers,
      verifiedUsers,
      pendingVerification,
    };
  }, [users]);

  // Recent users (last 5)
  const recentUsers = useMemo(() => {
    return users
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      )
      .slice(0, 5);
  }, [users]);

  // Filtered recent users based on search
  const filteredRecentUsers = useMemo(() => {
    if (!search.trim()) return recentUsers;

    const searchLower = search.toLowerCase();
    return recentUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone?.toLowerCase().includes(searchLower)
    );
  }, [recentUsers, search]);

  if (isPending) {
    return (
      <DashboardNavigation>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-12 w-12 mb-4" />
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Users */}
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardNavigation>
    );
  }

  return (
    <DashboardNavigation>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-brand-dark">
                Finance Teque
              </h1>
            </div>
            <p className="text-muted-foreground mt-1">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-64 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users */}
          <Card className="bg-brand-primary shadow-sm hover:shadow-md text-white overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Total Users</h3>
                  <p className="text-white/80 text-sm">All registered users</p>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">{stats.totalUsers}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 w-full py-4 justify-between"
                onClick={() => navigate("/admin/users")}
              >
                View All Users
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Investors Users */}
          <Card className="shadow-sm hover:shadow-md transition-shadow border-brand-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark">Investors</h3>
                  <p className="text-muted-foreground text-sm">
                    Capital Providers
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-brand-dark">
                  {stats.investorUsers}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-brand-secondary hover:bg-brand-secondary/10 py-4 w-full justify-between"
                onClick={() => navigate("/admin/verification?role=investor")}
              >
                View all investors
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Startup Users */}
          <Card className="hover:shadow-md transition-shadow border-brand-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-brand-accent/10 rounded-xl flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-brand-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark">Startups</h3>
                  <p className="text-muted-foreground text-sm">
                    Seeking Investment
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-brand-dark">
                  {stats.startupUsers}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-brand-accent hover:bg-brand-accent/10 w-full py-4  justify-between"
                onClick={() => navigate("/admin/verification?role=startup")}
              >
                View all startups
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users Table */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-brand-dark">
                  Recent Users
                </h2>
                <p className="text-muted-foreground text-sm">
                  {recentUsers.length} recent users
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-brand-primary hover:text-brand-primary-dark hover:bg-brand-primary/10"
                onClick={() => navigate("/admin/users")}
              >
                See More <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {isError ? (
              <div className="text-center py-8 text-muted-foreground">
                Failed to load users
              </div>
            ) : (
              <div className="my-6 w-full overflow-y-auto">
                <Table>
                  <TableCaption>
                    {isPending
                      ? "Loading users..."
                      : "A list of Finance Teque Users."}
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="even:bg-muted m-0 border-t p-0">
                      <TableHead className="border px-4 py-2 text-left font-bold">
                        FULL NAME
                      </TableHead>
                      <TableHead className="border px-4 py-2 text-left font-bold">
                        EMAIL ADDRESS
                      </TableHead>
                      <TableHead className="border px-4 py-2 text-left font-bold">
                        ROLE
                      </TableHead>
                      <TableHead className="border px-4 py-2 text-left font-bold">
                        SUBMITTED
                      </TableHead>
                      <TableHead className="border px-4 py-2 text-left font-bold">
                        STATUS
                      </TableHead>
                      <TableHead className="border px-4 py-2 text-left font-bold">
                        ACTIONS
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecentUsers.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-muted-foreground"
                        >
                          {search
                            ? "No users found matching your search"
                            : "No users found"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRecentUsers.map((user: User) => {
                        const submittedAt = user.verification?.submittedAt;
                        const status: "pending" | "approved" | "rejected" =
                          user.verification?.status || "pending";

                        return (
                          <TableRow
                            key={user._id}
                            className="even:bg-brand-light hover:bg-brand-light/50 m-0 border-t p-0"
                          >
                            <TableCell className="border px-4 py-2">
                              {user.verification?.personal
                                ? `${user.verification.personal.firstName} ${user.verification.personal.surname}`
                                : user.name || "-"}
                            </TableCell>
                            <TableCell className="border px-4 py-2">
                              {user.email}
                            </TableCell>
                            <TableCell className="border px-4 py-2">
                              {user.role}
                            </TableCell>
                            <TableCell className="border px-4 py-2">
                              <div className="flex items-center gap-1">
                                {submittedAt && (
                                  <Calendar className="h-3 w-3" />
                                )}
                                <span className="text-sm">
                                  {submittedAt
                                    ? new Date(submittedAt).toLocaleString()
                                    : "Not submitted"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="border px-4 py-2">
                              <Badge
                                variant={
                                  status === "approved"
                                    ? "default"
                                    : status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {status}
                              </Badge>
                            </TableCell>
                            <TableCell className="border px-4 py-2">
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="border"
                                  onClick={() =>
                                    navigate(`/admin/verification/${user._id}`)
                                  }
                                >
                                  View
                                  <ArrowRight />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-brand-primary/30 hover:shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-brand-primary">
                {stats.verifiedUsers}
              </div>
              <div className="text-sm text-muted-foreground">
                Verified Users
              </div>
            </CardContent>
          </Card>
          <Card className="border-brand-secondary/30 hover:shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-brand-secondary">
                {stats.pendingVerification}
              </div>
              <div className="text-sm text-muted-foreground">
                Pending Verification
              </div>
            </CardContent>
          </Card>
          <Card className="border-brand-accent/30 hover:shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-brand-accent">
                {stats.startupUsers}
              </div>
              <div className="text-sm text-muted-foreground">Startup Users</div>
            </CardContent>
          </Card>
          <Card className="border-brand-primary/30 hover:shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-4 w-4 text-brand-primary" />
                <div className="text-2xl font-bold text-brand-primary">
                  {Math.round((stats.verifiedUsers / stats.totalUsers) * 100) ||
                    0}
                  %
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Verification Rate
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardNavigation>
  );
};

export default AdminDashboard;
