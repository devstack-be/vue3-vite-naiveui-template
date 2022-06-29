<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { notify } from 'notiwind'
import { isOptional } from '@/utilities/form/validators'

interface ModelType {
  email: string | null
  username: string | null
  firstname: string | null
  lastname: string | null
  is_active: boolean
  bio: string
}

const api = useApi()
const route = useRoute()
const user = ref()

const getFormValues = (): ModelType => {
  return {
    email: user.value ? user.value.email : null,
    username: user.value ? user.value.username : null,
    firstname: user.value ? user.value.firstname : null,
    lastname: user.value ? user.value.lastname : null,
    is_active: user.value ? user.value.is_active : null,
    bio: user.value ? user.value.bio : null,
  }
}

const formLoading = ref(false)
const formValue = reactive<ModelType>(getFormValues())
const rules = {
  username: { required },
  firstname: {},
  lastname: {},
  bio: { isOptional },
  email: { required, email },
  is_active: { required },
}
const $externalResults = ref({}) // works with reactive({}) too.
const v$ = useVuelidate(rules, formValue, {
  $externalResults,
  $lazy: true,
  $autoDirty: true,
})

watch(user, () => {
  Object.assign(formValue, getFormValues())
})
const fetchUser = async () => {
  api
    .get(`api/users/${route.params.id}`)
    .then((response) => {
      user.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}
const handleEditClick = async (e: MouseEvent) => {
  e.preventDefault()
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    notify({
      group: 'classic',
      type: 'error',
      title: 'User',
      text: 'Please fill the form correctly!',
    })
    return
  }
  formLoading.value = true
  api
    .patch(`api/users/${route.params.id}`, formValue)
    .then((_response: any) => {
      user.value = _response.data.user
      notify({
        group: 'classic',
        type: 'success',
        title: 'User',
        text: 'User updated successfully!',
      })
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
onMounted(() => {
  fetchUser()
})
</script>

<template>
  <main class="flex-1 pb-8">
    <div v-if="user">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between">
          <RouterLink :to="{name: 'users'}" class="leading-6 mt-5 text-gray-400 text-sm">Back to Users</RouterLink>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between">
          <h2 class="mt-8 text-lg leading-6 font-medium text-gray-900">Edit User</h2>
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
                  <MField class="col-span-6 sm:col-span-3" label="Firstname">
                    <MControl
                      :has-error="v$.firstname.$error"
                      :errors="v$.firstname.$errors"
                    >
                      <MInput
                        type="text"
                        name="firstname"
                        id="firstname"
                        v-model="formValue.firstname"
                      />
                    </MControl>
                  </MField>
                  <MField
                    class="col-span-6 sm:col-span-3"
                    label="Lastname"
                    for="lastname"
                  >
                    <MControl
                      :has-error="v$.lastname.$error"
                      :errors="v$.lastname.$errors"
                    >
                      <MInput
                        type="text"
                        name="lastname"
                        id="lastname"
                        v-model="formValue.lastname"
                      />
                    </MControl>
                  </MField>
                  <MField class="col-span-6 sm:col-span-3" label="Biography">
                    <MControl :has-error="v$.bio.$error" :errors="v$.bio.$errors">
                      <MTextarea
                        type="text"
                        rows="4"
                        name="bio"
                        id="bio"
                        v-model="formValue.bio"
                      />
                    </MControl>
                  </MField>
                  <MField class="flex items-center col-span-6 sm:col-span-3">
                    <MControl>
                      <MSimpleCheckbox
                                      label="Account activated"
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
                  @click.prevent="handleEditClick"
                  :loading="formLoading"
                  full
                  icon="PencilIconOutline"
                  >Edit User</MButton
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <PreLoader v-else />
  </main>
</template>
