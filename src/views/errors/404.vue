<script lang="ts" setup>
import { useRouter } from "vue-router"
const router = useRouter()
</script>
<template>
  <n-result
    status="404"
    title="404 Not Found"
    description="Oops! You weren't supposed to see this"
    size="huge"
  >
    <template #footer>
      <n-button @click="router.replace('/')">Back to Home →</n-button>
    </template>
  </n-result>
</template>
<style scoped>
.n-result {
  margin: 20vh auto 0;
}
</style>
