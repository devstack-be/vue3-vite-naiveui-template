<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'
export type MCheckboxColor =
  | 'primary'
  | 'secondary'
  | 'white'
  | 'success'
  | 'gray'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      default: undefined
    },
    color: {
      type: String as PropType<MCheckboxColor>,
      default: 'primary',
      validator: (value: MCheckboxColor) => {
        // The value must match one of these strings
        if (
          [
            'primary',
            'secondary',
            'white',
            'success',
            'gray'
          ].indexOf(value) === -1
        ) {
          console.warn(
            `MInput: invalid "${value}" color. Should be primary, secondary or white.`
          )
          return false
        }

        return true
      },
    },
    rounded: {
      type: String,
      default: 'md',
    },
  },
  setup(props, { emit, slots, attrs }) {
    const slotDefault = slots.default?.()
    const classes = computed(() => {
      return [
        'h-4 w-4 mr-2',
        `rounded-${props.rounded}`,
        getColors()
      ]
    })
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
    return () => {
      return h('label', 
      {
        class: 'ml-2 text-sm text-gray-900'
      },
      [h(
        'input',
        {
          type: 'checkbox',
          ...attrs,
          class: [...classes.value],
          value: props.modelValue,
          onChange: (val:any) => emit('update:modelValue', Boolean(!props.modelValue))
        },
        slotDefault), props.label]
      )
    }
  },
})
</script>