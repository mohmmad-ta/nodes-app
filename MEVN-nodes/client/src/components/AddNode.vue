<template>
    <div class="h-screen top-0 fixed z-20  w-screen flex justify-center items-center overflow-hidden md:container">
        <blur-overlay @click="toggelA" :styleCom="['absolute', 'backdrop-blur-xl', 'h-full', 'w-screen']" />
        <div class="text-white w-[25rem] text-left h-fit overflow-hidden relative rounded-md">
            <form class="relative z-40 p-10 flex flex-wrap gap-4">
                <h2 class="text-center w-full text-xl p-3 text-co">New Nodes</h2>
                <input v-model.trim="node.name" type="text" class="w-full px-4 py-2 text-co outline-none rounded-sm" placeholder="Title" required/>
                <textarea v-model.trim="node.description" type="text" class="w-full px-4 py-2 text-co outline-none rounded-sm" placeholder="Enter Your Node" required/>
                <input @change="handleFileUpload" type="file" class="w-full px-4 py-2 text-co outline-none rounded-sm" required/>
                <div class="flex w-full justify-center p-2">
                    <button @click="addNode" type="submit" class="duration-150 rounded-sm bg-co px-3.5 py-2 text-white font-bold shadow-sm hover:bg-amber-400">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import {defineEmits, ref} from 'vue'
import BlurOverlay from "./blurOverlay.vue";
import axios from "axios";
const emit = defineEmits(['toggelAdd'])
const node = ref({
    name: '',
    description: '',
});
const img= ref('')
const addNode = async ()=>{
    const idUser = localStorage.getItem("id")
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    const formData = new FormData();
    formData.append('file', img);
    if (node.value.name !== '' && node.value.description !== ''){
        await axios.post(`nodes/${idUser}`, {
            name: node.value.name,
            description: node.value.description,
            image: img.value
        },config)
        toggelA()
    }else {
        return
    }
}
const handleFileUpload = (event) =>{
    img.value = event.target.files[0]
}
const toggelA = ()=>{
    emit('toggelAdd')
}
</script>