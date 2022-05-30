<template>
  <n-result
    status="success"
    title="Dashboard"
    description="A dashboard template based on Vue.js 3, Vite and Naive-UI"
    size="huge"
  >
    <template #footer>
      <n-tooltip>
        <template #trigger>
          <n-a href="https://github.com/devstack-be" target="_blank">
            <Icon type="github" size="22" :depth="2" />
          </n-a>
        </template>
        View on GitHub
      </n-tooltip>
    </template>
  </n-result>
</template>
