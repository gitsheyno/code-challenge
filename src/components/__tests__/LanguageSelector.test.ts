import { screen } from "@testing-library/vue";
import LangSelector from "../LangSelector.vue";
import { test, expect } from "vitest";
import { fireEvent } from "@testing-library/vue";
import { mount } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import { i18n } from "../../i18n";

test("it should work", async () => {
  const wrapper = mount(LangSelector, {
    props: {
      languages: [
        { name: "English", code: "en" },
        { name: "German", code: "de" },
        { name: "French", code: "fr" },
      ],
    },
    global: {
      plugins: [PrimeVue, i18n],
    },
  });

  const select = wrapper.find("[role=combobox]");
  expect(select.exists()).toBe(true);

  expect(wrapper.props().languages[0].name).toBe("English");
  expect(wrapper.get('[role="combobox"]').text()).toBe("English");

  const combobox = wrapper.get('[role="combobox"]');

  await combobox.trigger("change");

  wrapper.vm.$emit("language-change", "de");
  expect(wrapper.emitted("language-change")).toBeTruthy();
  expect(wrapper.emitted("language-change")).toEqual([["de"]]);

  wrapper.get('[role="combobox"]').trigger("click");

  const germanOption = await screen.findByText("German");
  await fireEvent.click(germanOption);

  expect(wrapper.get('[role="combobox"]').text()).toBe("German");
});
