<script setup>
import { ref } from 'vue'
import { FwbButton } from 'flowbite-vue'
import { FwbInput } from 'flowbite-vue'
import { FwbFileInput } from 'flowbite-vue'

const name = ref('')
const partida_nacimiento = ref(null)
const foto = ref(null)

const props = defineProps({
    formData: {
        type: Object,
        required: true
    }
})

defineEmits(['componeneteAcademico'])

</script>
<template>
    <div class="space-y-4">
        <div class="space-y-3">
            <h1 class="text-xl font-bold flex text-blue-600">DATOS GENERALES</h1>
            <h1 class="text-lg font-semibold flex">Datos generales del alumno</h1>
            <fwb-input v-model="props.formData.datosGenerales.nombres" placeholder="nombres del alumno" label="Nombres" />
            <fwb-input v-model="props.formData.datosGenerales.apellidos" placeholder="apellidos del alumno" label="Apellidos" />
            <fwb-input v-model="name" placeholder="dirección" label="Dirección" />
            <fwb-input v-model="name" placeholder="telefono" label="Telefono" />
            <fwb-input v-model="name" type="email" placeholder="correo" label="Correo" />

            <fwb-file-input v-model="partida_nacimiento" label="Partida de nacimiento." />
            <fwb-file-input v-model="foto" label="Fotografia." />
        </div>

        <div class="space-y-3">
            <h1 class="text-lg font-semibold flex">Datos generales del Responsable</h1>
            <fwb-input v-model="name" placeholder="nombres completo" label="Nombre completo" />
            <fwb-input v-model="name" placeholder="dirección" label="Dirección" />
            <fwb-input v-model="name" placeholder="telefono" label="Telefono" />
            <fwb-input v-model="name" placeholder="correo" label="Correo" />
            <fwb-input v-model="name" placeholder="DUI" label="DUI" />
        </div>

        <div class="flex flex-col items-end">
            <fwb-button color="dark" @click.prevent="$emit('componeneteAcademico')" size="xl"
                class="w-1/6 my-3 mr-3">Siguiente</fwb-button>
        </div>

    </div>
</template>