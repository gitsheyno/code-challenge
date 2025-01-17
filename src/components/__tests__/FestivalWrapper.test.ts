import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, type Mock } from "vitest";
import FestivalsWrapper from "../FestivalsWrapper.vue";
import { fetchFestivals } from "../../api/festivalApi";
import { VueQueryPlugin } from "@tanstack/vue-query";

describe("ArtistAccordion.vue", () => {
  const globalConfig = {
    global: {
      plugins: [VueQueryPlugin],
    },
  };

  const mockFestivals = [
    {
      name: "Summerjam",
      branding: {
        mainColor: "#c32a39",
        secondaryColor: "#e76234",
      },
      Artists: [65102, 83105, 71114, 75467, 82105],
      url: "https://summerjam.de/de/",
    },
    {
      name: "SanHejmo",
      branding: {
        mainColor: "#b8b8d0",
        secondaryColor: "#fdc04f",
      },
      Artists: [83105, 71114, 77979, 82105, 70105],
      url: "https://www.sanhejmo.com/",
    },
    {
      name: "RockAmRing",
      branding: {
        mainColor: "#01013a",
        secondaryColor: "#f0f39d",
      },
      Artists: [66114, 83108, 71117, 69108, 73114],
      url: "https://www.rock-am-ring.com/",
    },
  ];
  it("renders artist name and songs when artist data is available", async () => {
    mount(FestivalsWrapper, {
      props: {
        selectedArtists: [
          { name: "Afrojack", id: 65102 },
          { name: "Bring Me The Horizon", id: 66114 },
          { name: "Electric Callboy", id: 69108 },
        ],
      },

      ...globalConfig,
    });
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFestivals),
      })
    ) as Mock;

    const data = await fetchFestivals([65102, 66114, 69108]);
    expect(data[0].name).toBe("Summerjam");

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("does not render Festivals by default", async () => {
    const wrapper = mount(FestivalsWrapper, {
      props: {
        selectedArtists: [],
      },

      ...globalConfig,
    });

    expect(wrapper.text()).toContain("Search for your Festivals");
    expect(wrapper.findAll("li").length).toBe(0);
  });
});
