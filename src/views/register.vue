<script>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useAuthStore();
    const router = useRouter();
    const registrationData = ref({
      nama: '',
      username: '',
      password: '',
    });

    const handleRegister = async () => {
      try {
        await store.registerUser(registrationData.value);
            router.push('/');  
      } catch (error) {
        console.error('Registration error:', error);
      }
    };

    const handleLogin = async () => {
        router.push('/')
    }
    return {
      registrationData,
      handleRegister,
      handleLogin
    };
  },
};
</script>


<template>
    <div class="font-poppins w-full mx-auto items-center min-h-screen justify-center justify-items-center flex p-5">
        <div class="flex flex-col md:flex-row md:flex">
            <div class="flex lg:block">
                <img src="@/assets/img.png" class="w-full h-full mx-auto" />
            </div>
            <div class="mx-auto flex items-center justify-center justify-items-center">
                <div class="bg-white rounded-xl w-full p-5">
                    <h1 class="lg:text-2xl text-xl font-bold">Welcome To Cashier App,</h1>
                    <p class="pt-2 pb-5 lg:pb-7 text-sm">
                        Welcome Back to Cashier Application: Easy and Fast Solution to Manage Business
                    </p>
                    <form class="mx-auto" @submit.prevent="handleRegister">
                        <div class="mb-3 lg:mb-7 text-base">
                            <label>
                                <p class="text-base">Nama Lengkap</p>
                            </label>
                            <input v-model="registrationData.nama" type="text" placeholder="Enter Nama Lengkap" name="nama"
                                class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-base bg-transparent border border-cyan-800" />
                        </div>
                        <div class="mb-3 lg:mb-7 text-base">
                            <label>
                                <p>Username</p>
                            </label>
                            <input v-model="registrationData.username" type="text" placeholder="Enter Username" name="username"
                               class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-base bg-transparent border border-cyan-800" />
                        </div>

                        <div class="mb-3 lg:mb-7 text-base">
                            <label>
                                <p>Password</p>
                            </label>
                            <input v-model="registrationData.password" type="password" placeholder="Enter Password" name="password"
                                class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 bg-transparent border border-cyan-800 text-base" />
                        </div>
                        <button 
                        @click.prevent="handleRegister" type="submit" class="text-base bg-cyan-800 rounded-md text-white w-full mx-auto py-2 ml-2 mt-3 xl:w-[500px]">
                            Register
                        </button>

                    </form>
                    <p class="text-center mt-7 mb-7 text-base">
                        Have an account?
                        <span class="text-cyan-800 pl-1 text-base" @click="handleLogin" >Login</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>






<!-- <script>
import axios from "axios"

export default {
    data() {
        return {
            nama: '',
            username: '',
            password: '',
        };
    },
    methods: {
        onSubmit() {
            console.log('regis')
            const data = { 
                nama: this.nama,
                username: this.username,
                password: this.password
            };

            axios.post('http://localhost:3000/api/v1/auth/register', data)
            .then(
                res => {
                    console.log(res)
                }
            ).catch (
                err => {
                    console.log(err)
                })
            }
        },
    }



        // handleRegis() {

        //     this.$router.push("/register");
        // },
        // login(data) {
            
        //     this.$store.dispatch("login", data).then(() => {
                
        //         this.$router.push("/dashboard");
        //     });
        // },

</script>

 -->
