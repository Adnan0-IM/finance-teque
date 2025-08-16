import  {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type User = {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
} | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // In a real app, this would verify the user's session with your backend
        const savedUser = localStorage.getItem("finance_teque_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Failed to restore authentication state:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would call your authentication API
      // For demo purposes, we'll simulate a successful login
      const mockUser = {
        id: "123456",
        email,
        name: email.split("@")[0],
        isVerified: false,
        password: password.length
      };

      // Save to localStorage (in a real app, you'd use secure cookies or tokens)
      localStorage.setItem("finance_teque_user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Login faile:", error);
      throw new Error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // In a real app, this would call your registration API
      // For demo purposes, we'll simulate a successful registration
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
        isVerified: false,
        password: password.length
      };

      // Save to localStorage (in a real app, you'd use secure cookies or tokens)
      localStorage.setItem("finance_teque_user", JSON.stringify(mockUser));
      setUser(mockUser);
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
      // In a real app, this would call your logout API
      localStorage.removeItem("finance_teque_user");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
