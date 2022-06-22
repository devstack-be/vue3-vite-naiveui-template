<script setup lang="ts">
import { ArrowSmUpIcon } from '@heroicons/vue/outline'
import { computed, ref } from 'vue'
import { useDebounce } from '@vueuse/core'
import { valuesIn } from 'lodash'
export interface MDataTableHeaderType {
  text?: String
  align?: String
  sortable?: Boolean
  value: String
  cellClass?: String
  searchable?: Boolean
}
export interface MDataTableProps {
  items?: Array<any>
  columns?: Array<MDataTableHeaderType>
  loading?: boolean
  search?: String
}
const emits = defineEmits<{
  (e: 'update:search', value: any): void
}>()

const props = withDefaults(defineProps<MDataTableProps>(), {
  loading: false,
  columns: undefined,
  items: () => [],
  search: undefined,
})

const searchableColumns = computed(() => {
  props.columns.forEach((e) => {
    console.log(e)
  })
})
//SEARCH//
const defaultSearchInput = ref<any>('')
const searchInput = computed<any>({
  get: () => props.search ?? defaultSearchInput.value,
  set(value) {
    if (props.search === undefined) {
      defaultSearchInput.value = value
    } else {
      emits('update:search', value)
    }
  },
})
const searchTerm = useDebounce(searchInput, 300)

const filteredItems = computed(() => {
  if (searchTerm.value) {
    const searchableColumns = props.columns.filter((e) => {
      return e.searchable == true
    })
    if (searchableColumns.length > 0) {
      const _searchRegex = new RegExp(searchTerm.value, 'i')
      const data = props.items.filter((row, index) => {
        return searchableColumns.some((column) => {
          if (!column.value) return false

          const value = String(row[column.value])
          console.log('search enabled')
          if (typeof value === 'string') return value.match(_searchRegex)

          return false
        })
      })
      return data
    }
  }
  return props.items
})
</script>
<template>
  <div
    class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
  >
    <div
      v-if="loading"
      class="h-0 inset-1/2 sticky flex items-center justify-center space-x-2 animate-[pulse_1s_ease-in-out_infinite]"
    >
      <div class="w-3 h-3 bg-indigo-400 rounded-full opacity-50"></div>
      <div class="w-3 h-3 bg-indigo-600 rounded-full opacity-50"></div>
      <div class="w-3 h-3 bg-indigo-800 rounded-full opacity-50"></div>
    </div>

    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th
            v-for="(column, k) in columns"
            :key="k"
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ column.text }}
            <ArrowSmUpIcon
              v-if="column.sortable"
              class="w-4 h-4 inline align-top"
            ></ArrowSmUpIcon>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <TransitionGroup name="fade-slow">
          <tr v-for="(item, i) in filteredItems" :key="i">
            <td
              v-for="(column, k) in columns"
              :key="k"
              :class="column.cellClass"
              class="text-sm text-gray-500 px-6 py-4 whitespace-nowrap"
            >
              <slot :name="`item.${column.value}`" :item="item">
                {{ item[column.value] }}
              </slot>
            </td>
          </tr>
        </TransitionGroup>
      </tbody>
    </table>
    <!-- Pagination -->
    <nav
      class="bg-gray-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div class="hidden sm:block">
        <p class="text-sm text-gray-700">
          Showing <span class="font-medium">1</span> to
          <span class="font-medium">10</span> of
          <span class="font-medium">500</span> results
        </p>
      </div>
      <div class="flex-1 flex justify-between sm:justify-end">
        <a
          href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous </a
        ><a
          href="#"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
    </nav>
  </div>
</template>
