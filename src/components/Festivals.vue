<script lang="ts" setup>
import { watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getFestivalsByArtists } from "../services/festivalServices";
import Festival from "./Festival.vue";
import { type Artist, type FestivalType } from "../types/types";
import Spinner from "./Spinner.vue";

const props = defineProps<{ selectedArtists: Artist[] }>();

watch(
  () => props.selectedArtists,
  () => {
    if (props.selectedArtists?.length > 0) {
      fetchFestivalsQuery.refetch();
    }
  },
  { immediate: true }
);

const fetchFestivalsQuery = useQuery<FestivalType[]>({
  queryKey: ["festivals", props.selectedArtists],
  queryFn: () =>
    getFestivalsByArtists(props.selectedArtists.map((artist) => artist.id)),
  enabled: false,
});

const { data, isLoading } = fetchFestivalsQuery;
</script>

<template>
  <div
    v-if="props.selectedArtists.length > 0"
    class="max-w-sm flex-wrap lg:max-w-4xl 2xl:max-w-6xl mx-auto px-8 flex items-starts justify-center gap-4 gap-y-12 py-8"
  >
    <div v-if="isLoading"><Spinner /></div>
    <div
      v-else-if="data && data.length > 0"
      v-for="festival in data"
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
