<script lang="ts">
import { computed, h, VNode, defineComponent } from 'vue'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  name: 'MControl',
  props: {
    icon: {
      type: String,
      default: undefined,
    },
    hasError: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const controlClasees = computed(() => [
      'control mt-1 relative rounded-md shadow-sm',
    ])

    let divIcon: VNode | null = null
    if (props.icon) {
        divIcon = h('div', 
        {
            class: 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'
        }, h(
            Icon, 
            {
              type: props.icon, 
              class: 'h-5 w-5 text-gray-400', 
              'aria-hidden': true,
            }
          ),
        )
    }

    return () => {
      const slotDefault = slots.default?.()
      const slotExtra = slots.extra?.()

      return h(
        'div',
        {
          class: controlClasees.value,
        },
        [divIcon,slotDefault, slotExtra]
      )
    }
  },
})
</script>