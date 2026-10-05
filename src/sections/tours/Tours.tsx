import { useEffect, useRef, useState, type FocusEvent } from "react";
import { motion, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";
import ArrowButton from "../../components/ArrowButton";
import SectionHeading from "../../components/SectionHeading";
import { stagger } from "../../lib/motion";
import useSmoothScroll from "../../lib/useSmoothScroll";
import { TOURS } from "./data";
import TourCard from "./TourCard";
import styles from "./Tours.module.css";

// Auto scroll without pinning: as the page scrolls, the row slides sideways, and the
// page keeps moving the whole time. The slide starts once the whole row is on screen
// (first card readable) and ends when the row's middle reaches the top of the screen
// (last card's text still visible).
export default function Tours() {
  const { t, i18n } = useTranslation();
  const trackRef = useRef<HTMLUListElement>(null);
  const progress = useSmoothScroll({ target: trackRef, offset: ["end end", "center start"] });

  // How far the row slides to bring the last card to the page edge.
  const [travel, setTravel] = useState(0);
  useEffect(() => {
    const track = trackRef.current!;
    const measure = () => setTravel(Math.max(0, track.offsetWidth - window.innerWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const rtl = i18n.dir() === "rtl";
  const x = useTransform(progress, (p) => (rtl ? 1 : -1) * p * travel);

  // Keyboard focus on a card that has slid away: scroll the page to where it's in view.
  const onFocus = (e: FocusEvent<HTMLUListElement>) => {
    const track = e.currentTarget;
    const card = (e.target as HTMLElement).closest("li");
    if (!card || getComputedStyle(track).overflowX === "auto") return; // swipe row scrolls itself
    const p = Array.prototype.indexOf.call(track.children, card) / (TOURS.length - 1);
    const rect = track.getBoundingClientRect();
    const start = scrollY + rect.bottom - innerHeight; // "end end"
    const end = scrollY + rect.top + rect.height / 2; // "center start"
    window.scrollTo({ top: start + p * (end - start) });
  };

  // Arrows (swipe-row mode with a mouse): move one card in the reading direction.
  const step = (direction: 1 | -1) => {
    const track = trackRef.current!;
    const [first, second] = track.children as HTMLCollectionOf<HTMLElement>;
    const card = Math.abs(second.offsetLeft - first.offsetLeft);
    track.scrollBy({ left: direction * card * (rtl ? -1 : 1) });
  };

  return (
    <section id="tours" className={styles.tours}>
      <div className={`container ${styles.header}`}>
        <SectionHeading>{t("tours.heading")}</SectionHeading>
        <div className={styles.controls}>
          <div className={styles.progress} aria-hidden>
            <motion.span style={{ scaleX: progress }} />
          </div>
          <div className={styles.arrows}>
            <ArrowButton direction="previous" label={t("tours.previous")} onClick={() => step(-1)} />
            <ArrowButton direction="next" label={t("tours.next")} onClick={() => step(1)} />
          </div>
        </div>
      </div>

      <motion.ul
        ref={trackRef}
        className={styles.track}
        style={{ x }}
        onFocus={onFocus}
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {TOURS.map((tour) => (
          <TourCard key={tour.id} {...tour} />
        ))}
      </motion.ul>
    </section>
  );
}
