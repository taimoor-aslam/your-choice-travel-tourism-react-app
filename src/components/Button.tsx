import { motion, type HTMLMotionProps } from "motion/react";
import { ease } from "../lib/motion";
import styles from "./Button.module.css";

type Props = Omit<HTMLMotionProps<"a">, "ref"> & { variant?: "solid" | "light" | "ink" };

// Every CTA on this site navigates (anchor, tel:, mailto:), so Button is a link.
export default function Button({ variant = "solid", className = "", ...props }: Props) {
  return (
    <motion.a
      className={`${styles.button} ${styles[variant]} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.45, ease }}
      {...props}
    />
  );
}
