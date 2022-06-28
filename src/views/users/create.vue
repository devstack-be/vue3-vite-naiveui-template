<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useApi } from '@/composables/useApi'
import { useRouter } from 'vue-router'
import { notify } from 'notiwind'

import { useVuelidate } from '@vuelidate/core'
import { email, required, sameAs } from '@vuelidate/validators'

interface ModelType {
  password: string | null
  confirm_password: string | null
  email: string | null
  username: string | null
  is_active: boolean
}
const api = useApi()
const router = useRouter()
const formLoading = ref(false)
const formValue = reactive<ModelType>({
  password: null,
  confirm_password: null,
  email: null,
  username: null,
  is_active: false,
})
const passwordRef = computed(() => formValue.password)
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
const handleCreateClick = async (e: MouseEvent) => {
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
    .post('api/users', formValue)
    .then((_response: any) => {
      notify({
        group: 'classic',
        type: 'success',
        title: 'User',
        text: 'User created successfully!',
      })
      router.push({ name: 'users' })
    })
    .catch((error: any) => {
      if (error.response && error.response.data.errors) {
        $externalResults.value = error.response.data.errors
      }
      notify({
        group: 'classic',
        type: 'error',
        title: 'User',
        text: 'Validation failed!',
      })
    })
    .then(() => (formLoading.value = false))
}
</script>
<template>
  <main class="flex-1 pb-8">
    <div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between">
          <h2 class="mt-8 text-lg leading-6 font-medium text-gray-900">Create User</h2>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col mt-2">
          <form action="#" method="POST">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <MField class="col-span-6 sm:col-span-3" label="Email address">
                    <MControl
                      icon="MailIconOutline"
                      :has-error="v$.email.$error"
                      :errors="v$.email.$errors"
                    >
                      <MInput
                        type="email"
                        name="email"
                        id="email"
                        v-model="formValue.email"
                      />
                    </MControl>
                  </MField>
                  <MField class="col-span-6 sm:col-span-3" label="Username">
                    <MControl
                      icon="UserIconOutline"
                      :has-error="v$.username.$error"
                      :errors="v$.username.$errors"
                    >
                      <MInput
                        type="text"
                        name="username"
                        id="username"
                        v-model="formValue.username"
                      />
                    </MControl>
                  </MField>
                  <MField class="col-span-6 sm:col-span-3" label="Password">
                    <MControl
                      icon="LockClosedIconOutline"
                      :has-error="v$.password.$error"
                      :errors="v$.password.$errors"
                    >
                      <MInput
                        type="password"
                        name="password"
                        id="password"
                        v-model="formValue.password"
                      />
                    </MControl>
                  </MField>
                  <MField class="col-span-6 sm:col-span-3" label="Re-enter password">
                    <MControl
                      icon="LockClosedIconOutline"
                      :has-error="v$.confirm_password.$error"
                      :errors="v$.confirm_password.$errors"
                    >
                      <MInput
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        v-model="formValue.confirm_password"
                      />
                    </MControl>
                  </MField>
                  <MField class="flex items-center col-span-6 sm:col-span-3">
                    <MControl>
                      <MSimpleCheckbox
                        label="Is active"
                        name="is_active"
                        id="is_active"
                        v-model="formValue.is_active"
                      />
                    </MControl>
                  </MField>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <MButton
                  :disabled="v$.$invalid"
                  type="submit"
                  @click.prevent="handleCreateClick"
                  :loading="formLoading"
                  full
                  icon="PlusIconOutline"
                  >Create User</MButton
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
