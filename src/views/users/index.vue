<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { SearchIcon } from '@heroicons/vue/outline'
type RowData = {
  id: number
  email: string
  username: string
  is_active: boolean
}

const api = useApi()
const router = useRouter()
const deleteUser = async (id: number) => {
  api.delete(`api/users/${id}`).then((response) => {
    modalShow.value = false
    data.value.splice(
      data.value.findIndex((e) => e.id === id),
      1
    )
  })
}
const isLoading = ref(true)
const total = ref()
const data = ref<RowData[] | []>([])
const filteredData = ref<RowData[] | []>([])
const searchValue = ref()
const searchTrigger = async () => {
  filteredData.value = data.value.filter(
    (e) => e.username.includes(searchValue.value) || e.email.includes(searchValue.value)
  )
}
const modalShow = ref(false)
const selectedUser = ref()
onMounted(() => {
  api.get('api/users').then((response) => {
    data.value = response.data.users
    filteredData.value = response.data.users
    total.value = response.data.usersCount
    isLoading.value = false
  })
})
</script>
<template>
  <main class="flex-1 pb-8">
  <div class="mt-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="mt-8 text-lg leading-6 font-medium text-gray-900">Users</h2>
          <div class="mt-1 relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              @input="searchTrigger"
              v-model="searchValue"
              type="text"
              name="searchValue"
              id="searchValue"
              placeholder="Search.."
              class="placeholder:opacity-50 h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
          <MButton icon="UserAddIconOutline">Create user</MButton>
          <MButton color="white"> Other action </MButton>
        </div>
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col mt-2">
        <div
          class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
        >
          <div
            v-if="isLoading"
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
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200"
              tag="tbody"
              name="list"
              is="transition-group"
            >
              <tr v-for="user in filteredData" :key="user.id">
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
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">Title</div>
                  <div class="text-sm text-gray-500">Departement</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
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
      </div>
    </div>
  </div>
  <Modal @close="modalShow = false" :show="modalShow" title="Delete User">
    <template #content>
      Are you sure you want to delete this user? All of his data will be permanently
      removed from our servers forever. This action cannot be undone.
    </template>
    <template #action>
      <button
        @click.prevent="deleteUser(selectedUser)"
        type="button"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Delete
      </button>
    </template>
  </Modal>

  </main>

</template>
