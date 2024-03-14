<script setup lang="ts">
  import { reactive } from 'vue';
  import { useBoardsStore } from '../../store/useBoardsStore';
  import Loader from '../utils/Loader.vue';
  import Alert from "../utils/Alert.vue"
  import FormError from "../utils/FormError.vue"

  const boardsStore = useBoardsStore();

  const state = reactive({
    name: '' as string,
    loading: false as boolean,
  })

  const createBoard = async () => {
    state.loading = true
    await boardsStore.createBoard(state.name)
    state.loading = false
  }
</script>

<template>
  <form 
    @submit.prevent="createBoard"
    class="bg-gray-200 p-3 rounded-md"
    :class="boardsStore.hasCreateError ? 'error' : ''"
  >
    <Alert v-if="boardsStore.hasCreateError">
      {{ boardsStore.createErrorMessage }}
    </Alert>

    <div class="w-full">
      <label for="board_name">New board</label>
      <input 
        v-model="state.name"
        id="board_name"
        type="text"
        placeholder="A new board"
        class="bg-white"
      >
      <FormError
        v-if="boardsStore.nameError"
      >
        {{ boardsStore.nameError }}
      </FormError>
    </div>
    <div>
      <button class="button mt-3">
        <Loader v-if="state.loading"/>
        <span v-else>Create</span>
      </button>
    </div>
  </form>
</template>

<style scoped>
@keyframes shake {
  0% {
    left: 0rem;
  }
  25% {
    left: 0.5rem;
  }
  75% {
    left: -0.5rem;
  }
  100% {
    left: 0rem;
  }
}

.error {
  position: relative;
  animation: shake 0.3s ease-in-out 0s 3;
}
</style>