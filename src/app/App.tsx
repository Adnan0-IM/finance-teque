import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from "../features/auth/contexts/AuthContext";
import RouteToTop from "../components/RouteToTop";
import AppRoutes from "./routes";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <RouteToTop />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
