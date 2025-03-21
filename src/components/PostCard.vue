<script setup lang="ts">
import { usePostStore } from '@/stores/postStore'
import { useSharedPostStore } from '@/stores/sharedPostStore'
import { useUserStore } from '@/stores/userStore'
import type { TPost } from '@/types/user'
import moment from 'moment'
import { OhVueIcon as Vicon } from 'oh-vue-icons'
import { ref, watch } from 'vue'
interface IEditPost {
  postId: string
  newContent: string
}

const props = defineProps<TPost>()

const userStore = useUserStore()
const postStore = usePostStore()
const sharedPostStore = useSharedPostStore()
const isLiked = ref(false)
const open = ref<boolean>(false)

const newData = ref(props.content)

const handleCancel = () => {
  newData.value = props.content
  open.value = false
}

const handleEditPost = ({ postId, newContent }: IEditPost) => {
  postStore.editPost({ newContent, postId })
  open.value = false
}

const handleLike = (postId: string) => {
  if (userStore.user) postStore.likePost(postId, userStore.user)
}

const handleSharePost = () => {
  if (userStore.user) sharedPostStore.sharePost(props, userStore.user)
}

watch(
  () => props.likes,
  () => {
    if (userStore.user) {
      isLiked.value = props.likes.some((like) => like.user.id === userStore.user?.id)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="post-card">
    <div class="post-header">
      <div class="creator">
        <img
          src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewperformance1-697509.jpg&fm=jpg"
          alt="profile"
          class="profile-photo"
        />
        <span class="creator-info">
          <h3>{{ user.email }}</h3>
          <p style="font-size: 12px; color: var(--color-text)">
            {{ moment(new Date(), 'YYYYMMDD').fromNow() }}
          </p>
        </span>
      </div>
      <div class="btns-container">
        <Vicon
          style="color: var(--color-green); cursor: pointer"
          class="icon"
          name="fa-edit"
          @click="open = true"
        />
        <Vicon
          style="color: var(--color-red); cursor: pointer"
          class="icon"
          @click="postStore.deletePost(id)"
          name="fa-trash"
        />
      </div>
    </div>
    <router-link
      class="content"
      :to="{ name: 'post', params: { id: id } }"
      style="text-decoration: none; color: var(--color-text)"
    >
      <p style="white-space: pre-line; line-height: 1.2; letter-spacing: 0.05">
        {{ content }}
      </p>
    </router-link>

    <img v-if="props.postImage" v-bind:src="props.postImage" alt="postImage" class="postImage" />
    <div class="interaction-container">
      <button @click="handleLike(props.id)" class="interaction-btn icon">
        <p style="color: var(--color-text)">{{ props.likes.length }}</p>
        <Vicon :class="{ active: isLiked }" class="like" name="fa-thumbs-up" />
      </button>

      <button class="interaction-btn icon">
        <p style="color: var(--color-text)">{{ props.comments.length }}</p>
        <Vicon class="comment" name="fa-comment-dots" />
      </button>
      <button class="interaction-btn icon" @click="handleSharePost">
        <p style="color: var(--color-text)">1</p>
        <Vicon class="share" name="fa-share" />
      </button>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="modal-post-card">
        <div class="post-header">
          <div class="creator">
            <img
              src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewperformance1-697509.jpg&fm=jpg"
              alt="profile"
              class="profile-photo"
            />
            <span class="creator-info">
              <h3>{{ user.email }}</h3>
              <p style="font-size: 12px; color: var(--color-text)">
                {{ moment(new Date(), 'YYYYMMDD').fromNow() }}
              </p>
            </span>
          </div>
        </div>
        <div class="content">
          <textarea
            v-model="newData"
            type="text"
            class="create-post-textarea"
            placeholder="create post...."
            resizable
          />
        </div>
        <span class="btns-group">
          <button
            style="cursor: pointer"
            class="btn update"
            @click="handleEditPost({ postId: id, newContent: newData })"
          >
            Update
          </button>
          <button style="cursor: pointer" class="btn cancel" @click="handleCancel">Cancel</button>
        </span>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
* {
  /* border: 1px solid red !important; */
}

.post-card {
  color: var(--color-text);
  /* background-color: var(--color-background-soft); */
  padding: 1em;
  border: 1px solid var(--color-background-mute);
  border-radius: 0.5em;
  width: 600px;
  display: flex;
  flex-direction: column;

  .btns-container {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .creator {
    display: flex;
    align-items: center;
    gap: 1em;

    .profile-photo {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      object-fit: cover;
    }

    .creator-info {
      display: flex;
      line-height: 1.3;
      flex-direction: column;
    }
  }

  .content {
    color: var(--color-text);
    margin-top: 1em;
    padding: 1em;
    border: 1px solid var(--color-background-mute);
    border-radius: 0.5em;
  }

  .postImage {
    width: 100%;
    height: 300px;
    margin-top: 1em;
    object-fit: cover;
    border-radius: 0.5em;
  }

  .interaction-container {
    margin-top: 1em;
    border: 1px solid var(--color-background-mute);
    border-radius: 0.5em;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .interaction-btn {
      border-radius: 0.5em;
      padding: 1em;
      background: inherit;
      border: none;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1em;

      &:hover {
        cursor: pointer;
        /* background: var(--color-background-soft); */

        .like {
          color: var(--color-blue);
        }
        .comment {
          color: var(--color-green);
        }
        .share {
          color: var(--color-green);
        }
      }
    }
  }
}

.icon {
  color: var(--color-text);
}

.icon:hover {
  cursor: pointer;
  scale: 1.2;
  animation-duration: 300;
  transition: all 0.3s;
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

  .modal-post-card {
    padding: 1em;
    border: 1px solid var(--color-background-mute);
    border-radius: 0.5em;
    width: 600px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-background);

    .btns-container {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }

    .post-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .creator {
      display: flex;
      align-items: center;
      gap: 1em;

      .profile-photo {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        object-fit: cover;
      }

      .creator-info {
        display: flex;
        line-height: 1.3;
        flex-direction: column;
      }
    }

    .content {
      margin-top: 1em;
    }

    textarea {
      background: inherit;
      border: none;
      outline: none;
      color: var(--color-text);
      padding: 1em;
      border-radius: 0.5em;
      border: 1px solid var(--color-background-mute);
      color: var(--color-text);

      width: 100%;
      min-width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 200px;
    }

    .btns-group {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 1em;
      margin-top: 1em;
    }

    .btn {
      border: none;
      border-radius: 0.3em;
      padding: 0.75em 1em;
    }

    .update {
      color: white;
      background-color: #0865fe;
    }
  }
}

.active {
  color: var(--color-blue);
}
</style>
