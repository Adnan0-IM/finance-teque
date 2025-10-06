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
// import { useAdmin } from "../contexts/AdminContext";
import {useEffect, useState } from "react";
import type { optionsType } from "@/types/admin";
import type { User } from "@/types/users";
import { useUsers } from "../api/adminQueries";
import { Ellipsis } from "lucide-react";

const Users = () => {
  // const { getUsers, users } = useAdmin();
  const [options, setoptions] = useState<optionsType>({
    page: 1,
    limit: 20,
  });

  const { data, isPending, isError, error, isFetching } = useUsers(options);
  const users = data?.users;

  // page, default 1
  //  limit, defailt 20
  // status, e.g pending, approved, rejected
  //  q,  search br by name, email or phone, verifirst name, lastname, and nextOfKin full name

useEffect(() => {
  setoptions({page:1, limit:20})
},[])

  return (
    <DashboardNavigation>
      <h2>Manage Users</h2>
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
                    {u.role === "investor" && u.investorType} {u.role === "investor" && u.investorType && "-"} {u.role}
                  </TableCell>
                  <TableCell className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {u.verification?.status || "pending"}
                  </TableCell>
                  <TableCell className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {new Date(u.createdAt ?? "").toLocaleDateString()}
                  </TableCell>
                  <TableCell className="border px-4 py-2 text-left flex items-center justify-center [&[align=center]]:text-center [&[align=right]]:text-right">
                   <button className="cursor-pointer"><Ellipsis/></button>
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
      </div>
    </DashboardNavigation>
  );
};

export default Users;
