<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { computed, watch } from 'vue'

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
  <Component :is="layout">
    <RouterView />
  </Component>
</template>
