<script setup lang="ts">
import PostCard from '@/components/PostCard.vue'
import { useUserStore } from '@/stores/userStore'
import type { TPost } from '@/types/user'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const loading = ref(false)

const router = useRoute()
const userStore = useUserStore()
const post = ref<TPost | undefined>(undefined)

watch(
  () => router.params.id,
  () => {
    loading.value = true
    setTimeout(() => {
      post.value = userStore.getPost(router.params.id)
      loading.value = false
    }, 1000)
  },
  { immediate: true },
)
</script>

<template>
  <div class="post">
    <h1 v-if="loading">Loading....</h1>

    <div v-if="post" class="content">
      <PostCard v-bind="post" />
    </div>
  </div>
</template>

<style scoped>
.post {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
}
</style>
