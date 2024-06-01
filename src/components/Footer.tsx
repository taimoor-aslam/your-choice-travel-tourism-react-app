import { useTranslation } from "react-i18next";
import Logo from "../assets/logo.png";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <a href="#home">
              <img src={Logo} />
            </a>
            <p>{t("footerAbout")}</p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h3>{t("quickLinks")}</h3>
            <ul className="list-unstyled">
              <li>
                <a href="#home">{t("home")}</a>
              </li>
              <li>
                <a href="#about">{t("about")}</a>
              </li>
              <li>
                <a href="#tours">{t("tours")}</a>
              </li>
              <li>
                <a href="#services">{t("services")}</a>
              </li>
              <li>
                <a href="#testimonials">{t("testimonial")}</a>
              </li>
              <li>
                <a href="#footer">{t("contact")}</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <h3>{t("contactUs")}</h3>
            <ul className="list-unstyled">
              <li>{t("address")}</li>
              <li>info@yourchoicetravels.com</li>
              <li>+966 59 451 0080</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <p className="text-center">© {t("allRight")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
