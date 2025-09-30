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
import type { SetStateAction } from "react";

type ToolbarProps = {
  search: string;
  setSearch: (v: string) => void;
  status: optionsType["status"];
  setStatus: (v: optionsType["status"]) => void;
  role?: User["role"];
  setRole?: React.Dispatch<SetStateAction<User["role"]>>;
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
          value={status ?? ""}
          onValueChange={(v) => setStatus((v as optionsType["status"]) || "")}
        >
          <SelectTrigger id="status" className="w-44">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem>All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="role">Sort By</Label>
        <Select
          value={role}
          onValueChange={(v) => setRole?.(v as User["role"])}
        >
          <SelectTrigger id="role" className="w-36">
            <SelectValue placeholder="Filter role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="investor">investor</SelectItem>
            <SelectItem value="startup">startup</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          className="w-72"
          placeholder="Name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default VerificationToolbar;
