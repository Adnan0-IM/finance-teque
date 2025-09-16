import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function CardMotion({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.0, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
    >
      {children}
    </motion.div>
  );
}

