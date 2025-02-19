<script setup>
import NavBar from './components/principal/NavBar.vue';
import {useAuthStore} from "./stores/auth.js";
import {storeToRefs} from "pinia";
import MenuHamb from "./components/dashboard/MenuHamb.vue";
import Index from "./components/dashboard/Index.vue";

const authStore = useAuthStore()
const {token} = storeToRefs(authStore);

</script>

<template>
  <div v-if="!token" class="container">
    <NavBar ></NavBar>
    <router-view></router-view>
  </div>

  <Index v-else></Index>

</template>

<style scoped>

.miclasexd{
  background:url("/public/img/salon-clases.jpg") center/cover no-repeat;
}

</style>
