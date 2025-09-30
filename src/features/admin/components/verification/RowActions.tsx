import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

type RowActionsProps = {
  status?: "pending" | "approved" | "rejected";
  verifying?: boolean;
  onApprove: () => void;
  onReject: () => void;
  onViewDetails?: () => void;
};

const RowActions = ({
  status = "pending",
  verifying,
  onApprove,
  onReject,
  onViewDetails,
}: RowActionsProps) => {
  const isPending = status === "pending";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open row actions">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={!isPending || !!verifying}
          onClick={onApprove}
        >
          {verifying ? "Approving..." : "Approve"}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!isPending || !!verifying}
          onClick={onReject}
        >
          {verifying ? "Rejecting..." : "Reject"}
        </DropdownMenuItem>
        {onViewDetails && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onViewDetails}>
              View details
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowActions;
