<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../../store/useAuthStore';
  const router = useRouter();

  const authStore = useAuthStore()

  const logout = async () => {
    await authStore.logout();
    router.push('/login')
  }
</script>

<template>
  <form 
    @submit.prevent="logout"
    data-cy="logout-form"
  >
    <button data-cy="logout-button">Logout</button>
  </form>
</template>