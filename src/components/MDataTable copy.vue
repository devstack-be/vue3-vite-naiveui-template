<script setup lang="ts">
export interface MDataTableHeaderType {
    text?: String
    align?: String
    sortable?: Boolean
    value?: String
}

export interface MDataTableProps {
  items?: any[]
  columns?: Array<MDataTableHeaderType>
  loading?: boolean
}

const props = withDefaults(defineProps<MDataTableProps>(), {
  loading: false,
  columns: undefined,
  items: () => [],
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
                  v-for="(column, k) in columns" :key="k"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{column.text}}
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200"
            >
            <TransitionGroup name="fade-slow">
              <tr v-for="user in items" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                        alt=""
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ user.username }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div class="text-sm text-gray-900">Title</div>
                  <div class="text-sm text-gray-500">Departement</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <span
                    :class="[
                      user.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800',
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                    ]"
                  >
                    {{ user.is_active ? 'Active' : 'Not active' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                <td
                  class="px-6 py-4 space-x-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <span class="cursor-pointer text-indigo-600 hover:text-indigo-900"
                    >Edit</span
                  >
                  <span
                    @click.prevent=";(selectedUser = user.id), (modalShow = true)"
                    class="cursor-pointer text-red-600 hover:text-red-900"
                    >Delete</span
                  >
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
                <span class="font-medium">{{ total }}</span> results
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