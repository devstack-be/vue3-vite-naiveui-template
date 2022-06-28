<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useI18n } from 'vue-i18n'
import { computed, watch } from 'vue'
const { locale: currentLocale, availableLocales } = useI18n()
const localFlagSrc = computed(() => {
  switch (currentLocale.value) {
    case 'fr':
      return '/images/flags/fr.svg'
    case 'en':
      return '/images/flags/en.svg'
    default:
      return '/images/flags/fr.svg'
  }
})
watch(currentLocale, () => {
  localStorage.setItem('locale', currentLocale.value)
})
</script>
<template>
                 <Menu as="div" class="ml-3 relative">
          <div>
            <MenuButton
              class="max-w-xs bg-white rounded-full flex items-center text-sm lg:rounded-md lg:hover:bg-gray-50"
            >
              <img class="h-6 w-6 rounded-full" :src="localFlagSrc" alt="LocaleFlag" />
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
              <MenuItem :disabled="currentLocale === locale" v-slot="{ active, disabled }" v-for="(locale, i) in availableLocales" :key="i">
                <a
                  @click.prevent="currentLocale = locale"
                  :class="[
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'cursor-pointer group flex items-center px-4 py-2 text-sm',
                    disabled ? 'opacity-60 cursor-not-allowed' : ''
                  ]"
                >
                  <span class="mr-1"><img class="h-6 w-6 rounded-full" :src="`/images/flags/${locale}.svg`" :alt="`${locale}Flag`" /></span>{{$t(locale)}}
                </a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
</template>