<script setup lang="ts">
  import { reactive } from 'vue';
  import { useBoardsStore } from '../../store/useBoardsStore';
  import Loader from '../utils/Loader.vue';

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
  >
    <div class="w-full">
      <label for="board_name">New board</label>
      <input 
        v-model="state.name"
        id="board_name"
        type="text"
        placeholder="A new board"
        class="bg-white"
      >
    </div>
    <div>
      <button class="button mt-3">
        <Loader v-if="state.loading"/>
        <span v-else>Create</span>
      </button>
    </div>
  </form>
</template>