import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api, getApiErrorMessage } from "@/lib/api";
import { AxiosError } from "axios";
import type { User } from "@/types/users";

const TOKEN_KEY = "accessToken";


interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  resendCode: (email: string) => Promise<void>;
  updateMe: (data: { name?: string; phone?: string }) => Promise<void>;
  setRole: (role: string) => Promise<void>;
  setInvestorType: (type: string) => Promise<void>;
  deleteMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  api.defaults.withCredentials = true;

  // Helper to set auth header + persist token
  const setAccessToken = (token: string | null) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem(TOKEN_KEY);
      delete api.defaults.headers.common.Authorization;
    }
  };

  // Attempt refresh if needed and ensure /auth/me populates user
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const stored = localStorage.getItem(TOKEN_KEY);
        if (stored) {
          api.defaults.headers.common.Authorization = `Bearer ${stored}`;
          try {
            const me = await api.get(`/auth/me`);
            if (me.data?.success) {
              setUser(me.data.data);
              return;
            }
          } catch {
            // fall through to refresh
          }
        }

        // No token or token invalid: try refresh using httpOnly cookie
        try {
          const res = await api.post(`/auth/refresh`);
          const { accessToken, user: refreshedUser } = res.data || {};
          if (accessToken) setAccessToken(accessToken);
          if (refreshedUser) {
            setUser(refreshedUser);
            return;
          }

          // If refresh didn’t include user, fetch /me
          const me = await api.get(`/auth/me`);
          if (me.data?.success) {
            setUser(me.data.data);
            return;
          }
        } catch {
          // refresh failed; clear auth
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Axios interceptor: refresh once on 401 and retry
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (r) => r,
      async (error: AxiosError) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const original = error.config as any;
        if (
          error.response?.status === 401 &&
          !original?._retry &&
          !original?.url?.includes("/auth/login") &&
          !original?.url?.includes("/auth/refresh")
        ) {
          original._retry = true;
          try {
            const res = await api.post(`/auth/refresh`);
            const { accessToken, user: refreshedUser } =
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (res as any).data || {};
            if (accessToken) {
              setAccessToken(accessToken);
              original.headers = original.headers || {};
              original.headers.Authorization = `Bearer ${accessToken}`;
            }
            if (refreshedUser) setUser(refreshedUser);
            return api(original);
          } catch {
            setAccessToken(null);
            setUser(null);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(interceptor);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post(`/auth/login`, { email, password });
      const { user, accessToken } = response.data;

      if (accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      }
      setUser(user);
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => {
    setLoading(true);
    try {
      const response = await api.post(`/auth/register`, {
        name,
        email,
        password,
        phone,
      });
      const { user } = response.data;
      setUser(user);
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    setLoading(true);
    try {
      const res = await api.post(`/auth/verify-email`, { email, code });
      const { accessToken, user: verifiedUser } = res.data || {};
      if (accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      }
      if (verifiedUser) setUser(verifiedUser);
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async (email: string) => {
    try {
      await api.post(`/auth/resend-code`, { email });
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to resend code. Try again.");
    }
  };

  const setRole = async (role: string) => {
    setLoading(true);
    try {
      const response = await api.put(`/auth/setRole`, { role });
      if (response.data?.success && response.data?.data) {
        setUser(response.data.data);
      }
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to set user role");
    } finally {
      setLoading(false);
    }
  };

  const setInvestorType = async (type: string) => {
    if (!user) {
      throw new Error("No user logged in");
    }

    try {
      // Update the user document in Firestore
      await api.put(`/auth/setInvestorType`, { type });

      // Update local user state
      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          investorType: type as "personal" | "corporate" | "none",
        };
      });
    } catch (error) {
      console.error("Error setting investor type:", error);
      throw error;
    }
  };

  const updateMe = async (data: { name?: string; phone?: string }) => {
    setLoading(true);
    try {
      const response = await api.put(`/auth/updateMe`, data);
      if (response.data?.success && response.data?.data) {
        setUser(response.data.data);
      }
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const deleteMe = async () => {
    try {
      const response = await api.delete(`/auth/deleteMe`);
      if (!response.data?.success) {
        const message = response.data?.message || "Failed to delete account";
        throw new Error(message);
      }
      // Clear local auth state after deletion
      localStorage.removeItem(TOKEN_KEY);
      delete api.defaults.headers.common.Authorization;
      setUser(null);
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to delete account");
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.get(`/auth/logout`);
      localStorage.removeItem(TOKEN_KEY);
      delete api.defaults.headers.common.Authorization;
      setUser(null);
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.error("Logout failed:", message, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        verifyEmail,
        resendCode,
        updateMe,
        setRole,
        setInvestorType,
        deleteMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
