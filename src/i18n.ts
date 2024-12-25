import { createI18n } from "vue-i18n";

import en from "./components/languageVersions/locale/en.json";
import de from "./components/languageVersions/locale/de.json";
import fr from "./components/languageVersions/locale/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    de,
    fr,
  },
});
