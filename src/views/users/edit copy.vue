<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNotification } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
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

const notification = useNotification()
const formRef = ref<FormInst | null>(null)
const formLoading = ref(false)
const getFormValues = (): ModelType => {
  return {
    email: user.value ? user.value.email : null,
    username: user.value ? user.value.username : null,
    firstname: user.value ? user.value.firstname : null,
    lastname: user.value ? user.value.lastname : null,
    is_active: user.value ? user.value.is_active : null,
    bio: user.value ? user.value.bio : null
  }
}
const formValue = ref<ModelType>(getFormValues())
const formErrors = ref({})
const rules: FormRules = {
  email: {
    required: true,
    type: 'email',
    trigger: ['input'],
  },
  username: {
    required: true,
    trigger: ['input'],
  },
  is_active: {
    required: true,
  },
}
const handleValidateButtonClick = async (e: MouseEvent) => {
  e.preventDefault()
  formLoading.value = true
  formRef.value?.validate((errors) => {
    if (errors) {
      formLoading.value = false
    } else {
      api
        .patch(`api/users/${route.params.id}`, formValue.value)
        .then((response) => {
          notification.success({
            duration: 5000,
            content: 'Users',
            meta: 'User updated successfully',
          })
        })
        .catch((error) => {
          formErrors.value = error.response.data.errors
            notification.error({
            duration: 5000,
            content: 'Users',
            meta: error.response.data.message,
          })
        })
        .then(() => (formLoading.value = false))
    }
  })
}
watch(user, () => {
  Object.assign(formValue.value, getFormValues())
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
onMounted(() => {
  fetchUser()
})
</script>

<template>
  <n-space v-if="user" vertical>
    <AlertErrors :errors="formErrors"/>
    <n-form ref="formRef" :model="formValue" :rules="rules">
      <n-grid :x-gap="24">
        <n-form-item-gi :span="12" label="E-mail" path="email">
          <n-input
            v-model:value="formValue.email"
            placeholder=""
            :input-props="{ type: 'email', autocomplete: 'off' }"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Username" path="username">
          <n-input
            v-model:value="formValue.username"
            placeholder=""
            :input-props="{ autocomplete: 'none' }"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Firstname" path="firstname">
          <n-input v-model:value="formValue.firstname" placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Lastname" path="lastname">
          <n-input v-model:value="formValue.lastname" placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Activated" path="is_active">
          <n-checkbox v-model:checked="formValue.is_active"> Activated </n-checkbox>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Biography" path="bio">
          <n-input clearable type="textarea" v-model:value="formValue.bio" placeholder="" />
        </n-form-item-gi>
      </n-grid>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
              :loading="formLoading"
              round
              type="primary"
              @click="handleValidateButtonClick"
            >
              <template #icon>
                <Icon type="save" />
              </template>
              Update
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </n-space>
</template>
