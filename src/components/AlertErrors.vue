<script setup lang="ts">
import type { PropType } from 'vue'

export interface ErrorsType {
  [key: string]: Array<String>,
};

const props = defineProps({
  errors: {
    type: Object as PropType<ErrorsType>,
    default: {}
  },
})
</script>
<template>
  <n-alert
    v-if="Object.keys(props.errors).length != 0"
    title="Error while validating"
    type="error"
  >
    <ul class="list-outside" v-for="(errors, t) in props.errors">
      <ul class="list-disc list-inside" v-for="error in errors">
        <li class="li-form-error">{{ error }}</li>
      </ul>
    </ul>
  </n-alert>
</template>
