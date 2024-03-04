<script setup lang="ts">
  import Loader from "../components/utils/Loader.vue";
  import { reactive } from 'vue';
  import { useAuthStore } from '../store/useAuthStore';
  import { useRouter } from "vue-router";

  const router = useRouter()

  const state = reactive({
    email: '' as string,
    password: '' as string,
    loading: false as boolean,
  })

  const authStore = useAuthStore()

  const login = async () => {
    state.loading = true
    const {email, password} = state
    await authStore.getToken({email, password})
    state.loading = false
    if(authStore.isLoggedIn){
      router.push('/')
    }
  }
</script>

<template>
  <div class="max-w-md mx-auto py-5">
      <h1 class="text-2xl font-bold text-center mb-5">
        Login
      </h1>

      <div v-if="authStore.$state.errors.length" class="bg-red-500 py-2 px-3 text-white rounded mb-3">
        {{ authStore.$state.errors[0] }}
      </div>

      <form @submit.prevent="login" class="">
        <div class="flex flex-col mb-3">
          <label for="email">Email</label>
          <input 
            v-model="state.email" 
            type="email" 
            id="email"
            placeholder="Your email"
          /> 
        </div>

        <div class="mb-3">
          <label for="password">Password</label>
          <input 
            v-model="state.password" 
            type="password" 
            id="password" 
            placeholder="Your password"
          /> 
        </div>

        <div>
          <button 
            class="button py-2 bg-black hover:bg-gray-800" 
            type="submit"
          >
          <Loader 
            v-if="state.loading" 
            :width="20" 
            :thickness="4"
            class="mr-2"
          />
          <span>Login</span>
        </button>
        </div>
      </form>
    </div>
</template>
