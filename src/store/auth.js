/** @format */

import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    
    users: [],
    role: null,
  }),

  getters: {
    isAuthenticated: (state) => state.token !== null,
  },

  actions: {
    // Register
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

    // Login
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

          return response.data;
        } else {
          console.error("Token not found in the response");
          console.error("Response data:", response.data);
          throw new Error("Login failed: Token missing in response");
        }
      } catch (error) {
        console.error(
          "Login error:",
          error.response ? error.response.data : error.message
        );
        throw error;
      }
    },

    // logout
    logout() {
      const router = useRouter();

      localStorage.removeItem("token");
      this.token = null;
      this.role = null;
      router.push("/");
    },
  },
});
