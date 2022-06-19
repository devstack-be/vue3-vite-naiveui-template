<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { LockClosedIcon, MailIcon, SaveIcon } from '@heroicons/vue/outline'
import { ExclamationCircleIcon } from '@heroicons/vue/solid'
import { useApi } from '@/composables/useApi'
import { useRouter } from 'vue-router'
import { notify } from 'notiwind'

import { useVuelidate } from '@vuelidate/core'
import { email, required, sameAs, helpers } from '@vuelidate/validators'
import { Messages as ValidatorMessages } from '@/utilities/form/validators'

interface ModelType {
  password: string | null
  confirm_password: string | null
  email: string | null
  username: string | null
}
const api = useApi()
const router = useRouter()
const formLoading = ref(false)
const formValue = reactive<ModelType>({
  password: null,
  confirm_password: null,
  email: null,
  username: null,
})
const passwordRef = computed(() => formValue.password);
const rules = {
  username: { required },
  email: { required, email },
  password: { required },
  confirm_password: { required, sameAs: sameAs(passwordRef) },
}
const $externalResults = ref({}) // works with reactive({}) too.
const v$ = useVuelidate(rules, formValue, {
  $externalResults,
  $lazy: true,
  $autoDirty: true,
})
const handleRegisterClick = async (e: MouseEvent) => {
  e.preventDefault()
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    notify({
      group: 'classic',
      type: 'error',
      title: 'Auth',
      text: 'Please fill the form correctly!',
    })
    return
  }
  formLoading.value = true
  api
    .post('api/auth/register', formValue)
    .then((_response: any) => {
      notify({
        group: 'classic',
        type: 'success',
        title: 'Auth',
        text: 'Account created successfully!',
      })
      router.push({ name: 'login' })
    })
    .catch((error: any) => {
      if (error.response && error.response.data.errors) {
        $externalResults.value = error.response.data.errors
      }
      notify({
        group: 'classic',
        type: 'error',
        title: 'Auth',
        text: 'Validation failed!',
      })
    })
    .then(() => (formLoading.value = false))
}
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-14 w-auto" src="@/assets/logo.png" alt="Devstack" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Register an account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ ' ' }}
        <a
          @click.prevent="router.push({ name: 'login' })"
          class="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
        >
          log in here
        </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email address</label
            >
            <div class="mt-1 relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <MailIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                v-model="formValue.email"
                type="email"
                name="email"
                id="email"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
              <div
                v-if="v$.email.$error"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <p
              v-if="v$.email.$error"
              class="mt-2 text-sm text-red-600"
              id="email-error"
            >
              {{ ValidatorMessages.email[v$.email.$errors[0].$validator]?.message }}
            </p>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <LockClosedIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                v-model="formValue.password"
                type="password"
                name="password"
                id="password"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
                            <div
                v-if="v$.password.$error"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
                        <p
              v-if="v$.password.$error"
              class="mt-2 text-sm text-red-600 first-letter"
              id="password-error"
            >
               {{ ValidatorMessages.password[v$.password.$errors[0].$validator]?.message }}
            </p>
          </div>
          <div>
            <label for="confirm_password" class="block text-sm font-medium text-gray-700">
              Re-enter password
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <LockClosedIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                v-model="formValue.confirm_password"
                type="password"
                name="confirm_password"
                id="confirm_password"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
                                          <div
                v-if="v$.confirm_password.$error"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
                                    <p
              v-if="v$.confirm_password.$error"
              class="mt-2 text-sm text-red-600 first-letter"
              id="confirm_password-error"
            >
              {{ ValidatorMessages.confirm_password[v$.confirm_password.$errors[0].$validator]?.message }}
            </p>
          </div>
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <LockClosedIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                v-model="formValue.username"
                type="text"
                name="username"
                id="username"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
              <div
                v-if="v$.username.$error"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <p
              v-if="v$.username.$error"
              class="mt-2 text-sm text-red-600 first-letter"
              id="username-error"
            >
              {{ ValidatorMessages.username[v$.username.$errors[0].$validator]?.message }}
            </p>
          </div>
          <div>
            <button
              :disabled="v$.$invalid"
              @click.prevent="handleRegisterClick"
              type="submit"
              class="disabled:opacity-60 disabled:cursor-not-allowed group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                v-if="formLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <SaveIcon
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
