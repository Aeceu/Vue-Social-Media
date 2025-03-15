<script setup lang="ts">
import { useUserStore } from '@/stores/counter'

const userStore = useUserStore()
</script>

<template>
  <div class="aside">
    <div class="profile-container">
      <img
        src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
        alt="profile"
        class="profile-photo"
      />
      <span class="profile-details">
        <h3>{{ userStore.user?.firstName }} {{ userStore.user?.lastName }}</h3>
        <p class="email">{{ userStore.user?.email }}</p>
      </span>
    </div>
  </div>
</template>

<style scoped>
.aside {
  min-width: 300px;
  max-width: 300px;
  border-right: 1px solid var(--vt-c-black-mute);
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.profile-photo {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  object-fit: cover;
}

.profile-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  padding: 1em;
  background-color: var(--vt-c-black-mute);
  border-radius: 0.5em;
}

.profile-container:hover {
  background-color: var(--vt-c-black-soft);
  cursor: pointer;
}
.profile-details {
  display: flex;
  line-height: 1.3;
  flex-direction: column;
}

.email {
  font-size: 12px;
  letter-spacing: 0.07em;
}
</style>
