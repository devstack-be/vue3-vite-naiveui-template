<script setup lang="ts">
import {
  ArrowSmUpIcon,
  ArrowSmDownIcon,
  SwitchVerticalIcon,
} from '@heroicons/vue/outline'
import { computed, ref, watch, watchEffect } from 'vue'
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
  modelValue?: Array<number>
  items?: Array<any>
  columns?: Array<MDataTableHeaderType>
  loading?: boolean
  search?: String
  sort?: String
  limit?: number
  total?: number
  page?: number
  showSelect?: boolean
}
const emits = defineEmits<{
  (e: 'update:search', value: any): void
  (e: 'update:sort', value: any): void
  (e: 'update:limit', value: any): void
  (e: 'update:page', value: any): void
  (e: 'update:modelValue', value: Array<number>): void
}>()

const props = withDefaults(defineProps<MDataTableProps>(), {
  loading: false,
  columns: undefined,
  items: () => [],
  search: undefined,
  limit: undefined,
  total: undefined,
  page: undefined,
  showSelect: false,
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
const currentSortField = computed(() =>
  sort.value?.includes(':') ? sort.value.split(':')[0] : ''
)
const isAsc = (key: any) => sort.value === `${key}:asc`
const isDesc = (key: any) => sort.value === `${key}:desc`

const nextSort = (key: any) => {
  return isAsc(key) ? `${key}:desc` : isDesc(key) ? undefined : `${key}:asc`
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
const defaultPage = ref(1)
const page = computed({
  get: () => props.page ?? defaultPage.value,
  set(value) {
    if (props.page === undefined) {
      defaultPage.value = value
    } else {
      emits('update:page', value)
    }
  },
})
const defaultLimit = ref(10)
const limit = computed({
  get: () => Math.max(1, props.limit ?? defaultLimit.value),
  set(value) {
    if (props.limit === undefined) {
      defaultLimit.value = value
    } else {
      emits('update:limit', value)
    }
  },
})

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
  return data?.slice(start.value, start.value + limit.value)
})
const total = computed(() => props.total ?? sortedItems.value?.length ?? 0)
const start = computed(() => (page.value - 1) * limit.value)
const selectedRows = ref([])
const isAllSelectedOnPage = computed(
  () =>
    data.value &&
    data.value?.length > 0 &&
    data.value?.map((_) => _.id).every((val) => selectedRows.value.includes(val))
)
function toggleSelectAll() {
  if (isAllSelectedOnPage.value) {
    selectedRows.value = selectedRows.value.filter(
      (value) => !data.value?.map((_) => _.id).includes(value)
    )
  } else {
    selectedRows.value = selectedRows.value.concat(
      data.value?.map((_) => _.id).filter((v) => !selectedRows.value.includes(v))
    )
  }
}
watch(selectedRows, (val) => {
  emits('update:modelValue', val)
})
watch([searchTerm, limit], () => {
  if (page.value !== 1) {
    page.value = 1
  }
})
</script>
<template>
  <div
    class="align-middle min-w-full overflow-x-auto shadow overflow-hidden rounded-lg"
  >
    <div
      v-if="loading"
      class="h-0 inset-1/2 sticky flex items-center justify-center space-x-2 animate-[pulse_1s_ease-in-out_infinite]"
    >
      <div class="w-3 h-3 bg-indigo-400 rounded-full opacity-50"></div>
      <div class="w-3 h-3 bg-indigo-600 rounded-full opacity-50"></div>
      <div class="w-3 h-3 bg-indigo-800 rounded-full opacity-50"></div>
    </div>
    <div
      class="bg-white flex flex-col md:flex-row md:items-center py-3 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center flex-1">
        <div class="h-9 ml-auto flex items-center pr-2 md:pr-3">
          <div class="hidden md:flex px-2"><!----></div>
          <!----><!---->
          <div
            class="flex h-9 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            dusk="filter-selector"
          >
            <button
              aria-expanded="false"
              class="rounded active:outline-none active:ring focus:outline-none focus:ring"
              type="button"
            >
              <span class="sr-only">Filter Dropdown</span>
              <div
                class="toolbar-button flex items-center cursor-pointer select-none toolbar-button px-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                  class="inline-block"
                  role="presentation"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  ></path></svg
                ><!----><svg
                  class="flex-shrink-0 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                >
                  <path
                    class="fill-current"
                    d="M8.292893.292893c.390525-.390524 1.023689-.390524 1.414214 0 .390524.390525.390524 1.023689 0 1.414214l-4 4c-.390525.390524-1.023689.390524-1.414214 0l-4-4c-.390524-.390525-.390524-1.023689 0-1.414214.390525-.390524 1.023689-.390524 1.414214 0L5 3.585786 8.292893.292893z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
          <!---->
        </div>
      </div>
      <!---->
    </div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-if="showSelect"
            class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <MCheckbox
              :checked="isAllSelectedOnPage"
              name="all_selected"
              @click.stop="toggleSelectAll()"
            />
          </th>
          <th
            v-for="(column, k) in columns"
            :key="k"
            scope="col"
            :class="[
              column.align === 'start' ? 'pr-6 pl-2' : 'px-6',
              column.sortable && 'cursor-pointer',
            ]"
            class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            @click.prevent="sort = nextSort(column.value)"
          >
            {{ column.text }}
            <Component
              :is="isAsc(column.value) ? ArrowSmUpIcon : ArrowSmDownIcon"
              v-if="sort && column.sortable && currentSortField === column.value"
              class="w-4 h-4 inline align-top"
            ></Component>
            <SwitchVerticalIcon
              v-else-if="column.sortable"
              class="opacity-50 w-4 h-4 inline align-top"
            />
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <Transition name="fade">
          <tr v-if="filteredItems.length === 0 && !loading">
            <td
              colspan="100%"
              class="italic text-center text-sm text-gray-400 px-6 py-4 whitespace-nowrap"
            >
              {{ items.length > 0 ? 'No matching records found' : 'No data available' }}
            </td>
          </tr>
        </Transition>
        <TransitionGroup name="list">
          <tr v-for="(item, i) in data" :key="i">
            <td v-if="showSelect" class="text-sm text-gray-500 py-4 whitespace-nowrap">
              <MCheckbox v-model="selectedRows" :value="item.id" name="all_selected" />
            </td>
            <td
              v-for="(column, k) in columns"
              :key="k"
              :class="[column.cellClass, column.align === 'start' ? 'pr-6 pl-2' : 'px-6']"
              class="text-sm text-gray-500 py-4 whitespace-nowrap"
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
    <MSimplePagination
      v-model:current-page="page"
      :item-per-page="limit"
      :total-items="total"
      :total-raw="rawData.length"
      no-router
    ></MSimplePagination>
  </div>
</template>
