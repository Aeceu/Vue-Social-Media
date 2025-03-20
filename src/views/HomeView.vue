<script lang="ts" setup>
import HeaderView from '@/components/HeaderView.vue'
import NewsFeedView from '@/components/NewsFeedView.vue'
import SideView from '@/components/SideView.vue'
import UsersView from '@/components/UsersView.vue'
</script>

<template>
  <div class="home">
    <HeaderView />
    <div class="main-container">
      <SideView />
      <NewsFeedView />
      <UsersView />
    </div>
  </div>
</template>

<style scoped>
* {
  /* border: 1px solid red !important; */
}

.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  height: calc(100vh-60px);
  overflow-y: auto;
  height: 100%;
  display: flex;
}
</style>
