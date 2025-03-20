<script lang="ts" setup>
import HeaderView from '@/components/HeaderView.vue'
import NewsFeedView from '@/components/NewsFeedView.vue'
</script>

<template>
  <div class="home">
    <HeaderView />
    <div class="main-container">
      <NewsFeedView />
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
