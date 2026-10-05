import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { easeInOut, rise, stagger } from "../lib/motion";
import { EMAIL, NAV_IDS, PHONE } from "../lib/site";
import styles from "./MobileMenu.module.css";

type Props = { open: boolean; active: string; onClose: () => void };

export default function MobileMenu({ open, active, onClose }: Props) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    // Everything except the header (menu toggle) and the menu goes inert, so Tab stays in the menu.
    const background = document.querySelectorAll<HTMLElement>("#root > :not(header, #mobile-menu)");
    background.forEach((el) => (el.inert = true));
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      background.forEach((el) => (el.inert = false));
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className={styles.menu}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: easeInOut }}
        >
          <motion.ul
            className={styles.list}
            variants={stagger(0.07, 0.35)}
            initial="hidden"
            animate="visible"
          >
            {NAV_IDS.map((id) => (
              <li key={id} className={styles.mask}>
                <motion.a
                  href={`#${id}`}
                  variants={rise}
                  className={styles.link}
                  aria-current={active === id ? "location" : undefined}
                  onClick={onClose}
                >
                  {t(`nav.${id}`)}
                </motion.a>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className={styles.contact}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.8 } }}
          >
            <a href={PHONE.href} dir="ltr">
              {PHONE.display}
            </a>
            <a href={EMAIL.href}>{EMAIL.display}</a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
