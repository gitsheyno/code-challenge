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
    <p>Search for you Festivals</p>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
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

const fetchFestivals = async () => {
  const artistIds = props.selectedArtists.map((artist) => artist.id);
  const response = await fetch("http://localhost:3000/getFestivalsByArtists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artistIds }),
  });

  if (!response.ok) {
    throw new Error("Error fetching festivals");
  }

  return await response.json();
};

const fetchFestivalsQuery = useQuery<FestivalType[]>({
  queryKey: ["festivals", props.selectedArtists],
  queryFn: fetchFestivals,
  enabled: false,
});
const { data, isLoading } = fetchFestivalsQuery;
</script>
