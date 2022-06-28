<script setup lang="ts">
import { computed } from 'vue'

export type MComplexCheckboxColor = 'primary' | 'info' | 'success' | 'warning' | 'danger'
export interface MComplexCheckboxEmits {
  (e: 'update:modelValue', value: (string | number)[]): void
}
export interface MComplexCheckboxProps {
  value?: string | number
  label?: string
  color?: MComplexCheckboxColor
  modelValue?: (string | number)[]
  rounded?: string
}

const emit = defineEmits<MComplexCheckboxEmits>()
const props = withDefaults(defineProps<MComplexCheckboxProps>(), {
  value: undefined,
  label: undefined,
  color: 'primary',
  modelValue: () => [],
  rounded: 'md',
})

const checked = computed(() => props.modelValue.includes(props.value))

function change() {
  const values = [...props.modelValue]

  if (checked.value) {
    values.splice(values.indexOf(props.value), 1)
  } else {
    values.push(props.value)
  }
  emit('update:modelValue', values)
}
    const getColors = () => {
      let colors = ''
      switch (props.color) {     
        case 'primary':
          colors = 'text-indigo-600 focus:ring-indigo-500 border-gray-300'
          break;
        default:
          colors = '' 
          break;
      }
      return colors
    }
</script>

<template>
  <label
    class="ml-2 text-sm text-gray-900"
  >
    <input
      type="checkbox"
      class="'h-4 w-4 mr-2"
      :class="[getColors(), props.rounded && `rounded-${props.rounded}`,]"
      :checked="checked"
      :value="props.value"
      v-bind="$attrs"
      @change="change"
    />
    <slot>{{ props.label }}</slot>
  </label>
</template>
