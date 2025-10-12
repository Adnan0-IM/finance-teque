import DashboardNavigation from "@/components/layout/DashboardLayout";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { optionsType } from "@/types/admin";
import { useUsers, useVerifyUser } from "../api/adminQueries";
import VerificationToolbar from "../components/verification/Toolbar";
import VerificationTable from "../components/verification/Table";
import Pagination from "../components/verification/Pagination";
import RejectDialog from "../components/verification/RejectDialog";
import { useLocation, useNavigate } from "react-router";
import type { User } from "@/types/users";

const Verification = () => {
  // Filters and pagination
  const [status, setStatus] = useState<optionsType["status"]>("pending");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [q, setQ] = useState<string | undefined>(undefined);
  // Define a new type that includes "all" as a valid option
  type RoleFilter = User["role"] | "all";
  const [role, setRole] = useState<RoleFilter>("investor");

  // Rejection dialog state
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectUserId, setRejectUserId] = useState<string | null>(null);

  const navigate = useNavigate();

  const location = useLocation();
  const value = location.search.replace("?", "").replace("role=", "");
  useEffect(() => {
    if (
      value &&
      (value === "investor" || value === "startup" || value === "all")
    ) {
      setRole(value as RoleFilter);
    }
  }, [value]);
  // Debounce search -> q
  useEffect(() => {
    const id = setTimeout(() => {
      const val = search.trim();
      setQ(val.length ? val : undefined);
      setPage(1);
    }, 400);
    return () => clearTimeout(id);
  }, [search]);

  // Build query options
  const options = useMemo(() => {
    // Create the base options object
    const opts: {
      page: number;
      limit: number;
      q?: string;
      status?: optionsType["status"];
    } = {
      page,
      limit,
    };

    // Only add status to query if it's defined
    if (status) {
      opts.status = status;
    }

    // Add search query if defined
    if (q) {
      opts.q = q;
    }

    return opts;
  }, [page, limit, status, q]);

  // Data + actions
  const { data, isPending, isFetching, isError, error } = useUsers(options);
  const { mutate: verifyUser, isPending: verifying } = useVerifyUser();

  const users = data?.users ?? [];
  const pagination = data?.pagination;

  // First filter out admin users
  const filteredUsersWithoutAdmin = users.filter(
    (user) => user.role !== "admin"
  );

  // Then filter by role - handle "all" as a special case
  const filteredUsersByRole =
    role === "all"
      ? filteredUsersWithoutAdmin.filter(
          (user) => user.role === "investor" || user.role === "startup"
        )
      : filteredUsersWithoutAdmin.filter((user) => user.role === role);

  // Finally, filter by verification submission
  const filteredSubmittedVerificationUsers = filteredUsersByRole.filter(
    (user) => user.verification?.submittedAt
  );
  // Handlers
  const onApprove = useCallback(
    (userId: string) => {
      verifyUser({ userId, statusObject: { status: "approved" } });
    },
    [verifyUser]
  );

  const onReject = useCallback((userId: string) => {
    setRejectUserId(userId);
    setRejectOpen(true);
  }, []);

  const onConfirmReject = useCallback(
    (reason: string) => {
      if (!rejectUserId) return;
      verifyUser({
        userId: rejectUserId,
        statusObject: { status: "rejected", rejectionReason: reason },
      });
      setRejectOpen(false);
      setRejectUserId(null);
    },
    [rejectUserId, verifyUser]
  );

  const onViewDetails = useCallback(
    (userId: string) => navigate(`/admin/verification/${userId}`),
    [navigate]
  );

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [status, limit]);

  return (
    <DashboardNavigation>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Verification</h2>
      </div>

      {/* Toolbar */}
      <VerificationToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        role={role}
        setRole={setRole}
      />

      {/* Table */}
      <VerificationTable
        users={filteredSubmittedVerificationUsers}
        error={error as Error | null}
        isError={isError}
        isFetching={isFetching}
        isPending={isPending}
        verifying={verifying}
        onApprove={onApprove}
        onReject={onReject}
        onViewDetails={onViewDetails}
      />

      {/* Pagination */}
      <Pagination
        isFetching={isFetching}
        limit={limit}
        page={page}
        pagination={pagination}
        setLimit={setLimit}
        setPage={setPage}
      />

      {/* Reject dialog */}
      <RejectDialog
        open={rejectOpen}
        onOpenChange={(o) => {
          setRejectOpen(o);
          if (!o) setRejectUserId(null);
        }}
        onConfirm={onConfirmReject}
        loading={verifying}
      />
    </DashboardNavigation>
  );
};

export default Verification;
