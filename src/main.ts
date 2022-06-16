import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import naive from "naive-ui";
import "vfonts/Lato.css";

import "@/css/helpers.css";

import "nprogress/nprogress.css";

import "mosha-vue-toastify/dist/style.css";
import moshaToast from "mosha-vue-toastify";

import { createApi } from "@/composables/useApi";

import Default from "@/layouts/default/default.vue";
import Auth from "@/layouts/auth.vue";

const app = createApp(App);
createApi();
app.use(naive);
app.use(moshaToast);
app.use(createPinia());
app.use(router);
app.component("DefaultLayout", Default)
app.component("AuthLayout", Auth)
app.mount("#app");
