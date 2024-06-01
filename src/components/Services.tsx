import HotelBg from "../assets/hotel-service.jpg";
import CarBg from "../assets/car-rental-service.jpg";
import FlightBg from "../assets/flight-reservation-service.jpg";
import VisaBg from "../assets/visa-service.jpg";
import PackageBg from "../assets/package-service.jpg";
import TransferBg from "../assets/transfer-service.jpg";
import ChauffeurBg from "../assets/chuaffeur-service.jpg";
import SpecialServiceBg from "../assets/special-service.mp4";
import Card from "./Card";

import "./Services.css";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      title: t("flightService"),
      description: t("flightServiceDescription"),
      bg: FlightBg,
    },
    {
      title: t("hotelService"),
      description: t("hotelServiceDescription"),
      bg: HotelBg,
    },
    {
      title: t("carRentalService"),
      description: t("carRentalServiceDescription"),
      bg: CarBg,
    },
    {
      title: t("chauffeurService"),
      description: t("chauffeurServiceDescription"),
      bg: ChauffeurBg,
    },
    {
      title: t("transferService"),
      description: t("chauffeurServiceDescription"),
      bg: TransferBg,
    },
    {
      title: t("tourVisaService"),
      description: t("tourVisaServiceDescription"),
      bg: VisaBg,
    },
    {
      title: t("packageService"),
      description: t("packageServiceDescription"),
      bg: PackageBg,
    },
  ];
  return (
    <>
      <div id="services" className="services">
        <p className="title text-start text-md-center">{t("serviceTitle")}</p>
        <h2 className="heading text-start text-md-center">
          {t("serviceHeading")}{" "}
          <span className="sub-heading">{t("serviceSubHeading")}</span>
        </h2>

        <div className="d-flex gap-3 flex-wrap mt-3">
          {services.map((service) => (
            <Card {...service} />
          ))}
        </div>
      </div>

      <div className="special-service">
        <video className="video" loop muted playsInline autoPlay>
          <source src={SpecialServiceBg}></source>
        </video>

        <div className="content">
          <p className="title text-center">{t("vipService")}</p>
          <h2 className="heading text-center">{t("vipServiceHeading")}</h2>
          <p className="description text-center">
            {t("vipServiceDescription")}
          </p>
        </div>
      </div>
    </>
  );
}
