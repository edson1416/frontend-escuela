<script setup>
import Card from './Card.vue';
import Card2 from './Card2.vue';
import Carrusel from './Carrusel.vue';
import NavBar from './NavBar.vue';


</script>

<template>
    <!-- <div class="">
        <NavBar></NavBar>
    </div> -->
    <div class="flex xl:flex-row celulares:flex-col pt-16 lg:pt-16 xl:pt-16 md:pt-36">
        <!--Eventos-->
        <div class="w-1/2 celulares:w-screen ">
            <!--Titulo-->
            <div class="flex justify-center my-5 shadow-md bg-slate-100 rounded-md mx-2 p-1 shadow-blue-300">
                <h1 class="text-3xl font-semibold flex">Eventos Proximos</h1>
            </div>
            <!--Cards Eventos-->
            <div
                class="flex space-x-2 px-2 celulares:flex-col celulares:items-center celulares:space-y-3 lg:flex-col lg:items-center md:flex-col md:items-center sm:flex-col sm:items-center xl:flex-row">
                <Card class=" lg:my-3 "></Card>
                <Card class=" lg:my-3"></Card>
                <Card class=" lg:my-3"></Card>
            </div>

        </div>

        <!--Comentarios-->
        <div class="w-1/2 celulares:w-screen ">
            <div class="flex justify-center my-5 shadow-md bg-slate-100 rounded-md mx-2 p-1 shadow-blue-300">
                <h1 class="text-3xl font-semibold flex">Comentarios</h1>
            </div>
            <div class="flex flex-col lg:ml-16 md:ml-8 ">
                <Card2 class="my-4"></Card2>
                <Card2 class="my-4"></Card2>
                <Card2 class="my-4"></Card2>
            </div>

        </div>

    </div>
    <!-- <div class="w-2/3 p-3 bg-slate-100 rounded-xl shadow-md m-12">
        <Carrusel></Carrusel>
    </div> -->

</template>

<style scoped>
.miclasexd {
    background: url("/public/img/sw.jpg") center/cover no-repeat;
}
</style>
