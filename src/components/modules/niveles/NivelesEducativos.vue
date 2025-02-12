<script setup lang="ts">
import CardNivel from './CardNivel.vue';

</script>

<template>
    <div class="pt-16 flex flex-col items-center">
        <!--Titulo-->
        <div class="flex w-2/3 justify-center my-5 shadow-md bg-slate-100 rounded-md p-1">
            <h1 class="text-3xl font-semibold flex">Niveles Educativos</h1>
        </div>
        <div class="flex space-x-5 mt-8">
            <CardNivel></CardNivel>
            <CardNivel></CardNivel>
            <CardNivel></CardNivel>
            <CardNivel></CardNivel>
        </div>

    </div>
</template>