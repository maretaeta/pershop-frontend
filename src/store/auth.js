/** @format */

import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
  }),

  actions: {
    async registerUser(userData) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (!response.ok) {
          throw new Error("Registration failed");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },

    async login(username, password) {
      return axios
        .post("http://localhost:3000/api/v1/auth/login", {
          username,
          password,
        })
        .then((response) => {
          (this.token = response.data.token),
            localStorage.setItem("token", this.token);
          axios.defaults.headers.common["Authorization"] = `Bearer $(token)`;
        });
    },

    logout() {
      localStorage.clear("token");
    },

    // logout() {
    //   localStorage.removeItem("token");
    //   this.token = null;
    // },
  },
});

export default useAuthStore;
