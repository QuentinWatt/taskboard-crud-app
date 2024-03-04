<script setup lang="ts">
  import { useAuthStore } from '../../store/useAuthStore';
  import LogoutForm from '../auth/LogoutForm.vue';

  const authStore = useAuthStore()
</script>

<template>
  <header class="border-b h-16 flex items-center bg-white px-3">
    <div class="flex items-center justify-between container mx-auto">
      <router-link to="/">
        <span class="font-bold text-3xl">Taskmasker</span>
      </router-link>
    
      <nav>
        <ul class="flex items-center">
          <li class="mr-5" v-if="!authStore.isLoggedIn">
            <router-link to="/login">Login</router-link>
          </li>
          <li class="mr-5" v-if="authStore.isLoggedIn">
            <LogoutForm />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>