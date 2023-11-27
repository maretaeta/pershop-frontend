/** @format */

// store/auth.js

import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    role: null,
    tokenExpiration: null,
  }),

  getters: {
    isAuthenticated: (state) => state.token !== null,
  },

  actions: {
    async login(loginData) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/login",
          loginData
        );

        if (
          response.data &&
          response.data.result &&
          response.data.result.token
        ) {
          const { token } = response.data.result;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          this.token = token;

          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.role;
          this.role = userRole;

          const tokenExp = decodedToken.exp;
          this.tokenExpiration = new Date(tokenExp * 1000);

          return response.data;
        } else {
          console.error("Token not found in the response");
        }
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },

    async checkTokenExpiration() {
      if (this.token && this.tokenExpiration) {
        const currentDateTime = new Date();
        if (currentDateTime >= this.tokenExpiration) {
          this.logout();
        }
      }
    },

    async fetchData() {
      await this.checkTokenExpiration();
      try {
        const response = await axios.get("http://example.com/data");
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },

    logout() {
      localStorage.removeItem("token");
      this.token = null;
      this.role = null;
      this.tokenExpiration = null;
    },

    async updateProfilePicture(userId, file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          `http://localhost:3000/api/v1/users/${userId}/profile-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error updating profile picture:", error);
        throw error;
      }
    },

    async updateUserData(userId, userData) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/users/${userId}`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
      }
    },
  },
});
