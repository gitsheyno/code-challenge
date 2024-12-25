<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { getArtistData } from "../services/artistsServices";
import { type ArtistData } from "../types/types";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
const props = defineProps<{ artistId: number }>();

const { data, isError } = useQuery<ArtistData>({
  queryKey: ["artist", props.artistId],
  queryFn: () => getArtistData(props.artistId),
});
</script>

<template>
  <div class="card w-[100%] text-sm">
    <Accordion multiple>
      <AccordionPanel :value="props.artistId" :disabled="!data">
        <AccordionHeader>
          <p v-if="data?.artist">{{ data?.artist }}</p>
          <p v-else>Artist not found</p>
        </AccordionHeader>
        <AccordionContent v-if="isError">
          <p>Error fetching data</p>
        </AccordionContent>
        <AccordionContent v-else>
          <ul class="text-xs">
            <li v-for="song in data?.Songs || []" :key="song.title">
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
