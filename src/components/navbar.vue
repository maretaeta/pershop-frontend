<script>
import { useStore } from '../store/store';
import { useAuthStore } from '../store/auth';
import VueFeather from 'vue-feather'
import { useRouter } from "vue-router"
import { AtSignIcon } from 'vue-feather-icons';

export default {
    name: 'navbar',
    setup(){
        const store = useAuthStore();
        const router = useRouter();

        const handleLogout = async () => {
            try {
                await store.logout();
                router.push('/');
                
            } catch (error) {
                console.error('An error occurred during logout:', error);
            }
        };

        const handleAccount = async () => {
            router.push("/account")
        }
        return{
            handleLogout,
            handleAccount
        }
        
    },
  

    computed: {
        isSideBarOpen() {
            return useStore().sideBarOpen;
        },
    },

    data() {
        return {
            dropDownOpen: false,
        };
    },

    methods: {
        toggleSidebar() {
            useStore().toggleSidebar();
        },
    }, 

    components: {
        VueFeather,
    }
};
</script>


<template>
    <div class="font-poppins sticky top-0 z-50 pl-0">
        <div class="w-full h-24 px-9 bg-white flex items-center justify-between">
            
            <!-- logoo -->
            <div class="w-full h-24 items-center py-3 hidden lg:block">
                <div class="flex justify-start items-center">
                    <img src="../assets//shop.png" class="w-24 h-14" />
                    <p class="font-semibold text-base text-gray-800 pt-5">KASIR SHOP</p>
                </div>
            </div>

            <!-- sidebar mobile -->
            <div class="flex">
                <div class="lg:hidden flex items-center mr-4 text-gray-700">
                    <button class="hover:text-purple-600 hover:border-white focus:outline-none navbar-burger"
                        @click="toggleSidebar()">
                        <vue-feather type="menu" class="pt-2 text-black items-center" />
                    </button>
                </div>
            </div>

            <!-- account -->
            <div class="flex items-center relative w-full mx-auto justify-end">
                <button class="focus:outline-none duration-150 flex gap-1" @click="dropDownOpen = !dropDownOpen">
                    <font-awesome-icon icon="circle-user"
                        class="w-7 h-7 rounded-full shadow-lg border-2 hover:border-white border-purple-600 duration-150" />
                    <p class="items-center text-sm text-center p-2">Hi, Admin</p>
                </button>
            </div>
        </div>

        <!-- dropdown account -->
        <div class="absolute border bg-white border-t-0 shadow-xl text-gray-700 rounded-b-lg w-48 right-0 mr-6 p-2"
            :class="dropDownOpen ? '' : 'hidden'">
            <p class="flex gap-3 px-4 py-2 hover:bg-gray-200 text-cyan-950" @click="handleAccount">
                <font-awesome-icon icon="user" class="pt-1" />
                <span>Account</span>
            </p>
            <p class="px-4 py-2 hover:bg-gray-200 flex gap-3 text-red-600 " @click="handleLogout">
                <font-awesome-icon icon="right-from-bracket" class="pt-1"/>
                <span class="">Logout</span>
            </p>
        </div>
    </div>
</template>

