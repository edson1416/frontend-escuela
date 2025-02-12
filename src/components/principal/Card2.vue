<template>
    <fwb-card href="#">
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          User1
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Instalaciones en perfecto estado, y los maestros muy bien preparados.
        </p>
        <fwb-rating :rating="3" size="sm" class="mt-2"/>
      </div>
    </fwb-card>
</template>

<script setup>
import { FwbCard } from 'flowbite-vue'
import { FwbRating } from 'flowbite-vue'
</script>