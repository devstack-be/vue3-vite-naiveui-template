<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'
export type MLabelColor =
  | 'primary'
  | 'secondary'
  | 'white'
  | 'success'
  | 'gray'

export default defineComponent({
  props: {
    color: {
      type: String as PropType<MLabelColor>,
      default: 'primary',
      validator: (value: MLabelColor) => {
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
            `MButton: invalid "${value}" color. Should be primary, secondary or white.`
          )
          return false
        }

        return true
      },
    },
    full: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: String,
      default: 'full',
    },
  },
  setup(props, { slots, attrs }) {
    const slotDefault = slots.default?.()
    const classes = computed(() => {
      return [
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium capitalize',
        `rounded-${props.rounded}`,
        props.full && 'w-full',
        getColors()
      ]
    })
    const getColors = () => {
      let colors = ''
      switch (props.color) {
        case 'white':
          colors = 'text-gray-700 text-gray-800'
          break;   
        case 'secondary':
          colors = 'bg-indigo-100 text-indigo-800'
          break;        
        case 'primary':
          colors = 'bg-indigo-200 text-indigo-800'
          break;
        case 'success':
          colors = 'bg-green-100 text-green-800'
          break;
        case 'gray': 
          colors = 'bg-gray-100 text-gray-800'
          break;
        default:
          colors = '' 
          break;
      }
      return colors
    }

    return () => {
      return h(
        'span',
        {
          ...attrs,
          class: [...classes.value],
        },
        slotDefault
      )
    }
  },
})
</script>