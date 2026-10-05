import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import logo from "../assets/logo.png";
import { rise, stagger } from "../lib/motion";
import { EMAIL, EMAIL_LOGIN_URL, NAV_IDS, PHONE } from "../lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <span className={styles.logo}>
            <img src={logo} alt={t("brand")} width={56} height={49} />
          </span>
          <p>{t("footer.about")}</p>
        </div>

        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className={styles.title}>
            {t("footer.quickLinks")}
          </h2>
          <ul className={styles.list}>
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t(`nav.${id}`)}</a>
              </li>
            ))}
            <li>
              <a href={EMAIL_LOGIN_URL}>{t("footer.emailLogin")}</a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={styles.title}>{t("footer.contactUs")}</h2>
          <address className={styles.list}>
            <span className={styles.row}>
              <FiMapPin aria-hidden />
              {t("contact.address")}
            </span>
            <a className={styles.row} href={EMAIL.href}>
              <FiMail aria-hidden />
              {EMAIL.display}
            </a>
            <a className={styles.row} href={PHONE.href}>
              <FiPhone aria-hidden />
              <bdi dir="ltr">{PHONE.display}</bdi>
            </a>
          </address>
        </div>
      </div>

      <motion.p
        className={styles.wordmark}
        aria-hidden
        variants={stagger(0.04)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {t("brand")
          .split(" ")
          .map((word, i) => (
            <span key={i} className={styles.mask}>
              <motion.span className={styles.word} variants={rise}>
                {word}
              </motion.span>
            </span>
          ))}
      </motion.p>

      <p className={`container ${styles.legal}`}>
        {t("footer.rights", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}
