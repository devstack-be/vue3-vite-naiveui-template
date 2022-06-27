<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouteLocationOptions } from 'vue-router'

export interface MSimplePaginationProps {
  itemPerPage: number
  totalItems: number
  totalRaw: number
  currentPage?: number
  noRouter?: boolean
  routerQueryKey?: string
}

export interface MSimplePaginationEmits {
  (e: 'update:currentPage', currentPage: number): void
}

const emits = defineEmits<MSimplePaginationEmits>()
const props = withDefaults(defineProps<MSimplePaginationProps>(), {
  currentPage: 1,
  useRouter: true,
  routerQueryKey: 'page',
})

const route = useRoute()
const lastPage = computed(() => Math.ceil(props.totalItems / props.itemPerPage) || 1)

const paginatedLink = (page = 1) => {
  if (props.noRouter) {
    return {}
  }

  const _page = Math.max(1, Math.min(page, lastPage.value))
  const query: any = {
    ...route.query,
  }

  if (props.routerQueryKey) {
    query[props.routerQueryKey] = _page <= 1 ? undefined : _page
  }

  return {
    name: route.name,
    params: route.params,
    query,
  } as RouteLocationOptions
}
const handleLinkClick = (e: MouseEvent, page = 1) => {
  const _page = Math.max(1, Math.min(page, lastPage.value))
  emits('update:currentPage', _page)

  if (props.noRouter) {
    e.preventDefault()
    e.stopPropagation()

    return false
  }
}
</script>

<template>
  <nav
    class="bg-gray-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">
          {{
            totalItems === 0
              ? '0'
              : currentPage === 1
              ? '1'
              : Math.ceil(1 + (currentPage - 1) * itemPerPage)
          }}</span
        >
        to
        <span class="font-medium">{{
          Math.min(currentPage * itemPerPage, totalItems)
        }}</span>
        of <span class="font-medium">{{ totalItems }}</span> results
        <span v-if="totalItems != totalRaw"
          >(filtered from {{ totalRaw }} total entries)</span
        >
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end" v-if="lastPage > 1">
      <RouterLink
        :class="currentPage === 1 && 'opacity-60 cursor-not-allowed'"
        :to="paginatedLink(currentPage - 1)"
        tabindex="0"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
        @click="(e) => handleLinkClick(e, currentPage - 1)"
      >
        Previous
      </RouterLink>
      <RouterLink
        :class="currentPage === lastPage && 'opacity-60 cursor-not-allowed'"
        :to="paginatedLink(currentPage + 1)"
        tabindex="0"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
        @click="(e) => handleLinkClick(e, currentPage + 1)"
      >
        Next
      </RouterLink>
    </div>
  </nav>
</template>
