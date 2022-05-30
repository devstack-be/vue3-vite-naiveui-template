<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import { darkTheme } from "naive-ui";
import { useUserStore } from "@/stores/user";
import { computed, watch } from "vue";

const router = useRouter();
const route = useRoute()
const userStore = useUserStore();
const themeOverrides = {
  common: {
    primaryColor: "#60a5fa",
    primaryColorHover: "#3b82f6",
    primaryColorPressed: "#4c1d95",
  },
  Form: {
    feedbackPadding: "4px 0 10px 2px",
  },
  Dropdown: {
    borderRadius: "6px",
  },
};

const theme = computed(() => (userStore.isDark ? darkTheme : null))

const default_layout = "default";
const layout = computed(() => {
  return `${route.meta.layout || default_layout}-layout`
});
watch(
  () => userStore.isLoggedIn,
  (val) => {
    //logout
    if (!val) router.push({ name: "login" });
  }
);
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-global-style />
    <n-notification-provider>
      <Component :is="layout">
        <RouterView />
      </Component>
    </n-notification-provider>
  </n-config-provider>
</template>
