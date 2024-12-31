<template>
  <div>
    <ArtistSelector @submit="handleArtistSelection" :artists="artistList" />
    <FestivalsWrapper :selectedArtists="selectedArtists" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ArtistSelector from "./SelectAtrists.vue";
import { artists } from "../data/artists";
import FestivalsWrapper from "./FestivalsWrapper.vue";
const selectedArtists = ref<{ name: string; id: number }[]>([]);
const artistList = ref(artists);

const handleArtistSelection = (artists: { name: string; id: number }[]) => {
  selectedArtists.value = artists;
};
</script>
