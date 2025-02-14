<script setup>
import NavBar from './components/principal/NavBar.vue';
import {useAuthStore} from "./stores/auth.js";
import {storeToRefs} from "pinia";
import MenuHamb from "./components/dashboard/MenuHamb.vue";

const authStore = useAuthStore()
const {token} = storeToRefs(authStore);

</script>

<template>
  <NavBar v-if="!token"></NavBar>
  <!-- <Inicio></Inicio> -->
   <router-view></router-view>

</template>

<style scoped>

.miclasexd{
  background:url("/public/img/salon-clases.jpg") center/cover no-repeat;
}

</style>
