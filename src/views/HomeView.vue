<script lang="ts" setup>
import AsideView from '@/components/AsideView.vue'
import HeaderView from '@/components/HeaderView.vue'
</script>

<template>
  <div class="home">
    <HeaderView />
    <div class="main-container">
      <AsideView />
      <p>HOME</p>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  height: 100%;
  display: flex;
}
</style>
