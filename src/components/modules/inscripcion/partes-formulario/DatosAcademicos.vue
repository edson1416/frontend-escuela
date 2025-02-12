<script setup>
import { ref } from 'vue'
import { FwbButton } from 'flowbite-vue'
import { FwbInput } from 'flowbite-vue'
import { FwbSelect } from 'flowbite-vue'
import { FwbAlert } from 'flowbite-vue'
import { FwbFileInput } from 'flowbite-vue'
import { FwbCard } from 'flowbite-vue'

const constancia = ref(null)
const certificado = ref(null)

const name = ref('')
const seleccionCiclo = ref(false)

const prueba = () => {
    seleccionCiclo.value = true
    console.log('prueba card')
}



const selected = ref('')
const countries = [
    { value: 1, name: 'Sin expediente academico (Kinder)' },
    { value: 2, name: 'Estudio anteriormente en otra institución' },
    { value: 3, name: 'Reingreso' },
]

const grado = ref('')
const gradosDisponibles = [
    { value: 1, name: 'Primer Grado' },
    { value: 2, name: 'Segundo Grado' },
    { value: 3, name: 'Tercer Grado' },
]

const seccion = ref('')
const seccionesDisponibles = [
    { value: 1, name: 'Seccion "A"' },
    { value: 2, name: 'Seccion "B"' },
    { value: 3, name: 'Seccion "C"' },
]

const modalidad = ref('')
const modalidades = [
    { value: 1, name: 'Virtual' },
    { value: 2, name: 'Presencial' },
    { value: 3, name: 'Semipresencial' },
]

defineEmits(['componenteReglamento'])

</script>

<template>
    <div class="space-y-4">
        <div class="space-y-3">
            <h1 class="text-xl font-bold flex text-blue-600">DATOS ACADEMICOS</h1>
            <fwb-select v-model="selected" required :options="countries" label="Seleccione su situación de ingreso" />

        </div>


        <div v-if="selected == 1" class="space-y-3">
            <fwb-alert icon type="success" class="shadow-md">
                Ya que su hijo/a es nuevo en la institución y no ha estado en ninguna otra
                puede saltarse esta seccion he ir directo a nuestro reglamento institucional.
            </fwb-alert>

        </div>
        <div v-else-if="selected == 2 || selected == 3" class="space-y-4">
            <h1 v-if="selected == 2" class="text-lg font-semibold flex">Documentos academicos de la institución anterior</h1>
            <h1 v-if="selected == 3" class="text-lg font-semibold flex">Documentos academicos de la institución</h1>
            <fwb-file-input v-if="selected == 2 || selected == 3" v-model="certificado" label="Certificado del ultimo grado cursado." />
            <fwb-file-input v-if="selected == 2" v-model="constancia" label="Constancia de buena conducta." />

        </div>
        <div class="space-y-5">
            <h1 class="text-lg font-semibold flex">Grados y secciones disponibles</h1>

            <div v-if="seleccionCiclo == false" class="flex flex-col items-center space-y-3">
                <div class="flex flex-row space-x-3">
                    <fwb-card @click="prueba()" href="#">
                        <div class="p-5">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Segundo Ciclo
                            </h5>
                            <p class="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological
                                order.
                            </p>
                        </div>
                    </fwb-card>
                    <fwb-card href="#">
                        <div class="p-5">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p class="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological
                                order.
                            </p>
                        </div>
                    </fwb-card>
                </div>
                <div class="flex flex-row space-x-3">
                    <fwb-card href="#">
                        <div class="p-5">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p class="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological
                                order.
                            </p>
                        </div>
                    </fwb-card>
                    <fwb-card href="#">
                        <div class="p-5">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p class="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                                chronological
                                order.
                            </p>
                        </div>
                    </fwb-card>
                </div>

            </div>

            <div v-else-if="seleccionCiclo == true" class="flex flex-row justify-center space-x-9 ">

                <fwb-select class="flex w-1/3 " v-model="grado" required :options="gradosDisponibles" label="Seleccione un grado" />
                <fwb-select class="flex w-1/3" v-model="seccion" required :options="seccionesDisponibles" label="Seleccione una seccion" />
                <fwb-select class="flex w-1/3" v-model="modalidad" required :options="modalidades" label="Seleccione modalidad" />
            </div>

        </div>

        <div class="flex flex-col items-end">
            <fwb-button color="dark" @click.prevent="$emit('componenteReglamento')" size="xl"
                class="w-1/6 my-3 mr-3">Siguiente</fwb-button>
        </div>

    </div>
</template>