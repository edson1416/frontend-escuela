<script setup>
import { FwbCarousel } from 'flowbite-vue'

const pictures = [
  {src: '/img/carrusel-inicio/escuela1.jpg', alt: 'Image 1'},
  {src: '/img/carrusel-inicio/escuela2.jpeg', alt: 'Image 2'}
]
</script>

<template>
  <div class="flex justify-center xl:flex-row celulares:flex-col pt-16 lg:pt-16 xl:pt-16 md:pt-36 mt-8">
    <div class="flex w-2/3 justify-center my-5 shadow-md bg-slate-100 rounded-md p-1">
      <h1 class="text-3xl font-semibold flex">Nuestras Instalaciones</h1>
    </div>
  </div>

  <div class="flex justify-center mt-10">
    <fwb-carousel :pictures="pictures" class="w-2/3 shadow-xl rounded-xl" />
  </div>

</template>

<style scoped>

</style>