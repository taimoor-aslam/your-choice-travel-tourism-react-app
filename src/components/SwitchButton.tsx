import { Button, ButtonGroup } from "react-bootstrap";
import "./SwitchButton.css";
import { useEffect, useState } from "react";
import i18n from "../i18";

const SwitchButton = () => {
  const [language, setLanguage] = useState<"eng" | "ar">("eng");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <ButtonGroup className="switch-btn" aria-label="language-switch">
      <Button
        className={`btn1 ${language === "eng" ? "active" : ""}`}
        onClick={() => setLanguage("eng")}
      >
        English
      </Button>
      <Button
        className={`btn2 ${language === "ar" ? "active" : ""}`}
        onClick={() => setLanguage("ar")}
      >
        العربية
      </Button>
    </ButtonGroup>
  );
};

export default SwitchButton;
