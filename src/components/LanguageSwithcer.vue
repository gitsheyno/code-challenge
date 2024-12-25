<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import LanguageSelector from "./LangSelector.vue";

const { locale } = useI18n();

const languages = [
  { name: "English", code: "en" },
  { name: "German", code: "de" },
  { name: "French", code: "fr" },
];

const changeLanguage = (langCode: string) => {
  locale.value = langCode;
};
</script>

<template>
  <div class="switch-language-container">
    <LanguageSelector
      :languages="languages"
      @language-change="changeLanguage"
    />
  </div>
</template>

<style scoped>
.switch-language-container {
  padding: 1rem;
  text-align: center;
}
</style>
