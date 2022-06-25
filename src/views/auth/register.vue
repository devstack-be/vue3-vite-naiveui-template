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
        <RouterLink
          :to="{ name: 'login' }"
          class="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
        >
          log in here
        </RouterLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
                    <MField label="Email address">
            <MControl icon="MailIconOutline" :has-error="v$.email.$error" :errors="v$.email.$errors">
              <MInput type="email" name="email" id="email" v-model="formValue.email"/>
            </MControl>
          </MField>
          <MField label="Password">
            <MControl icon="LockClosedIconOutline" :has-error="v$.password.$error" :errors="v$.password.$errors">
              <MInput type="password" name="password" id="password" v-model="formValue.password"/>
            </MControl>
          </MField>
          <MField label="Re-enter password">
            <MControl icon="LockClosedIconOutline" :has-error="v$.confirm_password.$error" :errors="v$.confirm_password.$errors">
              <MInput type="password" name="confirm_password" id="confirm_password" v-model="formValue.confirm_password"/>
            </MControl>
          </MField>
          <MField label="Username">
            <MControl icon="LockClosedIconOutline" :has-error="v$.username.$error" :errors="v$.username.$errors">
              <MInput type="text" name="username" id="username" v-model="formValue.username"/>
            </MControl>
          </MField>
          <div>
          <MButton :disabled="v$.$invalid" type="submit" @click.prevent="handleRegisterClick" 
            :loading="formLoading" full icon="SaveIconOutline">Register</MButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
