<script setup lang="ts">
  interface LoaderProps {
    width?: number;
    thickness?: number; 
  }
  const props = defineProps<LoaderProps>()

  const styles = {
    width: props.width+'px',
    borderWidth: props.thickness+'px'
  }
</script>

<template>
  <div>
    <div 
      class="loader" 
      :style="styles"
    ></div>
  </div>
</template>

<style>
  .loader {
    width: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 4px solid lightblue;
    border-right-color: fuchsia;
    animation: l2 1s infinite linear;
  }

  @keyframes l2 {to{transform: rotate(1turn)}}
</style>