<script setup>
import {RouterLink} from "vue-router";
</script>

<template>
  <header class="h-screen w-screen flex justify-center items-center overflow-hidden container">
      <div class="text-white text-center h-fit">
        <h1 class="text-5xl mb-8">Data to enrich your online business</h1>
        <p class="w-full mx-auto md:w-1/2 mb-8">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
        <div class="flex justify-center gap-4 flex-wrap items-center">
            <RouterLink to="/nodes" class="duration-150 rounded-md bg-co px-3.5 py-2.5 text-white font-bold shadow-sm hover:bg-amber-300  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get Started</RouterLink>
            <RouterLink to="/" class="hover:text-co duration-150">Read More ... </RouterLink>
        </div>
      </div>

  </header>

</template>
