import { useTranslation } from "react-i18next";
import "./CustomerSupport.css";

const CustomerSupport = () => {
  const { t } = useTranslation();

  return (
    <div className="customer-support">
      <p className="title text-center">{t("customerServiceTitle")}</p>
      <h2 className="heading text-center">
        {t("customerServiceHeading")}{" "}
        <span className="sub-heading">{t("customerServiceSubHeading")}</span>
      </h2>
      <p className="text-muted description text-center">
        {t("customerServiceDescription")}
      </p>
    </div>
  );
};

export default CustomerSupport;
