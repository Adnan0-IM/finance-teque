import { motion } from "framer-motion";
import * as React from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number; 
  once?: boolean; 
  mode?: "inView" | "mount"; 
};

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
  amount = 0.3,
  once = true,
  mode = "inView",
}: Props) {
  if (mode === "mount") {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
