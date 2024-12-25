<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
import Select from "primevue/select";

interface Language {
  name: string;
  code: string;
  flag: string;
}

const props = defineProps<{
  languages: Language[];
}>();

const emit = defineEmits<{
  (event: "language-change", langCode: string): void;
}>();

const selectedLanguage = ref(props.languages[0]);

const emitLanguageChange = (newLanguage: Language) => {
  selectedLanguage.value = newLanguage;
  emit("language-change", newLanguage.code);
};
</script>

<template>
  <div class="language-switcher">
    <Select
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
