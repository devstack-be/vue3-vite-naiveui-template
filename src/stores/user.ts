import { acceptHMRUpdate, defineStore } from "pinia";
import { computed, ref } from "vue";
import { usePreferredDark, useStorage } from "@vueuse/core";

export const useUserStore = defineStore("userStore", () => {
  const user = ref();
  const token = useStorage("token", null);
  const isLoggedIn = computed(
    () => token.value !== undefined && token.value !== "" && token.value != null
  )
  const isLoading = ref(false)
  const isDark = usePreferredDark()
  const sidebarCollapsed = useStorage("sidebarCollapsed", false);
  

  const toggleSidebarCollapsed = async () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  };
  const setLanguage = async (lang: string) => {
    localStorage.setItem("language", lang)
    user.value.language = lang
  }

  const setLoggedIn = async (data: any) => {
    token.value = data.access_token;
    user.value = data.user
  }
  const setUser = async (userData: any) => {
    user.value = userData
  }
  const setIsDark = async (value: boolean) => {
    isDark.value = value
  };
  const setIsLoading = async (value: boolean) => {
    isLoading.value = value
  };
  const logoutUser = async () => {
    user.value = undefined
    token.value = undefined
  };

  return {
    toggleSidebarCollapsed,
    sidebarCollapsed,
    setIsDark,
    isDark,
    setIsLoading,
    isLoading,
    logoutUser,
    setUser,
    setLoggedIn,
    isLoggedIn,
    token,
    user,
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
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
