<script setup>
import {
  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from 'flowbite-vue'

import {FwbPagination} from 'flowbite-vue'
import {onMounted, ref, watch} from "vue";
import {gradosStore} from "../../../stores/grados.js";
import {storeToRefs} from "pinia";
import {FwbSpinner} from 'flowbite-vue'
import {FwbSelect} from 'flowbite-vue'
import { FwbButton } from 'flowbite-vue'

const losgrados = gradosStore()

onMounted(async () => {
  await losgrados.getAll()
})
const {meta, grados} = storeToRefs(losgrados)
const currentPage = ref(meta.value.current_page)

watch(currentPage, (newPage) => {
  grados.value = null;
  losgrados.getAll(newPage)
})

const selected = ref('')
const countries = [
  {value: 'us', name: 'United States'},
  {value: 'ca', name: 'Canada'},
  {value: 'fr', name: 'France'},
]

</script>

<template>
  <div class="flex flex-col items-center space-y-9 mt-6 p-10 w-full ">
    <div class=" flex bg-gray-100 w-2/4 justify-center rounded-md shadow-xl">
      <h1 class="text-3xl font-bold ">Grados academicos</h1>
    </div>
    <div class=" flex flex-col w-full p-2 space-y-5">
      <div class="flex flex-row w-full space-x-3 ">
        <div class="flex  w-1/4">
          <fwb-select class="w-full"
                      v-model="selected"
                      :options="countries"
                      label="Seleccionar ciclo"
          />
        </div>
        <div class="flex w-1/4">
          <fwb-select class="w-full"
                      v-model="selected"
                      :options="countries"
                      label="Seleccionar seccion"
          />
        </div>
        <div class="flex w-1/4">
          <fwb-select class="w-full"
                      v-model="selected"
                      :options="countries"
                      label="Seleccionar horario"
          />
        </div>
        <div class="flex w-1/4">
          <fwb-select class="w-full"
                      v-model="selected"
                      :options="countries"
                      label="Seleccionar orientador"
          />
        </div>
      </div>
      <div class="flex flex-row justify-center w-full space-x-6 ">
        <div class="flex w-1/6 ">
          <fwb-button class="w-full" color="default">Filtrar</fwb-button>
        </div>
        <div class="flex w-1/6 ">
          <fwb-button class="w-full" color="light">Limpiar</fwb-button>
        </div>
        <div class="flex w-1/6 ">
          <fwb-button class="w-full" color="green">Crear</fwb-button>
        </div>
      </div>

    </div>
    <div v-if="!grados" class="flex w-full justify-center p-6">
      <fwb-spinner size="10"/>
    </div>
    <fwb-table v-else class="w-full">
      <fwb-table-head>
        <fwb-table-head-cell>Grado Academico</fwb-table-head-cell>
        <fwb-table-head-cell>Seccion</fwb-table-head-cell>
        <fwb-table-head-cell>Ciclo</fwb-table-head-cell>
        <fwb-table-head-cell>Horario</fwb-table-head-cell>
        <fwb-table-head-cell>Orientador</fwb-table-head-cell>
        <fwb-table-head-cell>
          <span class="sr-only">Edit</span>
        </fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row v-for="grado in grados" :key="grado.id">
          <fwb-table-cell>{{ grado.grado }}</fwb-table-cell>
          <fwb-table-cell>{{ grado.seccion.seccion }}</fwb-table-cell>
          <fwb-table-cell>{{ grado.ciclo.ciclo }}</fwb-table-cell>
          <fwb-table-cell>{{ grado.seccion.horario.nombre }}</fwb-table-cell>
          <fwb-table-cell>{{ grado.seccion.profesor.nombre }} {{ grado.seccion.profesor.apellido }}</fwb-table-cell>
          <fwb-table-cell>
            <fwb-a href="#">
              Edit
            </fwb-a>
          </fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>

    </fwb-table>

    <fwb-pagination v-model="currentPage" :total-items="meta.total" :items-per-page="meta.per_page"></fwb-pagination>
  </div>

</template>

<style scoped>

</style>