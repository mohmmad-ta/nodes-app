<script setup>
import { RouterLink } from 'vue-router'
import BlurOverlay from "@/components/blurOverlay.vue";
defineProps({
    userAccount:{
        type: String
    }
})
</script>

<template>
  <nav class="w-screen items-center text-white z-40 h-16 bg-none fixed">
      <blur-overlay :styleCom="['absolute', 'backdrop-blur-2xl', 'h-16', 'w-screen']" />
      <div class="container flex justify-between h-16 absolute z-40 items-center">
          <h1 class="font-bold text-xl">Nodes</h1>
          <RouterLink v-if="userAccount" to="/">{{userAccount}}</RouterLink>
          <RouterLink v-else to="/login">Register</RouterLink>
      </div>

  </nav>
</template>
