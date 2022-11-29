<template>
  <n-result
    status="success"
    :title="$t('dashboard.title')"
    :description="$t('dashboard.subtitle')"
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
