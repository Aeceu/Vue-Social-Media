<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { ref, computed } from 'vue'
import PostCard from './PostCard.vue'

const content = ref<string>('')

const userStore = useUserStore()

const userPosts = computed(() => [...userStore.posts].reverse())

const handleAddPost = () => {
  if (userStore.user && content.value) {
    userStore.addPost({
      id: Math.random().toString(),
      content: content.value,
      createdAt: new Date(),
      user: userStore.user,
      comments: [],
      likes: [],
    })
    content.value = ''
  } else {
    window.alert('Log in first!')
  }
}

const handleCancelPost = () => {
  content.value = ''
}
</script>

<template>
  <div class="newsfeed">
    <div class="create-post-container">
      <textarea
        v-model="content"
        type="text"
        class="create-post-textarea"
        placeholder="create post...."
        resizable
      />
      <span class="btns-group">
        <button class="btn create" @click="handleAddPost">Create</button>
        <button class="btn cancel" @click="handleCancelPost">Cancel</button>
      </span>
    </div>

    <div class="post-feed" v-if="userPosts.length > 0">
      <div v-for="item in userPosts" :key="item.id">
        <PostCard v-bind="item" />
      </div>
    </div>
    <p v-else style="margin-top: 1em">No posts available.</p>
  </div>
</template>

<style scoped>
.newsfeed {
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  align-items: center;
  overflow-y: auto;
}

.create-post-container {
  width: 600px;
  height: fit-content;
  max-height: 200px;

  padding: 1em;
  border: 1px solid var(--color-background-mute);
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.create-post-textarea {
  min-height: 50px;
  min-width: 570px;
  max-width: 570px;
  width: 100%;
  height: 100%;

  background: inherit;
  border: none;
  outline: none;
  color: white;
  padding: 1em;
  border-radius: 0.5em;
  border: 1px solid var(--color-background-mute);
}

.btns-group {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1em;
}

.post-feed {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 1em;
}

.btn {
  border: none;
  border-radius: 0.3em;
  padding: 0.5em 1em;
}

.create {
  color: white;
  background-color: #0865fe;
}
</style>
