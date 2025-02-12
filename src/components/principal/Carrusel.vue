<template>
    <fwb-carousel :pictures="pictures" slide :slide-interval="2000" class="" />
</template>

<script setup>
import { FwbCarousel } from 'flowbite-vue'

const pictures = [
    { src: '/img/carrusel-inicio/escuela1.jpg', alt: 'Image 1' },
    { src: '/img/carrusel-inicio/escuela2.jpeg', alt: 'Image 2' },
]
</script>