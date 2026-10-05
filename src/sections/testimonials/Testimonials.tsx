import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useTranslation } from "react-i18next";
import ArrowButton from "../../components/ArrowButton";
import SectionHeading from "../../components/SectionHeading";
import { ease, glide } from "../../lib/motion";
import styles from "./Testimonials.module.css";

const PEOPLE = [
  { id: "emily", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: "michael", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: "sarah", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: "david", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: "samantha", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
];

// `custom` is the on-screen direction: 1 = enters from the right, -1 = from the left.
const slide: Variants = {
  enter: (d: number) => ({ x: d * 48, opacity: 0, filter: "blur(6px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.9, ease } },
  exit: (d: number) => ({ x: d * -48, opacity: 0, filter: "blur(6px)", transition: { duration: 0.45, ease } }),
};

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const reduce = useReducedMotion();
  const [[index, step], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const go = (delta: number) => setState(([i]) => [(i + delta + PEOPLE.length) % PEOPLE.length, delta]);

  // "Next" moves toward the reading direction, so flip the slide for RTL.
  const sign = i18n.dir() === "rtl" ? -1 : 1;

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setTimeout(() => setState(([i]) => [(i + 1) % PEOPLE.length, 1]), 6000);
    return () => clearTimeout(timer);
  }, [index, paused, reduce]);

  const { id, avatar } = PEOPLE[index];

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <SectionHeading className={styles.heading}>{t("testimonials.heading")}</SectionHeading>

        <div
          className={styles.stage}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" initial={false} custom={step * sign}>
            <motion.figure
              key={id}
              className={styles.slide}
              custom={step * sign}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_, { offset }) => {
                const swipe = offset.x * sign;
                if (swipe < -80) go(1);
                else if (swipe > 80) go(-1);
              }}
            >
              <blockquote className={styles.quote}>
                <p>{t(`testimonials.items.${id}.quote`)}</p>
              </blockquote>
              <figcaption className={styles.person}>
                <img src={avatar} alt="" width={56} height={56} loading="lazy" draggable={false} />
                <span>
                  <strong>{t(`testimonials.items.${id}.name`)}</strong>
                  {t(`testimonials.items.${id}.role`)}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className={styles.controls}>
          <ArrowButton direction="previous" label={t("testimonials.previous")} onClick={() => go(-1)} />
          <div className={styles.dots}>
            {PEOPLE.map((person, i) => (
              <button
                key={person.id}
                type="button"
                className={styles.dot}
                aria-label={t("testimonials.show", { n: i + 1 })}
                aria-current={i === index}
                onClick={() => setState([i, i > index ? 1 : -1])}
              >
                {i === index && <motion.span layoutId="testimonial-dot" className={styles.dotActive} transition={glide} />}
              </button>
            ))}
          </div>
          <ArrowButton direction="next" label={t("testimonials.next")} onClick={() => go(1)} />
        </div>
      </div>
    </section>
  );
}
