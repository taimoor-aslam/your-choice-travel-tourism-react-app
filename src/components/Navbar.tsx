import { useCallback, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTranslation } from "react-i18next";
import { FiPhone } from "react-icons/fi";
import logo from "../assets/logo.png";
import { ease, glide } from "../lib/motion";
import { NAV_IDS, PHONE } from "../lib/site";
import useActiveSection from "../lib/useActiveSection";
import Button from "./Button";
import LanguageSwitch from "./LanguageSwitch";
import MobileMenu from "./MobileMenu";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { t } = useTranslation();
  const active = useActiveSection(NAV_IDS);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Tuck the bar away while scrolling down, bring it back on any upward scroll.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > (scrollY.getPrevious() ?? 0) && y > 400);
  });

  return (
    <>
      <motion.header
        className={styles.header}
        animate={{ y: hidden && !open ? "-150%" : 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <nav className={styles.nav} aria-label={t("nav.label")}>
          <a href="#home" className={styles.brand}>
            <img src={logo} alt="" width={40} height={35} />
            <span>{t("brand")}</span>
          </a>

          <ul className={styles.links}>
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={styles.link}
                  aria-current={active === id ? "location" : undefined}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className={styles.pill}
                      transition={glide}
                    />
                  )}
                  <span className={styles.label}>{t(`nav.${id}`)}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <LanguageSwitch />
            <Button href={PHONE.href} className={styles.call}>
              <FiPhone aria-hidden />
              {t("nav.call")}
            </Button>
            <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} />
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={open} active={active} onClose={close} />
    </>
  );
}

function MenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const { t } = useTranslation();
  const line = { duration: 0.3, ease };

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={t(open ? "nav.closeMenu" : "nav.openMenu")}
      onClick={onToggle}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
        <motion.line
          x1="3" x2="21" y1="8" y2="8"
          animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          transition={line}
        />
        <motion.line
          x1="3" x2="21" y1="16" y2="16"
          animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          transition={line}
        />
      </svg>
    </button>
  );
}
