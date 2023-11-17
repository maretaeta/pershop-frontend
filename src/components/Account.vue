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
                        <p class="text-gray-600">Account</p>
                    </li>
                </ol>
                <div class="items-center justify-center p-2 pt-10">
                    <div class="w-full">
                        <h3 class="text-xl md:text-2xl font-medium text-gray-700">Setting Account</h3>
                        <p class="text-xs md:text-sm text-gray-400 mb-6">Setting your profile account</p>
                    </div>
                </div>
            </div>

        <!-- Table Account -->
        <div class="flex flex-col md:flex-row gap-5 p-4 w-full mx-auto">
           <div class="flex justify-items-center flex-col text-sm md:text-base w-1/2">
              <img
                class="w-32 mx-auto md:w-48 rounded-full object-cover"
                :src="profilePicture || 'https://via.placeholder.com/150'"
                alt="Profile Picture"
              >
              <input type="file" @change="onFileChange" accept="image/*" class="mt-5 block mx-auto">
            </div>
            <div class="w-1/2">
                <h2 class="text-xl mb-4">Pengaturan Akun</h2>
                <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label for="nama" class="block font-medium">Nama Lengkap</label>
                    <input type="text" id="username" v-model="nama" class="w-full border rounded px-3 py-2">
                </div>
                <div>
                    <label for="username" class="block font-medium">Username</label>
                    <input type="text" id="username" v-model="username" class="w-full border rounded px-3 py-2">
                </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Simpan</button>
          </form>
        </div>
      </div>

      
            </div>
        </div>
</template>

<script>
import { useAuthStore } from "../store/auth"

export default {
    data() {
        return {
            profilePicture: '',
            nama: '',
            username: '',
        };
    },

    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            this.profilePicture = URL.createObjectURL(file);
        },

        async submitForm() {
            try {
                const authStore = useAuthStore();
                const authenticatedUserId = authStore.id_users; 

                
                if (authenticatedUserId) {
                    if (this.profilePicture) {
                        await authStore.updateProfilePicture(authenticatedUserId, this.profilePicture);
                    }

                    if (this.nama || this.username) {
                        const userData = {
                            nama: this.nama,
                            username: this.username,
                        };
                        await authStore.updateUserData(authenticatedUserId, userData);
                    }

                    console.log('Data berhasil diperbarui');
                } else {
                    console.error('Tidak ada ID pengguna yang terautentikasi');
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            }
        },
    },
};
</script>
