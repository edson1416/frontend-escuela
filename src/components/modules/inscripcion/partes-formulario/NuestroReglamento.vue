<script setup>
import { ref } from 'vue'
import { FwbTab, FwbTabs } from 'flowbite-vue'
import { FwbCheckbox } from 'flowbite-vue'
import { FwbButton } from 'flowbite-vue'

const activeTab = ref('first')


const check = ref(false)
</script>

<template>
    <div class="flex flex-col space-y-5">
        <div class="flex">
            <div class="flex mt-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
            </div>

            <h1 class="text-2xl font-semibold">Reglamento institucional</h1>
        </div>

        <fwb-tabs v-model="activeTab" class="p-5">


            <fwb-tab name="first" title="Disposiciones Generales">

                <h2 class="text-xl font-medium">1. Objetivo del Reglamento</h2>
                <h3 class="mt-3">Establecer las normas de conducta, derechos y deberes de los estudiantes, docentes,
                    personal
                    administrativo y padres de familia para garantizar un ambiente de respeto, aprendizaje y convivencia
                    armónica.</h3>

                <h2 class="text-xl font-medium mt-3">2. Ámbito de Aplicación</h2>
                <h3 class="mt-3">Este reglamento es aplicable a todas las personas que forman parte de la comunidad
                    educativa, dentro y fuera de las instalaciones de la escuela, siempre que las actividades estén
                    relacionadas con la institución.</h3>

                <h2 class="text-xl font-medium mt-3">3. Valores Fundamentales</h2>
                <h3 class="mt-3">La escuela fomenta el respeto, la responsabilidad, la honestidad, la tolerancia, la
                    solidaridad y el esfuerzo como pilares fundamentales del desarrollo personal y académico.</h3>
            </fwb-tab>
            <fwb-tab name="second" title="Derechos y Deberes de los Estudiantes">
                <h2 class="text-xl font-medium">Derechos</h2>
                <h3 class="mt-3">1. Recibir una educación de calidad en un ambiente seguro, inclusivo y respetuoso.</h3>
                <h3 class="mt-3">2. Ser escuchado y expresar opiniones de manera respetuosa.</h3>
                <h3 class="mt-3">3. Participar en actividades culturales, deportivas y académicas organizadas por la
                    escuela.</h3>
                <h3 class="mt-3">4. Ser evaluado de manera justa y transparente.</h3>

                <h2 class="text-xl font-medium mt-3">Deberes</h2>
                <h3 class="mt-3">1. Asistir puntualmente a clases y participar activamente en las actividades escolares.
                </h3>
                <h3 class="mt-3">2. Respetar a sus compañeros, docentes y demás miembros de la comunidad educativa.</h3>
                <h3 class="mt-3">3. Cumplir con las tareas, proyectos y actividades asignadas.</h3>
                <h3 class="mt-3">4. Cuidar las instalaciones, mobiliario y recursos de la escuela.</h3>
            </fwb-tab>
            <fwb-tab name="third" title="Derechos y Deberes de los Docentes">
                <h2 class="text-xl font-medium">Derechos</h2>
                <h3 class="mt-3">1. Recibir apoyo y recursos necesarios para cumplir con su labor.</h3>
                <h3 class="mt-3">2. Ser respetado por estudiantes, padres y demás personal de la institución.</h3>
                
                <h2 class="text-xl font-medium mt-3">Deberes</h2>
                <h3 class="mt-3">1. Planificar y desarrollar clases en base al plan de estudios.</h3>
                <h3 class="mt-3">2. Promover un ambiente de respeto y aprendizaje.</h3>
                <h3 class="mt-3">3. Mantener comunicación efectiva con padres de familia sobre el progreso académico de los estudiantes.</h3>
            
            </fwb-tab>
        </fwb-tabs>
        <hr>
        <div class="flex justify-between">
            <fwb-checkbox v-model="check" label="He leído y estoy de acuerdo con el reglamento de esta institución." />
            <fwb-button :disabled="!check" color="dark" @click.prevent="$emit('')" size="xl"
            class="">Enviar solicitud</fwb-button>
        </div>
    </div>
</template>