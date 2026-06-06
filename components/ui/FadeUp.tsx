"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
