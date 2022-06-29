<script lang="ts" setup>
import { BellIcon, TrashIcon, ChevronDownIcon, LogoutIcon, CogIcon } from '@heroicons/vue/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const people = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Miles',
    handle: 'floydmiles',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Selman',
    handle: 'emilyselman',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kristin Watson',
    handle: 'kristinwatson',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
</script>
<template>
  <Menu as="div" class="ml-3 relative">
    <div>
      <MenuButton
        class="text-gray-400 hover:text-gray-500 max-w-xs bg-white rounded-full flex items-center text-sm lg:p-1 lg:rounded-md"
      >
        <BellIcon class="h-6 w-6" aria-hidden="true" />
        <span class="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-indigo-500 animate-pulse" />
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
        class="z-10 origin-top-right absolute right-0 mt-2 w-80 rounded-md py-2 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="text-center mt-2 text-gray-800"><span class="relative">Notifications<span class="-top-1.5 -right-2.5 absolute block h-2 w-2 rounded-full ring-2 ring-white bg-indigo-500 animate-pulse" /></span></div>
        <div class="flow-root mt-4 p-5 py-2 bg-white max-h-[16rem] has-slimscroll">
          <ul role="list" class="-my-5 divide-y divide-gray-200">
            <li v-for="person in people" :key="person.handle" class="py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img class="h-8 w-8 rounded-full" :src="person.imageUrl" alt="" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ person.name }}
                  </p>
                  <p class="text-sm text-gray-500 truncate">
                    Sended you a message
                  </p>
                    <p class="text-xs text-gray-400">
                    just now
                  </p>
                </div>
                <div class="inline-flex items-center">
                    <button>
                        <TrashIcon class="h-5 w-5 text-gray-400 hover:text-gray-500" aria-hidden="true" />
                    </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="px-4">
          <a
            href="#"
            class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View all
          </a>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
