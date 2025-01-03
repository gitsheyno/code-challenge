import { mount } from "@vue/test-utils";
import SelectAtrists from "../SelectAtrists.vue";
import { describe, it, expect } from "vitest";
import PrimeVue from "primevue/config";
import { i18n } from "../../i18n";
import LanguageSwithcer from "../LanguageSwithcer.vue";
import LangSelector from "../LangSelector.vue";

describe("select artists", () => {
  it("renders the component", () => {
    const wrapper = mount(SelectAtrists, {
      props: {
        artists: [
          { name: "artists1", id: 1 },
          { name: "artists2", id: 2 },
          { name: "artists3", id: 3 },
          { name: "artists4", id: 4 },
        ],
      },
      global: { plugins: [i18n, PrimeVue] },
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("receives the list of artists", async () => {
    const wrapper = mount(SelectAtrists, {
      props: {
        artists: [
          { name: "artists1", id: 1 },
          { name: "artists2", id: 2 },
          { name: "artists3", id: 3 },
          { name: "artists4", id: 4 },
        ],
      },
      global: { plugins: [i18n, PrimeVue] },
    });

    expect(wrapper.props()).toStrictEqual({
      artists: [
        { name: "artists1", id: 1 },
        { name: "artists2", id: 2 },
        { name: "artists3", id: 3 },
        { name: "artists4", id: 4 },
      ],
    });

    await wrapper.setProps({ artists: undefined });
    expect(wrapper.props("artists")).toBeUndefined();
  });

  it("shows different language", async () => {
    const wrapper = mount(SelectAtrists, {
      props: {
        artists: [
          { name: "artists1", id: 1 },
          { name: "artists2", id: 2 },
          { name: "artists3", id: 3 },
          { name: "artists4", id: 4 },
        ],
      },
      global: { plugins: [i18n, PrimeVue] },
    });

    const child = wrapper.findComponent(LanguageSwithcer);

    const childWrapper = child.findComponent(LangSelector);

    const langCode = "fr";
    await childWrapper.vm.$emit("language-change", langCode);
    expect(wrapper.vm.$i18n.locale).toBe(langCode);
  });

  it("emits submit event with selected artists", async () => {
    const wrapper = mount(SelectAtrists, {
      props: {
        artists: [
          { name: "artists1", id: 1 },
          { name: "artists2", id: 2 },
          { name: "artists3", id: 3 },
          { name: "artists4", id: 4 },
        ],
      },
      global: { plugins: [i18n, PrimeVue] },
    });

    wrapper.vm.$emit("submit", [
      { name: "artists1", id: 1 },
      { name: "artists2", id: 2 },
    ]);

    expect(wrapper.emitted().submit).toBeTruthy();
    expect(wrapper.emitted().submit[0]).toEqual([
      [
        { name: "artists1", id: 1 },
        { name: "artists2", id: 2 },
      ],
    ]);

    wrapper.vm.selectedArtists = [{ name: "artists1", id: 1 }];
    expect(wrapper.vm.selectedArtists).toEqual([{ name: "artists1", id: 1 }]);

    wrapper.vm.handleClearAll();

    expect(wrapper.vm.selectedArtists).toEqual([]);
  });
});
