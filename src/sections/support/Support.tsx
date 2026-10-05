import { useTranslation } from "react-i18next";
import { FiMail, FiPhone } from "react-icons/fi";
import Button from "../../components/Button";
import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import { EMAIL, PHONE } from "../../lib/site";
import styles from "./Support.module.css";

export default function Support() {
  const { t } = useTranslation();

  return (
    <section className={styles.support}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <SectionHeading>{t("support.heading")}</SectionHeading>
          <Reveal>
            <p className={styles.description}>{t("support.description")}</p>
          </Reveal>
        </div>
        <Reveal className={styles.actions}>
          <Button href={PHONE.href} variant="ink">
            <FiPhone aria-hidden />
            <bdi dir="ltr">{PHONE.display}</bdi>
          </Button>
          <Button href={EMAIL.href} variant="light">
            <FiMail aria-hidden />
            {EMAIL.display}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
