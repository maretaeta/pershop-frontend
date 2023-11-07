/** @format */

import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "app",
  state: () => ({
    sideBarOpen: false,
  }),
  getters: {
    isSideBarOpen: (state) => state.sideBarOpen,
  },
  actions: {
    toggleSidebar() {
      this.sideBarOpen = !this.sideBarOpen;
    },
  },
});
