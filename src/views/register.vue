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
            router.push('/login');  
      } catch (error) {
        console.error('Registration error:', error);
      }
    };

    const login = async () => {
        router.push('/login')
    }
    return {
      registrationData,
      handleRegister,
      login
    };
  },
};
</script>


<template>
    <div class="pt-0 font-poppins ">
        <div class="lg:grid grid-cols-2">
            <div class="hidden lg:block">
                <img src="@/assets/login.jpg" class="h-[800px] w-full" />
            </div>
            <div class="mx-auto px-10 grid justify-items-center pt-36">
                <div class="">
                    <h1 class="md:text-5xl text-2xl font-bold">Hello,,</h1>
                    <p class="pt-2 pb-5 lg:pb-7 lg:pt-5 text-sm">
                        Welcome to Our Cashier Application: Easy and Fast Solution to Manage Your Business
                    </p>
                    <form class="mx-auto" @submit.prevent="handleRegister">
                        <div class="mb-3 lg:mb-7">
                            <label>
                                <p>Nama Lengkap</p>
                            </label>
                            <input v-model="registrationData.nama" type="text" placeholder="Enter Nama Lengkap" name="nama"
                                class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800" />
                        </div>
                        <div class="mb-3 lg:mb-7">
                            <label>
                                <p>Username</p>
                            </label>
                            <input v-model="registrationData.username" type="text" placeholder="Enter Username" name="username"
                                class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800" />
                        </div>

                        <div class="mb-3 lg:mb-7">
                            <label>
                                <p>Password</p>
                            </label>
                            <input v-model="registrationData.password" type="password" placeholder="Enter Password" name="password"
                                class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800" />
                        </div>
                        <button  @click.prevent="handleRegister" type="submit" class="bg-cyan-800 rounded-md text-white w-full mx-auto py-2 ml-2 mt-3">
                            Register
                        </button>
                    </form>
                    <p class="text-center mt-7 mb-7">
                        Have an account?
                        <span class="text-cyan-800 pl-1" @click="login" >Login</span>
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
