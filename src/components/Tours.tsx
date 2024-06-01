import Card from "./Card";
import FranceTour from "../assets/france.jpg";
import LondonTour from "../assets/london.jpg";
import GermanyTour from "../assets/germany.jpg";
import GreeceTour from "../assets/greece.jpg";
import SwitzerLandTour from "../assets/swizerland.jpg";
import MaldivesTour from "../assets/maldives.jpg";
import "./Tours.css";
import { useTranslation } from "react-i18next";

const Tours = () => {
  const { t } = useTranslation();

  const tours = [
    {
      title: t("france"),
      description: t("franceDescription"),
      bg: FranceTour,
    },
    {
      title: t("london"),
      description: t("londonDescription"),
      bg: LondonTour,
    },
    {
      title: t("switzerland"),
      description: t("switzerlandDescription"),
      bg: SwitzerLandTour,
    },
    {
      title: t("maldives"),
      description: t("maldivesDescription"),
      bg: MaldivesTour,
    },
    {
      title: t("germany"),
      description: t("germanyDescription"),
      bg: GermanyTour,
    },
    {
      title: t("greece"),
      description: t("greeceDescription"),
      bg: GreeceTour,
    },
  ];
  return (
    <div id="tours" className="tours">
      <p className="tours-title">{t("tourTitle")}</p>
      <h2 className="tours-heading">
        {t("tourHeading")}{" "}
        <span className="tours-sub-heading">{t("tourSubHeading")}</span>
      </h2>

      <div className="d-flex gap-4 flex-wrap mt-3">
        {tours.map((tour) => (
          <Card {...tour} key={tour.title} />
        ))}
      </div>
    </div>
  );
};

export default Tours;
