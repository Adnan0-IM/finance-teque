import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { optionsType } from "@/types/admin";
import type { User } from "@/types/users";
import { Search } from "lucide-react";
import type { SetStateAction } from "react";

// Define a type that includes "all" for role filtering
type RoleFilter = User["role"] | "all";

type ToolbarProps = {
  search: string;
  setSearch: (v: string) => void;
  status: optionsType["status"];
  setStatus: (v: optionsType["status"]) => void;
  role?: RoleFilter;
  setRole?: React.Dispatch<SetStateAction<RoleFilter>>;
};

const VerificationToolbar = ({
  search,
  setSearch,
  status,
  setStatus,
  role,
  setRole,
}: ToolbarProps) => {
  return (
    <div className="mt-4 flex flex-wrap items-end gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="status">Status</Label>
        <Select
          value={status || "all"}
          onValueChange={(v) => {
            // If "all" is selected, pass undefined to setStatus
            const value =
              v === "all" ? undefined : (v as optionsType["status"]);
            setStatus(value);
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
        <Label htmlFor="role">Filter By</Label>
        <Select
          value={role || "all"}
          onValueChange={(v) => {
            if (v === "all") {
              // Signal to parent component that we want to see all roles
              setRole?.("all" as RoleFilter);
            } else if (v === "investor" || v === "startup") {
              setRole?.(v as User["role"]);
            }
          }}
        >
          <SelectTrigger id="role" className="w-36">
            <SelectValue placeholder="Filter role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="investor">Investor</SelectItem>
            <SelectItem value="startup">Startup</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />

          <Input
            id="search"
            className="pl-10 w-72 "
            placeholder="Name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default VerificationToolbar;
