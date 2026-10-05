import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";
import introImage from "../../assets/intro.webp";
import Button from "../../components/Button";
import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import useSmoothScroll from "../../lib/useSmoothScroll";
import styles from "./About.module.css";

export default function About() {
  const { t } = useTranslation();
  const mediaRef = useRef<HTMLDivElement>(null);

  // Photo, frame and sun move at different speeds for depth.
  const progress = useSmoothScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const photoY = useTransform(progress, [0, 1], ["-10%", "10%"]);
  const frameY = useTransform(progress, [0, 1], [50, -50]);
  const sunY = useTransform(progress, [0, 1], [140, -140]);

  return (
    <section id="about" className={styles.about}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <SectionHeading>{t("about.heading")}</SectionHeading>
          <Reveal className={styles.text}>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </Reveal>
          <Reveal>
            <Button href="#contact" variant="ink">
              {t("about.cta")}
            </Button>
          </Reveal>
        </div>

        <div ref={mediaRef} className={styles.media}>
          <motion.div className={styles.sun} style={{ y: sunY }} />
          <motion.div className={styles.window} style={{ y: frameY }}>
            <motion.img
              src={introImage}
              alt={t("about.imageAlt")}
              loading="lazy"
              decoding="async"
              style={{ y: photoY, scale: 1.25 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
