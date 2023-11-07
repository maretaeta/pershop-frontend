<template>
    <div>
        <!-- Modal untuk membuat produk baru -->
        <div v-if="showCreateModalProp" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
            <div class="modal-container bg-white w-[700px] mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-12 text-left px-10">
                    <h2 class="text-2xl text-cyan-800 font-semibold mb-6">Create Produk</h2>
                    <form @submit.prevent="createProduct">
                        <div class="mb-4">
                            <label for="nama_barang" class="block text-sm font-medium text-gray-700">Nama Barang</label>
                            <input v-model="newProduct.nama_barang" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="harga_barang" class="block text-sm font-medium text-gray-700">Harga Barang</label>
                            <input v-model="newProduct.harga_barang" class="mt-1 p-2 w-full border rounded" type="number" />
                        </div>
                        <div class="mb-4">
                            <label for="stok_barang" class="block text-sm font-medium text-gray-700">Stok Barang</label>
                            <input v-model="newProduct.stok_barang" class="mt-1 p-2 w-full border rounded" type="number" />
                        </div>
                        <div class="mb-4">
                            <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
                            <input v-model="newProduct.image" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mt-6 flex justify-end">
                            <button type="submit" class="bg-cyan-700 px-4 py-3 text-white rounded" @click="createProduct">
                                Simpan
                            </button>
                            <button class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4" @click="closeModal">Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useProductStore } from "../store/barang";

export default {
    props: {
        showCreateModalProp: {
            type: Boolean,
            required: true,
        },
    },

    setup(props, { emit }) {
        const usebarang = useProductStore();
        const newProduct = ref({
            nama_barang: "",
            harga_barang: 0,
            stok_barang: 0,
            image: "",
        });

        const createProduct = async () => {
            try {
                const response = await usebarang.createBarang(newProduct.value);
                if (response) {
                    toast.success("Produk berhasil dibuat");
                    emit('closeModal'); 
                    newProduct.value = {
                        nama_barang: "",
                        harga_barang: 0,
                        stok_barang: 0,
                        image: "",
                    };
                    usebarang.getBarang();
                } else {
                    toast.error("Gagal membuat produk");
                }
            } catch (error) {
                console.error("Error creating product:", error);
                toast.error("Gagal membuat produk");
            }
        };

        const closeModal = () => {
            emit('closeModal'); 
        };

        return {
            createProduct,
            newProduct,
            closeModal
        }
    }
}
</script>
