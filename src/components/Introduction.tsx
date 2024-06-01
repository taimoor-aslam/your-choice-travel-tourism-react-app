import { useTranslation } from "react-i18next";
import IntroImg from "../assets/intro.jpg";
import "./Introduction.css";

const Introduction = () => {
  const { t } = useTranslation();

  return (
    <div id="about" className="intro-section">
      <div className="row d-block d-md-flex justify-content-center align-items-center">
        <div className="col-12 col-md-6">
          <p className="about-agency">{t("aboutTitle")}</p>
          <h2 className="intro-heading">
            {t("aboutHeading")} <br />
            <span className="intro-sub-heading">{t("aboutSubHeading")}</span>
          </h2>

          <p className="text-muted intro-description">
            {t("aboutDescription1")}
            <br />
            <br />
            {t("aboutDescription2")}
          </p>
          <button className="btn">{t("contactUs")}</button>
        </div>
        <div className="col-12 col-md-6 mt-3 mt-md-0">
          <img className="float-end intro-img" src={IntroImg} height={600} />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
