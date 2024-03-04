<script setup lang="ts">
  import Board from "../../models/Board";

  interface BoardCardProps {
    board: Board
  }

  const props = defineProps<BoardCardProps>()
</script>

<template>
  <div class="border rounded-md px-3 py-3 bg-white h-full flex flex-col justify-between">
    <p>
      {{ props.board.name }}
    </p>
    <div class="mt-3">
      <router-link 
        :to="`board/${props.board.id}`" 
        class="bg-blue-500 hover:bg-blue-600 text-white rounded flex py-2 justify-center"
      >View</router-link>
    </div>
  </div>
</template>