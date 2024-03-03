<script setup lang="ts">
</script>

<template>
  <header class="border-b h-16 flex items-center bg-white">
    <div class="flex items-center justify-between container mx-auto">
      <span class="font-bold text-3xl">Taskmasker</span>
    
      <nav>
        <ul class="flex items-center">
          <li class="mr-5">
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/tasks">
              Tasks
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>