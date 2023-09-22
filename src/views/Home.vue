<template>
   <div>
     <dashboard /> 
   </div>
</template>

<script>
import dashboard from "../components/dashboard.vue";
import navbar from "../components/navbar.vue"
import sidebar from "../components/sidebar.vue"

export default {
    components: {
        navbar,
        sidebar,
        dashboard
    }
};
</script>
