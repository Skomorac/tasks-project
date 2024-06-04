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
          edit_task: "Edit task",
          close: "Close",
          delete_task: "Delete Task",
          save_changes: "Save Changes",
          welcome_to_remindme: "Welcome to RemindME",
          hero_subtitle: "The best way to manage your tasks effortlessly.",
          get_started: "Get Started",
          about_title: "About RemindME",
          about_description:
            "RemindME is a simple and effective tool for task management, designed to help you stay organized and on top of your tasks. Have you ever experienced your wife telling you to buy something and you forgot? I have, and that's why this app was created. Log your wife in with the same credentials and allow her to dynamically change the shopping list, and enjoy peace at home :)",

          features_title: "Features",
          feature_one_title: "Easy Task Management",
          feature_one_description: "Quickly add, edit, and delete tasks.",
          feature_two_title: "Predefined Tasks",
          feature_two_description:
            "Use predefined tasks for common activities.",
          feature_three_title: "Responsive Design",
          feature_three_description: "Access your tasks on any device.",
          cta_title: "You want to try, just register, it is free!!!",
          sign_up_now: "Sign Up Now",
          username: "Username",
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
          edit_task: "Uredi zadatak",
          edit_predefined_task: "Uredi Unaprijed Definisani Zadatak",
          close: "Zatvori",
          delete_task: "Obriši Zadatak",
          save_changes: "Sačuvaj Promjene",
          welcome_to_remindme: "Dobrodošli u PodsjetiME",
          hero_subtitle: "Najbolji način za jednostavno upravljanje zadacima.",
          get_started: "Započnite",
          about_title: "O PodsjetiME",
          about_description:
            "RemindME je jednostavan i efikasan alat za upravljanje zadacima, dizajniran da vam pomogne da ostanete organizovani i na vrhu svojih zadataka. Da li vam se ikada desilo da Vam supruga kaže da nešto kupite a Vi ste zaboravili. Meni jeste i zato je nastala ova aplikacija. Ulogujte suprugu sa istim podacima i dozvolite joj da dinamički mjenja listu za kupovinu i uživajte u miru u kući :)",
          features_title: "Funkcije",
          feature_one_title: "Jednostavno upravljanje zadacima",
          feature_one_description: "Brzo dodajte, uredite i izbrišite zadatke.",
          feature_two_title: "Unaprijed definirani zadaci",
          feature_two_description:
            "Koristite unaprijed definirane zadatke za uobičajene aktivnosti.",
          feature_three_title: "Responzivni dizajn",
          feature_three_description:
            "Pristupite svojim zadacima na bilo kojem uređaju.",
          cta_title: "Želite da probate, samo se registrujte, besplatno je!!!",
          sign_up_now: "Registrujte se sada",
          username: "Korisničko ime",
        },
      },
    },
  });

export default i18n;
