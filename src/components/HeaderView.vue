<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()
</script>

<template>
  <nav class="header">
    <p>Header</p>

    <div v-if="userStore.user" class="btns-group">
      <p>{{ userStore.user.email }}</p>
      <button @click="userStore.handleLogout" class="btn">logout</button>
    </div>
    <div v-else class="btns-group">
      <RouterLink to="login">
        <button class="btn login">Login</button>
      </RouterLink>
      <RouterLink to="signup">
        <button class="btn signup">Signup</button>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.header {
  height: 60px;
  border-bottom: 1px solid var(--vt-c-black-mute);
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
