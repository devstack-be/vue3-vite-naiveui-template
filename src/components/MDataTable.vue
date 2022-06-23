<script setup lang="ts">
import { ArrowSmUpIcon, ArrowSmDownIcon, SwitchVerticalIcon } from '@heroicons/vue/outline'
import { computed, ref, watchEffect } from 'vue'
import { useDebounce } from '@vueuse/core'

export type VFlexTableWrapperSortFunction<T = any> = (parameters: {
  key: string
  column: Partial<any>
  order: 'asc' | 'desc'
  a: T
  b: T
}) => number


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
  sort?: String
}
const emits = defineEmits<{
  (e: 'update:search', value: any): void
  (e: 'update:sort', value: any): void
}>()

const props = withDefaults(defineProps<MDataTableProps>(), {
  loading: false,
  columns: undefined,
  items: () => [],
  search: undefined,
})
//Data//
const rawData = ref<any[]>()
//Sort//
  
    const defaultSort = ref<String>('')
    const sort = computed({
      get: () => props.sort ?? defaultSort.value,
      set(value) {
        if (props.sort === undefined) {
          defaultSort.value = value
        } else {
          emits('update:sort', value)
        }
      },
    })
    const currentSortField = computed(() => sort.value?.includes(':') ? sort.value.split(':')[0] : '')
    const isAsc = (key: any) => sort.value === `${key}:asc`
    const isDesc = (key: any) => sort.value === `${key}:desc`

    const nextSort = (key:any) => {
      return isAsc(key)
        ? `${key}:desc`
        : isDesc(key)
        ? undefined
        : `${key}:asc`
    }

//Search//
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

//FilteredItems//
const filteredItems = computed(() => {
  let data = rawData.value
  if (searchTerm.value) {
    const searchableColumns = props.columns.filter((e) => {
      return e.searchable == true
    })
    if (searchableColumns.length > 0) {
      const _searchRegex = new RegExp(searchTerm.value, 'i')
      data = data.filter((row, index) => {
        return searchableColumns.some((column) => {
          if (!column.value) return false
          const value = String(row[column.value])
          if (typeof value === 'string') return value.match(_searchRegex)
          return false
        })
      })
    }
  }
  return data
})

const defaultSortFunction: VFlexTableWrapperSortFunction = ({ key, order, a, b }) => {
  const aValue = a[key]
  const bValue = b[key]

  if (typeof aValue === 'string') {
    if (order === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  }

  if (aValue > bValue) {
    return order === 'asc' ? 1 : -1
  }

  if (aValue < bValue) {
    return order === 'asc' ? -1 : 1
  }

  return 0
}

const sortedItems = computed(() => {
        let items = filteredItems.value
        if (sort.value && sort.value.includes(':')) {
        const [sortField, sortOrder] = sort.value.split(':') as [string, 'desc' | 'asc']

        const sortingColumn = props.columns.find((column) => {
          return column.sortable === true && column.value === sortField
        })

        if (sortingColumn) {
          const sorted = [...items]
          sorted.sort((a, b) => {
            return defaultSortFunction({
              order: sortOrder,
              column: sortingColumn,
              key: sortingColumn.value,
              a,
              b,
            })
          })
          items = sorted
        }
      }
      return items
})
    watchEffect(async () => {
      rawData.value = props.items
    })
    const data = computed(() => {
      if (!rawData.value) return rawData.value

      let data = sortedItems.value

      // paginate data
      return data
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
            :class="column.sortable && 'cursor-pointer'"
            @click.prevent="sort = nextSort(column.value)"
          >
            {{ column.text }}
            <Component
              :is="isAsc(column.value) ? ArrowSmUpIcon : ArrowSmDownIcon"
              v-if="sort && column.sortable && currentSortField === column.value"
              class="w-4 h-4 inline align-top"
            ></Component>
            <SwitchVerticalIcon v-else-if="column.sortable" class="opacity-50 w-4 h-4 inline align-top"/>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <Transition name="fade">
          <tr v-if="filteredItems.length === 0 && !loading">
            <td
              :colspan="columns?.length"
              class="italic text-center text-sm text-gray-400 px-6 py-4 whitespace-nowrap"
            >
              {{ items.length > 0 ? 'No matching records found' : 'No data available' }}
            </td>
          </tr>
        </Transition>
        <TransitionGroup name="list">
          <tr v-for="(item, i) in data" :key="i">
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
