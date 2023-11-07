<template>
    <div class="pl-0 lg:pl-64 w-full min-h-screen p-10 bg-slate-100 relative">
        <div class="bg-white min-h-screen rounded-xl p-8 ml-10">
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
                <div class="lg:flex justify-between items-center mb-6 p-2 pt-10">
                    <p class="text-2xl font-semibold mb-2 lg:mb-0 text-gray-800">Selamat datang, Admin!</p>
                
                </div>
            </div>

            <!-- card -->
        <div class="flex flex-wrap -mx-3 mb-16 p-2">
            <div class="w-1/2 xl:w-1/3 px-3">
                <div class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0">
                    <div class="px-3 py-10 lg:px-5 lg:py-5 bg-violet-500 text-white rounded-l-lg">
                        <font-awesome-icon icon="bag-shopping"  class="w-8 h-8 fill-current mx-auto hidden lg:block" />
                    </div>
                    <div class="text-gray-700 ml-6 leading-6">
                        <p class="text-sm text-gray-600">Total Produk</p>
                        <p class="font-semibold text-2xl">100</p>
                    </div>
                </div>
            </div>

            <div class="w-1/2 xl:w-1/3 px-3">
                <div class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0">
                    <div class="px-3 py-10 lg:px-5 lg:py-5 bg-violet-500 text-white rounded-l-lg">
                        <font-awesome-icon icon="credit-card" class="w-8 h-8 fill-current mx-auto hidden lg:block" />
                    </div>
                    <div class="text-gray-700 ml-6 leading-6">
                        <p class="text-sm text-gray-600">Total Penjualan</p>
                        <p class="font-semibold text-2xl">100</p>
                    </div>
                </div>
            </div>

            <div class="w-1/2 xl:w-1/3 px-3">
                <div class="w-full bg-white border rounded-lg flex items-center p-0 mb-6 xl:mb-0">
                    <div class="px-3 py-10 lg:px-5 lg:py-5 bg-violet-500 text-white rounded-l-lg">
                        <font-awesome-icon icon="sack-dollar" class="w-8 h-8 fill-current mx-auto hidden lg:block" />
                    </div>
                    <div class="text-gray-700 ml-6 leading-6">
                        <p class="text-sm text-gray-600">Total Pendapatan</p>
                        <p class="font-semibold text-2xl">100</p>
                    </div>
                </div>
            </div>
        </div>
            
    </div>
</div>
</template>