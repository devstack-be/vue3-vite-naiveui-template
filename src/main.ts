import { createApp } from "vue";
import { createPinia } from "pinia";

import i18n from './i18n'
import App from "./App.vue";
import router from "./router";

import "vfonts/Lato.css";

import "@/css/tailwind.css";
import "@/css/main.scss";
import "nprogress/nprogress.css";

import { createApi } from "@/composables/useApi";
import Notifications from 'notiwind'
import Default from "@/layouts/default/default.vue";
import Auth from "@/layouts/auth.vue";

const app = createApp(App);
createApi();
//app.use(naive);
app.use(Notifications);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.component("DefaultLayout", Default)
app.component("AuthLayout", Auth)
app.mount("#app");
