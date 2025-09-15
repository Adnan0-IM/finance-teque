import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import RouteToTop from "./components/RouteToTop";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <RouteToTop />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
