<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'
export type MInputColor =
  | 'primary'
  | 'secondary'
  | 'white'
  | 'success'
  | 'gray'

export default defineComponent({
    emits: ['update:modelValue'],
  props: {
    modelValue: {
      required: true,
    },
    color: {
      type: String as PropType<MInputColor>,
      default: 'primary',
      validator: (value: MInputColor) => {
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
    full: {
      type: Boolean,
      default: true,
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
        'block text-sm',
        `rounded-${props.rounded}`,
        props.full && 'w-full',
        getColors()
      ]
    })
    const getColors = () => {
      let colors = ''
      switch (props.color) {     
        case 'primary':
          colors = 'focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
          break;
        default:
          colors = '' 
          break;
      }
      return colors
    }

    return () => {
      return h(
        'input',
        {
          ...attrs,
          class: [...classes.value],
          value: props.modelValue,
          onInput: (val:any) => emit('update:modelValue', val.target.value)
        },
        slotDefault
      )
    }
  },
})
</script>