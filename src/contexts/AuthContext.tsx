import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import { API_URL } from "@/utils/constants";

type User = {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  role?: "investor" | "startup" | "admin" | "none";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitVerification: (verificationData: any) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verificationStatus: () => Promise<any>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  resendCode: (email: string) => Promise<void>;
  updateMe: (data: { name?: string; phone?: string }) => Promise<void>;
  setRole: (role: "investor" | "startup") => Promise<void>;
  deleteMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure axios to include credentials
axios.defaults.withCredentials = true;

// Extract a useful error message from Axios/server responses
const getApiErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | {
          message?: string;
          error?: string;
          success?: boolean;
          errors?: string[];
        }
      | undefined;
    if (data?.message) return data.message;
    if (data?.error) return data.error;
    if (Array.isArray(data?.errors) && data.errors.length)
      return data.errors[0];
    if (err.message) return err.message;
  }
  if (err instanceof Error) return err.message;
  return "An unexpected error occurred";
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Add axios interceptor to handle expired tokens
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!error.config) {
          return Promise.reject(error);
        }

        const originalRequest = error.config;

        // Check if this is a request that should skip the retry logic
        if (originalRequest.headers?.["X-Skip-Auth-Retry"] === "true") {
          return Promise.reject(error);
        }
        // If unauthorized, clear session and redirect to login
        if (error.response?.status === 401) {
          try {
            await logout();
          } finally {
            window.location.href = "/login?expired=true";
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // Fetch current user using cookie-based auth
        const response = await axios.get(`${API_URL}/auth/me`);

        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Failed to restore authentication state:", error);
        // ensure logged-out state
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Modify your existing login function to handle the shorter expiration
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { user } = response.data;

      setUser(user);
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.error("Login failed:", error);
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
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        phone,
      });

      const { user } = response.data;

      setUser(user);
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.error("Registration failed:", error);
      throw new Error(message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/auth/verify-email`, { email, code });
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async (email: string) => {
    try {
      await axios.post(`${API_URL}/auth/resend-code`, { email });
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to resend code. Try again.");
    }
  };
  const setRole = async (role: string) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/auth/setRole`, { role });
      if (response.data?.success && response.data?.data) {
        setUser(response.data.data);
      }
      console.log(response);
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.log(message);
      throw new Error(message || "Failed to set user role");
    } finally {
      setLoading(false);
    }
  };

  const updateMe = async (data: { name?: string; phone?: string }) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/auth/updateMe`, data);
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
      const response = await axios.delete(`${API_URL}/auth/deleteMe`);
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
      await axios.get(`${API_URL}/auth/logout`);

      setUser(null);
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.error("Logout failed:", message, error);
    } finally {
      setLoading(false);
    }
  };

  // Keep-alive ping to maintain sliding session while the app is open
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      axios
        .get(`${API_URL}/auth/me`, { headers: { "X-Skip-Auth-Retry": "true" } })
        .catch(() => {
          // Ignore errors; interceptor will handle 401
        });
    }, 10 * 60 * 1000); // every 10 minutes

    return () => clearInterval(interval);
  }, [user]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitVerification = async (verificationData: any) => {
    const {
      identificationDocument,
      passportPhoto,
      utilityBill,
      ...textFields
    } = verificationData;

    const submitTextfields = async (textFields: Record<string, unknown>) => {
      // Send only text fields here (JSON)
      const response = await axios.post(`${API_URL}/verification`, textFields);
      return response.data;
    };
    const submitDocs = async (
      identificationDocument: File,
      passportPhoto: File,
      utilityBill: File
    ) => {
      // 2. Submit files
      const formData = new FormData();
      formData.append("identificationDocument", identificationDocument);
      formData.append("passportPhoto", passportPhoto);
      formData.append("utilityBill", utilityBill);

      // Use axios directly for file upload
      const response = await axios.post(
        `${API_URL}/verification/documents`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    };
    try {
      await submitTextfields(textFields);
      await submitDocs(
        identificationDocument as File,
        passportPhoto as File,
        utilityBill as File
      );
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to submit verification data");
    }
  };

  const verificationStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/verification/status`);
      return response.data;
    } catch (error) {
      const message = getApiErrorMessage(error);
      throw new Error(message || "Failed to fetch verification status");
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
        submitVerification,
        verificationStatus,
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
