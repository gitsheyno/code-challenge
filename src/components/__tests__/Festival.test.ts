import { mount } from "@vue/test-utils";
import FestivalCard from "../Festival.vue";
import PlayIcon from "../PlayIcon.vue";
import PrimeVue from "primevue/config";
import { i18n } from "../../i18n";
import { type FestivalType } from "../../types/types";
import { describe, expect, it, vi } from "vitest";
import { VueQueryPlugin } from "@tanstack/vue-query";
import ArtistInfo from "../ArtistInfo.vue";

describe("FestivalCard.vue", () => {
  const mockFestival: FestivalType = {
    name: "Summer Fest",
    Artists: [1, 2, 3],
    url: "https://summerfest.com",
    branding: {
      mainColor: "#ff5733",
      secondaryColor: "#33c4ff",
    },
  };

  const globalConfig = {
    global: {
      plugins: [PrimeVue, i18n, VueQueryPlugin],
    },
  };

  it("renders festival details correctly", () => {
    const wrapper = mount(FestivalCard, {
      props: { festival: mockFestival },
      ...globalConfig,
    });
    expect(wrapper.find("h2").text()).toBe("Summer Fest");
    expect(wrapper.find(".text-sm").text()).toContain(
      "Your Artists at This Festival"
    );
    expect(wrapper.findAllComponents(ArtistInfo).length).toBe(3);
  });

  it("applies branding colors correctly", () => {
    const wrapper = mount(FestivalCard, {
      props: { festival: mockFestival },
      ...globalConfig,
    });

    const container = wrapper.find("div");
    expect(container.attributes("style")).toContain(
      `background: linear-gradient(to left, ${mockFestival.branding.mainColor}, ${mockFestival.branding.secondaryColor});`
    );
  });

  it("calls navigateToFestival when link is clicked", async () => {
    const wrapper = mount(FestivalCard, {
      props: { festival: mockFestival },
      ...globalConfig,
    });

    const mockOpen = vi.spyOn(window, "open").mockImplementation(() => null);

    await wrapper.find("a").trigger("click");

    expect(mockOpen).toHaveBeenCalledWith("https://summerfest.com", "_blank");
  });

  it("renders PlayIcon with correct iconData", () => {
    const wrapper = mount(FestivalCard, {
      props: { festival: mockFestival },
      ...globalConfig,
    });

    const playIcon = wrapper.findComponent(PlayIcon);
    expect(playIcon.props("data")).toEqual({
      out: mockFestival.branding.mainColor,
      in: "#fff",
    });
  });

  it("renders ArtistInfo components when Artists exist", () => {
    const wrapper = mount(FestivalCard, {
      props: { festival: { ...mockFestival, Artists: [1, 2] } },
      ...globalConfig,
    });

    expect(wrapper.findComponent(ArtistInfo).exists()).toBeTruthy();
    expect(wrapper.findAllComponents(ArtistInfo).length).toBe(2);
  });

  it("does not render ArtistInfo when Artists array is empty", () => {
    const wrapper = mount(FestivalCard, {
      props: { festival: { ...mockFestival, Artists: [] } },
      ...globalConfig,
    });

    expect(wrapper.findComponent(ArtistInfo).exists()).toBeFalsy();
    expect(wrapper.findAllComponents(ArtistInfo).length).toBe(0);
  });
});
