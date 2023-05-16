<template>
    <div class="py-24 container overflow-hidden relative">
        <nav class="w-full items-center text-white z-[10] h-16 bg-none relative rounded-md overflow-hidden">
            <blur-overlay :styleCom="['absolute', 'backdrop-blur-xl', 'h-16', 'w-full']" />
            <div class="container flex justify-between h-16 absolute z-40 items-center">
                <h1 class="font-bold text-xl">Nodes List</h1>
                <div class="flex justify-center gap-2 items-center hover:text-co duration-150 cursor-pointer">
                    <p @click="toggelAdd">Add New</p>
                    <i class="fa-solid fa-plus"></i>
                </div>
            </div>
        </nav>
        <NodesList :nodes="nodes" @toggelR="toggelR" :isMyNodes="isMyNodes" />
    </div>
    <AddNode @toggelAdd="toggelAdd" v-show="showAdd"/>
    <RemoveNode @deleteAllNodes="deleteAllNodes" @toggelR="toggelR" v-show="showR"/>
</template>

<script setup>
import BlurOverlay from "@/components/blurOverlay.vue";
import AddNode from "@/components/AddNode.vue";
import NodesList from "@/components/NodesList.vue";
import {RouterLink, useRouter} from "vue-router";
import axios from "axios";
import {ref, onMounted, watchEffect} from "vue";
import RemoveNode from "@/components/RemoveNode.vue";

const nodes = ref({});
const showAdd = ref(false);
const showR = ref(false);
const isMyNodes = ref('');
const isdel = ref('');
const router = useRouter();
isMyNodes.value = localStorage.getItem("id")
const getAllNodes = async ()=>{
    const statusLogin = await axios.get("users/statusLogin")
    if (statusLogin){
        await axios.get(`nodes`).then((res) => {
            nodes.value = res.data.nodes
        });
    }else {
        router.back()
    }
}
const deleteAllNodes = async ()=>{
    await axios.delete(`nodes/${isdel.value}`).then((res) => {
        nodes.value = res.data.nodes
    });
}
const toggelAdd = ()=>{
    if (showAdd.value === true){
        showAdd.value = false
    }else {
        showAdd.value = true
    }
}
const toggelR = (id)=>{
    isdel.value = id;
    console.log(isdel.value)
    if (showR.value === true){
        showR.value = false
    }else {
        showR.value = true
    }
}
onMounted(getAllNodes)
</script>