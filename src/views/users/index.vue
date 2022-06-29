<script setup lang="ts">
import { ref, onMounted, h, WritableComputedRef, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { SearchIcon } from '@heroicons/vue/outline'
import { MDataTableHeaderType } from '@/components/MDataTable.vue'
import { useI18n } from 'vue-i18n'
type RowData = {
  id: number
  email: string
  username: string
  is_active: boolean
}
const { t } = useI18n()
const columns: WritableComputedRef<MDataTableHeaderType> = computed(() => [
  {
    text: 'Id',
    align: 'start',
    sortable: true,
    searchable: true,
    value: 'id',
  },
  {
    text: t('fields.name'),
    sortable: false,
    searchable: false,
    value: 'username',
  },
  { text: t('fields.email.short'), value: 'email', sortable: true, searchable: true },
  { text: t('fields.status'), value: 'is_active', sortable: false, searchable: false },
  { text: '', value: 'actions', sortable: false, cellClass: 'text-right space-x-4', searchable: false },
])
const api = useApi()
const router = useRouter()
const deleteUser = async (id: number) => {
  if (id === 0) {
    data.value.splice(0, 1)
    return
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
const searchValue = ref()
const modalShow = ref(false)
const selectedUser = ref()
const selectedItems = ref([])
onMounted(() => {
  api.get('api/users').then((response) => {
    data.value = response.data.users
    total.value = response.data.usersCount
    isLoading.value = false
  })
})
</script>
<template>
  <main class="flex-1 pb-8">
    <div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h2 class="mt-8 text-lg leading-6 font-medium text-gray-900">{{ $t('users.title')}}</h2>
            <div class="mt-1 relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                v-model="searchValue"
                type="text"
                name="searchValue"
                id="searchValue"
                :placeholder="$t('search')"
                class="placeholder:opacity-50 h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 pl-10 sm:text-sm border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
            <MButton icon="UserAddIconOutline" :to="{name: 'users.create'}">{{$t('create')}}</MButton>
          </div>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col mt-2">
          <MDataTable v-model="selectedItems" show-select :search="searchValue" :loading="isLoading" :columns="columns" :items="data">
            <template #item.username="{ item }">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img
                    class="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ item.username }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ item.email }}
                  </div>
                </div>
              </div>
            </template>
            <template #item.is_active="{ item }">
              <MLabel :color="item.is_active ? 'success' : 'gray'"> {{ item.is_active ? 'Active' : 'Not active' }}</MLabel>
            </template>
            <template #item.actions="{ item }">
              <button @click.prevent="router.push({name: 'users.edit', params: {id: item.id}})"
                ><Icon type="PencilIconOutline" class="h-5 w-5 text-gray-400 hover:text-gray-500" /></button
              >
              <button @click.prevent=";(selectedUser = item.id), (modalShow = true)"
                ><Icon type="TrashIconOutline" class="h-5 w-5 text-gray-400 hover:text-gray-500" /></button
              >
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
