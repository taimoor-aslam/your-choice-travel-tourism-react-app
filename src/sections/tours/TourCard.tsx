import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ease } from "../../lib/motion";
import type { TOURS } from "./data";
import styles from "./TourCard.module.css";

type Props = (typeof TOURS)[number];

export default function TourCard({ id, image, tone }: Props) {
  const { t } = useTranslation();

  return (
    // Entrance comes from the row's stagger; hover lives on the inner card.
    <motion.li
      className={styles.item}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
      }}
    >
      <motion.article
        className={styles.card}
        data-tone={tone}
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={{ rest: { y: 0 }, hover: { y: -6 } }}
        transition={{ duration: 0.9, ease }}
      >
        <div className={styles.photo}>
          <motion.img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 1.4, ease }}
          />
        </div>
        <div className={styles.band}>
          <h3 className={styles.name}>{t(`tours.items.${id}.name`)}</h3>
          <p className={styles.description}>{t(`tours.items.${id}.description`)}</p>
          <a href="#contact" className={styles.cta}>
            {t("tours.cta")}
          </a>
        </div>
      </motion.article>
    </motion.li>
  );
}
