import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/users";
// import RowActions from "./RowActions";
import { ArrowRight, Calendar } from "lucide-react";

type TableProps = {
  isFetching: boolean;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  users: User[];
  verifying?: boolean;
  onApprove?: (userId: string) => void;
  onReject?: (userId: string) => void;
  onViewDetails?: (userId: string) => void;
};

const VerificationTable = ({
  isFetching,
  isError,
  isPending,
  error,
  users,
  // verifying,
  // onApprove,
  // onReject,
  onViewDetails,
}: TableProps) => {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <Table>
        <TableCaption>
          {isFetching ? "Loading verifications..." : "User verifications"}
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
          {isPending ? (
            <TableRow>
              <TableCell colSpan={6}>Loading...</TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={6}>
                {error?.message || "Failed to load users"}
              </TableCell>
            </TableRow>
          ) : users.length ? (
            users.map((u: User) => {
              const submittedAt = u.verification?.submittedAt;
              const status: "pending" | "approved" | "rejected" =
                u.verification?.status || "pending";

              return (
                <TableRow
                  className="even:bg-brand-light hover:bg-brand-light/50 m-0 border-t p-0"
                  key={u._id}
                >
                  <TableCell className="border px-4 py-2">
                    {u.verification?.personal
                      ? `${u.verification.personal.firstName} ${u.verification.personal.surname}`
                      : u.name || "-"}
                  </TableCell>
                  <TableCell className="border px-4 py-2">{u.email}</TableCell>
                  <TableCell className="border px-4 py-2">{u.role}</TableCell>
                  <TableCell className="border px-4 py-2 ">
                    <div className="flex gap-1 items-center">
                      {submittedAt && 
                      
                      <Calendar className="h-3 w-3" />
                      }
                      {submittedAt
                        ? new Date(submittedAt).toLocaleString()
                        : "Not submitted"}
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
                    <div className="flex gap-2 justify-center">
                      {/* <RowActions
                        status={status}
                        verifying={verifying}
                        onApprove={() => onApprove(u._id)}
                        onReject={() => onReject(u._id)}
                        onViewDetails={
                          onViewDetails ? () => onViewDetails(u._id) : undefined
                        }
                      /> */}
                      {onViewDetails && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="border"
                          onClick={() => onViewDetails(u._id)}
                        >
                          View
                          <ArrowRight/>

                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No users found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VerificationTable;
