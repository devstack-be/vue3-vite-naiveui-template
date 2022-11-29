<script setup lang="ts">
import { ref } from "vue"
import { useNotification } from "naive-ui"
import type { FormInst, FormRules, FormItemRule, FormItemInst } from "naive-ui"
import { useApi } from "@/composables/useApi"
import { useRouter } from "vue-router";
import {t} from "@/i18n"

interface ModelType {
  password: string | null;
  confirm_password: string | null;
  email: string | null;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  is_active: boolean;
}

function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return (
    !!formValue.value.password &&
    formValue.value.password.startsWith(value) &&
    formValue.value.password.length >= value.length
  )
}
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === formValue.value.password
}
function handlePasswordInput() {
  if (formValue.value.confirm_password) {
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" })
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
  firstname: null,
  lastname: null,
  is_active: false,
})
const rules: FormRules = {
  email: {
    required: true,
    type: "email",
    trigger: ["input"],
    message: t("user.create.email.required"),
  },
  password: {
    required: true,
    trigger: ["input"],
    message: t("user.create.password.required"),
  },
  username: {
    required: true,
    trigger: ["input"],
    message: t("user.create.username.required"),
  },
  confirm_password: [
    {
      required: true,
      message: t("user.create.repassword.required"),
      trigger: ["input"],
    },
    {
      validator: validatePasswordStartWith,
      message: t("user.create.password.notsame"),
      trigger: "input",
    },
    {
      validator: validatePasswordSame,
      message: t("user.create.password.notsame"),
      trigger: ["input", "password-input"],
    },
  ],
  firstname: {
    required: false,
    trigger: ["input"],
    message: t("user.create.firstname.required"),
  },
  lastname: {
    trigger: ["input"],
    message: t("user.create.lastname.required"),
  },
  is_active: {
    required: true,
    message: t("user.create.activated.required"),
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
        .post("http://localhost:5000/users", formValue.value)
        .then((response) => {
          notification.success({
            duration: 5000,
            content: "Users",
            meta: response.data.message,
          })
          router.push({ name: "users" });
        })
        .catch((error) => console.log(error))
        .then(() => (formLoading.value = false))
    }
  })
}
</script>

<template>
  <n-space vertical>
    <n-form ref="formRef" :model="formValue" :rules="rules">
      <n-grid :span="24" :x-gap="24">
        <n-form-item-gi :span="12" :label="$t('user.create.email')" path="email">
          <n-input
            v-model:value="formValue.email"
            placeholder=""
            :input-props="{ type: 'email', autocomplete: 'off' }"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" :label="$t('user.create.username')" path="username">
          <n-input
            v-model:value="formValue.username"
            placeholder=""
            :input-props="{ autocomplete: 'none' }"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" path="password" :label="$t('user.create.password')">
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
          :label="$t('user.create.rePassword')"
        >
          <n-input
            v-model:value="formValue.confirm_password"
            placeholder=""
            :disabled="!formValue.password"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" :label="$t('user.create.firstName')" path="firstname">
          <n-input v-model:value="formValue.firstname" placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" :label="$t('user.create.lastName')" path="lastname">
          <n-input v-model:value="formValue.lastname" placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" :label="$t('user.create.activated')" path="is_active">
          <n-checkbox v-model:checked="formValue.is_active">
            {{t("user.create.activated")}}
          </n-checkbox>
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
                <Icon type="create" />
              </template>
              {{t("user.create.button")}}
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </n-space>
</template>
