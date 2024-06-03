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
          all_tasks: "All Tasks to do",
          number_of_tasks: "number of active tasks is:",
          select_predefined_task: "Select a predefined task",
          add_and_save_task: "Add and Save Task",
          predefined_tasks: "Predefined Tasks",
          edit_predefined_task: "Edit Predefined Task",
          close: "Close",
          delete_task: "Delete Task",
          save_changes: "Save Changes",
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
          all_tasks: "Sve obaveze za uraditi",
          number_of_tasks: "broj aktivnih zadataka je:",
          select_predefined_task: "Odaberi unaprijed definisan zadatak",
          add_and_save_task: "Dodaj i Sačuvaj Zadatak",
          predefined_tasks: "Unaprijed Definisani Zadaci",
          edit_predefined_task: "Uredi Unaprijed Definisani Zadatak",
          close: "Zatvori",
          delete_task: "Obriši Zadatak",
          save_changes: "Sačuvaj Promjene",
        },
      },
    },
  });

export default i18n;
