<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { SearchIcon } from '@heroicons/vue/outline'
import { MDataTableHeaderType } from '@/components/MDataTable.vue';
type RowData = {
  id: number
  email: string
  username: string
  is_active: boolean
}
const columns:Array<MDataTableHeaderType> = [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        { text: 'Status', value: 'is_active',  sortable: false  },
        { text: '', value: 'actions', sortable: false },
]
const api = useApi()
const router = useRouter()
const deleteUser = async (id: number) => {
  if(id === 0) {
        data.value.splice(
      0,
      1
    )
    return;
  }
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
          <MButton color="white" @click.prevent="deleteUser(0)"> Other action </MButton>
        </div>
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col mt-2">
        <MDataTable :loading="isLoading" :columns="columns" :items="data"
        >
        <template #item.is_active="{item}">
        <span
                    :class="[
                      item.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800',
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                    ]"
                  >
                    {{ item.is_active ? 'Active' : 'Not active' }}
                  </span>
        </template>
          <template #item.actions="{item}">
          <div class="text-right space-x-4">
            <span class="cursor-pointer text-indigo-600 hover:text-indigo-900"
                    >Edit</span
                  >
                  <span
                    @click.prevent=";(selectedUser = item.id), (modalShow = true)"
                    class="cursor-pointer text-red-600 hover:text-red-900"
                    >Delete</span
                  >
          </div>
          </template>
        </MDataTable>
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
