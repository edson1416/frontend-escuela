<script setup>
import Inicio from './components/principal/Inicio.vue';
import NavBar from './components/principal/NavBar.vue';

</script>

<template>
  <NavBar></NavBar>
  <!-- <Inicio></Inicio> -->
   <router-view></router-view>

</template>

<style scoped>

.miclasexd{
  background:url("/public/img/sw.jpg") center/cover no-repeat;
}

</style>
