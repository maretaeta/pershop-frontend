<template>
    <div class="font-poppins w-full mx-auto items-center min-h-screen justify-center justify-items-center flex p-5">
        <div class="flex flex-col md:flex-row md:flex">
            <div class="flex justify-center">
                <img src="@/assets/img.png" class="mx-auto" />
            </div>
            <div class="mx-auto flex items-center justify-center justify-items-center">
                <div class="bg-white rounded-xl w-full p-5">
                    <h1 class="lg:text-2xl text-xl font-semibold">Hello Welcome Back,</h1>
                    <p class="pt-2 pb-5 lg:pb-7 text-sm text-gray-700">
                        Welcome Back to Cashier Application: Easy and Fast Solution to Manage Business
                    </p>
                    <form class="mx-auto" @submit.prevent="handleLogin">
                        <div class="mb-3 lg:mb-7">
                            <label>
                                <p class="text-sm">Username</p>
                            </label>
                            <input v-model="loginData.username" type="text" placeholder="Enter Username" name="username"
                                class="mt-1 ml-2 w-full  rounded-md pl-2 h-10 text-base bg-transparent border border-cyan-800" />
                        </div>

                        <div class="mb-3 lg:mb-7 text-base">
                            <label>
                                <p>Password</p>
                            </label>
                            <input v-model="loginData.password" type="password" placeholder="Enter Password" name="password"
                                class="mt-1 ml-2 w-full rounded-md pl-2 h-10 text-base bg-transparent border border-cyan-800" />
                        </div>
                        <button type="submit"
                            class="bg-cyan-800 rounded-md text-white w-full mx-auto py-2 ml-2 mt-3  text-base">
                            Login
                        </button>
                    </form>
                    <p class="text-center pt-7 text-sm">
                        Don't have an account?
                        <span class="text-cyan-900 pl-1 text-sm" @click="handleRegister">Sign up</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

export default {
    setup() {
        const store = useAuthStore();
        const router = useRouter();
        const loginData = ref({
            username: '',
            password: '',
        });

       const handleLogin = async () => {
            try {
                const response = await store.login(loginData.value);

                if (
                    response &&
                    response.status === 'Okay' &&
                    response.message === 'Successfully Login' &&
                    response.result &&
                    response.result.token 
                ) {
                    const decodedToken = jwtDecode(response.result.token);
                    const userRole = decodedToken.role;

                    if (userRole === 'ADMIN') {
                        router.push('/dashboardAdmin');
                    } else if (userRole === 'KASIR') {
                        router.push('/dashboardKasir');
                    } else {
                        console.error('Invalid user role');
                    }
                } else {
                    console.error('Login failed. Check the response data for correctness.');
                }
            } catch (error) {
                console.error('An error occurred during login:', error);
            }
        };



        const handleRegister = () => {
            router.push('Register')
        }

        return {
            handleLogin,
            loginData,
            handleRegister
        };
    },
};
</script>