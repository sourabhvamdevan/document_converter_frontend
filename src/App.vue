<template>
  <div class="background">
    <DocumentConverter />
  </div>
</template>

<script setup>
import DocumentConverter from "./components/DocumentConverter.vue"
</script>

<style>
.background {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Bluish-green gradient */
  background: linear-gradient(
    135deg,
    #dbeafe 0%,   /* soft blue */
    #ccfbf1 50%,  /* mint */
    #ecfeff 100%  /* cyan */
  );
}
</style>


