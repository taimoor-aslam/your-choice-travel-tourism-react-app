import { Fragment } from "react";
import { motion } from "motion/react";
import { rise, stagger } from "../lib/motion";
import styles from "./SectionHeading.module.css";

type Props = { children: string; className?: string };

// Words rise one by one. Splitting on spaces keeps Arabic letters joined.
export default function SectionHeading({ children, className = "" }: Props) {
  return (
    <motion.h2
      className={`${styles.heading} ${className}`}
      variants={stagger(0.07)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {children.split(" ").map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className={styles.mask}>
            <motion.span className={styles.word} variants={rise}>
              {word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </motion.h2>
  );
}
