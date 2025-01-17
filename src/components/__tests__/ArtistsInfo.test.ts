import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import ArtistInfo from "../ArtistInfo.vue";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { fetchArtist } from "../../api/artistApi";

const mockPostList = {
  artist: "Afrojack",
  Songs: [
    { title: "No Beef", length: 334000, colab: "Steve Aoki" },
    { title: "The Spark", length: 244000 },
    { title: "Dirty Sexy Money", length: 174000, colab: "David Guetta" },
  ],
};
describe("ArtistAccordion.vue", () => {
  const globalConfig = {
    global: {
      plugins: [VueQueryPlugin],

      components: {
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
      },
    },
  };
  beforeEach(() => {});

  it("renders artist name and songs when artist data is available", async () => {
    const artistId = 1;

    mount(ArtistInfo, {
      props: {
        artistId,
        artist: {
          artist: "John Doe",
          Songs: [
            { title: "Song 1", length: 180000 },
            { title: "Song 2", length: 200000, colab: "Jane Smith" },
          ],
        },
      },

      ...globalConfig,
    });
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPostList),
      })
    ) as Mock;
    const data = await fetchArtist(83108);
    expect(data.artist).toBe("Afrojack");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://festival-server-1.onrender.com/artist/83108"
    );
  });

  it("does not render songs when artist data is not available", () => {
    const artistId = 99;
    const wrapper = mount(ArtistInfo, {
      props: {
        artistId,
        artist: {
          artist: "",
          Songs: [],
        },
      },
      ...globalConfig,
    });

    expect(wrapper.text()).toContain("Artist not found");
    expect(wrapper.findAll("li").length).toBe(0);
  });
});
