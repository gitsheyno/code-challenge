<template>
  <div class="">
    <ArtistSelector @submit="handleArtistSelection" />
    <Festival :selectedArtists="selectedArtists" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ArtistSelector from "./SelectAtrists.vue";
import Festival from "./Festivals.vue";

const selectedArtists = ref<{ name: string; id: number }[]>([]);

const handleArtistSelection = (artists: { name: string; id: number }[]) => {
  selectedArtists.value = artists;
};
</script>
