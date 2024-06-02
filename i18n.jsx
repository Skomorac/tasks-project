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
          new_task: "New Task",
          add_task: "Add Task",
          task_description: "Enter task description",
          all_tasks: "All Tasks to do:",
          number_of_tasks: "number of active tasks is:",
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
          new_task: "Novi zadatak",
          add_task: "Dodaj zadatak",
          task_description: "Unesi opis zadatka",
          all_tasks: "Sve obaveze za uraditi:",
          number_of_tasks: "broj aktivnih zadataka je:",
        },
      },
    },
  });

export default i18n;
