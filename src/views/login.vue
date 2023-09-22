<script>
import { ref } from 'vue'
import {useAuthStore} from "../store/auth"
import {useRouter} from "vue-router"


export default {
    setup() {
        const store = useAuthStore();
        const router = useRouter();
        const username = ref("");
        const password = ref("");

        function handleLogin() {
            store.login(username.value, password.value)
                .then(() => {
                    router.push("/");
                })
                .catch((error) => {
                    console.error("Login error:", error);
                });
        }

        return {
            username,
            password,
            handleLogin,
        };
    },
};


// export default {
//     setup(){
//         const store = useAuthStore();
//         const router =  useRouter();
//         const loginData = ref({
//             username: '',
//             password: ''
//         });

//     const handleLogin = async () => {
//         try {
//             await store.login(loginData.value);
//                 router.push('/')
//         }catch(error){
//             console.error('Login error: ', error)
//         }
//     }

//     const signup = async () => {
//         router.push('/register')
//     }

//     return {
//         loginData,
//         handleLogin,
//         signup
//     }
//     }
// };


</script>


 <template>
     <div class="pt-0 font-poppins ">
         <div class="lg:grid grid-cols-2">
             <div class="hidden lg:block">
                 <img src="@/assets/login.jpg" class="h-[800px] w-full" />
             </div>
             <div class="mx-auto px-10 grid justify-items-center pt-36">
                 <div class="">
                     <h1 class="md:text-5xl text-2xl font-bold">Hello Welcome Back,</h1>
                     <p class="pt-2 pb-5 lg:pb-7 lg:pt-5 text-sm">
                      Welcome to Our Cashier Application: Easy and Fast Solution to Manage Your Business
                     </p>
                     <form @submit.prevent="handleLogin" class="mx-auto">
                         <div class="mb-3 lg:mb-7">
                             <label>
                                 <p>Username</p>
                             </label>
                             <input v-model="username" type="username" placeholder="Enter Username" name="username"
                                 class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800" />
                         </div>

                         <div class="mb-3 lg:mb-7">
                             <label>
                                 <p>Password</p>
                             </label>
                             <input v-model="password" type="password" placeholder="Enter Password" name="password"
                                 class="mt-1 ml-2 w-full xl:w-[500px] rounded-md pl-2 h-10 text-lg bg-transparent border border-cyan-800" />
                         </div>
                         <button @click.prevent="handleLogin"  type="submit" class="bg-cyan-800 rounded-md text-white w-full mx-auto py-2 ml-2 mt-3 xl:w-[500px]">
                             Login
                         </button>                     
                </form>
                     <p class="text-center pt-7 pb-7">
                         Don't have an account?
                         <span class="text-cyan-900 pl-1" @click="signup">Sign up</span>
                     </p>
                 </div>
             </div>
         </div>
     </div>
</template>




