import { useState } from "react";
import Logo from "../assets/logo.png";
import "./Navbar.css";
import { useTranslation } from "react-i18next";

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { t } = useTranslation();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo d-flex align-items-center gap-1">
          <img src={Logo} height={50} width={50} />
          <h3 className="d-none d-md-block logo-text">
            {t("yourChoiceTravels")}
          </h3>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <a href="#home" onClick={() => setShowNavbar(false)}>
                {t("home")}
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setShowNavbar(false)}>
                {t("about")}
              </a>
            </li>
            <li>
              <a href="#tours" onClick={() => setShowNavbar(false)}>
                {t("tours")}
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => setShowNavbar(false)}>
                {t("services")}
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={() => setShowNavbar(false)}>
                {t("testimonial")}
              </a>
            </li>
            <li>
              <a href="#footer" onClick={() => setShowNavbar(false)}>
                {t("contact")}
              </a>
            </li>
            <li>
              <a
                href="https://privateemail.com/"
                onClick={() => setShowNavbar(false)}
              >
                {t("emailLogin")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
