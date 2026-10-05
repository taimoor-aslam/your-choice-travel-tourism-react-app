import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useTranslation } from "react-i18next";
import vipVideo from "../../assets/special-service.mp4";
import vipPoster from "../../assets/vip-poster.webp";
import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import useSmoothScroll from "../../lib/useSmoothScroll";
import styles from "./Vip.module.css";

// The video opens like a cabin window growing to full bleed as you scroll in.
export default function Vip() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const progress = useSmoothScroll({ target: ref, offset: ["start end", "start start"] });
  const insetX = useTransform(progress, [0, 1], [16, 0]);
  const insetY = useTransform(progress, [0, 1], [9, 0]);
  const radius = useTransform(progress, [0, 1], [240, 0]);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% round ${radius}px)`;

  // Only fetch and play the clip while the section is near the screen; the poster covers the wait.
  const inView = useInView(ref, { margin: "200px 0px" });
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView]);

  return (
    <section ref={ref} className={styles.vip}>
      <motion.div className={styles.frame} style={reduce ? undefined : { clipPath }}>
        <video
          ref={videoRef}
          src={vipVideo}
          poster={vipPoster}
          muted
          loop
          playsInline
          preload="none"
        />
      </motion.div>

      <div className={`container ${styles.content}`}>
        <Reveal>
          <p className={styles.label}>{t("vip.label")}</p>
        </Reveal>
        <SectionHeading>{t("vip.heading")}</SectionHeading>
        <Reveal>
          <p className={styles.description}>{t("vip.description")}</p>
        </Reveal>
      </div>
    </section>
  );
}
