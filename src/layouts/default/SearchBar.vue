<script setup lang="ts">
import {
  SearchIcon,
} from '@heroicons/vue/outline'
</script>

<template>
    <div class="flex-1 flex">
        <form class="w-full flex md:ml-0" action="#" method="GET">
          <label for="search-field" class="sr-only">{{$t('search')}}</label>
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
              :placeholder="$t('search')"
              type="search"
            />
          </div>
        </form>
      </div>

</template>