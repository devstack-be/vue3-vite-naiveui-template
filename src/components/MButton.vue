<script lang="ts">
import type { PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { computed, defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'
import Icon from '@/components/Icon.vue'
import { isMobileScreen } from '@/utilities/responsive'

export type MButtonColor =
  | 'primary'
  | 'secondary'
  | 'white'

export default defineComponent({
  props: {
    hiddenTextMobile: {
      type: Boolean,
      default: false,
    },
    to: {
      type: [Object, String] as PropType<RouteLocationRaw>,
      default: undefined,
    },
    href: {
      type: String,
      default: undefined,
    },
    color: {
      type: String as PropType<MButtonColor>,
      default: 'primary',
      validator: (value: MButtonColor) => {
        // The value must match one of these strings
        if (
          [
            'primary',
            'secondary',
            'white',
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
    icon: {
      type: String,
      default: undefined,
    },
    rounded: {
      type: String,
      default: 'md',
    },
    full: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const classes = computed(() => {
      return [
        'group relative flex justify-center py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
        props.disabled && 'disabled:opacity-60 disabled:cursor-not-allowed',
        `rounded-${props.rounded}`,
        props.full && 'w-full',
        getColors()
      ]
    })
    const getColors = () => {
      let colors = ''
      switch (props.color) {
        case 'primary':
          colors = 'border border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
          break;
        case 'secondary':
          colors = 'border border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500'
          break;
        case 'white':
          colors = 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500'
          break;
        default:
          colors = '' 
          break;
      }
      return colors
    }
    const getLoadingIconClasses = () => {
      let classes = ''
      switch (props.color) {
        case 'white':
          classes = 'text-gray-300'
          break;
        default:
          classes = 'text-white' 
          break;
      }
      return classes
    }
    const getChildrens = () => {
      const childrens = []
      if(props.loading) {
        childrens.push(h(
          Icon,
          {
            loading: true,
            class: getLoadingIconClasses()
          }
        ))
      }
      if (props.icon && (!props.loading || props.full)) {
        const icon = h(
            Icon, 
            {
              type: props.icon, 
              class: 'h-5 w-5 text-indigo-500 group-hover:text-indigo-400', 
              'aria-hidden': true,
            }
          )
        const span = h('span', {
            class: 'absolute left-0 inset-y-0 flex items-center pl-3'
        }, icon)
        
        childrens.push(
          props.full ? span : icon
        )
      }
        if ((!isMobileScreen.value && props.hiddenTextMobile) || !isMobileScreen.value || (isMobileScreen.value && !props.hiddenTextMobile))
          childrens.push(h('span', slots.default?.()))

      return childrens
    }

    return () => {
      if (props.to) {
        return h(
          RouterLink,
          {
            ...attrs,
            to: props.to,
            class: ['button', ...classes.value],
          },
          {
            default: getChildrens,
          }
        )
      } else if (props.href) {
        return h(
          'a',
          {
            ...attrs,
            href: props.href,
            class: classes.value,
          },
          {
            default: getChildrens,
          }
        )
      }

      return h(
        'button',
        {
          type: 'button',
          ...attrs,
          disabled: props.disabled,
          class: ['button', ...classes.value],
        },
        {
          default: getChildrens,
        }
      )
    }
  },
})
</script>