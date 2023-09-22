<template>
    <div class="font-poppins">
        <div :class="open ? 'w-52' : 'w-20 lg:w-24'" class="bg-cyan-600 h-screen p-5 pt-8 relative duration-300">
            <vue-feather type="arrow-left-circle" class="absolute cursor-pointer -right-3 top-9 w-9"
                @click="toggleSidebar" />
            <div class="flex gap-x-4 items-center">
                <img src="@/assets/logo.png" class="cursor-pointer duration-500 w-36" />
            </div>
            <ul class="pt-6">
                <li :class="[
                    'flex rounded-md p-2 cursor-pointer  text-gray-300 text-sm items-center gap-x-4',
                ]">
                    <vue-feather type="home" />
                    <span :class="{ hidden: !open, 'origin-left duration-200 text-gray-300 pt-1': open }">
                        Dashboard
                    </span>
                </li>
                <li :class="[
                    'flex rounded-md p-2 cursor-pointer  text-gray-300 text-sm items-center gap-x-4 mt-2',
                ]">
                    <vue-feather type="plus" />
                    <span :class="{ hidden: !open, 'origin-left duration-200 text-gray-300 ': open }">
                        Add New
                    </span>
                </li>
                <li @click.prevent="handleProduct" :class="[
                    'flex rounded-md p-2 cursor-pointer  text-gray-300 text-sm items-center gap-x-4 mt-2',
                ]">
                    <vue-feather type="list" />
                    <span :class="{ hidden: !open, 'origin-left duration-200 text-gray-300': open }" >
                        Product
                    </span>
                </li>
                <li :class="[
                    'flex rounded-md p-2 cursor-pointer  text-gray-300 text-sm items-center gap-x-4 mt-9',
                ]">
                    <vue-feather type="clock" />
                    <span :class="{ hidden: !open, 'origin-left duration-200 text-gray-300': open }">
                        History
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"
import { FeatherIcon } from 'vue-feather-icons';
import VueFeather from 'vue-feather';
import {useRouter} from "vue-router"

export default {
    data() {
        return {
            open: true,
        };
    },
    components: {
        FeatherIcon,
        VueFeather,
    },
    methods: {
        toggleSidebar() {
            this.open = !this.open;
        },

        handleProduct(){
            const router = useRouter();
            router.push('/product')

        }
    },
};
</script>
