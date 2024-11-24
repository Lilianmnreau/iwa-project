// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "choose_language": "Choose a language",
      "Settings": "Settings",
      "Change Language": "Change Language",
      "Delete Profile": "Delete Profile",
      "Cancel Delete Request": "Cancel Delete Request",
      "Logout": "Logout",
      "Are you sure you want to delete your profile?": "Are you sure you want to delete your profile?",
      "Cancel": "Cancel",
      "Delete": "Delete",
      "Your delete request has been cancelled.": "Your delete request has been cancelled.",
      "Are you sure you want to logout?": "Are you sure you want to logout?",
      "Confirmation": "Confirmation",
      "Cancellation": "Cancellation"
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue",
      "choose_language": "Choisissez une langue",
      "Settings": "Réglages",
      "Change Language": "Modifier la langue",
      "Delete Profile": "Supprimer mon profil",
      "Cancel Delete Request": "Annuler la demande de suppression",
      "Logout": "Se déconnecter",
      "Are you sure you want to delete your profile?": "Êtes-vous sûr de vouloir supprimer votre profil ?",
      "Cancel": "Annuler",
      "Delete": "Supprimer",
      "Your delete request has been cancelled.": "Votre demande de suppression a été annulée.",
      "Are you sure you want to logout?": "Êtes-vous sûr de vouloir vous déconnecter ?",
      "Confirmation": "Confirmation",
      "Cancellation": "Annulation"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Langue par défaut
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;