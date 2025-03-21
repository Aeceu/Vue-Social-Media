<script setup lang="ts">
import PostCard from '@/components/PostCard.vue'
import { useUserStore } from '@/stores/userStore'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { OhVueIcon as Vicon } from 'oh-vue-icons'
import { type TPost } from '@/types/user'
import { usePostStore } from '@/stores/postStore'

const loading = ref(false)
const newComment = ref('')

const router = useRoute()
const userStore = useUserStore()
const postStore = usePostStore()

const post = ref<TPost | undefined>(undefined)
const handleAddComment = (postId: string) => {
  if (userStore.user) {
    postStore.addComment({
      postId: postId,
      comment: newComment.value,
      user: userStore.user,
    })
  }
  newComment.value = ''
}

watch(
  () => router.params.id,
  () => {
    loading.value = true
    setTimeout(() => {
      post.value = postStore.getPost(router.params.id)
      loading.value = false
    }, 1000)
  },
  { immediate: true },
)
</script>

<template>
  <div class="post">
    <h1 v-if="loading">Loading....</h1>

    <div v-if="post">
      <div class="content">
        <Vicon @click="$router.back()" class="go-back" name="fa-arrow-left" />

        <PostCard v-bind="post" />
      </div>
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
            v-if="postStore.commentsLoading === false"
            class="icon"
            name="fa-paper-plane"
            @click="handleAddComment(post.id)"
          />
          <Vicon v-else name="ri-refresh-line" animation="spin" />
        </div>
        <div v-for="items in post.comments" :key="items.id">
          <div class="comment-container">
            <img
              src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewperformance1-697509.jpg&fm=jpg"
              alt="profile"
              class="profile-photo"
            />
            <span class="comment-info">
              <p class="commenter">{{ items.user.firstName }} {{ items.user.lastName }}</p>
              <p
                class="comment-content"
                style="white-space: pre-line; line-height: 1.2; letter-spacing: 0.05"
              >
                {{ items.content }}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  /* border: 1px solid red !important; */
}

.go-back {
  width: 25px;
  height: 25px;
  color: var(--color-text);
  border-radius: 100%;
  position: absolute;
  left: -6%;
  top: 5%;
}

.go-back:hover {
  cursor: pointer;
  scale: 1.2;
  animation-duration: 300;
  transition: all 0.3s;
}

.post {
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  align-items: center;
  overflow-y: auto;

  .content {
    position: relative;
  }

  .comment-list {
    width: 600px;
    margin-top: 1em;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    .comment-container {
      width: 100%;
      /* margin-top: 1em; */
      padding: 1em;
      border: 1px solid var(--color-background-mute);
      border-radius: 0.5em;
      display: flex;
      gap: 1em;
      align-items: center;
      justify-content: center;

      .comment-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        line-height: 1.4;

        background: var(--color-background-mute);
        padding: 0.5em 1em;
        border-radius: 0.5em;
      }

      .commenter {
        font-weight: semibold;
        font-size: 12px;
      }

      .comment-content {
        width: 100%;
        color: var(--color-text);
      }
    }

    .comment-input {
      display: flex;
      align-items: center;
      padding: 1em;
      gap: 0.5em;
      border: 1px solid var(--color-background-mute);
      border-radius: 0.5em;

      textarea {
        background: inherit;
        border: none;
        outline: none;
        color: var(--color-text);
        padding: 1em;
        border-radius: 0.5em;
        border: 1px solid var(--color-background-mute);
        font-size: 16px;
        width: 3/4;
        flex: 1;
        min-width: 3/4;
        max-width: 3/4;
        height: 100%;
        min-height: 60px;
        max-height: 200px;
      }
    }

    .profile-photo {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      object-fit: cover;
    }

    .icon {
      width: 25px;
      height: 25px;
      color: var(--color-green);
    }
    .icon:hover {
      cursor: pointer;
      scale: 1.2;
      animation-duration: 300;
      transition: all 0.3s;
    }
  }
}
</style>
