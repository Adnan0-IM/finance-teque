import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import {api, getApiErrorMessage} from "@/lib/api";


type User = {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  role: "investor" | "startup" | "admin" | "none";
  phone?: string;
} | null;

interface AuthContextType {
  user: User;
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
  setRole: (role: "investor" | "startup") => Promise<void>;
  deleteMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure axios to include credentials
axios.defaults.withCredentials = true;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await api.get(`/auth/me`);
        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Error checking user login:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post(`/auth/login`, {
        email,
        password,
      });
      const { user } = response.data;
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
      await api.post(`/auth/verify-email`, { email, code });
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
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to update profile");
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Call logout endpoint to clear cookie
      await api.get(`/auth/logout`);
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
