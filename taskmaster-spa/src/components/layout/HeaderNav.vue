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
          <li v-if="!authStore.isLoggedIn" class="mr-5">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!authStore.isLoggedIn" class="mr-5">
            <router-link to="/sign-up">Sign Up</router-link>
          </li>
          <li v-if="authStore.isLoggedIn" class="mr-5">
            <LogoutForm />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>