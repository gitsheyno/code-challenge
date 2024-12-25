<script lang="ts" setup>
import { ref } from "vue";
import ArtistInfo from "./ArtistInfo.vue";
import PlayIcon from "./PlayIcon.vue";
interface Festival {
  name: string;
  Artists: number[];
  url: string;
  branding: {
    mainColor: string;
    secondaryColor: string;
  };
}
type IconStyle = {
  fill: string;
  stroke: string;
};

const props = defineProps<{ festival: Festival }>();

const iconData = ref<IconStyle>({
  fill: props.festival?.branding.mainColor,
  stroke: "#fff",
});
const navigateToFestival = (url: string) => {
  window.open(url, "_blank");
};
</script>
<template>
  <div
    v-if="festival?.name"
    class="flex flex-col w-[350px] items-center justify-center rounded-2xl pt-4 shadow-[-5px_5px_14px_3px_rgba(0,_0,_0,_0.1)]"
    :style="`background: linear-gradient(to left, ${festival.branding.mainColor}, ${festival.branding.secondaryColor});`"
  >
    <div class="bg-white w-[100%] px-12 py-6 flex flex-col">
      <h2 class="text-2xl font-bold text-center">{{ festival.name }}</h2>
      <div class="flex justify-center pt-8">
        <PlayIcon :data="iconData" />
      </div>
      <div class="flex flex-col items-center mt-8">
        <p class="text-sm">{{ $t("FestivalTitle") }}</p>
        <div class="py-4 w-full">
          <div v-for="name in festival.Artists">
            <ArtistInfo :artistId="name" />
          </div>
        </div>
      </div>
    </div>
    <span class="py-6">
      <a
        @click="navigateToFestival(festival.url)"
        class="text-black text-3xl cursor-pointer font-bold"
        label="visit"
        variant="text"
        size="large"
        >{{ $t("BuyNow") }}</a
      >
    </span>
  </div>
  <div v-else-if="!festival?.name">
    <p>{{ festival }}</p>
  </div>
</template>
