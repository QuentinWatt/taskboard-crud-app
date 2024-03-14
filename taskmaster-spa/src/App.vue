<script setup lang="ts">
import HeaderNav from './components/layout/HeaderNav.vue'
import FooterNav from './components/layout/FooterNav.vue'
</script>

<template>
  <div class="bg-gray-800 min-h-screen">
    <HeaderNav/>

    <div class="bg-white">
      <RouterView></RouterView>
    </div>

    <FooterNav />
  </div>
</template>
