<script setup lang="ts">
import {
  ChevronDownIcon,
  LogoutIcon,
  CogIcon,
} from '@heroicons/vue/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
<template>
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
              class="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                  {{$t('settings')}}
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
                  {{$t('logout')}}
                </a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
</template>