import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";
import { FiPhone } from "react-icons/fi";
import bgVideo from "../../assets/bg.mp4";
import heroPoster from "../../assets/hero-poster.webp";
import Button from "../../components/Button";
import { ease, fadeUp, rise, stagger } from "../../lib/motion";
import { PHONE } from "../../lib/site";
import useSmoothScroll from "../../lib/useSmoothScroll";
import DestinationFlap from "./DestinationFlap";
import FlightPath from "./FlightPath";
import styles from "./Hero.module.css";

export default function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);

  // Video drifts slower than the page and the copy fades as the hero scrolls away.
  const progress = useSmoothScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(progress, [0, 1], ["0%", "30%"]);
  const copyY = useTransform(progress, [0, 1], ["0%", "-20%"]);
  const copyOpacity = useTransform(progress, [0, 0.6], [1, 0]);

  // Hold the entrance until the display font is in, so the headline never swaps
  // typeface mid-animation. Capped so a slow font can't block the page.
  const [fontReady, setFontReady] = useState(false);
  useEffect(() => {
    const ready = () => setFontReady(true);
    const timer = setTimeout(ready, 1500);
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-display");
    document.fonts.load(`900 1em ${family}`).then(ready, ready);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" ref={ref} className={styles.hero}>
      <motion.video
        className={styles.video}
        style={{ y: videoY }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease }}
        src={bgVideo}
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.scrim} />
      <FlightPath className={styles.flight} />

      <motion.div
        className={`container ${styles.copy}`}
        style={{ opacity: copyOpacity, y: copyY }}
        variants={stagger(0.16, 0.2)}
        initial="hidden"
        animate={fontReady ? "visible" : "hidden"}
      >
        <motion.p className={styles.lead} variants={fadeUp}>
          {t("hero.lead")}
        </motion.p>

        <h1 className={styles.title}>
          <span className="sr-only">{t("hero.title")}</span>
          <span aria-hidden className={styles.titleLines}>
            <span className={styles.mask}>
              <motion.span className={styles.explore} variants={rise}>
                {t("hero.explore")}
              </motion.span>
            </span>
            <DestinationFlap />
            <span className={styles.mask}>
              <motion.span className={styles.with} variants={rise}>
                {t("hero.with")}
              </motion.span>
            </span>
          </span>
        </h1>

        <motion.div className={styles.ctas} variants={fadeUp}>
          <Button href="#tours">{t("hero.ctaTours")}</Button>
          <Button href={PHONE.href} variant="light">
            <FiPhone aria-hidden />
            {t("hero.ctaCall")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
