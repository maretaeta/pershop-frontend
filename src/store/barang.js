/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    products: [],
    totalBarang: 0,
  }),

  actions: {
    async getBarang() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/barang",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data barang:", error);
        return null;
      }
    },

    async updateBarang(updateBarang) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/barang/${updateBarang.id_barang}`,
          updateBarang,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (response.status === 200) {
          const updatedProductIndex = this.products.findIndex(
            (p) => p.id_barang === updateBarang.id_barang
          );
          if (updatedProductIndex !== -1) {
            this.products[updatedProductIndex] = updateBarang;
          }
        }

        return response;
      } catch (error) {
        console.error("Error updating data barang:", error);
        return null;
      }
    },

    async deleteBarang(id_barang) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/barang/${id_barang}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        return response;
      } catch {
        console.error("Error delete data:", error);
        return null;
      }
    },

    async createBarang(newProduct) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/barang/create",
          newProduct,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (response.status === 201) {
          this.products.push(response.data);
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error creating product:", error);
        return null;
      }
    },

    async getTotalBarang() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/barang/totalBarang",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.totalBarang = response.data.total;
      } catch (error) {
        console.error("Error fetching data stok barang:", error);
        throw Error
      }
    },
  },
});
