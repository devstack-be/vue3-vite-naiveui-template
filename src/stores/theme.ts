import { acceptHMRUpdate, defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useThemeStore = defineStore("themeStore", () => {
  const sidebarOpen = useStorage("sidebarOpen", false);
  const setSidebarOpen = async (val: boolean) => {
    sidebarOpen.value = val
  };
  return {
    setSidebarOpen,
    sidebarOpen,
  } as const;
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
}
