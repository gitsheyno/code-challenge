import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import Festivals from "../Festivals.vue";
import Spinner from "../Spinner.vue";
import Festival from "../Festival.vue";
import { i18n } from "../../i18n";
import type { Artist, FestivalType } from "../../types/types";

type Props = {
  festivals?: FestivalType[];
  isLoading?: boolean;
  selectedArtists?: Artist[];
};

describe("Festivals.vue", () => {
  let props: Props;
  const globalConfig = {
    global: {
      plugins: [i18n],
    },
  };
  beforeEach(() => {
    props = {
      festivals: [
        {
          name: "Festival One",
          url: "https://example.com/festival-one",
          branding: { mainColor: "#000", secondaryColor: "#fff" },
          Artists: [],
        },
        {
          name: "Festival Two",
          url: "https://example.com/festival-two",
          branding: { mainColor: "#123", secondaryColor: "#456" },
          Artists: [],
        },
      ],
      isLoading: false,
      selectedArtists: [
        { id: 1, name: "Artist One" },
        { id: 2, name: "Artist Two" },
      ],
    };
  });

  it("renders a loading spinner when `isLoading` is true", () => {
    props.isLoading = true;
    const wrapper = mount(Festivals, { props, ...globalConfig });
    expect(wrapper.findComponent(Spinner).exists()).toBe(true);
    expect(wrapper.text()).not.toContain("Error fetching festivals");
    expect(wrapper.findAllComponents(Festival)).toHaveLength(0);
  });

  it("renders festivals when `isLoading` is false and `festivals` is provided", () => {
    props.isLoading = false;
    const wrapper = mount(Festivals, { props, ...globalConfig });
    const festivalComponents = wrapper.findAllComponents(Festival);

    expect(festivalComponents).toHaveLength(2);
    expect(festivalComponents[0].props("festival")).toEqual(
      props.festivals ? props.festivals[0] : []
    );
    expect(festivalComponents[1].props("festival")).toEqual(
      props.festivals ? props.festivals[1] : []
    );
  });

  it("renders an error message when `isLoading` is false and no festivals are provided", () => {
    props.isLoading = false;
    props.festivals = [];
    const wrapper = mount(Festivals, { props, ...globalConfig });

    expect(wrapper.text()).toContain("Error fetching festivals");
    expect(wrapper.findAllComponents(Festival)).toHaveLength(0);
  });

  it("renders a prompt to search when no `selectedArtists` are provided", () => {
    props.selectedArtists = [];
    const wrapper = mount(Festivals, { props, ...globalConfig });

    expect(wrapper.text()).toContain("Search for your Festivals");
    expect(wrapper.findAllComponents(Festival)).toHaveLength(0);
  });
});
