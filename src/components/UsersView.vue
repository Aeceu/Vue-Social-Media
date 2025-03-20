<script setup lang="ts">
import { ref } from 'vue'
import { OhVueIcon as Vicon } from 'oh-vue-icons'
const dummyUsers = ref([
  {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@gmail.come',
  },
  {
    id: 2,
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'tonystark@gmail.come',
  },
  {
    id: 3,
    firstName: 'Jon',
    lastName: 'Snow',
    email: 'jonsow@gmail.come',
  },
])

const search = ref('')
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

    <div class="user-lists" v-for="item in dummyUsers" :key="item.id">
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
  /* gap: 1em; */

  .user-lists {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-top: 1em;
  }

  .user-container {
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
