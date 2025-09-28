import { api, getApiErrorMessage } from "@/lib/api";
import type {
  optionsType,
  paginationType,
  userRolePropType,
  verifyUserPropTypes,
} from "@/types/admin";
import type { User } from "@/types/users";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AdminContextType {
  loading: boolean;
  getUsers: (options: optionsType) => Promise<void>;
  getUser: (userId: { userId: string }) => Promise<void>;
  deleteUser: (userId: { userId: string }) => Promise<void>;
  setUserRole: ({ userId, role }: userRolePropType) => Promise<void>;
  verifyUser: ({ userId, statusObject }: verifyUserPropTypes) => Promise<void>;
  getVerStatus: (userId: { userId: string }) => Promise<void>;
  users: User[] | null;
  user: User | null;
  pagination: paginationType;
  userVerStatus: verifyUserPropTypes | null;
}
const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userVerStatus, setUserVerStatus] =
    useState<verifyUserPropTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPergination] = useState({
    page: 0,
    limit: 0,
    total: 0,
    pages: 0,
  });

  // page, default 1
  //  limit, defailt 20
  // status, e.g pending, approved, rejected
  //  q,  search br by name, email or phone, verifirst name, lastname, and nextOfKin full name
  //   const options: optionsType = {
  //     page: 1,
  //     limit: 20,
  //     status: "",
  //     q: "",
  //   };
  const getUsers = async (options: optionsType) => {
  const page =options.page ?? 1; 
  const limit = options.limit ?? 20;
  const {status, q} = options;

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (status && status !== undefined) params.set("status", status)
  if (q && q.trim()) params.set("q", q.trim())
    const url = `/admin/users?${params.toString()}`;
    setLoading(true);
    try {
      const response = await api.get(url);
      setUsers(response.data.data);
      setPergination(response.data.pagination);
      return response.data.data
    } catch (error) {
      console.log(error);
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed loading users");
  } finally {
      setLoading(false)
    }
  };

  const getUser = async ({ userId }: { userId: string }) => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/users/${userId}`);
      console.log(response.data);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed loading user");
 } finally {
      setLoading(false)
    }
  };
  const deleteUser = async ({ userId }: { userId: string }) => {
    setLoading(true);
    try {
      const response = await api.delete(`/admin/users/${userId}`);
      console.log(response.data);
      return response.data.message;
    } catch (error) {
      console.log(error);
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed deleting user");
   } finally {
      setLoading(false)
    }
  };
  const setUserRole = async ({ userId, role = "admin" }: userRolePropType) => {
    setLoading(true);
    try {
      const response = await api.patch(`/admin/users/${userId}/role`, {role : role});
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed deleting user");
    } finally {
      setLoading(false)
    }
  };

  const verifyUser = async ({ userId, statusObject }: verifyUserPropTypes) => {
    setLoading(true);
    try {
      const response = await api.patch(
        `/admin/users/${userId}/verification-status`,
        statusObject
      );
      console.log(response.data);
      if (response.data.success) {
        return response.data.data;
      }
      return "Failed updating user status";
    } catch (error) {
      console.log(error);
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed updating user status");
    } finally {
      setLoading(false)
    }
  };

  const getVerStatus = async ({ userId }: { userId: string }) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/admin/users/${userId}/verification-status`
      );
      console.log(response.data);
      return setUserVerStatus(response.data.data);
    } catch (error) {
      console.log(error);
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed loading user");
    } finally {
      setLoading(false)
    }
  };
  return (
    <AdminContext.Provider
      value={{
        users,
        user,
        loading,
        pagination,
        getUsers,
        getUser,
        deleteUser,
        verifyUser,
        setUserRole,
        getVerStatus,
        userVerStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
