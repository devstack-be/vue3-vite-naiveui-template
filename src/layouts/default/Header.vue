<template>
  <n-layout-header bordered>
    <n-button class="reload" text @click="router.go(0)">
      <Icon type="refresh" size="20" :depth="2" />
    </n-button>
    <n-breadcrumb>
      <n-breadcrumb-item>Dashboard</n-breadcrumb-item>
    </n-breadcrumb>
    <n-space :size="20" align="center" style="line-height: 1">
      <n-dropdown placement="bottom-end" :options="options">
        <n-avatar size="small" round src="/images/avatars/svg/1.svg" />
      </n-dropdown>
      <n-dropdown @select="languageChanged" placement="bottom" :options="languageOptions">
        {{  locale  }}
      </n-dropdown>
      <n-button text circle type="error" @click.prevent="toggleDark()">
        <template #icon>
          <Icon v-if="isDark" type="sunny" />
          <Icon v-else type="moon" />
        </template>
      </n-button>
    </n-space>
  </n-layout-header>
</template>

<script lang="ts" setup>
import { h, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useDark, useToggle, useStorage } from '@vueuse/core';
import { NAvatar, NText, NButton } from "naive-ui";
import Icon from "@/components/Icon.vue";
import { useI18n } from 'vue-i18n';
const { t, locale, availableLocales } = useI18n({ useScope: 'global' })

const userStore = useUserStore();
const router = useRouter();
const isDark = useDark({
  onChanged(dark: boolean) {
    userStore.setIsDark(dark);
  },
});
const toggleDark = useToggle(isDark);
function renderCustomHeader() {
  return h(
    "div",
    {
      style: "display: flex; align-items: center; padding: 8px 12px;",
    },
    [
      h(NAvatar, {
        round: true,
        style: "margin-right: 12px;",
        src: "/images/avatars/svg/1.svg",
      }),
      h("div", null, [
        h("div", null, [
          h(NText, { depth: 2 }, { default: () => userStore.user?.username }),
        ]),
        h("div", { style: "font-size: 12px;" }, [
          h(NText, { depth: 3 }, { default: () => `${userStore.user?.email}` }),
        ]),
      ]),
    ]
  )
}

const languageOptions = computed(() => availableLocales.map(l => {
  return {
    key: l,
    label: l,

  }
}))

const languageChanged = (key: string) => {
  locale.value = key;
  localStorage.setItem("language",key)
}
const options = computed(() => [
  {
    key: "header",
    type: "render",
    render: renderCustomHeader,
  },
  {
    key: "header-divider",
    type: "divider",
  },
  {
    key: "settings",
    label: () => h(RouterLink, { to: "/" }, { default: () => t("account.settings") }),
    icon() {
      return h(Icon, { type: "settings" });
    },
  },
  { key: "divider", type: "divider" },
  {
    key: "logout",
    type: "render",
    render() {
      return h(
        "div",
        {
          style: "display: flex; align-items: center; padding: 8px 8px;",
        },
        [
          h(
            NButton,
            {
              onClick() {
                userStore.logoutUser()
              },
              block: true,
              type: "info",
              circle: true,
            },
            {
              default: () => t("account.signout"),
              icon: () => h(Icon, { type: "logout" }),
            }
          ),
        ]
      )
    },
  },
]);
</script>

<style scoped lang="scss">
.n-layout-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 9px 18px;
}

.n-button {
  margin-right: 15px;
}

.n-space {
  margin-left: auto;
}
</style>
