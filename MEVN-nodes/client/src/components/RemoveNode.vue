<template>
    <div class="h-screen top-0 fixed z-20  w-screen flex justify-center items-center overflow-hidden md:container">
        <blur-overlay @click.prevent="toggelCancel('')" :styleCom="['absolute', 'backdrop-blur-xl', 'h-full', 'w-screen']" />
        <div class="text-white w-[25rem] text-left h-fit overflow-hidden relative rounded-md">
            <form class="relative z-40 p-10 flex flex-wrap gap-4">
                <h2 class="text-center w-full text-xl p-3 text-co">Delete Node</h2>
                <p class="py-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias amet consequuntur culpa deserunt dignissimos.</p>
                <div class="flex w-full justify-center gap-4 p-2">
                    <button @click="toggelDelet('')" type="submit" class="duration-150 rounded-sm bg-co px-3.5 py-2 text-white font-bold shadow-sm hover:bg-amber-500">Delete</button>
                    <button @click.prevent="toggelCancel('')" type="submit" class="duration-150 rounded-sm bg-gray-400 px-3.5 py-2 text-white font-bold shadow-sm hover:bg-gray-500">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import {defineEmits, ref} from 'vue'
import BlurOverlay from "./blurOverlay.vue";
import axios from "axios";
const emit = defineEmits(['toggelR', 'deleteAllNodes'])
const toggelDelet = (id)=>{
    emit('deleteAllNodes')
    emit('toggelR', id)
}
const toggelCancel = (id)=>{
    emit('toggelR', id)
}
</script>