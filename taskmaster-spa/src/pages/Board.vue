<script setup lang="ts">
  import { useBoardStore } from '../store/useBoardStore';
  import { onMounted } from 'vue';
  import {useRoute} from "vue-router";
  import TaskItem from '../components/tasks/TaskItem.vue';
  import AddTaskForm from '../components/tasks/AddTaskForm.vue';
  import DeleteBoardForm from '../components/boards/DeleteBoardForm.vue';

  const route = useRoute()
  const boardStore = useBoardStore()

  onMounted(() => {
    const boardId = String(route.params.boardId)
    boardStore.getBoard(boardId)
  })
</script>

<template>
  <div v-if="boardStore.board !== null" class="container mx-auto py-5 px-3">

    <div v-if="boardStore.board !== null" class="bg-gray-200 p-3 rounded mb-3">
      <DeleteBoardForm :board="boardStore.board"/>
    </div>

    <h1 class="text-2xl font-bold">
      {{ boardStore.board?.name }}
    </h1>

    <ul class="grid gap-2 mt-5">
      <li v-for="task in boardStore.tasks">
        <TaskItem :key="task.id" :task="task" />
      </li>
    </ul>
    
    <AddTaskForm class="mt-3"/>
  </div>
</template>
