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
        :maxSelectedLabels="3"
        class="w-[70%] md:w-full"
      >
        <template #footer>
          <div class="p-3 flex justify-between">
            <Button
              label="Clear All"
              severity="danger"
              text
              size="small"
              icon="pi pi-times"
              @click="selectedArtists = []"
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

const buttonIsActive = computed(() => selectedArtists.value.length > 0);
// State variables
const selectedArtists = ref<{ name: string; id: number }[]>([]);
const artists = ref([
  { name: "Afrojack", id: 65102 },
  { name: "Bring Me The Horizon", id: 66114 },
  { name: "Electric Callboy", id: 69108 },
  { name: "FiNCH", id: 70105 },
  { name: "Greeen", id: 71114 },
  { name: "Guns N' Roses", id: 71117 },
  { name: "Iron Maiden", id: 73114 },
  { name: "K.I.Z", id: 75467 },
  { name: "Macklemore", id: 77979 },
  { name: "Papa Roach", id: 80971 },
  { name: "Rin", id: 82105 },
  { name: "Sido", id: 83105 },
  { name: "Slipknot", id: 83108 },
  { name: "Saberton", id: 83979 },
]);

// Emit event to parent
const emit = defineEmits<{
  (event: "submit", artists: { name: string; id: number }[]): void;
}>();

const submitSelection = () => {
  emit("submit", selectedArtists.value);
};

// Limit selection to 3 artists
watch(selectedArtists, (newValue) => {
  if (newValue.length > 3) {
    selectedArtists.value.shift();
  }
});
</script>
