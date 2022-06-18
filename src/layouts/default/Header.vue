<script lang="ts" setup>
import {
  MenuAlt1Icon,
  ChevronDownIcon,
  BellIcon,
  SearchIcon,
  LogoutIcon,
  CogIcon,
} from '@heroicons/vue/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'
const themeStore = useThemeStore()
const userStore = useUserStore()
</script>

<template>
  <div
    class="relative flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none"
  >
    <button
      type="button"
      class="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
      @click="themeStore.setSidebarOpen(false)"
    >
      <span class="sr-only">Open sidebar</span>
      <MenuAlt1Icon class="h-6 w-6" aria-hidden="true" />
    </button>
    <!-- Search bar -->
    <div class="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div class="flex-1 flex">
        <form class="w-full flex md:ml-0" action="#" method="GET">
          <label for="search-field" class="sr-only">Search</label>
          <div class="relative w-full text-gray-400 focus-within:text-gray-600">
            <div
              class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
              aria-hidden="true"
            >
              <SearchIcon class="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              name="search-field"
              class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
              placeholder="Search transactions"
              type="search"
            />
          </div>
        </form>
      </div>
      <div class="ml-4 flex items-center md:ml-6">
        <button
          type="button"
          class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Profile dropdown -->
        <Menu as="div" class="ml-3 relative">
          <div>
            <MenuButton
              class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
            >
              <img class="h-8 w-8 rounded-full" src="@/assets/logo.png" alt="" />
              <span class="hidden ml-3 text-gray-700 text-sm font-medium lg:block"
                ><span class="sr-only">Open user menu for </span
                >{{ userStore.user.username }}</span
              >
              <ChevronDownIcon
                class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                aria-hidden="true"
              />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <a
                  :class="[
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'cursor-pointer group flex items-center px-4 py-2 text-sm',
                  ]"
                >
                  <CogIcon
                    class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Settings
                </a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  @click.prevent="userStore.logoutUser()"
                  :class="[
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'cursor-pointer group flex items-center px-4 py-2 text-sm',
                  ]"
                >
                  <LogoutIcon
                    class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Log out
                </a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>
