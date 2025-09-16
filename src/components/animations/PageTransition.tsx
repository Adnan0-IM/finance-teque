import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

type Variant = "fade" | "slide" | "zoom" | "blur" | "wipe";
type Direction = "up" | "down" | "left" | "right";

type Props = PropsWithChildren<{
  className?: string;
  variant?: Variant;
  direction?: Direction; // for slide/wipe
  duration?: number;
}>;

const easing = [0.22, 1, 0.36, 1] as const;

export default function PageTransition({
  children,
  className,
  variant = "fade",
  direction = "up",
  duration = 0.35,
}: Props) {
  const reduce = useReducedMotion();

  const dir = {
    up: { enter: { y: 12 }, exit: { y: -12 } },
    down: { enter: { y: -12 }, exit: { y: 12 } },
    left: { enter: { x: 24 }, exit: { x: -24 } },
    right: { enter: { x: -24 }, exit: { x: 24 } },
  }[direction];

  const variants = (() => {
    if (reduce) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      };
    }

    switch (variant) {
      case "slide":
        return {
          initial: { opacity: 0, ...dir.enter },
          animate: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, ...dir.exit },
        };
      case "zoom":
        return {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.98 },
        };
      case "blur":
        return {
          initial: { opacity: 0, filter: "blur(8px)" },
          animate: { opacity: 1, filter: "blur(0px)" },
          exit: { opacity: 0, filter: "blur(8px)" },
        };
      case "wipe": {
        // clipPath wipe from one side
        const sides = {
          left: ["inset(0 0 0 100%)", "inset(0 0 0 0)", "inset(0 100% 0 0)"],
          right: ["inset(0 100% 0 0)", "inset(0 0 0 0)", "inset(0 0 0 100%)"],
          up: ["inset(100% 0 0 0)", "inset(0 0 0 0)", "inset(0 0 100% 0)"],
          down: ["inset(0 0 100% 0)", "inset(0 0 0 0)", "inset(100% 0 0 0)"],
        }[direction];
        return {
          initial: { clipPath: sides[0] },
          animate: { clipPath: sides[1] },
          exit: { clipPath: sides[2] },
        };
      }
      case "fade":
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  })();

  const transition = { duration, ease: easing };

  return (
    <div
      className={`min-h-screen bg-background ${className ?? ""} ${
        variant === "wipe" ? "overflow-hidden" : ""
      }`}
    >
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.div>
    </div>
  );
}
