<script setup>

import CardAutoridades from "./CardAutoridades.vue";
</script>

<template>
  <div class="flex justify-center xl:flex-row celulares:flex-col pt-16 lg:pt-16 xl:pt-16 md:pt-36 mt-8">
    <div class="flex w-2/3 justify-center my-5 shadow-md bg-slate-100 rounded-md p-1">
      <h1 class="text-3xl font-semibold flex">Nuestras Autoridades</h1>
    </div>
  </div>
  <div class=" flex flex-col items-center space-y-6">
    <div class=" w-3/4 flex flex-row space-x-6 justify-between">
      <CardAutoridades></CardAutoridades>
      <CardAutoridades></CardAutoridades>
    </div>
    <div class=" w-3/4 flex flex-row space-x-6 justify-between">
      <CardAutoridades></CardAutoridades>
      <CardAutoridades></CardAutoridades>
    </div>

  </div>
</template>

<style scoped>

</style>