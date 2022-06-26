<script lang="ts">
import { computed, h, VNode, defineComponent } from 'vue'
import Icon from '@/components/Icon.vue'
import { Messages as ValidatorMessages } from '@/utilities/form/validators'

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
    errors: {
      type: Array,
      default: []
    }
  },
  setup(props, { slots }) {
    const controlClasees = computed(() => [
      'control mt-1 relative',
      props.icon && 'has-icon'
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
    let validationIcon: VNode | null = null
    const getValidationIcon = () => {
      if (props.hasError) {
        validationIcon = h('div', 
        {
            class: 'absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'
        }, h(
            Icon, 
            {
              type: 'ExclamationCircleIconSolid', 
              class: 'h-5 w-5 text-red-500', 
              'aria-hidden': true,
            }
          ),
        )
    }else{
      validationIcon = null
    }
      return validationIcon
    }
    let validationMessage: VNode | null = null
    const getValidationMessage =  () => {
      if(props.hasError) {
        validationMessage = h('p', {
          class: 'mt-2 text-sm text-red-600 first-letter:uppercase',
        }, {
          default: () => {
            if(props.errors.length > 0) {
                if(ValidatorMessages.hasOwnProperty(props.errors[0].$property))
                  if(ValidatorMessages[props.errors[0].$property].hasOwnProperty(props.errors[0].$validator))
                    return ValidatorMessages[props.errors[0].$property][props.errors[0].$validator].message
              return props.errors[0].$message
            }
            return 'Unknown error'
      }})
      }else {
        validationMessage = null
      }
      return validationMessage
    }
    return () => {
      const slotDefault = slots.default?.()
      const slotExtra = slots.extra?.()
      return [h(
        'div',
        {
          class: controlClasees.value,
        },
        [divIcon, slotDefault, getValidationIcon(), slotExtra],
      ),
      getValidationMessage()
      ]
    }
  },
})
</script>