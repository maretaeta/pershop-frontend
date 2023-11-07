<template>
    <div class="bg-slate-100 min-h-screen md:p-10 p-5 relative">
        <div class="bg-white min-h-screen rounded-xl font-poppins mb-6 p-6 xl:p-10">
            <div class="flex flex-row sm:flex-row gap-10">
               <!-- Barang Content -->
                <div class="w-full min-h-screen">
                    <!-- Search Input -->
                    <div class="relative text-gray-500 w-full mx-auto">
                        <input type="search" name="search" placeholder="Search..."
                                class="bg-white h-10 w-full px-3 md:px-5 rounded-lg border text-sm focus:outline-none" />
                        <button type="submit" class="absolute right-0 top-0 mt-3 mr-4 focus:outline-none hover:text-cyan-800">
                            <font-awesome-icon icon="magnifying-glass" class="h-4 w-4 pb-2 fill-current" />
                        </button>
                    </div>
                    <div class="grid grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
                        <div v-for="product in products" :key="product.id_barang" class="border p-2 rounded">
                            <img :src="product.image" />
                            <div class="flex justify-between py-1 text-xs xl:text-sm">
                                <h3 class="">{{ product.nama_barang }}</h3>
                                <p>{{ product.harga_barang }}</p>
                            </div>
                            <div class="w-full bg-cyan-600 rounded-md mt-5">
                                <button class="text-white text-sm p-2 w-full text-center">Pilih</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Confirmation Content -->
                <div class="w-1/2 min-h-screen">
                    <h3 class="text-md md:text-lg">Shopping Klik Ku</h3>
                    <p class="text-base text-slate-500">Kode pembelian #0001</p>
                    <div class="flex gap-20 pt-10 justify-between">
                        <div class="">
                            <h3 class="font-semibold text-lg">Barang</h3>
                            <p>nsjanj</p>
                            <p>nsjanj</p>
                        </div>
                        <div>
                            <h3 class="font-semibold text-lg">Qyt</h3>
                            <p class="text-center">1</p>
                            <p class="text-center">1</p>
                        </div>
                        <div >
                            <h3 class="font-semibold text-lg">Harga</h3>
                            <p>20.000</p>
                            <p>20.000</p>
                        </div>
                    </div>

                    <div class="pt-10">
                        <div class="flex justify-between py-1">
                            <h3 class="font-medium text-lg">Item Total</h3>
                            <p>2 Item</p>
                        </div>
                        <div class="flex justify-between py-1">
                            <h3 class="font-medium text-lg">Sub Total</h3>
                            <p>40.000</p>
                        </div>
                        <div class="flex justify-between py-1">
                            <h3 class="font-medium text-lg">Tax</h3>
                            <p>3.500</p>
                        </div>
                    </div>

                    <div class="w-full bg-cyan-700 rounded-md mt-8">
                        <button class="text-white p-2 w-full text-center ">Konfirmasi</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useProductStore } from "../../store/barang";

export default {
    setup() {
        const usebarang = useProductStore();
        const products = ref([]); // Change variable name to 'products'

        async function getBarang() {
            try {
                const response = await usebarang.getBarang();
                if (response && response.data) {
                    products.value = response.data; 
                } else {
                    console.error("Response API tidak valid:", response);
                }
            } catch (error) {
                console.error("Gagal mengambil data penjualan:", error);
            }
        }

        onMounted(async () => {
            getBarang();
        });

        return {
            products
        };
    },
};
</script>