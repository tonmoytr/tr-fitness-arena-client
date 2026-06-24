"use client";

import { motion } from "framer-motion";

export default function HeroAnimation({
  children,
  type = "fade-up",
  delay = 0,
}) {
  const variants = {
    "fade-up": {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    },
    "fade-in": {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 1, delay, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={variants[type].initial}
      animate={variants[type].animate}
      transition={variants[type].transition}
    >
      {children}
    </motion.div>
  );
}
