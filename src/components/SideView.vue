<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>
<template>
  <el-aside class="aside">
    <div class="header">
      <img
        src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewperformance1-697509.jpg&fm=jpg"
        alt="profile"
        class="profile-photo"
      />
      <span class="info">
        <h3>{{ userStore.user?.firstName }} {{ userStore.user?.lastName }}</h3>
        <p>{{ userStore.user?.email }}</p>
      </span>
    </div>
    <el-divider />
  </el-aside>
</template>

<style scoped>
* {
  /* border: 1px solid red !important; */
}

.aside {
  width: 400px;
  border-right: 1px solid var(--color-background-mute);

  padding: 1.5em;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    align-items: center;
    gap: 1em;
    width: 100%;
    border-radius: 0.5em;
    padding: 1em;
    background-color: var(--color-background-mute);

    .profile-photo {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      object-fit: cover;
    }

    .info {
      line-height: 1;
    }

    .info p {
      font-size: 12px;
    }
  }
}
</style>
