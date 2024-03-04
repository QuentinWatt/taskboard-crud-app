<script setup lang="ts">
  import { reactive } from 'vue';
  import Task from '../../models/Task';
  import { useBoardStore } from '../../store/useBoardStore';

  const boardStore = useBoardStore()

  interface TaskItem {
    task: Task
  }
  const props = defineProps<TaskItem>()

  const state = reactive({
    task: props.task
  })
</script>

<template>
  <div 
    class="task"
    :class="state.task.is_completed ? 'bg-green-300' : ''"
  >
    <div class="mr-2">
      <input 
        type="checkbox" 
        v-model="state.task.is_completed"
        @change="boardStore.updateTask(state.task)"
      >
    </div>
    <div class="w-full">
      <input 
        type="text"
        v-model="state.task.title"
        @change="boardStore.updateTask(state.task)"
        class="w-full outline-none bg-transparent"
      >
    </div>
    <div>
      <button
        @click="boardStore.deleteTask(state.task)"
        class="button bg-red-500 hover:bg-red-600 "
      >
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
  @tailwind components;
  @tailwind utilities;

  @layer components {
    .task {
      @apply flex items-center border bg-white rounded p-2;
    }

    .task input {
      @apply border-0;
    }
  }
</style>