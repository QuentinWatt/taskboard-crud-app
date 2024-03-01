<script setup lang="ts">
  const date = new Date();
</script>

<template>
  <div class="bg-gray-800 text-white flex justify-center py-5">

    <div class="text-center text-sm">
      &copy; copyright {{ date.getFullYear() }}
    </div>
  </div>
</template>