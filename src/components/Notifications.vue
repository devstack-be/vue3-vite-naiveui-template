<script setup lang="ts">
import { CheckCircleIcon, InformationCircleIcon, ExclamationIcon, ExclamationCircleIcon  } from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'
</script>
<template>
<Teleport to="body">
  <NotificationGroup group="classic">
    <div
      class="z-50 fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none"
    >
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications, close }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div v-for="notification in notifications" :key="notification.id">
            <div class="mt-4 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon v-if="notification.type === 'success'" class="h-6 w-6 text-green-500" aria-hidden="true" />
                <InformationCircleIcon v-if="notification.type === 'info'" class="h-6 w-6 text-blue-500" aria-hidden="true" />
                <ExclamationCircleIcon v-if="notification.type === 'warning'" class="h-6 w-6 text-yellow-500" aria-hidden="true" />
                <ExclamationIcon v-if="notification.type === 'error'" class="h-6 w-6 text-red-500" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5"> 
                <p class="text-sm font-semibold text-gray-900">{{notification.title}}</p>
                <p class="mt-1 text-sm text-gray-500">{{notification.text}}</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex" v-if="!notification.notClosable">
                <button @click.prevent="close(notification.id)" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</Teleport>
</template>
