<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import Content from "./Content.vue";
import Footer from "./Footer.vue";
import Layout from "./Layout.vue";
const userStore = useUserStore();
</script>

<template>
  <PreLoader v-if="userStore.isLoading" />
  <div v-else-if="userStore.user" class="min-h-full">
    <Sidebar />
    <Layout>
      <Header />
      <Content />
      <Footer />
    </Layout>
  </div>
</template>
