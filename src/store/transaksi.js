/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const useTransaksi = defineStore("transaksi", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    transaksi: [],
    totalPendapatan: 0,
  }),

  actions: {
    async getTransaksi() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/transaksi",
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

    async createTransaction(transaksiData) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/transaksi/create",
          transaksiData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        return response;
      } catch (error) {
        console.error("Error creating transaction:", error);
        return null;
      }
    },

    async getTotalPendapatan() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/transaksi/total-value",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.totalPendapatan = response.data.total;
      } catch {
        console.error("Error get total pendapatan :", error);
        throw Error;
      }
    },
  },
});
