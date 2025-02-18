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

import { FwbPagination } from 'flowbite-vue'
import {onMounted, ref, watch} from "vue";
import {gradosStore} from "../../../stores/grados.js";
import {storeToRefs} from "pinia";
import { FwbSpinner } from 'flowbite-vue'


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

</script>

<template>
  <div class="flex flex-row">
    <div class=" w-1/6">


    </div>
    <div class="flex flex-col items-center space-y-9 w-4/6 p-10 ">
      <div class=" flex bg-gray-100 w-2/4 justify-center rounded-md shadow-xl">
        <h1 class="text-3xl font-bold ">Grados academicos</h1>
      </div>
      <div v-if="!grados" class="flex w-full justify-center p-6">
        <fwb-spinner size="10" />
      </div>
      <div v-else class="overflow-auto w-full max-h-96">
        <fwb-table class="w-full">
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
              <fwb-table-cell>{{grado.grado}} </fwb-table-cell>
              <fwb-table-cell>{{grado.seccion.seccion}}</fwb-table-cell>
              <fwb-table-cell>{{grado.ciclo.ciclo}}</fwb-table-cell>
              <fwb-table-cell>{{grado.seccion.horario.nombre}}</fwb-table-cell>
              <fwb-table-cell>{{grado.seccion.profesor.nombre}} {{grado.seccion.profesor.apellido}}</fwb-table-cell>
              <fwb-table-cell>
                <fwb-a href="#">
                  Edit
                </fwb-a>
              </fwb-table-cell>
            </fwb-table-row>
          </fwb-table-body>

        </fwb-table>
      </div>

      <fwb-pagination v-model="currentPage" :total-items="meta.total" :items-per-page ="meta.per_page"></fwb-pagination>
    </div>
    <div class="w-1/6"></div>
  </div>

</template>

<style scoped>

</style>