<script setup lang="ts">
import { useSlots, useAttrs, computed } from 'vue'

export type VFieldProps = {
  label?: string
}

const props = withDefaults(defineProps<VFieldProps>(), {
  label: undefined,
})
const attrs = useAttrs()
const slots = useSlots()
const hasLabel = computed(() => Boolean(slots?.label?.() || props.label))

</script>

<template>
  <div
    class="field"
    v-bind="$attrs"
  >

    <template v-if="hasLabel">
      <label class="block text-sm font-medium text-gray-700">
        <slot name="label">{{ props.label }}</slot>
      </label>
      <slot></slot>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>
