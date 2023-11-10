<template>
  <div class="bg-slate-100 min-h-screen lg:p-10 p-5 relative">
    <div class="bg-white min-h-screen rounded-xl font-poppins mb-6 p-6 xl:p-10">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Barang Content -->
        <div class="w-full min-h-screen">
          <!-- Search Input -->
          <div class="relative text-gray-500 w-full mx-auto">
            <input
              type="search"
              name="search"
              placeholder="Search..."
              class="bg-white h-10 w-full px-3 md:px-5 rounded-lg border text-sm focus:outline-none"
            />
            <button
              type="submit"
              class="absolute right-0 top-0 mt-3 mr-4 focus:outline-none hover:text-cyan-800"
            >
              <font-awesome-icon
                icon="magnifying-glass"
                class="h-4 w-4 pb-2 fill-current"
              />
            </button>
          </div>

          <!-- Content Produk Left-->
          <div class="grid grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
            <div v-for="product in products" :key="product.id_barang" class="border p-2 rounded">
              <img :src="product.image" class=""/>
              <div class="flex justify-between py-1 text-xs xl:text-sm">
                <h3 class="h-10">{{ product.nama_barang }}</h3>
                <p>{{ product.harga_barang }}</p>
              </div>
            <div class="w-full bg-cyan-600 rounded-md mt-5 flex items-center justify-between">
                <button @click="toggleProductSelection(product); angkaPerProduk[product.id_barang] = 0" class="text-white text-sm p-2 justify-center text-center flex-">
                    {{ isSelectedProduct(product) ? '' : 'Pilih' }}
                </button>
                <button @click="kurangAngka(product)" v-if="isSelectedProduct(product)" class="text-white text-sm p-2 text-center flex-auto">-</button>
                    <p class="text-white text-sm p-2 text-center flex-auto">{{ angkaPerProduk[product.id_barang] }}</p>
                <button @click="tambahAngka(product)" v-if="isSelectedProduct(product)" class="text-white text-sm p-2 text-center flex-auto">+</button>
            </div>
            </div>
        </div>
    </div>

    <!-- Confirmation Content Right -->
    <div class="md:w-1/2 min-h-screen">
      <h3 class="text-md md:text-lg">Shopping Klik Ku</h3>
      <p class="text-base text-slate-500">Kode pembelian #0001</p>
      <div class="pt-10">
        <table class="w-full min-w-full text-left">
          <thead>
            <tr class="grid grid-cols-3 w-full gap-8 pb-5">
              <th class=" font-semibold text-lg">Barang</th>
              <th class=" font-semibold text-lg">Qty</th>
              <th class=" font-semibold text-lg">Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in selectedProducts" :key="product.id_barang" class="grid grid-cols-3 w-full justify-between gap-8 pb-4">
              <td class="text-base">{{ product.nama_barang }}</td>
              <td class="">{{ angkaPerProduk[product.id_barang] || 0 }}</td>
              <td class="">{{ formatHarga(product.harga_barang) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pt-10">
        <div class="flex justify-between py-1">
          <h3 class="font-medium text-lg">Item Total</h3>
          <p>{{ selectedProducts.length }} Item</p>
        </div>
        <div class="flex justify-between py-1">
          <h3 class="font-medium text-lg">Sub Total</h3>
          <p>{{ formatHarga(totalHarga) }}</p>
        </div>
      </div>

    <div class="w-full bg-cyan-700 rounded-md mt-8">
      <button @click="createTransaction" class="text-white p-2 w-full text-center">Konfirmasi</button>
    </div>
    </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from "../../store/barang";
import { useTransaksi } from '../../store/transaksi';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  setup() {
    const usebarang = useProductStore();
    const products = ref([]);
    const angka = ref(0);
    const selectedProducts = ref([]);
    const angkaPerProduk = ref({});

    const transaksiStore = useTransaksi();
      
    // get produk bagian kiri
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

    // selesct buttin produk
    const toggleProductSelection = (product) => {
      const index = selectedProducts.value.findIndex((p) => p.id_barang === product.id_barang);
      if (index === -1) {
        selectedProducts.value.push(product);
      } else {
        selectedProducts.value.splice(index, 1);
        // Hapus angka dari produk yang tidak dipilih lagi
        delete angkaPerProduk.value[product.id_barang];
      }
    };

    const isSelectedProduct = (product) => {
      return selectedProducts.value.some((p) => p.id_barang === product.id_barang);
    };


    // button current
    const tambahAngka = (product) => {
      if (selectedProducts.value.includes(product)) {
        if (!angkaPerProduk.value[product.id_barang]) {
          angkaPerProduk.value[product.id_barang] = 0;
        }
        angkaPerProduk.value[product.id_barang] += 1;
      }
    };

    const kurangAngka = (product) => {
      if (selectedProducts.value.includes(product) && angkaPerProduk.value[product.id_barang] > 0) {
        angkaPerProduk.value[product.id_barang] -= 1;
      }
    };

    // buat total harga
    const totalHarga = computed(() => {
      return selectedProducts.value.reduce((total, product) => {
        return total + (product.harga_barang * (angkaPerProduk.value[product.id_barang] || 0));
      }, 0);
    });

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

    // Notif berhasil
    const showToastSuccess = () => {
      toast.success("Transaksi Berhasil", {
        autoClose: 1000,
      });
    };

    // Push transaksi
    const createTransaction = async () => {
      if (Array.isArray(selectedProducts.value) && selectedProducts.value.length > 0) {
        const transaksiData = {
          userId: 3,
          barangTransaksi: selectedProducts.value.map((product) => ({
            id_barang: product.id_barang,
            jumlah_barang: angkaPerProduk.value[product.id_barang] || 0,
          })),
        };

        try {
          const response = await transaksiStore.createTransaction(transaksiData);
          if (response && response.data) {
            console.log("Transaction created:", response.data);
            showToastSuccess()

            // Menunggu 2 detik setelah toast menghilang sebelum menghapus data
            setTimeout(() => {
              selectedProducts.value = [];
              angkaPerProduk.value = {};
            }, 2000);
          } else {
            console.error("Failed to create transaction. Response:", response);
          }
        } catch (error) {
          console.error("Error creating transaction:", error);
        }
      } else {
        console.warn("No selected products to create a transaction.");
      }
    };

    onMounted(async () => {
      getBarang();
    });

    

    return {
      products,
      selectedProducts,
      angkaPerProduk,
      toggleProductSelection,
      isSelectedProduct,
      tambahAngka,
      kurangAngka,
      totalHarga,
      formatHarga,
      createTransaction,
      showToastSuccess
    };
  },
};
</script>
