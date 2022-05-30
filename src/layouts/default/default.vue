<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import Content from "./Content.vue";
import Footer from "./Footer.vue";
const userStore = useUserStore();
</script>

<template>
  <PreLoader v-if="userStore.isLoading" />
  <n-layout v-else-if="userStore.user" position="absolute" has-sider>
    <Sidebar />
    <n-layout>
      <Header />
      <Content />
      <Footer />
    </n-layout>
  </n-layout>
</template>
