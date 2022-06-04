<script setup lang="ts">
import { ref, onMounted, h } from "vue"
import { NButton, NTag, useNotification } from "naive-ui"
import Icon from "@/components/Icon.vue"
import { useRouter } from "vue-router"
import { useApi } from "@/composables/useApi"

const api = useApi()
const router = useRouter()
const notification = useNotification();
const deleteUser = async (id: number) => {
  api.delete(`http://localhost:5000/users/${id}`).then((response) => {
    notification.success({
      duration: 5000,
      content: "Users",
      meta: response.data.message,
    })
    data.value.splice(
      data.value.findIndex((e) => e.id === id),
      1
    );
  })
}
const columns = [
  {
    type: "selection",
  },
  {
    title: "Email",
    key: "email",
    sorter: "default",
  },
  {
    title: "Username",
    key: "username",
    sorter: "default",
  },
  {
    title: "Active",
    key: "is_active",
    render(row) {
      return h(
        NTag,
        { size: "small", type: row.is_active ? "success" : "error" },
        { default: () => (row.is_active ? "Activated" : "Disabled") }
      )
    },
  },
  {
    title: "Action",
    key: "actions",
    render(row) {
      return [
        h(
          NButton,
          {
            circle: true,
            quaternary: true,
            onClick: () =>
              router.push({ name: "users.edit", params: { id: row.id } }),
          },
          { icon: () => h(Icon, { type: "edit" }) }
        ),
        h(
          NButton,
          {
            type: "error",
            circle: true,
            tertiary: true,
            onClick: () => deleteUser(row.id),
          },
          { icon: () => h(Icon, { type: "destroy" }) }
        ),
      ]
    },
  },
]
const handleCheck = (rowKeys) => {
  checkedRowKeys.value = rowKeys
}
const pagination = {
  pageSize: 5,
}
const checkedRowKeys = ref([])
const data = ref([])
const filteredData = ref([])
const searchValue = ref()
const searchTrigger = async () => {
  filteredData.value = data.value.filter(
    (e) =>
      e.username.includes(searchValue.value) ||
      e.email.includes(searchValue.value)
  )
}
onMounted(() => {
  api.get("http://localhost:5000/users").then((response) => {
    data.value = response.data
    filteredData.value = response.data
  });
})
</script>
<template>
  <n-space vertical :size="12">
    <n-space>
      <n-input
        v-model:value="searchValue"
        placeholder="Search..."
        @input="searchTrigger"
      />
    </n-space>
    <n-data-table
      :columns="columns"
      :data="filteredData"
      :pagination="pagination"
      :row-key="(row) => row.id"
      @update:checked-row-keys="handleCheck"
    />
  </n-space>
</template>
