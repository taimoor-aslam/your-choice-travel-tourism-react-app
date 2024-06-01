import "./Card.css";
import { useTranslation } from "react-i18next";

const Card = ({
  title,
  description,
  bg,
}: {
  title: string;
  description: string;
  bg: string;
}) => {
  const { t } = useTranslation();

  return (
    <article className="card">
      <img className="card__background" src={bg} alt="card-bg" />
      <div className="card__content | flow">
        <div className="card__content--container | flow">
          <h2 className="card__title">{title}</h2>
          <p className="card__description text-white mb-0">{description}</p>
          <button
            className="btn"
            onClick={() => (window.location.href = "#footer")}
          >
            {t("contactUs")}
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;
