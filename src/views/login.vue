<script>
import { ref } from 'vue'
import { useAuthStore } from "../store/auth"
import { useRouter } from "vue-router"

export default {
    setup() {
        const store = useAuthStore();
        const router = useRouter();
        const loginData = ref({
            username: "",
            password: "",
        })

        const handleLogin = async () => {
            try {
                const response = await store.login(loginData.value);

                if (response) {
                    router.push("/");
                } else {
                    console.error("Login failed");
                }
            } catch (error) {
                console.error("Login error:", error.response ? error.response.data : error.message);
            }
        };


        return {
            handleLogin,
            loginData,
        };
    },
};
</script>



<template>
    <div class="font-poppins w-full mx-auto h-full min-h-screen items-center justify-center justify-items-center flex p-5">
        <div class="lg:grid grid-cols-2">
            <div class="flex lg:block">
                <img src="@/assets/img.png" class="   w-full h-full mx-auto" />
            </div>
            <div class="mx-auto px-10 flex items-center justify-center justify-items-center">
                <div class="bg-white rounded-xl w-full p-16">
                    <h1 class="lg:text-3xl text-xl font-bold">Hello Welcome Back Admin,</h1>
                    <p class="pt-2 pb-5 lg:pb-7 text-sm">
                        Welcome Back to Manajement Inventory Application: Easy and Fast Solution to Manage Business
                    </p>
                    <form class="mx-auto" @submit.prevent="handleLogin">
                        <div class="mb-3 lg:mb-7">
                            <label>
                                <p class="text-sm">Username</p>
                            </label>
                        <input v-model="loginData.username" type="username" placeholder="Enter Username" name="username"
                            class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800" />
                        </div>

                        <div class="mb-3 lg:mb-7">
                            <label>
                                <p>Password</p>
                            </label>
                            <input v-model="loginData.password" type="password" placeholder="Enter Password" name="password"
                                class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800" />
                        </div>
                        <button type="submit" @click.prevent="handleLogin"
                            class="bg-cyan-800 rounded-md text-white w-full mx-auto py-2 ml-2 mt-3 xl:w-[500px]">
                            Login
                        </button>
                    </form>
                    <p class="text-center pt-7">
                        Don't have an account?
                        <span class="text-cyan-900 pl-1">Sign up</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>