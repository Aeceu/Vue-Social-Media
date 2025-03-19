<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore'
import { RouterLink } from 'vue-router'
import { OhVueIcon as Vicon } from 'oh-vue-icons'
import { ref } from 'vue'

const userStore = useUserStore()
const search = ref('')
</script>

<template>
  <nav class="header">
    <div class="header-left">
      <p class="title">Header</p>

      <!-- Search -->
      <el-input
        v-model="search"
        style="width: 300px; height: 40px"
        placeholder="Search user"
        class="input"
      >
        <template #suffix>
          <Vicon name="fa-search" class="icon search" />
        </template>
      </el-input>
    </div>

    <!-- Links -->
    <div class="links-group">
      <RouterLink to="/" class="link">Home</RouterLink>
      <RouterLink to="/" class="link">Profile</RouterLink>
      <RouterLink to="/" class="link">Settings</RouterLink>
    </div>

    <div class="header-right">
      <div v-if="userStore.user" class="btns-group">
        <p>{{ userStore.user.email }}</p>
        <button @click="userStore.handleLogout" class="btn">logout</button>
      </div>
      <div v-else class="btns-group">
        <RouterLink to="login" class="link">
          <button class="btn login">Login</button>
        </RouterLink>
        <RouterLink to="signup" class="link">
          <button class="btn signup">
            <Vicon name="fa-chevron-left" />
            Signup
          </button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
* {
  /* border: 1px solid red !important; */
}

.header {
  height: 80px;
  background-color: var(--color-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 2em;
  padding-right: 2em;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1em;
}

.btns-group {
  display: flex;
  align-items: center;
  gap: 1em;
}

.links-group {
  display: flex;
  gap: 2em;
  font-size: 16px;
}

.link {
  text-decoration: none;
  list-style: none;
  color: white;
}

.btn {
  border-radius: 0.25em;
  padding: 0.5em 1em;
  border: none;
  font-size: 16px;

  display: flex;
  align-items: center;
  gap: 0.5em;
  text-decoration: none;
  list-style: none;
  border-radius: 2em;
}

.btn:hover {
  cursor: pointer;
  scale: 1.1;
  animation-duration: 300s;
  transition: all 0.3s;
}

.login {
  background-color: inherit;
  color: white;
  padding: 0.5em 1.5em;
}

.login:hover {
  background-color: white;
  color: var(--vt-c-black-mute);
}
</style>
