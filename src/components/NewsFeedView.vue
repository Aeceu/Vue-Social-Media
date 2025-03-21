<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { ref, computed } from 'vue'
import PostCard from './PostCard.vue'
import SharedPostCard from './SharedPostCard.vue'
import { OhVueIcon as Vicon } from 'oh-vue-icons'
import { handleFile } from '@/lib/HandleFile'
import { usePostStore } from '@/stores/postStore'
import { useSharedPostStore } from '@/stores/sharedPostStore'

const content = ref<string>('')
const postImage = ref<string | null>(null)

const userStore = useUserStore()
const postStore = usePostStore()
const sharedPostStore = useSharedPostStore()

const userPosts = computed(() => [...postStore.posts].reverse())
const userSharedPosts = computed(() => [...sharedPostStore.sharedPosts].reverse())

const handleAddPost = () => {
  if (userStore.user && content.value) {
    postStore.addPost({
      id: Math.random().toString(),
      content: content.value,
      postImage: postImage.value,
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
  postImage.value = null
}

const onFileChange = async (e: Event) => {
  try {
    const res = await handleFile(e)
    postImage.value = res
  } catch (e) {
    console.log(e)
  }
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
      <div class="create-post-bottom">
        <label for="image">
          <Vicon class="icon" name="fa-image" />
        </label>
        <input
          v-on:change="onFileChange"
          type="file"
          name="image"
          id="image"
          style="display: none"
          accept="image/*"
        />
        <span class="btns-group">
          <button class="btn create" @click="handleAddPost">Create</button>
          <button class="btn cancel" @click="handleCancelPost">Cancel</button>
        </span>
      </div>
    </div>

    <Vicon class="loading" name="pr-spinner" animation="spin" v-if="postStore.feedLoading" />

    <div class="post-feed" v-if="userPosts.length > 0 && !postStore.feedLoading">
      <div v-for="item in userPosts" :key="item.id">
        <PostCard v-bind="item" />
      </div>
      <div v-for="item in userSharedPosts" :key="item.id">
        <SharedPostCard v-bind="item" />
      </div>
    </div>
    <p v-if="userPosts.length <= 0 && !postStore.feedLoading" style="margin-top: 1em">
      No posts available.
    </p>
  </div>
</template>

<style scoped>
* {
  /* border: 1px solid red !important; */
}

.newsfeed {
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  align-items: center;
  overflow-y: auto;
}

.loading {
  margin-top: 10px;
  width: 40px;
  height: 40px;
  color: var(--color-blue);
}

.create-post-container {
  width: 600px;
  height: fit-content;
  max-height: 200px;
  /* background: var(--color-background-soft); */

  padding: 1em;
  border: 1px solid var(--color-background-mute);
  /* box-shadow: 3px 3px 5px 0px var(--color-background-mute); */
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.icon {
  width: 25px;
  height: 25px;
}

.icon:hover {
  scale: 1.1;
  cursor: pointer;
  animation-duration: 300s;
  transition: all 0.3s;
  color: var(--color-green);
}

.create-post-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.create-post-textarea {
  min-height: 50px;
  min-width: 570px;
  max-width: 570px;
  width: 100%;
  height: 100%;

  background: var(--color-background-mute);
  border: none;
  outline: none;
  color: var(--color-text);
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
