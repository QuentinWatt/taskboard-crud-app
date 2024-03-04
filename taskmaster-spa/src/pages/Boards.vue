<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useBoardsStore } from '../store/useBoardsStore';
  import { onMounted } from 'vue';
  import BoardCard from "../components/boards/BoardCard.vue"

  const boardsStore = useBoardsStore();
  const { boards } = storeToRefs(boardsStore);

  onMounted(() => {
    boardsStore.getBoards()
  })
</script>

<template>
  <div class="container mx-auto py-5 px-3">
    <h1 class="text-2xl font-bold">
      Your Boards
    </h1>

    <div class="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-5">
      <div v-for="board in boards" class="h-full">
        <BoardCard :key="board.id" :board="board"></BoardCard>
      </div>
    </div>
  </div>
</template>
