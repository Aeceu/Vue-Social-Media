<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const userStore = useUserStore()

const formData = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
})

const handleSubmit = () => {
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
  <div class="login">
    <form @submit.prevent="handleSubmit">
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
        <input type="password" id="password" v-model="formData.password" />
      </span>
      <span class="form-group">
        <button class="btn">Signup</button>
        <div class="separator">
          <div class="line" />
          or
          <div class="line" />
        </div>
        <RouterLink to="/login" class="link"> Login </RouterLink>
      </span>
    </form>
  </div>
</template>

<style scoped>
* {
  /* border: 1px solid red !important; */
}

.login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 1em;
  width: 400px;
  height: 600px;
}

.name-group {
  display: flex;
  gap: 1em;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

input {
  width: 100%;
  padding: 1em;
  background-color: inherit;
  border: 1px solid var(--color-background-mute);
  outline: none;
  color: white;
  border-radius: 0.5em;
}

.btn {
  padding: 1em;
  border: none;
  border-radius: 0.5em;
}

.link {
  width: 100%;
  background: white;
  color: black;
  padding: 0.5em;
  border: none;
  border-radius: 0.5em;
  text-decoration: none;
  text-align: center;
}

.separator {
  display: flex;
  align-items: center;
  gap: 1em;
}

.line {
  width: 100%;
  height: 1px;
  background-color: var(--color-background-mute);
}
</style>
