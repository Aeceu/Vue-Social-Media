<script lang="ts" setup>
import { ref } from 'vue'

// import HeaderView from '@/components/HeaderView.vue'
// import NewsFeedView from '@/components/NewsFeedView.vue'

const open = ref(false)
</script>

<template>
  <div class="home">
    <!-- <HeaderView /> -->
    <div class="main-container">
      <!-- <NewsFeedView /> -->
      <button @click="open = true">OPEN</button>
    </div>
  </div>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="modal-content">
        <span class="close" @click="open = false">&times;</span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  </Teleport>
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

  /* test */
  align-items: center;
  justify-content: center;
}

.main-container {
  /* height: calc(100vh-60px); */
  overflow-y: auto;
  height: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);

  .modal-content {
    padding: 1em;
    color: var(--color-text);
    border-radius: 0.5em;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--color-blue);
  }

  .close {
    font-size: 2em;
    color: #fff;
  }
}
</style>
