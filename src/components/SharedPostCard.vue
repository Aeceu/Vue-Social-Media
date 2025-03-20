<script setup lang="ts">
import { type TSharedPost } from '@/types/user'
import { OhVueIcon as Vicon } from 'oh-vue-icons'
import moment from 'moment'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const props = defineProps<TSharedPost>()

const userStore = useUserStore()
const open = ref<boolean>(false)
</script>
<template>
  <div class="shared-post-card">
    <div class="shared-post-header">
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
          @click="open = true"
          style="color: var(--color-green); cursor: pointer"
          class="icon"
          name="fa-edit"
        />
        <Vicon
          @click="userStore.deleteSharedPost(props.id)"
          style="color: var(--color-red); cursor: pointer"
          class="icon"
          name="fa-trash"
        />
      </div>
    </div>

    <!-- original post -->
    <div class="original-post-card">
      <div class="original-creator">
        <img
          src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewperformance1-697509.jpg&fm=jpg"
          alt="profile"
          class="original-profile-photo"
        />
        <span class="original-creator-info">
          <h3>{{ user.email }}</h3>
          <p style="font-size: 12px; color: var(--color-text)">
            {{ moment(new Date(), 'YYYYMMDD').fromNow() }}
          </p>
        </span>
      </div>
      <div class="content" style="text-decoration: none; color: var(--color-text)">
        <p style="white-space: pre-line; line-height: 1.2; letter-spacing: 0.05">
          {{ content }}
        </p>
      </div>
    </div>

    <div class="interaction-container">
      <button class="interaction-btn icon">
        <p style="color: var(--color-text)">{{ props.likes.length }}</p>
        <Vicon class="like" name="fa-thumbs-up" />
      </button>

      <button class="interaction-btn icon">
        <p style="color: var(--color-text)">{{ props.comments.length }}</p>
        <Vicon class="comment" name="fa-comment-dots" />
      </button>
      <button class="interaction-btn icon">
        <p style="color: var(--color-text)">1</p>
        <Vicon class="share" name="fa-share" />
      </button>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="modal-shared-post-card">
        <div class="shared-post-header">
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
              @click="open = false"
              style="color: var(--color-red); cursor: pointer"
              class="icon"
              name="fa-window-close"
            />
          </div>
        </div>

        <!-- original post -->
        <div class="original-post-card">
          <div class="original-creator">
            <img
              src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewperformance1-697509.jpg&fm=jpg"
              alt="profile"
              class="original-profile-photo"
            />
            <span class="original-creator-info">
              <h3>{{ user.email }}</h3>
              <p style="font-size: 12px; color: var(--color-text)">
                {{ moment(new Date(), 'YYYYMMDD').fromNow() }}
              </p>
            </span>
          </div>
          <div class="content" style="text-decoration: none; color: var(--color-text)">
            <p style="white-space: pre-line; line-height: 1.2; letter-spacing: 0.05">
              {{ content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
* {
  /* border: 1px solid red !important; */
}

.profile-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1em;
}

.original-profile-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1em;
}

.shared-post-card {
  width: 600px;
  height: fit-content;
  padding: 1em;
  border: 1px solid var(--color-background-mute);
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.shared-post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.creator {
  display: flex;
  align-items: center;
}

.original-creator {
  display: flex;
  align-items: center;
}

.original-post-card {
  border: 1px solid var(--color-background-mute);
  padding: 1em;
  border-radius: 0.5em;
}

.original-creator-info h3 {
  font-size: 14px;
  color: var(--color-text);
}

.creator-info h3 {
  color: var(--color-text);
}

.content {
  margin-top: 1em;
  border: 1px solid var(--color-background-mute);
  padding: 0.5em;
  border-radius: 0.5em;
}

.interaction-container {
  border: 1px solid var(--color-background-mute);
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

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

  .modal-shared-post-card {
    width: 600px;
    height: fit-content;
    padding: 1em;
    border: 1px solid var(--color-background-mute);
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    background-color: var(--color-background);
  }
}
</style>
