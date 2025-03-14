<script lang="ts" setup>
import { useUserStore } from '@/stores/counter'

const userStore = useUserStore()

const handleSetUser = () => {
  userStore.setUser({
    id: '1',
    firstName: 'Jose',
    lastName: 'Acebuche',
    email: 'joseacebuche2@gmail.com',
    password: '136721',
  })
}

const handleLogout = () => {
  userStore.setUser(null)
}
</script>

<template>
  <nav class="header">
    <p>Header</p>

    <div v-if="userStore.user" class="btns-group">
      <p>{{ userStore.user.email }}</p>
      <button @click="handleLogout" class="btn">logout</button>
    </div>
    <div v-else class="btns-group">
      <button @click="handleSetUser" class="btn login">Login</button>
      <button class="btn signup">Signup</button>
    </div>
  </nav>
</template>

<style scoped>
.header {
  height: 60px;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 2em;
  padding-right: 2em;
}

.btns-group {
  display: flex;
  gap: 1em;
}

.btn {
  border-radius: 0.25em;
  padding: 0.5em 1em;
  border: none;
}
</style>
