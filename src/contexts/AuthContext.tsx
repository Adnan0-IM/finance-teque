import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "production" ? "/api" : "http://localhost:5000/api";

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
      console.error("Login failed:", error);
      throw new Error("Invalid email or password");
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

      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem("finance_teque_token", token);

      // Set auth header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
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
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitVerification = async (verificationData: any) => {
    try {
      const response = await axios.post(
        `${API_URL}/verification`,
        verificationData
      );

      return response.data;
    } catch (error) {
      console.error("Verification submission failed:", error);
      throw new Error("Failed to submit verification data");
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
