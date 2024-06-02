import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          RemindME: "RemindME",
          welcome: "Welcome to the RemindME App",
          home: "Home",
          login: "Login",
          signup: "Sign Up",
          tasks: "Tasks",
          language: "Language",
          // Add other translations here
        },
      },
      bs: {
        translation: {
          RemindME: "PodsjetiME",
          welcome: "Dobrodošli u aplikaciju PodsjetiME",
          home: "Početna stranica",
          login: "Prijava",
          signup: "Registracija",
          tasks: "Zadaci",
          language: "Jezik",

          // Add other translations here
        },
      },
    },
  });

export default i18n;
