<script lang="ts" setup>
import { type ArtistData } from "../types/types";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import { computed } from "vue";

interface Props {
  artistInfo?: ArtistData;
  isError?: boolean;
}
const props = defineProps<Props>();

const artistInfo = computed<ArtistData>(
  () => props.artistInfo ?? { artist: "", Songs: [] }
);
const isError = computed(() => props.isError ?? false);
</script>

<template>
  <div class="card w-[100%] text-sm">
    <Accordion multiple>
      <AccordionPanel :value="artistInfo.artist" :disabled="!artistInfo.artist">
        <AccordionHeader>
          <p v-if="artistInfo.artist">{{ artistInfo.artist }}</p>
          <p v-else>Artist not found</p>
        </AccordionHeader>
        <AccordionContent v-if="isError">
          <p>Error fetching data</p>
        </AccordionContent>
        <AccordionContent v-else>
          <ul class="text-xs">
            <li v-for="song in artistInfo.Songs" :key="song.title">
              <p class="m-0">
                <strong>{{ song.title }}</strong> ({{ song.length / 1000 }}s)
                <span v-if="song.colab"> - Featuring {{ song.colab }}</span>
              </p>
            </li>
          </ul>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
