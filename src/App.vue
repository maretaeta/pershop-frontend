<template>
  <div id="app">
    <div class="flex flex-row w-full gap-0">
          <div>
              <sidebar />
          </div>
          <div class="flex flex-col w-full bg-slate-100">
              <navbar />
              <RouterView />
          </div>
       </div>
  </div>
</template>

<script>
import sidebar from "./components/sidebar.vue"
import navbar from "./components/navbar.vue"

export default {
  name: 'App',
  components: {
    sidebar,
    navbar,
  }
};
</script>
