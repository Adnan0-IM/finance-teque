import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function MobileMenuMotion({ children }: PropsWithChildren) {
  return (
    <motion.nav
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      style={{ position: "fixed", top: 0, right: 0, width: "95vw", height: "100vh", zIndex: 50 }}
    >
      {children}
    </motion.nav>
  );
}