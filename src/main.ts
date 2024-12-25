import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { VueQueryPlugin } from "@tanstack/vue-query";

import { i18n } from "./i18n.ts";

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(i18n);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: "false",
    },
  },
});
app.mount("#app");
