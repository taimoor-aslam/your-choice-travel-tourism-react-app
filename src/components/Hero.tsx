import { useTranslation } from "react-i18next";
import BgVideo from "../assets/bg.mp4";
import "./Hero.css";
export default function Hero() {
  const { t } = useTranslation();

  return (
    <div id="home">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={BgVideo}></source>
      </video>

      <div className="hero-content">
        <h4 className="title">{t("heroTitle")}</h4>
        <h1 className="heading">{t("heroHeading")}</h1>
        <h1 className="sub-heading">{t("heroSubHeading")}</h1>
      </div>
    </div>
  );
}
