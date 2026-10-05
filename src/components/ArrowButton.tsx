import { motion } from "motion/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import styles from "./ArrowButton.module.css";

type Props = { direction: "previous" | "next"; label: string; onClick: () => void };

// Round previous/next button; the arrow mirrors itself in RTL.
export default function ArrowButton({ direction, label, onClick }: Props) {
  const Icon = direction === "next" ? FiArrowRight : FiArrowLeft;
  return (
    <motion.button
      type="button"
      className={styles.arrow}
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
    >
      <Icon aria-hidden />
    </motion.button>
  );
}
