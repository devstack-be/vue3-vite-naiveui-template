<template>
  <Component :is="icon" v-bind="props" v-if="!props.loading"></Component>
  <svg
    v-else
    class="animate-spin -ml-1 mr-3 h-5 w-5"
    v-bind="props"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</template>

<script lang="ts" setup>
import { ExclamationCircleIcon as ExclamationCircleIconSolid, TrashIcon as TrashIconSolid } from '@heroicons/vue/solid'
import {
  FilterIcon as FilterIconOutline,
  TrashIcon as TrashIconOutline,
  PencilIcon as PencilIconOutline,
  PlusIcon as PlusIconOutline,
  UserIcon as UserIconOutline,
  UserAddIcon as UserAddIconOutline,
  SaveIcon as SaveIconOutline,
  LockClosedIcon as LockClosedIconOutline,
  MailIcon as MailIconOutline,
  LoginIcon as LoginIconOutline,
} from '@heroicons/vue/outline'

const icons = {
  FilterIconOutline,
  TrashIconSolid,
  TrashIconOutline,
  PencilIconOutline,
  PlusIconOutline,
  UserIconOutline,
  UserAddIconOutline,
  ExclamationCircleIconSolid,
  SaveIconOutline,
  LockClosedIconOutline,
  MailIconOutline,
  LoginIconOutline,
}

type IconTypes = keyof typeof icons

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'fallback',
  },
})

const icon = icons[props.type as IconTypes]
</script>
