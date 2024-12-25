<template>
  <div
    class="max-w-sm flex-wrap lg:max-w-4xl 2xl:max-w-6xl mx-auto px-8 flex items-starts justify-center gap-4 gap-y-12 py-8"
  >
    <div v-if="isLoading">Loading festivals...</div>
    <div v-else-if="isError">Error fetching festivals</div>
    <div
      v-else
      v-for="festival in data"
      :key="festival.name"
      class="flex flex-col items-center"
    >
      <Festival :festival="festival" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import Festival from "./Festival.vue";
interface Artist {
  name: string;
  id: number;
}

interface Festival {
  name: string;
  Artists: number[];
  url: string;
  branding: {
    mainColor: string;
    secondaryColor: string;
  };
}

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

const fetchFestivalsQuery = useQuery<Festival[]>({
  queryKey: ["festivals", props.selectedArtists],
  queryFn: fetchFestivals,
  enabled: false,
});

const { data, isLoading, isError } = fetchFestivalsQuery;
</script>

<style scoped>
.festival-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
}
</style>
