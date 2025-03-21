<script setup lang="ts">
import { ref } from 'vue'
import { OhVueIcon as Vicon } from 'oh-vue-icons'
import { useUserStore } from '@/stores/userStore'

const search = ref('')
const userStore = useUserStore()
</script>
<template>
  <el-aside class="aside">
    <h2>Users</h2>
    <el-divider />

    <!-- Search -->
    <el-input v-model="search" style="height: 50px" placeholder="Search user" size="large">
      <template #suffix>
        <Vicon name="fa-search" class="icon search" />
      </template>
    </el-input>

    <Vicon class="loading" name="pr-spinner" animation="spin" v-if="userStore.usersLoading" />

    <div class="user-lists" v-for="item in userStore.users" :key="item.id">
      <div class="user-container">
        <img
          src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewperformance1-697509.jpg&fm=jpg"
          alt="profile"
          class="profile-photo"
        />
        <span class="info-box">
          <h1>{{ item.firstName }} {{ item.lastName }}</h1>
          <p>{{ item.email }}</p>
        </span>
      </div>
    </div>
  </el-aside>
</template>

<style scoped>
* {
  /* border: 1px solid red !important; */
}

.aside {
  width: 400px;
  border-left: 1px solid var(--color-background-mute);

  padding: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 1em; */

  .loading {
    margin-top: 10px;
    width: 40px;
    height: 40px;
    color: var(--color-blue);
  }

  .user-lists {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-top: 1em;
  }

  .user-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 1em;
    border-radius: 0.5em;
    background: var(--color-background-mute);
  }

  .info-box {
    display: flex;
    flex-direction: column;
  }

  .info-box h1 {
    font-size: 18px;
  }
  .info-box p {
    font-size: 14px;
  }

  .profile-photo {
    width: 40px;
    height: 40px;
    border-radius: 2em;
    object-fit: cover;
  }
}
</style>
