<script setup>
  defineProps({
      styleCom: {
          type: Array
      },
  })
</script>

<template>
    <div class=" z-[2] top-0" :class="styleCom"></div>
</template>