<script setup lang="ts">
import { usePostStore } from '@/stores/postStore'
import { useUserStore } from '@/stores/userStore'
import { type TPost } from '@/types/user'
import { ref } from 'vue'

const props = defineProps<TPost>()

const newComment = ref('')
const userStore = useUserStore()
const postStore = usePostStore()

const handleAddComment = () => {
  if (userStore.user) {
    postStore.addComment({
      postId: props.id,
      comment: newComment.value,
      user: userStore.user,
    })
  }
  newComment.value = ''
}
</script>
<template>
  <div class="comment-list">
    <h3>Comments</h3>
    <div class="comment-input">
      <img
        src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewperformance1-697509.jpg&fm=jpg"
        alt="profile"
        class="profile-photo"
      />
      <textarea
        v-model="newComment"
        type="text"
        class="create-post-textarea"
        placeholder="write a comment...."
        resizable
      />
      <Vicon
        v-if="postStore.commentsLoading"
        animaton="spin"
        class="icon"
        name="fa-paper-plane"
        @click="handleAddComment"
      />
      <Vicon v-else name="ri-refresh-line" animation="spin" />
    </div>
    <div class="comment-container">
      <img
        src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewperformance1-697509.jpg&fm=jpg"
        alt="profile"
        class="profile-photo"
      />
      <span class="comment-info">
        <p class="commenter">jose acebuche</p>
        <p class="comment-content">Comment 1</p>
      </span>
    </div>
    <div class="comment-container">
      <img
        src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewperformance1-697509.jpg&fm=jpg"
        alt="profile"
        class="profile-photo"
      />
      <span class="comment-info">
        <p class="commenter">jose acebuche</p>
        <p class="comment-content">Comment 2</p>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
