<template>
    <div>
        <!-- Modal for editing data -->
        <div v-if="editedProduct" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
            <div class="modal-container bg-white w-[700px] mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-12 text-left px-10">
                    <h2 class="text-2xl text-cyan-800 font-semibold mb-6">Edit Barang</h2>
                    <form @submit.prevent="submitEdit">
                        <div class="mb-4">
                            <label for="nama_barang" class="block text-sm font-medium text-gray-700">Nama Barang</label>
                            <input v-model="editedProduct.nama_barang" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mb-4">
                            <label for="harga_barang" class="block text-sm font-medium text-gray-700">Harga Barang</label>
                            <input v-model="editedProduct.harga_barang" class="mt-1 p-2 w-full border rounded" type="number"/>
                        </div>
                        <div class="mb-4">
                            <label for="stok_barang" class="block text-sm font-medium text-gray-700">Stok Barang</label>
                            <input v-model="editedProduct.stok_barang" class="mt-1 p-2 w-full border rounded" type="number" />
                        </div>
                        <div class="mb-4">
                            <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
                            <input v-model="editedProduct.image" class="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div class="mt-6 flex justify-end">
                            <button type="submit" class="bg-cyan-700 px-4 py-3 text-white rounded">Simpan</button>
                            <button @click="closeEditModal"
                                class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4">Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useProductStore } from '../store/barang';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    props: {
        editedProduct: {
            type: Object,
            default: null,
        },
    },
    methods: {
        async submitEdit() {
            try {
                const store = useProductStore();
                const response = await store.updateBarang(this.editedProduct);
                if (response && response.data) {
                    this.closeEditModal();
                    toast.success('Product updated successfully');
                } else {
                    toast.error('Error updating product');
                }
            } catch (error) {
                console.error("Update error:", error);
                toast.error('Error updating product');
            }
        },
        closeEditModal() {
            this.$emit("close");
        },
    },
};
</script>
