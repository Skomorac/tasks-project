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
          number_of_tasks: "Number of active tasks is:",
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
          email_address: "Email Address",
          enter_email: "Enter Email",
          invalid_email_warning: "Please enter a valid email address.",
          enter_username: "Enter Username",
          enter_password: "Enter Password",
          repeat_password: "Repeat Password",
          error: "Error",
          passwords_do_not_match: "Passwords do not match",
          password: "Password",
          invalid_email_format: "Invalid email format",
          success: "Success",
          signup_successful: "Signup successful. Redirecting to login page...",
          user_exists: "User with this email already exists",
          signup_error: "An error occurred during signup. Please try again.",
          uppercase_letter: "At least one uppercase letter",
          lowercase_letter: "At least one lowercase letter",
          number: "At least one number",
          special_character: "At least one special character",
          min_length: "At least 8 characters",
          login_successful: "Login successful. Redirecting to dashboard...",
          email_not_found: "Email not found",
          incorrect_password: "Incorrect password",
          login_error: "An error occurred during login. Please try again.",
          forgot_password: "Forgot Password",
          send_reset_link: "Send Reset Link",
          forgot_password_error:
            "An error occurred while sending the password reset link. Please try again.",
          reset_password: "Reset Password",
          reset_password_success:
            "Password reset successfully done, click OK to go to Login page",
          new_password: "New Password",
          enter_new_password: "Enter New Password",
          reset_password_error:
            "An error occurred while resetting the password. Please try again.",
          invalid_or_expired_token:
            "Invalid or expired token. Please request a new password reset link.",
          delete_all_tasks: "Delete All Tasks",
          are_you_sure: "Are you sure?",
          irreversible_action: "You won't be able to revert this!",
          yes_delete_all: "Yes, delete all!",
          deleted: "Deleted!",
          all_tasks_deleted: "All your tasks have been deleted.",
          error_deleting_tasks: "There was an error deleting your tasks.",

          // other translations...
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
          number_of_tasks: "Broj aktivnih zadataka je:",
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
          email_address: "Email Adresa",
          enter_email: "Unesite Email",
          invalid_email_warning: "Molimo unesite važeću email adresu.",
          enter_username: "Unesite Korisničko Ime",
          enter_password: "Unesite Lozinku",
          repeat_password: "Ponovite Lozinku",
          error: "Greška",
          passwords_do_not_match: "Lozinke se ne podudaraju",
          password: "Lozinka",
          invalid_email_format: "Neispravan format emaila",
          success: "Uspjeh",
          signup_successful:
            "Registracija uspješna. Preusmjeravanje na prijavu...",
          user_exists: "Korisnik sa ovom email adresom već postoji",
          signup_error:
            "Došlo je do greške tokom registracije. Molimo pokušajte ponovo.",
          uppercase_letter: "Najmanje jedno veliko slovo",
          lowercase_letter: "Najmanje jedno malo slovo",
          number: "Najmanje jedan broj",
          special_character: "Najmanje jedan poseban karakter",
          min_length: "Najmanje 8 karaktera",
          login_successful:
            "Prijava uspješna. Preusmjeravanje na kontrolnu tablu...",
          email_not_found: "Email nije pronađen",
          incorrect_password: "Pogrešna lozinka",
          login_error:
            "Došlo je do greške tokom prijave. Molimo pokušajte ponovo.",
          forgot_password: "Zaboravili ste lozinku",
          send_reset_link: "Pošalji link za resetovanje",
          forgot_password_error:
            "Došlo je do greške prilikom slanja linka za resetovanje lozinke. Molimo pokušajte ponovo.",
          reset_password: "Resetujte lozinku",
          new_password: "Nova lozinka",
          enter_new_password: "Unesite novu lozinku",
          reset_password_error:
            "Došlo je do greške prilikom resetovanja lozinke. Molimo pokušajte ponovo.",
          invalid_or_expired_token:
            "Nevažeći ili istekao token. Molimo zatražite novi link za resetovanje lozinke.",
          reset_password_success:
            "Lozinka je uspješno resetovana, kliknite OK da biste otišli na stranicu za prijavu",
          delete_all_tasks: "Izbriši Sve Zadate",
          are_you_sure: "Jeste li sigurni?",
          irreversible_action: "Ovo nećete moći poništiti!",
          yes_delete_all: "Da, izbriši sve!",
          deleted: "Izbrisano!",
          all_tasks_deleted: "Svi vaši zadaci su izbrisani.",
          error_deleting_tasks:
            "Došlo je do greške prilikom brisanja zadataka.",
          // other translations...
        },
      },
    },
  });

export default i18n;
