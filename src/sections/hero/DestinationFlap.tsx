import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ease } from "../../lib/motion";
import { TOURS } from "../tours/data";
import styles from "./Hero.module.css";

// Departure-board slot: fixed to the longest name, destinations drift through it.
export default function DestinationFlap() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % TOURS.length), 3400);
    return () => clearInterval(timer);
  }, [reduce]);

  const { id } = TOURS[index];

  return (
    <motion.span
      className={styles.tile}
      variants={{
        hidden: { clipPath: "inset(100% 0 0 0)" },
        visible: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.2, ease } },
      }}
    >
      {/* invisible names size the slot so it never jumps */}
      {TOURS.map((tour) => (
        <span key={tour.id} className={styles.tileGhost}>
          {t(`tours.items.${tour.id}.name`)}
        </span>
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={id}
          className={styles.tileWord}
          initial={{ y: "45%", opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-45%", opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1, ease }}
        >
          {t(`tours.items.${id}.name`)}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
