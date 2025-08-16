import { useEffect } from "react";
import { useLocation } from "react-router";

// Scrolls to top on every route change
const RouteToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default RouteToTop;
