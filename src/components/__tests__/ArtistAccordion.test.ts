import ArtisAcordion from "../ArtisAccordion.vue";
import { describe, expect, it } from "vitest";
import PrimeVue from "primevue/config";
import { mount } from "@vue/test-utils";

describe("artist accordion", () => {
  const globalConfig = {
    global: {
      plugins: [PrimeVue],
    },
  };

  const artistMock = {
    artist: "Afrojack",
    Songs: [
      { title: "No Beef", length: 334000, colab: "Steve Aoki" },
      { title: "The Spark", length: 244000 },
      { title: "Dirty Sexy Money", length: 174000, colab: "David Guetta" },
    ],
  };

  it("recieves artistInfo and error state as props", () => {
    const wrapper = mount(ArtisAcordion, {
      props: { artistInfo: artistMock, isError: false },
      ...globalConfig,
    });

    expect(wrapper.props("artistInfo")).toEqual(artistMock);
    expect(wrapper.props("isError")).toEqual(false);
  });

  it("renders artist details correctly", () => {
    const wrapper = mount(ArtisAcordion, {
      props: { artistInfo: artistMock, isError: false },
      ...globalConfig,
    });
    expect(wrapper.find("p").text()).toBe(artistMock.artist);
  });
});
