import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useTranslation } from "react-i18next";
import { FiArrowUp } from "react-icons/fi";
import { ease } from "../lib/motion";
import useSmoothScroll from "../lib/useSmoothScroll";
import styles from "./ScrollTopButton.module.css";

// Back-to-top button whose ring fills with page scroll progress.
export default function ScrollTopButton() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const progress = useSmoothScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 600));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className={styles.button}
          aria-label={t("footer.backToTop")}
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.6, ease }}
        >
          <svg className={styles.ring} viewBox="0 0 48 48" aria-hidden>
            <circle cx="24" cy="24" r="21" className={styles.track} />
            <motion.circle
              cx="24"
              cy="24"
              r="21"
              className={styles.progress}
              style={{ pathLength: progress }}
            />
          </svg>
          <FiArrowUp aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
