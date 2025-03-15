<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import type { TPost } from '@/types/user'
import moment from 'moment'
import { OhVueIcon as Vicon } from 'oh-vue-icons'
import { ref } from 'vue'

interface IEditPost {
  postId: string
  newContent: string
}

const props = defineProps<TPost>()

const userStore = useUserStore()
const open = ref<boolean>(false)
const newData = ref(props.content)

const handleCancel = () => {
  newData.value = props.content
  open.value = false
}

const handleEditPost = ({ postId, newContent }: IEditPost) => {
  userStore.editPost({ newContent, postId })
  window.alert('Post updated successfully!')
  open.value = false
}
</script>

<template>
  <div class="post-card">
    <router-link
      :to="{ name: 'post', params: { id: id } }"
      style="text-decoration: none; color: white"
    >
      <div class="post-header">
        <div class="creator">
          <img
            src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
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
            style="cursor: pointer"
            class="icon"
            name="fa-edit"
            fill="green"
            @click="open = true"
          />
          <Vicon
            style="cursor: pointer"
            class="icon"
            @click="userStore.deletePost(id)"
            name="fa-trash"
            fill="red"
          />
        </div>
      </div>
    </router-link>
    <div class="content">
      <p style="white-space: pre-line; line-height: 1.2; letter-spacing: 0.05">
        {{ content }} {{ console.log(content) }}
      </p>
    </div>
    <div class="interaction-container">
      <button class="interaction-btn icon">
        <p>1</p>
        <Vicon name="fa-thumbs-up" />
      </button>
      <button class="interaction-btn icon">
        <p>1</p>
        <Vicon name="fa-thumbs-down" />
      </button>
      <button class="interaction-btn icon">
        <p>1</p>
        <Vicon name="fa-comment-dots" />
      </button>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="modal-post-card">
        <div class="post-header">
          <div class="creator">
            <img
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="profile"
              class="profile-photo"
            />
            <span class="creator-info">
              <h3>{{ user.email }}</h3>
              <p style="font-size: 12px; color: var(--color-text)">{{ createdAt }}</p>
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
.post-card {
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
    margin-top: 1em;
    padding: 1em;
    border: 1px solid var(--color-background-mute);
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
        background: #0865fe;
        cursor: pointer;
      }
    }
  }
}

.icon {
  color: white;
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
      color: white;
      padding: 1em;
      border-radius: 0.5em;
      border: 1px solid var(--color-background-mute);

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
</style>
