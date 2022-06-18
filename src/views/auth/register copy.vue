<script setup lang="ts">
import { ref } from 'vue'
import { useNotification } from 'naive-ui'
import type { FormInst, FormRules, FormItemRule, FormItemInst } from 'naive-ui'
import { parseErrors, useApi } from '@/composables/useApi'
import { useRouter } from 'vue-router'

interface ModelType {
  password: string | null
  confirm_password: string | null
  email: string | null
  username: string | null
}

function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return (
    !!formValue.value.password &&
    formValue.value.password.startsWith(value) &&
    formValue.value.password.length >= value.length
  )
}
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value != formValue.value.password
}
function handlePasswordInput() {
  if (formValue.value.confirm_password) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
  }
}
const api = useApi()
const router = useRouter()
const notification = useNotification()
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const formRef = ref<FormInst | null>(null)
const formLoading = ref(false)
const formValue = ref<ModelType>({
  password: null,
  confirm_password: null,
  email: null,
  username: null,
})
const rules: FormRules = {
  email: {
    required: false,
    type: 'email',
    trigger: ['input'],
  },
  password: {
    required: false,
    trigger: ['input'],
  },
  username: {
    required: true,
    trigger: ['input'],
  },
  confirm_password: [
    {
      required: true,
      message: 'Re-entered password is required',
      trigger: ['input'],
    },
  ],
}
const handleValidateButtonClick = async (e: MouseEvent) => {
  e.preventDefault()
  formLoading.value = true
  formRef.value?.validate((errors) => {
    if (errors) {
      formLoading.value = false
    } else {
      api
        .post('api/auth/register', formValue.value)
        .then((response) => {
          notification.success({
            duration: 5000,
            content: 'Auth',
            meta: 'Account created successfully!',
          })
          router.push({ name: 'login' })
        })
        .catch((error) => {
          notification.error({
            duration: 5000,
            content: 'Auth',
            meta: error
          })
        })
        .then(() => (formLoading.value = false))
    }
  })
}
</script>

<template>
  <n-h1 style="--font-size: 60px; --font-weight: 100">
    <img alt="Devstack logo" class="logo" src="@/assets/logo.png" width="100" />
    Devstack
  </n-h1>
  <n-card size="large" style="--padding-bottom: 30px">
    <n-h2 style="--font-weight: 400">Register</n-h2>
    <n-space vertical>
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
          <n-form-item-gi :span="12" path="password" label="Password">
            <n-input
              v-model:value="formValue.password"
              placeholder=""
              type="password"
              @input="handlePasswordInput"
              @keydown.enter.prevent
            />
          </n-form-item-gi>
          <n-form-item-gi
            ref="rPasswordFormItemRef"
            :span="12"
            first
            path="confirm_password"
            label="Re-enter Password"
          >
            <n-input
              v-model:value="formValue.confirm_password"
              placeholder=""
              :disabled="!formValue.password"
              type="password"
              @keydown.enter.prevent
            />
          </n-form-item-gi>
        </n-grid>
        <n-button
          attr-type="submit"
          type="primary"
          size="large"
          block
          :loading="formLoading"
          @click="handleValidateButtonClick"
        >
          <template #icon>
            <Icon type="save" />
          </template>
          Register</n-button
        >
      </n-form>
    </n-space>
    <n-space justify="center">
      <n-button
        text
        tag="a"
        @click.prevent="router.push({ name: 'login' })"
        type="primary"
      >
        Back to login
      </n-button>
    </n-space>
  </n-card>
</template>
<style scoped lang="scss">
.n-h1 {
  margin: 20vh auto 20px;
  text-align: center;
  text-align: -webkit-center;
  letter-spacing: 5px;
  opacity: 0.8;

  img {
    display: block;
  }
}
.n-card {
  margin: 0 auto;
  max-width: 700px;
  box-shadow: var(--box-shadow);
}
</style>
