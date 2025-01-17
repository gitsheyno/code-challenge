<template>
  <div>
    <ArtistSelector @submit="handleArtistSelection" :artists="artistList" />
    <FestivalsWrapper :selectedArtists="selectedArtists" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Artist } from "../types/types";
import { artists } from "../data/artists";
import ArtistSelector from "./SelectAtrists.vue";
import FestivalsWrapper from "./FestivalsWrapper.vue";

const selectedArtists = ref<Artist[]>([]);
const artistList = ref<Artist[]>(artists);

const handleArtistSelection = (artists: { name: string; id: number }[]) => {
  selectedArtists.value = artists;
};
</script>
