<script setup lang="ts">
  import { reactive } from 'vue';
  import Loader from '../components/utils/Loader.vue';
  import { useRouter } from 'vue-router';
  import { useSignupStore } from '../store/useSignupStore';

  const state = reactive({
    name: '' as string,
    email: '' as string,
    password: '' as string,
    loading: false as boolean
  });

  const signupStore = useSignupStore();
  const router = useRouter();

  const signup = async () => {
    state.loading = true
    const {name, email, password} = state;
    await signupStore.signup({
      name, 
      email, 
      password
    })
    state.loading = false

    if(!signupStore.hasError){
      router.push('/login')
    }
  }
</script>

<template>
  <main class="py-5 px-3 max-w-md mx-auto">
    <h1 class="font-bold text-2xl text-center">Sign Up</h1>

    <form 
      @submit.prevent="signup"
      class="mt-5"
    >
      <div 
        v-if="signupStore.errors.message" 
        class="bg-red-500 text-white rounded py-2 px-3 mb-3"
      >
        {{ signupStore.errors.message }}
      </div>

      <div>
        <label for="name">Name</label>
        <input 
          v-model="state.name" 
          id="name" 
          type="text"
          placeholder="Your name"
        >
        <span 
          v-if="signupStore.nameError" 
          class="text-red-500 text-sm"
        >
          {{ signupStore.nameError }}
        </span>
      </div>

      <div class="mt-3">
        <label for="email">Email</label>
        <input 
          v-model="state.email" 
          id="email" 
          type="email"
          placeholder="Your email"
        >
        <span 
          v-if="signupStore.emailError" 
          class="text-red-500 text-sm"
        >
          {{ signupStore.emailError }}
        </span>
      </div>

      <div class="mt-3">
        <label for="password">Password</label>
        <input 
          v-model="state.password" 
          id="password" 
          type="password"
          placeholder="Secure password"
        >
        <span 
          v-if="signupStore.passwordError" 
          class="text-red-500 text-sm"
        >
          {{ signupStore.passwordError }}
        </span>
      </div>

      <div class="mt-3">
        <button class="button py-2 bg-black hover:bg-gray-800">
          <Loader v-if="state.loading"/>
          <span v-else>Sign up</span>
        </button>
      </div>
    </form>
  </main>
</template>