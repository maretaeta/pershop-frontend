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
                        <p class="text-gray-600">History</p>
                    </li>
                </ol>
                <div class="items-center justify-center p-2 pt-10">
                    <div class="w-full">
                        <h3 class="text-2xl font-medium text-gray-700">History transaction</h3>
                        <p class="text-sm text-gray-400 mb-6">Data Transaksi</p>
                    </div>
                </div>
            </div>

            <!-- Table history -->
          <div v-for="(transaction, index) in transaksi" :key="index" class="border border-orange-600 rounded-lg w-full mx-auto mb-10 shadow-md">
            <div class="p-4">
              <div class="flex justify-between pb-9 font-medium text-sm md:text-lg">
                <p class="text-cyan-800 ">Transaksi #{{ transaction.id_transaksi }}</p>
                <p>{{ formatDate(transaction.createdAt)}}</p>
              </div>
              <div v-for="(barangTransaksi, i) in transaction.barang_transaksi" :key="i">
                <div class="flex flex-col md:flex-row md:justify-between pb-4">
                  <p class="font-medium">{{ barangTransaksi.barang.nama_barang }}</p>
                  <p>{{ barangTransaksi.jumlah_barang }} buah</p>
                  <p>{{ formatHarga(barangTransaksi.barang.harga_barang) }}</p>
                  <p>{{ formatHarga(barangTransaksi.subtotal) }}</p>
                </div>
              </div>
              <div class="flex gap-10 justify-end font-semibold pt-9 pb-2">
                <p>Total Harga</p>
                <p>{{ formatHarga(transaction.totalHarga)}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useTransaksi } from '../../store/transaksi';

export default {
    setup() {
        const transaksiStore = useTransaksi();
        const transaksi = ref([]);

        async function fetchTransaksi() {
            const response = await transaksiStore.getTransaksi();
            if (response && response.data) {
                transaksi.value = response.data;
            } else {
                console.error("Error fetching transaction data:", response);
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

        // format tanggal
        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', options);
        };


        onMounted(() => {
            fetchTransaksi();
        });

        return {
            transaksi,
            formatHarga,
            formatDate
        };
    },
};
</script>