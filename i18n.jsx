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
          welcome: "Welcome to the RemindME App",
          login: "Login",
          signup: "Sign Up",
          tasks: "Tasks",
          home: "Home",
          dashboard: "Dashboard",
          language: "Language",
          logout: "Logout",
          RemindME: "RemindME",
        },
      },
      bs: {
        translation: {
          welcome: "Dobrodošli u aplikaciju PodsjetiME",
          login: "Prijava",
          signup: "Registracija",
          tasks: "Zadaci",
          home: "Početna",
          dashboard: "Kontrolna tabla",
          language: "Jezik",
          logout: "Odjava",
          RemindME: "PodsjetiME",
        },
      },
    },
  });

export default i18n;
