<script>
import { useStore } from '../store/store';
import VueFeather from 'vue-feather'

export default {
    name: 'navbar',
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
    <div class="font-poppins sticky top-0 z-40 pl-0 lg:pl-64">
        <div class="w-full h-20 px-6  flex items-center justify-between">
            <div class="flex">
                <div class="lg:hidden flex items-center mr-4 text-gray-700">
                    <button class="hover:text-purple-600 hover:border-white focus:outline-none navbar-burger"
                        @click="toggleSidebar()">
                        <vue-feather type="menu" class="pt-2 text-black items-center" />
                    </button>
                </div>
            </div>
            <div class="flex items-center relative p-8">
                <button class="bg-white p-0 focus:outline-none duration-150 flex gap-1" @click="dropDownOpen = !dropDownOpen">
                    <font-awesome-icon icon="circle-user"
                        class="w-8 h-8 rounded-full shadow-lg border-2 hover:border-white border-purple-600 duration-150" />
                    <p class="items-center text-center p-2">Hi, Kasir</p>
                </button>
            </div>
        </div>

        <div class="absolute border  border-t-0 shadow-xl text-gray-700 rounded-b-lg w-48 right-0 mr-6 p-2"
            :class="dropDownOpen ? '' : 'hidden'">
            <p class="block px-4 py-2 hover:bg-gray-200">Account</p>
            <p class="block px-4 py-2 hover:bg-gray-100">Logout</p>
        </div>
    </div>
</template>

