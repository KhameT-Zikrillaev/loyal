<template>
  <div class="login__form">
    <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @submit.prevent="loginForm"
    >
      <a-form-item
        name="username"
        :rules="[{ required: true, message: 'Telefon raqamingizni kiriting !' }]"
      >
        <a-input v-model:value="formState.username" style="height: 50px; padding: 0 20px; font-size: 16px;">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[{ required: true, message: 'Parolingizni kiriting!' }]"
      >
        <a-input-password v-model:value="formState.password" style="height: 50px; padding: 0 20px; font-size: 16px;">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button :disabled="disabled" type="primary"  style="width: 100%;background-color: rgb(22, 196, 181); margin-top: 15px; height: 50px;" html-type="submit" class="login-form-button">
          Login
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { LockOutlined } from '@ant-design/icons-vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axiosCustom from "@/axiosConf";
import router from '@/router';

const accessToken = ref("");
const refreshToken = ref("");

const formState = reactive({
  username: '',
  password: '',
});

async function loginForm() {
  try {
    const response = await axiosCustom.post('auth/signin/', {
      password: formState.password,
      phone_number: formState.username
    });

    accessToken.value = response.data.data.tokens.accessToken.token;
    refreshToken.value = response.data.data.tokens.refreshToken.token;

    localStorage.setItem("access_token", accessToken.value);
    localStorage.setItem("refresh_token", refreshToken.value);

    // Show success toast
    toast.success("You are logged in successfully", {
      autoClose: 2000,
      theme: "colored"
    });

    setTimeout(() => {
      router.replace("/");
    }, 500);
  } catch (error) {
    console.log(error);
    toast.error("Login failed", {
      autoClose: 2000,
      theme: "colored"
    });
  }
}

const disabled = computed(() => {
  return !(formState.username && formState.password);
});

</script>

<style scoped>
.login__form {
  width: 100%;
  max-width: 100%;
  width: 400px;
  padding: 25px;
  box-shadow: 0 4px 10px #0000001a;
  border: 1px solid rgb(241, 241, 241);
  background-color: #FAFAFA;
  border-radius: 10px;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
