import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from "../features/auth/contexts/AuthContext";
import RouteToTop from "../components/RouteToTop";
import AppRoutes from "./routes";
import { InvestorProvider } from "@/features/shared/contexts/Investor-startupContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <InvestorProvider>
          <RouteToTop />
          <AppRoutes />
        </InvestorProvider>
      </AuthProvider>
    </Router>
  );
}
