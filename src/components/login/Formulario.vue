<script setup> 

</script>

<template>
    
    <h1 class="flex justify-center text-3xl font-medium mt-8 ">INICIAR SESION</h1>

    <form class="p-8 flex flex-col">

        <div class="flex flex-col my-1 ">
            <label class="text-xl my-2 mx-2 font-normal" for="">Correo</label>
            <input class=" h-12 placeholder:text-xl rounded-md shadow-md px-4 focus:outline-none" type="text" placeholder="correo">
        </div>
        
        <div class="flex flex-col my-3">
            <label class="text-xl my-2 mx-2 font-normal" for="">Contraseña</label>
            <input class="h-12 placeholder:text-xl rounded-md shadow-md px-4 focus:outline-none" type="password" placeholder="contraseña">
        </div>
    
        <div class="flex flex-row justify-center mt-14 mb-4">
            <input class="h-14 text-white font-bold text-xl bg-blue-400 hover:bg-blue-300 lg:w-1/2 rounded-md shadow-md p-2" type="submit" value="INICIAR SESION">
        </div>
        
    </form>
</template>