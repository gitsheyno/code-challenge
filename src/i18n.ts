import { createI18n } from "vue-i18n";

// Import translations
import en from "./components/languageVersions/locale/en.json";
import de from "./components/languageVersions/locale/de.json";

export const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: "en", // Default language
  fallbackLocale: "en", // Fallback language
  messages: {
    en,
    de,
  },
});
