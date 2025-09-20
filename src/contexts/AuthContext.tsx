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
  role?: "investor" | "startup" | "admin";
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
  verifyEmail: (email: string, code: string) => Promise<void>;
  resendCode: (email: string) => Promise<void>;
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

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // Get stored token
        const token = localStorage.getItem("finance_teque_token");

        if (!token) {
          setLoading(false);
          return;
        }

        // Set auth header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Fetch current user
        const response = await axios.get(`${API_URL}/auth/me`);

        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Failed to restore authentication state:", error);
        localStorage.removeItem("finance_teque_token");
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem("finance_teque_token", token);

      // Set auth header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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

  const logout = async () => {
    setLoading(true);
    try {
      // Call logout endpoint to clear cookie
      await axios.get(`${API_URL}/auth/logout`);

      // Remove token from localStorage
      localStorage.removeItem("finance_teque_token");

      // Remove auth header
      delete axios.defaults.headers.common["Authorization"];

      setUser(null);
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.error("Logout failed:", message, error);
    } finally {
      setLoading(false);
    }
  };
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
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        submitVerification,
        verifyEmail,
        resendCode,
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
