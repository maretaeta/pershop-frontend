/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const useTransaksi = defineStore("transaksi", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    transaksi: [],
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
  },
});
