<script>
import { useStore } from "../store/store"
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import VueFeather from "vue-feather";

export default {
    name: "sidebar",
    setup() {
        const store = useStore();
        const router = useRouter();

        const sideBarOpen = computed(() => store.sideBarOpen);
        const dropdownComprasOpen = ref(false);

        const toggleDropdownCompras = () => {
            dropdownComprasOpen.value = !dropdownComprasOpen.value;
        };

        const handleProduct = () => {
            router.push({ name: "Barang" })
        }

        const handleHome = () => {
            router.push({name: "dashboardAdmin"})
        }

        const handleHistory = () => {
            router.push({name: "History"})
        }


        return {
            sideBarOpen,
            dropdownComprasOpen,
            toggleDropdownCompras,
            handleProduct,
            handleHome,
            handleHistory,
        };

    },
    components: {
        VueFeather,
    },

};
</script>



<template>
    <div class="font-poppins w-1/2 md:w-1/3 lg:w-56 fixed md:top-0 md:left-0 h-screen lg:block bg-white z-30 transition duration-500 ease-in-out"
        :class="sideBarOpen ? '' : 'hidden'" id="main-nav">

        <div  class="w-full h-24 flex px-5 items-center mb-8 p-5">
            <!-- <img src="../assets//shop.png" class="w-28 h-16" />
            <p class="font-semibold text-md text-gray-800 pt-5">KASIR SHOP</p> -->
        </div>

        <div class="mb-4 px-4 text-gray-800">
            <p class="pl-4 text-xs font-semibold mb-4 text-gray-600">MENU</p>
            <div @click="handleHome"
                class="w-full flex gap-1 items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="home" class="h-4" />
                <span class="text-gray-800 font-medium pl-2 text-sm">Dashboard</span>
            </div>
            <div @click="handleProduct"
                class="w-full flex items-center gap-1 text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="bag-shopping" class="h-4" />
                <span class="text-gray-800 font-medium pl-2 text-sm">Produk</span>
            </div>
            <!-- <div 
                class="w-full flex items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="bag-shopping" />
                <span class="text-gray-800 font-medium pl-2">Transaksi</span>
            </div> -->
            <div @click="handleHistory"
                class="w-full flex gap-1 items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="clock-rotate-left" class="h-4"/>
                <span class="text-gray-800 font-medium pl-2 text-sm">History</span>
            </div>
        </div>
        <div class="mb-4 px-4 text-gray-800 mt-5">
            <p class="pl-4 text-xs font-semibold mb-4 text-gray-600">Security</p>
            <div 
                class="w-full flex gap-1 items-center text-gray-800 h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <font-awesome-icon icon="chart-line" class="h-4" />
                <span class="text-gray-800 font-medium pl-2 text-sm">Setting</span>
            </div>
        </div>
    </div>
</template>

