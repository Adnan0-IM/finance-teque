import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from "../features/auth/contexts/AuthContext";
import RouteToTop from "../components/RouteToTop";
import AppRoutes from "./routes";
import { InvestorProvider } from "@/features/investors/contexts/InvestorContext";
import { AdminProvider } from "@/features/admin/contexts/AdminContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminProvider>
          <InvestorProvider>
            <RouteToTop />
            <AppRoutes />
          </InvestorProvider>
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
}
