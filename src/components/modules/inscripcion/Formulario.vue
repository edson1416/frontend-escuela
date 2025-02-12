<script setup>
import { ref, watch } from 'vue'
import { FwbInput } from 'flowbite-vue'
import { FwbBreadcrumb, FwbBreadcrumbItem } from 'flowbite-vue'
import DatosGenerales from './partes-formulario/DatosGenerales.vue';
import { FwbButton } from 'flowbite-vue'

import { reactive } from 'vue';
import DatosAcademicos from './partes-formulario/DatosAcademicos.vue';
import NuestroReglamento from './partes-formulario/NuestroReglamento.vue';

// Objeto reactivo para recolectar los datos
const formData = reactive({
    datosGenerales: {
        nombres: '',
        apellidos: ''
    },
    datosAcademicos: {},
    reglamento: {},
});

// Estado para el componente dinámico actual
const currentComponent = ref(DatosGenerales);
const componente = ref('')

const componeneteAcademico = () => {
    console.log('entro al componenete change')
    componente.value = 'academicos'
}

const componenteReglamento = () => {
    componente.value = 'reglamento'
}

watch(componente, (newVal) => {
    if (newVal === 'generales') {
        currentComponent.value = DatosGenerales;
    } else if (newVal === 'academicos') {
        currentComponent.value = DatosAcademicos;
    } else if (newVal === 'reglamento') {
        currentComponent.value = NuestroReglamento;
    }
});





// Método para manejar el envío del formulario
const submitForm = () => {
    console.log(formData); // Aquí estarán todos los datos
    // Envía los datos al backend con Axios o Fetch
    // e.g., axios.post('/api/endpoint', formData);
};

const name = ref('')
</script>
<template>
    <div class="bg-gray-100 mt-24 w-3/5 mb-10 flex flex-col rounded-md shadow-md">
        <div class="flex justify-center">
            <div class="flex justify-center my-5 shadow-md w-1/2 bg-white rounded-md mx-2 px-3 py-2 ">
                <h1 class="text-3xl font-semibold flex">Solicitud de Inscripción</h1>
            </div>
        </div>
        <div class="ml-4">
            <fwb-breadcrumb>
                <fwb-breadcrumb-item href="#" @click="componente = 'generales'">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>

                    Datos Generales
                </fwb-breadcrumb-item>
                <fwb-breadcrumb-item href="#" @click="componeneteAcademico()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>

                    Datos Academicos
                </fwb-breadcrumb-item>
                <fwb-breadcrumb-item href="#" @click="componenteReglamento()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>

                    Nuestro reglamento
                </fwb-breadcrumb-item>
            </fwb-breadcrumb>
        </div>

        <form>
            <!-- {{ formData.datosGenerales }} -->
            <div class="flex flex-col justify-start my-3 shadow-md bg-white rounded-md mx-2 p-6">
                <component :is="currentComponent" @componeneteAcademico="componeneteAcademico"
                    @componenteReglamento="componenteReglamento" :form-data="formData"/>

            </div>
        </form>

    </div>

</template>
