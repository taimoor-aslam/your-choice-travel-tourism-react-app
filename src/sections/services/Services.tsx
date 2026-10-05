import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import flight from "../../assets/flight-reservation-service.webp";
import hotel from "../../assets/hotel-service.webp";
import car from "../../assets/car-rental-service.webp";
import chauffeur from "../../assets/chuaffeur-service.webp";
import transfer from "../../assets/transfer-service.webp";
import visa from "../../assets/visa-service.webp";
import travelPackage from "../../assets/package-service.webp";
import SectionHeading from "../../components/SectionHeading";
import { ease, glide } from "../../lib/motion";
import styles from "./Services.module.css";

const SERVICES = [
  { id: "flight", image: flight },
  { id: "hotel", image: hotel },
  { id: "car", image: car },
  { id: "chauffeur", image: chauffeur },
  { id: "transfer", image: transfer },
  { id: "visa", image: visa },
  { id: "package", image: travelPackage },
];

export default function Services() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <SectionHeading className={styles.heading}>{t("services.heading")}</SectionHeading>

        <div className={styles.layout}>
          <div className={styles.panel}>
            <AnimatePresence initial={false}>
              <motion.img
                key={current.id}
                src={current.image}
                alt=""
                className={styles.image}
                initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.08 }}
                animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.5 } }}
                transition={{ duration: 1.1, ease }}
              />
            </AnimatePresence>
          </div>

          <ul className={styles.list}>
            {SERVICES.map(({ id }, i) => {
              const selected = i === active;
              return (
                <li key={id} className={styles.item}>
                  <button
                    type="button"
                    className={styles.row}
                    aria-expanded={selected}
                    aria-controls={`service-${id}`}
                    onClick={() => setActive(i)}
                  >
                    {selected && (
                      <motion.span
                        layoutId="service-marker"
                        className={styles.marker}
                        transition={glide}
                      />
                    )}
                    <span className={styles.name}>{t(`services.items.${id}.name`)}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {selected && (
                      <motion.p
                        id={`service-${id}`}
                        className={styles.description}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.7, ease }}
                      >
                        <span>{t(`services.items.${id}.description`)}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
