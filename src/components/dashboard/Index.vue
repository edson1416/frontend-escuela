<script setup>

import MenuHamb from "./MenuHamb.vue";
import InicioDashboard from "./InicioDashboard.vue";
import UserDashboard from "./UserDashboard.vue";
</script>

<template>
  <div class="flex flex-row h-screen justify-center">
    <div class="flex w-1/6 h-screen">
      <MenuHamb></MenuHamb>
    </div>
    <div class="flex w-4/6">
      <router-view></router-view>
    </div>
    <div class="flex flex-col w-1/6">
      <UserDashboard></UserDashboard>
    </div>
  </div>
</template>

<style scoped>

</style>