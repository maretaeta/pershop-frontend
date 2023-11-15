<template>
    <div class="pl-4 lg:pl-60 xl:pl-64  w-full min-h-screen p-7 xl:p-10 bg-slate-100 relative">
        <div class="bg-white min-h-screen rounded-xl p-7 ml-2">
            <!-- Navigasi -->
            <div class="font-poppins text-sm font-semibold mb-6">
                <ol class="list-none p-0 pl-3 inline-flex">
                    <li class="flex items-center text-purple">
                        <p class="text-gray-700">Home</p>
                        <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path
                                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                            </path>
                        </svg>
                    </li>
                    <li class="flex items-center">
                        <p class="text-gray-600">Dashboard</p>
                    </li>
                </ol>

                <!-- judul -->
                <div class="items-center justify-center p-2 pt-10">
                    <div class="w-full">
                        <h3 class="text-2xl font-medium text-gray-700">Data Produk</h3>
                        <p class="text-sm text-gray-400 mb-6">Data Produk yang dipasarkan</p>

                        <!-- button create -->
                        <div  class="flex gap-3 justify-end items-start pt-7 ">
                            <div class="flex gap-2 bg-cyan-600 text-white w-38 h-10 rounded-xl items-center text-center px-5" @click="showCreateModal = true">
                                <font-awesome-icon icon="plus"/>
                                <p class="text-base">Create Produk</p>
                            </div>
                            <!-- <div class="flex gap-2 bg-cyan-800 text-white h-10 rounded-xl items-center text-center px-3" >
                                <font-awesome-icon icon="print" />
                                <p class="text-sm">Cetak</p>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>

        <!-- tabel data pembelian -->
        <div class="flex flex-col mb-12 bg-gray-25 rounded-md border">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-x-auto sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200 text-left">
                    <thead>
                        <tr>
                            <th
                                class="px-5 py-3 bg-cyan-800 text-white text-center md:text-base text-sm leading-4 font-medium uppercase tracking-wider">
                                No
                            </th>
                            <th
                                class="px-6 py-3 bg-cyan-800 text-white text-sm md:text-base leading-4 font-medium uppercase tracking-wider">
                                Nama Barang
                            </th>
                            <th
                                class="px-6 py-3 bg-cyan-800 text-white text-sm md:text-base leading-4 font-medium uppercase tracking-wider">
                                Harga Barang
                            </th>
                            <th
                                class="px-6 py-3 bg-cyan-800 text-white text-sm leading-4 md:text-base font-medium uppercase tracking-wider">
                                Stok Barang
                            </th>
                            <th
                                class="px-6 py-3 bg-cyan-800 text-white text-sm md:text-base leading-4 font-medium uppercase tracking-wider">
                                Gambar
                            </th>
                            <th
                                class="px-6 py-3 bg-cyan-800 text-white text-sm md:text-base leading-4 font-medium uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 border-t border-gray-300">
                        <tr v-for="(product, index) in barang" :key="product.id_barang" class="border-b border-gray-200">
                            <td class="px-6 py-4 whitespace-no-wrap text-center">
                                <p class="text-sm leading-5 font-medium text-gray-900">{{ index + 1 }}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap">
                                <div class="text-sm leading-5 font-medium text-gray-900">{{ product.nama_barang }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap">
                                <div class="text-sm leading-5 font-medium text-gray-900">{{ formatHarga(product.harga_barang) }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap">
                                <div class="text-sm leading-5 font-medium text-gray-900">{{ product.stok_barang }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap">
                                <div class="text-sm leading-5 font-medium text-gray-900">
                                     <img :src="product.image" alt="Product Image" class="w-20 h-20">
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap flex gap-3 justify-center ">
                                <font-awesome-icon icon="pen-to-square" class="text-green-700" @click="editedProduct(product)"/>
                                <font-awesome-icon icon="trash-can" class="text-red-500" @click="deleteBarang(product.id_barang)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</div>
</div>

<UpdateBarang
    v-if="showEditModal"
    :editedProduct="selectedProduct"
    @close="showEditModal = false"
/>

<CreateBarangModal
    :showCreateModalProp="showCreateModal"
    @closeModal="showCreateModal = false"
/>
</template>


<script>
import { ref, onMounted, watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useProductStore } from "../../store/barang";
import CreateBarangModal from "../../modals/CreateBarang.vue"
import UpdateBarang from '../../modals/updatebarang.vue'

export default {
    setup() {
        const usebarang = useProductStore();
        const barang = ref([]);
        const showEditModal = ref(false);
        const selectedProduct = ref(null);
        const showCreateModal = ref(false);


        const closeCreateModal = () => {
            showCreateModal.value = false;
        };


        async function getBarang() {
            try {
                const response = await usebarang.getBarang();
                if (response && response.data) {
                    barang.value = response.data;
                }
                else {
                    console.error("Response API tidak valid:", response);
                }
            }
            catch (error) {
                console.error("Gagal mengambil data penjualan:", error);
            }
        }

        const editedProduct = (product) => {
            selectedProduct.value = { ...product };
            showEditModal.value = true;
        };

        const deleteBarang = async (id_barang) => {
            try {
                await usebarang.deleteBarang(id_barang)
                toast.success("Produk dihapus");
            } catch (error) {
                console.log("Error deleting Barang", error)
            }
        }

        // Format Rupiah
        function formatToRupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(number);
        }

        function formatHarga(harga) {
            return formatToRupiah(harga);
        }

        onMounted(async () => {
            getBarang();
        });

        watch(() => usebarang.getBarang(), (newBarang) => {
            if (newBarang) {
                barang.value = newBarang.data;
            }
        });

        return {
            barang,
            selectedProduct,
            showEditModal,
            editedProduct,
            deleteBarang,
            showCreateModal,
            closeCreateModal,
            formatHarga
        };
        
    },
    components: {
        UpdateBarang,
        CreateBarangModal,
    },
    methods: {
        closeCreateModal() {
            this.showCreateModal = false;
        },
},
}
</script>