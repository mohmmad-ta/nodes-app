<template>
    <main class="relative overflow-hidden">
        <img src="./assets/uu.jpg" class="fixed z-[1] w-screen h-screen top-0" alt="">
        <blur-overlay :styleCom="['fixed', 'backdrop-blur-md', 'h-screen', 'w-screen']" />
        <Navbar :userAccount="userAccount" class="fixed"/>
        <RouterView class="z-[5] relative" />
    </main>
</template>

<script setup>
import axios from "axios";
import {RouterLink, useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import BlurOverlay from "@/components/blurOverlay.vue";
import {ref, watchEffect} from "vue";
const userAccount = ref("");
const router = useRouter();
const loginData = async ()=>{
    const statusLogin = await axios.get("users/statusLogin")
    const idUser = localStorage.getItem("id")
    if (statusLogin){
        axios.get(`users/getMe/${idUser}`).then((res) => {
            userAccount.value = res.data.user.name
        });
    }else {
    }
}
watchEffect(loginData)
</script>