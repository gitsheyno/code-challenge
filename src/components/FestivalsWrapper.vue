<script lang="ts" setup>
import Festivals from "./Festivals.vue";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { type Artist, type FestivalType } from "../types/types";
import { getFestivalsByArtists } from "../services/festivalServices";

const props = defineProps<{ selectedArtists: Artist[] }>();

const fetchFestivalsQuery = useQuery<FestivalType[]>({
  queryKey: computed(() => [
    "festivals",
    JSON.stringify(props.selectedArtists),
  ]),
  queryFn: () => {
    return getFestivalsByArtists(
      props.selectedArtists.map((artist) => artist.id)
    );
  },
  enabled: computed(() => props.selectedArtists.length > 0),
});

const { data, isLoading } = fetchFestivalsQuery;
</script>
<template>
  <Festivals
    :festivals="data as FestivalType[]"
    :isLoading="isLoading"
    :selectedArtists="props.selectedArtists as Artist[]"
  />
</template>
