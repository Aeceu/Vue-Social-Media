<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import { POSITION, useToast } from 'vue-toastification'
import { OhVueIcon as Vicon } from 'oh-vue-icons'

const toast = useToast()
const userStore = useUserStore()

const showPass = ref(false)
const formData = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  repassword: '',
})

const handleSubmit = () => {
  if (!formData.value.email || !formData.value.password)
    return toast.error('Please fill up the fields!', {
      position: POSITION.TOP_RIGHT,
    })

  if (formData.value.password !== formData.value.repassword) {
    return toast.error("Password doesn't match!")
  }
  userStore.handleSignup({
    id: Math.random().toString(),
    email: formData.value.email,
    password: formData.value.password,
    firstName: formData.value.firstName,
    lastName: formData.value.lastName,
  })
}
</script>
<template>
  <div class="signup">
    <div class="signup-left">
      <form @submit.prevent="handleSubmit">
        <h1 class="form-header">Signup an account</h1>
        <div class="name-group">
          <span class="form-group">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" v-model="formData.firstName" />
          </span>
          <span class="form-group">
            <label for="lastName">LastName</label>
            <input type="text" id="lastName" v-model="formData.lastName" />
          </span>
        </div>
        <span class="form-group">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="formData.email" />
        </span>
        <span class="form-group">
          <label for="password">Password</label>
          <div class="password-container">
            <input
              v-bind:type="showPass ? 'text' : 'password'"
              id="password"
              v-model="formData.password"
            />
            <Vicon
              @click="showPass = false"
              v-if="showPass === true"
              name="fa-eye"
              class="password-icon"
            />
            <Vicon @click="showPass = true" v-else name="fa-eye-slash" class="password-icon" />
          </div>
        </span>
        <span class="form-group">
          <label for="password">Retype - Password</label>
          <div class="password-container">
            <input
              v-bind:type="showPass ? 'text' : 'password'"
              id="password"
              v-model="formData.repassword"
            />
            <Vicon
              @click="showPass = false"
              v-if="showPass === true"
              name="fa-eye"
              class="password-icon"
            />
            <Vicon @click="showPass = true" v-else name="fa-eye-slash" class="password-icon" />
          </div>
        </span>
        <span style="margin-top: 1em" class="form-group">
          <button class="btn">Signup</button>
          <div class="separator">
            <el-divider />
            or
            <el-divider />
          </div>
          <RouterLink to="/login" class="link"> Login </RouterLink>
        </span>
      </form>
    </div>
    <div class="signup-right">
      <div class="overlay" />
      <div></div>
    </div>
  </div>
</template>

<style scoped>
* {
  /* border: 1px solid red !important; */
}

.signup {
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;

  .signup-left {
    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3em;

    form {
      width: 600px;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      gap: 1em;

      .form-header {
        text-align: center;
        color: var(--color-green);
        text-shadow: 3px 3px #1c1c1c;

        font-size: 56px;
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        font-style: normal;
      }
      .name-group {
        width: 100%;
        display: flex;
        gap: 1em;
      }

      .form-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
      }

      input {
        width: 100%;
        padding: 1em;
        background-color: inherit;
        outline: none;
        color: var(--color-text);

        /* border-radius: 0.5em; */
        font-size: 16px;
        border: 1px solid #1c1c1c;
        box-shadow: 8px 8px 0px 0px var(--color-green);
      }

      .password-container {
        display: flex;
        align-items: center;
        justify-content: end;
      }

      .password-icon {
        width: 30px;
        height: 30px;

        position: absolute;
        margin-right: 10px;
      }

      .password-icon:hover {
        cursor: pointer;
        color: var(--color-green);
        scale: 1.1;
        animation-duration: 300;
        transition: all 0.3s;
      }

      .btn {
        padding: 1em;
        /* border-radius: 0.5em; */

        font-size: 16px;
        border: 1px solid #1c1c1c;
        color: var(--color-background);
        background-color: var(--color-green);
        box-shadow: 8px 8px 0px 0px #1c1c1c;
      }

      .btn:hover {
        cursor: pointer;
        scale: 1.01;
        animation-duration: 300;
        transition: all 0.3s;
      }

      .link {
        width: 100%;
        color: black;
        padding: 1em;
        text-decoration: none;
        text-align: center;

        /* border-radius: 0.5em; */
        font-size: 16px;
        color: var(--color-background);
        background-color: var(--color-green);
        box-shadow: 8px 8px 0px 0px #1c1c1c;
      }

      .link:hover {
        cursor: pointer;
        scale: 1.01;
        animation-duration: 300;
        transition: all 0.3s;
      }

      .separator {
        display: flex;
        align-items: center;
        gap: 1em;
      }
    }
  }

  .signup-right {
    width: 50%;
    height: 100%;

    background: url('https://images.pexels.com/photos/367273/pexels-photo-367273.jpeg?auto=compress&cs=tinysrgb&w=2560&h=1440&dpr=1');
    background-repeat: none;
    background-size: cover;
    background-position: center;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px;

    .bg-cover {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      object-fit: cover;
    }

    .overlay {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      background: rgba(28, 28, 28, 0.7);
    }
  }
}
</style>
