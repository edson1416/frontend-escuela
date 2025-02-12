<script setup lang="ts">
import Formulario from './Formulario.vue';

</script>

<template>
    <div class="flex justify-start  h-screen miclasexd w-full">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="relative w-full z-10 h-full"> 
            <div
                class="bg-slate-100 opacity-100 m-16 mt-24 md:w-1/2 sm:w-screen lg:w-1/3 h-2/3 flex flex-col rounded-xl shadow-xl">
                <Formulario></Formulario>
            </div>
        </div>

    </div>

</template>