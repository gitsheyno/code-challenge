import { mount } from "@vue/test-utils";
import LanguaeSwitcher from "../LanguageSwithcer.vue";
import LangSelector from "../LangSelector.vue";
import { it, expect } from "vitest";
import PrimeVue from "primevue/config";
import { i18n } from "../../i18n";

it("renders the LanguageSwithcer Component", async () => {
  const wrapper = mount(LanguaeSwitcher, {
    global: {
      plugins: [PrimeVue, i18n],
    },
  });

  expect(wrapper.exists()).toBe(true);
});

it("renders the LangSelector Component", async () => {
  const parentWrapper = mount(LanguaeSwitcher, {
    global: {
      plugins: [PrimeVue, i18n],
    },
  });

  const childWrapper = parentWrapper.findComponent(LangSelector);

  expect(childWrapper.exists()).toBe(true);
  expect(childWrapper.props().languages[0].name).toBe("English");
  expect(childWrapper.get('[role="combobox"]').text()).toBe("English");
});

it("emits the language-change event", async () => {
  const wrapper = mount(LanguaeSwitcher, {
    global: {
      plugins: [PrimeVue, i18n],
    },
  });

  const childWrapper = wrapper.findComponent(LangSelector);

  const langCode = "fr";
  childWrapper.vm.$emit("language-change", langCode);

  expect(wrapper.vm.$i18n.locale).toBe(langCode);
});
