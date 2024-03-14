<script setup lang="ts">
  import { reactive } from 'vue';
  import { useBoardStore } from '../../store/useBoardStore';

  const boardStore = useBoardStore();

  const state = reactive({
    task: {
      title: '',
      is_completed: false
    },
    error: '',
  })

  const resetTask = () => {
    state.task = {title: '', is_completed: false}
  }

  const addTask = (e: Event) => {
    e.preventDefault();
    state.error = ''
    boardStore.addTask(state.task).then(() => {
      resetTask()
      state.error = boardStore.$state.errors[0] ?? ''
    });
  }
</script>

<template>
  <form 
    @submit="addTask" 
    class="border rounded p-2 flex items-center"
    :class="state.error.length > 0 ? 'error': ''"
  >
    <div class="mr-3">
      <input  
        v-model="state.task.is_completed"
        type="checkbox"
      >
    </div>
    <div class="w-full">
      <input 
        v-model="state.task.title"
        type="text"
        placeholder="A new task"
        class="w-full outline-none"
      />
    </div>
    <div>
      <button 
        type="submit"
        class="button bg-green-500 hover:bg-green-600"
      >
        <font-awesome-icon :icon="['fas', 'circle-plus']" />
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

input {
  @apply border-0;
}
</style>