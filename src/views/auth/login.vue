<script setup lang="ts">
import { ref } from "vue";
import { useNotification } from "naive-ui";
import type { FormInst, FormRules, FormValidationError } from "naive-ui";
import { useApi } from "@/composables/useApi";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

interface ModelType {
  email: string | null;
  password: string | null;
}

const api = useApi();
const router = useRouter();
const notification = useNotification();
const formRef = ref<FormInst | null>(null);
const formLoading = ref(false);
const userStore = useUserStore();
const formValue = ref<ModelType>({
  email: null,
  password: null,
});
const rules: FormRules = {
  email: {
    required: true,
    type: "email",
    trigger: ["input"],
  },
  password: {
    required: true,
    trigger: ["input"],
  },
};
const handleValidateButtonClick = async (e: MouseEvent) => {
  e.preventDefault();
  formLoading.value = true;
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      api
        .post("auth/login", formValue.value)
        .then((response) => {
          userStore.setLoggedIn(response.data);
          notification.success({
            closable: true,
            duration: 5000,
            content: "Auth",
            meta: `Welcome back, ${response.data.user.username}`,
          });
          router.push("/");
        })
        .catch((error) => {
          notification.error({
            duration: 3000,
            content: "Auth",
            meta: error.response?.data?.message ?? "Unknown error",
          });
        })
        .then(() => (formLoading.value = false));
    } else {
      formLoading.value = false;
    }
  });
};
</script>

<template>
  <n-h1 style="--font-size: 60px; --font-weight: 100">
    <img alt="Devstack logo" class="logo" src="@/assets/logo.png" width="100" />
    Devstack
  </n-h1>
  <n-card size="large" style="--padding-bottom: 30px">
    <n-h2 style="--font-weight: 400">Sign-in</n-h2>
    <n-space vertical>
      <n-form ref="formRef" :model="formValue" :rules="rules">
        <n-form-item-row label="E-mail" path="email">
          <n-input
            v-model:value="formValue.email"
            placeholder=""
            :input-props="{ type: 'email', autocomplete: 'off' }"
          />
        </n-form-item-row>
        <n-form-item-row path="password" label="Password">
          <n-input
            v-model:value="formValue.password"
            placeholder=""
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item-row>
        <n-button
          type="primary"
          size="large"
          block
          :loading="formLoading"
          @click="handleValidateButtonClick"
        >
          <template #icon>
            <Icon type="login" />
          </template>
          Sign in</n-button
        >
      </n-form>
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
  max-width: 380px;
  box-shadow: var(--box-shadow);
}
</style>
