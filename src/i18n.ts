import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";

// ?lang=ar in the URL wins (shareable Arabic link), then the visitor's last choice.
function initialLanguage() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (fromUrl) return fromUrl;
  try {
    return localStorage.getItem("lang") ?? "en";
  } catch {
    return "en";
  }
}

// Keep <html lang/dir> in sync so the whole layout mirrors for Arabic.
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = i18n.dir(lng);
  try {
    localStorage.setItem("lang", lng);
  } catch {
    /* storage blocked: language just won't persist */
  }
});

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: initialLanguage(),
  supportedLngs: ["en", "ar"],
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
