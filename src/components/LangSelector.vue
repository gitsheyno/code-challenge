<script lang="ts" setup>
import { ref } from "vue";
import Select from "primevue/select";
import { type Language } from "../types/types";

const props = defineProps<{ languages: { name: string; code: string }[] }>();
const emit = defineEmits<{
  (event: "language-change", langCode: string): void;
}>();

const selectedLanguage = ref();

if (props.languages) {
  selectedLanguage.value = props.languages[0];
}

const emitLanguageChange = (newLanguage: Language) => {
  selectedLanguage.value = newLanguage;
  emit("language-change", newLanguage.code);
};
</script>

<template>
  <div class="language-switcher">
    <Select
      data-test="selectLanguage"
      name="selectLanguage"
      v-model="selectedLanguage"
      :options="props.languages"
      optionLabel="name"
      :itemTemplate="selectedLanguage"
      @change="emitLanguageChange($event.value)"
      placeholder="Select Language"
      class="w-32"
    />
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
