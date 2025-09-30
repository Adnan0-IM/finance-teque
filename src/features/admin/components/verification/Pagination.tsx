import type { paginationType } from "@/types/admin";
import type { SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PaginationProps = {
  limit: number;
  setLimit: React.Dispatch<SetStateAction<number>>;
  pagination: paginationType | undefined;
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  isFetching: boolean;
};

const Pagination = ({
  limit,
  setLimit,
  page,
  setPage,
  pagination,
  isFetching,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm">Rows per page</span>
        <Select
          value={String(limit)}
          onValueChange={(v) => setLimit(Number(v))}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          {pagination ? `Page ${pagination.page} of ${pagination.pages}` : null}
        </div>
        <Button
          variant="outline"
          disabled={page <= 1 || isFetching}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={!pagination || page >= pagination.pages || isFetching}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
