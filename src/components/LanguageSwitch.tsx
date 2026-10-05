import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { glide } from "../lib/motion";
import styles from "./LanguageSwitch.module.css";

const LANGUAGES = [
  { code: "en", short: "EN", name: "English" },
  { code: "ar", short: "ع", name: "العربية" },
];

export default function LanguageSwitch() {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.switch} role="group" aria-label={t("nav.language")}>
      {LANGUAGES.map(({ code, short, name }) => {
        const active = i18n.resolvedLanguage === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-label={name}
            aria-pressed={active}
            className={styles.option}
            onClick={() => i18n.changeLanguage(code)}
          >
            {active && (
              <motion.span
                layoutId="language-thumb"
                className={styles.thumb}
                transition={glide}
              />
            )}
            <span className={styles.label}>{short}</span>
          </button>
        );
      })}
    </div>
  );
}
