<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";
import { useApi } from "@/composables/useApi";

const api = useApi();
const router = useRouter()
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
      return row.is_active.toString();
    },
  },
  {
    title: "Action",
    key: "actions",
    render(row) {
      return h(
        NButton,
        {
          size: "small",
          onClick: () =>
            router.push({ name: "users.edit", params: { id: row.id } }),
        },
        { default: () => "Edit" }
      );
    },
  },
];
const handleCheck = (rowKeys) => {
  checkedRowKeys.value = rowKeys;
}
const pagination = {
  pageSize: 5,
};
const checkedRowKeys = ref([]);
const data = ref([]);
const filteredData = ref([]);
const searchValue = ref();
const searchTrigger = async () => {
  filteredData.value = data.value.filter(
    (e) =>
      e.username.includes(searchValue.value) ||
      e.email.includes(searchValue.value)
  );
}
onMounted(() => {
  api.get("http://localhost:5000/users").then((response) => {
    data.value = response.data;
    filteredData.value = response.data;
  })
});
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
