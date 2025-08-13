import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { InvestmentPlansPage } from "./pages/InvestmentPlansPage";
import { ShariahCompliancePage } from "./pages/ShariahCompliancePage";
import { ContactPage } from "./pages/ContactPage";
import { TeamPage } from "./pages/TeamPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/plans" element={<InvestmentPlansPage />} />
        <Route path="/shariah" element={<ShariahCompliancePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

const NotFoundPage = () => {
  return <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-4xl font-bold">404 - Not Found</h1>
  </div>;
};