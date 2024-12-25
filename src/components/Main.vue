<template>
  <div class="">
    <ArtistSelector @submit="handleArtistSelection" :artists="artistList" />
    <Festivals :selectedArtists="selectedArtists" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ArtistSelector from "./SelectAtrists.vue";
import Festivals from "./Festivals.vue";
import { artists } from "../data/artists";

const selectedArtists = ref<{ name: string; id: number }[]>([]);
const artistList = ref(artists);

const handleArtistSelection = (artists: { name: string; id: number }[]) => {
  selectedArtists.value = artists;
};
</script>
