<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNotification, type UploadCustomRequestOptions } from 'naive-ui'
import type { FormInst, FormRules, UploadFileInfo } from 'naive-ui'
import qs from 'qs'
import { defaultAvatar } from '@/config/app.config.js'

interface ModelType {
  email: string | null
  username: string | null
  firstname: string | null
  lastname: string | null
  confirmed: boolean
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
    confirmed: user.value ? user.value.confirmed : null,
  }
}
const formValue = ref<ModelType>(getFormValues())
const rules: FormRules = {
  email: {
    required: true,
    type: 'email',
    trigger: ['input'],
  },
  username: {
    required: false,
    trigger: ['input'],
  },
  firstname: {
    required: false,
    trigger: ['input'],
  },
  lastname: {
    trigger: ['input'],
  },
  confirmed: {
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
        .put(`users/${route.params.id}`, formValue.value)
        .then((response) => {
          notification.success({
            duration: 5000,
            content: 'Users',
            meta: 'User successfully updated!',
          })
          user.value = response.data
        })
        .catch((error) => {
          notification.error({
            duration: 5000,
            content: 'Users',
            meta: error ?? 'Unknown error',
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
  const query = qs.stringify({
    populate: ['avatar'],
  })
  api
    .get(`users/${route.params.id}?${query}`)
    .then((response) => {
      user.value = response.data
      //previewFileList.value[0].url = `http://localhost:5000/avatars/${user.value.avatar}`
    })
    .catch((error) => {
      console.log(error)
    })
}
onMounted(() => {
  fetchUser()
})
const previewFileList = ref<UploadFileInfo[]>([
  {
    id: 'avatar',
    name: 'avatar.png',
    status: 'finished',
    url: null,
  },
])
const customRequest = ({
  file,
  data,
  headers,
  withCredentials,
  action,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions) => {
  const formDataZ = new FormData()
  formDataZ.append('avatar', file.file as File)
  api
    .post(action as string, formDataZ, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      notification.success({
        duration: 5000,
        content: 'Avatar',
        meta: response.data.message,
      })
      onFinish()
    })
    .catch((error) => {
      console.log(error)
      notification.error({
        duration: 5000,
        content: 'Avatar',
        meta: error.response.data.message,
      })
      onError()
    })
}
</script>

<template>
  <n-space v-if="user" vertical>
    <n-avatar
      round
      :size="100"
      :src="user.avatar ? `http://localhost:1337${user.avatar.url}` : ' '"
      :fallback-src="defaultAvatar"
    />
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
        <n-form-item-gi :span="12" label="Confirmed" path="confirmed">
          <n-checkbox v-model:checked="formValue.confirmed"> Confirmed </n-checkbox>
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
