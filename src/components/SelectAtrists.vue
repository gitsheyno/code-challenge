<template>
  <div
    class="flex justify-center items-center mx-auto px-8 py-4 gap-4 flex-col md:flex-row"
  >
    <div class="w-[100%] flex justify-between md:gap-4">
      <MultiSelect
        display="chip"
        v-model="selectedArtists"
        :options="artists"
        filter
        optionLabel="name"
        :placeholder="$t('SelectArtists')"
        class="w-[70%] md:w-full"
      >
        <template #footer>
          <div class="p-3 flex justify-between">
            <Button
              :label="$t('ClearAll')"
              severity="danger"
              text
              size="small"
              icon="pi pi-times"
              @click="handleClearAll"
            />
          </div>
        </template>
      </MultiSelect>

      <Button
        @click="submitSelection"
        :label="$t('Submit')"
        :disabled="!buttonIsActive"
      />
    </div>
    <LanguageSwitcher />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import LanguageSwitcher from "./LanguageSwithcer.vue";

interface Artist {
  name: string;
  id: number;
}

const buttonIsActive = computed(() => selectedArtists.value.length > 0);
const selectedArtists = ref<{ name: string; id: number }[]>([]);

const emit = defineEmits<{
  (event: "submit", artists: Artist[]): void;
}>();

defineProps<{ artists: Artist[] }>();

const submitSelection = () => {
  emit("submit", selectedArtists.value);
};

const handleClearAll = () => {
  selectedArtists.value = [];
  submitSelection();
};

watch(selectedArtists, (newValue) => {
  if (newValue.length > 3) {
    selectedArtists.value.shift();
  }
});
</script>
