<script lang="ts" setup>
import Festival from "./Festival.vue";
import Spinner from "./Spinner.vue";
import { computed } from "vue";
import { type Artist, type FestivalType } from "../types/types";

type Props = {
  festivals?: FestivalType[];
  isLoading?: boolean;
  selectedArtists?: Artist[];
};

const props = defineProps<Props>();

const fetchedFestivals = computed(() => props.festivals ?? []);
const receivedSelectedArtists = computed(() => props.selectedArtists ?? []);
</script>

<template>
  <div
    v-if="receivedSelectedArtists.length"
    class="max-w-sm flex-wrap lg:max-w-4xl 2xl:max-w-6xl mx-auto px-8 flex items-start justify-center gap-4 gap-y-12 py-8"
  >
    <div v-if="props.isLoading"><Spinner /></div>
    <div
      v-else-if="fetchedFestivals.length > 0"
      v-for="festival in fetchedFestivals"
      :key="festival.name"
      class="flex flex-col items-center"
    >
      <Festival :festival="festival" />
    </div>
    <div v-else>Error fetching festivals</div>
  </div>
  <div v-else class="text-center mt-10">
    <p>Search for your Festivals</p>
  </div>
</template>
