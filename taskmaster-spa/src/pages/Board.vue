<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useBoardStore } from '../store/useBoardStore';
  import { onMounted } from 'vue';
  import {useRoute} from "vue-router";
  import TaskItem from '../components/tasks/TaskItem.vue';
import AddTaskForm from '../components/tasks/AddTaskForm.vue';

  const route = useRoute()
  const boardStore = useBoardStore()
  const store = storeToRefs(boardStore)

  onMounted(() => {
    const boardId = String(route.params.boardId)
    boardStore.getBoard(boardId)
  })
</script>

<template>
  <div class="container mx-auto py-5">
    <h1 class="text-2xl font-bold">
      {{ store.board.value?.name }}
    </h1>

    <ul class="grid gap-2 mt-5">
      <li v-for="task in store.tasks.value">
        <TaskItem :key="task.id" :task="task" />
      </li>
    </ul>
    
    <AddTaskForm class="mt-3"/>
  </div>
</template>
