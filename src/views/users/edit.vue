<script setup lang="ts">
import { useApi } from "@/composables/useApi";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const api = useApi()
const route = useRoute();
const user = ref();
const fetchUser = async () => {
  api
    .get(`http://localhost:5000/users/${route.params.id}`)
    .then((response) => {
      user.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
}
onMounted(() => {
  fetchUser();
})
</script>

<template>
  <div v-if="user">
    <p>Todo: Editing user: {{ user.email }}</p>
  </div>
</template>
