import { api, getApiErrorMessage } from "@/lib/api";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import type {
  optionsType,
  paginationType,
  userRolePropType,
  verifyUserPropTypes,
  verificationStatustypes,
} from "@/types/admin";
import type { User } from "@/types/users";

export const adminKeys = {
  users: (options: optionsType) => ["admin", "users", options] as const,
  user: (userId: string) => ["admin", "user", userId] as const,
  verification: (userId: string) => ["admin", "verification", userId] as const,
};

type UsersResult = { users: User[]; pagination: paginationType };

const fetchUsers = async (options: optionsType): Promise<UsersResult> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const { status, q } = options;

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (status) params.set("status", status);
  if (q && q.trim()) params.set("q", q.trim());

  try {
    const res = await api.get(`/admin/users?${params.toString()}`);
    return {
      users: res.data.data as User[],
      pagination: res.data.pagination as paginationType,
    };
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message || "Failed loading users");
  }
};

const fetchUser = async (userId: string): Promise<User> => {
  try {
    const res = await api.get(`/admin/users/${userId}`);
    return res.data.data as User;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message || "Failed loading user");
  }
};

const deleteUserApi = async ({ userId }: { userId: string }) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data.message as string;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message || "Failed deleting user");
  }
};

const setUserRoleApi = async ({
  userId,
  role = "admin",
}: userRolePropType): Promise<User> => {
  try {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data.data as User;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message || "Failed updating user role");
  }
};

const verifyUserApi = async ({ userId, statusObject }: verifyUserPropTypes) => {
  try {
    const response = await api.patch(
      `/admin/users/${userId}/verification-status`,
      statusObject
    );
    return response.data.data;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message || "Failed updating user status");
  }
};

const getVerStatusApi = async (
  userId: string
): Promise<verificationStatustypes> => {
  try {
    const response = await api.get(
      `/admin/users/${userId}/verification-status`
    );
    return response.data.data as verificationStatustypes;
  } catch (error) {
    const message = getApiErrorMessage(error);
    throw new Error(message || "Failed loading user");
  }
};

export const useUsers = (options: optionsType) => {
  return useQuery({
    queryKey: adminKeys.users(options),
    queryFn: () => fetchUsers(options),
    placeholderData: keepPreviousData,
  });
};

export const useUser = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: adminKeys.user(userId),
    queryFn: () => fetchUser(userId),
    enabled: Boolean(userId),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation<string, Error, { userId: string }>({
    mutationFn: deleteUserApi,
    onSuccess: (_msg, { userId }) => {
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      qc.invalidateQueries({ queryKey: adminKeys.user(userId) });
      qc.invalidateQueries({ queryKey: adminKeys.verification(userId) });
    },
  });
};

export const useSetUserRole = () => {
  const qc = useQueryClient();
  return useMutation<User, Error, userRolePropType>({
    mutationFn: setUserRoleApi,
    onSuccess: (updated, { userId }) => {
      // Update the user detail cache
      qc.setQueryData<User>(adminKeys.user(userId), (prev) =>
        prev ? { ...prev, role: updated.role } : updated
      );
      // Refresh lists to reflect changes
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};

export const useVerifyUser = () => {
  const qc = useQueryClient();
  return useMutation<unknown, Error, verifyUserPropTypes>({
    mutationFn: verifyUserApi,
    onSuccess: (_data, { userId }) => {
      qc.invalidateQueries({ queryKey: adminKeys.verification(userId) });
      qc.invalidateQueries({ queryKey: adminKeys.user(userId) });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};

export const useVerStatus = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: adminKeys.verification(userId),
    queryFn: () => getVerStatusApi(userId),
    enabled: Boolean(userId),
  });
};
