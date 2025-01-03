<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { getArtistData } from "../services/artistsServices";
import { type ArtistData } from "../types/types";
import ArtisAcordion from "./ArtisAccordion.vue";
import { ref } from "vue";
const props = defineProps<{ artistId: number }>();

const { data, isError } = useQuery<ArtistData>({
  queryKey: ["artist", props.artistId],
  queryFn: () => getArtistData(props.artistId),
});

const artistData = ref(data);
</script>

<template>
  <ArtisAcordion :isError="isError" :artistInfo="artistData as ArtistData" />
</template>
