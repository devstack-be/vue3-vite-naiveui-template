<script lang="ts" setup>
import {
  MenuAlt1Icon,
} from '@heroicons/vue/outline'
import { useThemeStore } from '@/stores/theme'
import LanguagesMenu from './LanguagesMenu.vue'
import ProfileMenu from './ProfileMenu.vue'
import NotificationsMenu from './NotificationsMenu.vue'
import SearchBar from './SearchBar.vue';
const themeStore = useThemeStore()
</script>

<template>
  <div
    class="relative flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none"
  >
    <button
      type="button"
      class="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
      @click="themeStore.setSidebarOpen(true)"
    >
      <span class="sr-only">Open sidebar</span>
      <MenuAlt1Icon class="h-6 w-6" aria-hidden="true" />
    </button>
    <!-- Top bar -->
    <div class="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <SearchBar/>
      <div class="ml-4 flex items-center md:ml-6">
        <NotificationsMenu/>
        <!-- Profile dropdown -->
         <ProfileMenu/>
         <!-- Language dropdown -->
         <LanguagesMenu/>
      </div>
    </div>
  </div>
</template>
