<template>
    <div class="h-screen w-screen flex justify-center items-center overflow-hidden md:container">
        <div class="text-white w-[25rem] text-left h-fit overflow-hidden relative rounded-md">
            <blur-overlay :styleCom="['absolute', 'backdrop-blur-3xl', 'h-full', 'w-screen']" />
            <form class="relative z-40 p-10 flex flex-wrap gap-4">
                <h2 class="text-center w-full text-xl p-3 text-co">Log In</h2>
                <input v-model="user.email" type="email" class="w-full px-4 py-2 text-co outline-none rounded-sm" placeholder="Email" required/>
                <input v-model="user.password" type="password" class="w-full px-4 py-2 text-co outline-none rounded-sm" placeholder="Enter password" required/>
                <div class="flex w-full">
                    <input type="checkbox" />
                    <span class="font-light text-xs ml-1"> Remember password </span>
                </div>
                <div class="flex w-full justify-center p-2">
                    <button @click.prevent="loginData" type="submit" class="duration-150 rounded-sm bg-co px-3.5 py-2 text-white font-bold shadow-sm hover:bg-amber-400">Log In</button>
                </div>
                <router-link class="text-sm hover:text-co duration-200" to="/signup">
                    Create an account
                </router-link>
            </form>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import {RouterLink, useRouter} from "vue-router";
import BlurOverlay from "@/components/blurOverlay.vue";
import {ref} from "vue";
const user = ref({
    email: '',
    password: ''
});
const router = useRouter();
const loginData = async ()=>{
    if (user.value.email !== '' && user.value.password !== ''){
        const response = await axios.post("users/login", {
            email: user.value.email,
            password: user.value.password
        })
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.data.user._id)
        router.push('/');
    }else {
        return
    }
}
</script>

