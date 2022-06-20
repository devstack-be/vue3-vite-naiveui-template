<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { computed, watch } from 'vue'
import { NNotificationProvider } from 'naive-ui'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const default_layout = 'default'
const layout = computed(() => {
  return `${route.meta.layout || default_layout}-layout`
})
watch(
  () => userStore.isLoggedIn,
  (val) => {
    //logout
    if (!val) router.push({ name: 'login' })
  }
)
</script>

<template>
  <Notifications />
  <Component :is="layout">
    <RouterView v-slot="{ Component }">
      <Transition name="fade-slow" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </Component>
</template>
