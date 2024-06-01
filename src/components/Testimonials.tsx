import { Carousel } from "react-bootstrap";
import "./Testimonials.css";
import { useTranslation } from "react-i18next";

export default function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      userName: t("emilySmith"),
      title: t("adventureSeeker"),
      quote: t("testimonial1"),
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      userName: t("michaelJohnson"),
      title: t("worldExplorer"),
      quote: t("testimonial2"),
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      userName: t("sarahGarcia"),
      title: t("vloggerAndContentCreator"),
      quote: t("testimonial3"),
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      userName: t("davidLee"),
      title: t("familyExplorer"),
      quote: t("testimonial4"),
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      userName: t("samanthaRoberts"),
      title: t("natureEnthusiast"),
      quote: t("testimonial5"),
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
  ];

  return (
    <div id="testimonials" className="testimonials text-center mt-5">
      <Carousel indicators={false}>
        {testimonials.map(({ userName, title, image, quote }) => (
          <Carousel.Item interval={4000}>
            <img className="user-img" src={image} alt={userName} />
            <h3 className="user-name">{userName}</h3>
            <p>{title}</p>
            <p className="text-muted">{quote}</p>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
