<script setup lang="ts">
  import { reactive } from 'vue';
  import { taskApi } from '../../config/taskApi';
  import { useRouter } from 'vue-router';
  import Board from '../../models/Board';

  interface DeleteFormProps {
    board: Board;
  }
  
  const props = defineProps<DeleteFormProps>()
  const router = useRouter();

  const state = reactive({
    message: null as string | null,
  })

  const deleteBoard = async () => {
    state.message = null;
    try {
      await taskApi.delete(`/board/${props.board?.id}`);
      router.push('/')
    }
    catch(e: any){
      state.message = e.response.data.message
    }
  }
</script>

<template>
  <form @submit.prevent="deleteBoard" data-cy="delete-board-form">
    <button 
      type="submit"
      class="button bg-red-500 hover:bg-red-600 text-white"
    >
      <font-awesome-icon :icon="['fas', 'trash']" class="mr-2" /> Delete Board
    </button>
    <span 
      v-if="state.message"
      class="text-sm text-red-500 py-1"
    >
      {{ state.message }}
    </span>
  </form>
</template>