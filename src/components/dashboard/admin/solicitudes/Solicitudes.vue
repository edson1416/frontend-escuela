<script setup>

import {
  FwbAlert,
  FwbButton, FwbInput, FwbModal, FwbPagination,
  FwbSelect, FwbSpinner,
  FwbTable,
  FwbTableBody, FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow
} from "flowbite-vue";
import {onMounted, ref, watch} from "vue";
import ModalVerSolicitud from "./ModalVerSolicitud.vue";
import {modalStore} from "../../../../stores/modales.js";
import {solicitudesStore} from "../../../../stores/solicitudes.js";
import {storeToRefs} from "pinia";
import {gradosStore} from "../../../../stores/grados.js";
import {alertasStore} from "../../../../stores/alertas.js";

const modal = modalStore()
const solicitud = solicitudesStore()
const grado = gradosStore()
const alertas = alertasStore()

const selectGrado = ref('');
const selectSexo = ref('');
const selectEstado = ref('');
const filtros = ref({})

const optionSexo = [
  {
    value: "F",
    name: "Femenino"
  },
  {
    value: "M",
    name: "Masculino"
  },
];

const optionEstado = [
  {
    value: 1,
    name: "Pendiente"
  },
  {
    value: 2,
    name: "Aprobado"
  },
  {
    value: 3,
    name: "Rechazado"
  },
];

const rellenarCatalogos = () => {
  grado.getCatalogoGrado()
}

//RELLENAR TABLA
onMounted(async () => {
  await solicitud.allSolicitudes()
  rellenarCatalogos()
})

//FILTRANDO TABLA
const setFiltros = () => {
  filtros.value = {
    grado: selectGrado.value,
    estado: selectEstado.value,
    sexo: selectSexo.value,
  }

  solicitud.solicitudesFiltradas(filtros.value)
}

//LIMPIAR FILTROS
const limpiarFiltros = () => {
  selectGrado.value = '';
  selectEstado.value = '';
  selectSexo.value = '';

  solicitud.allSolicitudes()
}

const {solicitudesInscripcion, laSolicitud, meta} = storeToRefs(solicitud)
const {optionsGrados} = storeToRefs(grado)
const {showAlertCrear,showAlertEditar,showAlertEliminar} = storeToRefs(alertas)

const llenarDataModal = (data) =>{
  laSolicitud.value = data;
  modal.openModal()
}

//ESCUCHANDO GRADOS
const currentPage = ref(meta.value.current_page)
watch(currentPage, (newPage) => {
  solicitudesInscripcion.value = null;
  solicitud.allSolicitudes(newPage)
})

</script>

<template>
  <div class="flex flex-col items-center space-y-9 mt-6 p-10 w-full ">
    <div class="flex flex-col w-full absolute items-end">
      <fwb-alert v-if="showAlertEditar" icon type="success" class="mr-3 w-1/5">
        Solicitud Aceptada
      </fwb-alert>

      <fwb-alert v-if="showAlertEliminar" icon type="danger" class="mr-3 w-1/5">
        Solicitud Rechazada
      </fwb-alert>
    </div>
    <div class=" flex bg-gray-100 w-2/4 justify-center rounded-md shadow-xl">
      <h1 class="text-3xl font-bold ">Solicitudes de inscripción</h1>
    </div>

    <div class=" flex flex-col w-full p-2 space-y-5">
      <div class="flex flex-row w-full space-x-3 ">
        <div class="flex  w-1/3">
          <fwb-select class="w-full"
                      v-model="selectGrado"
                      :options="optionsGrados"
                      label="Seleccionar grado académico"
                      placeholder="Seleccionar grado"
          />
        </div>
        <div class="flex w-1/3">
          <fwb-select class="w-full"
                      v-model="selectSexo"
                      :options="optionSexo"
                      label="Seleccionar sexo"
                      placeholder="Seleccionar sexo"
          />
        </div>
        <div class="flex w-1/3">
          <fwb-select class="w-full"
                      v-model="selectEstado"
                      :options="optionEstado"
                      label="Seleccionar estado"
                      placeholder="Seleccionar estado"
          />
        </div>
      </div>
      <div class="flex flex-row justify-center w-full space-x-8 ">
        <div class="flex w-1/6 ">
          <fwb-button class="w-full" color="default" @click="setFiltros">Filtrar</fwb-button>
        </div>
        <div class="flex w-1/6 ">
          <fwb-button class="w-full" color="light" @click="limpiarFiltros">Limpiar</fwb-button>
        </div>
      </div>
      <div v-if="!solicitudesInscripcion" class="flex w-full justify-center p-6">
        <fwb-spinner size="10"/>
      </div>
      <fwb-table v-else class="w-full">
        <fwb-table-head>
          <fwb-table-head-cell>Nombre del alumno</fwb-table-head-cell>
          <fwb-table-head-cell>Sexo</fwb-table-head-cell>
          <fwb-table-head-cell>correo</fwb-table-head-cell>
          <fwb-table-head-cell>Grado academico solicitado</fwb-table-head-cell>
          <fwb-table-head-cell>estado de la solicitud</fwb-table-head-cell>
          <fwb-table-head-cell>
            <span class="sr-only">Edit</span>
          </fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
          <fwb-table-row v-for="solicitud in solicitudesInscripcion" :key="solicitud.id">
            <fwb-table-cell>{{ solicitud.nombre_alumno }}</fwb-table-cell>
            <fwb-table-cell>{{ solicitud.sexo }}</fwb-table-cell>
            <fwb-table-cell>{{ solicitud.correo_alumno }}</fwb-table-cell>
            <fwb-table-cell>{{ solicitud.grado.grado }}</fwb-table-cell>
            <fwb-table-cell>
              <span v-if="solicitud.id_estado == 1"
                    class="inline-flex items-center justify-center w-1/2 h-3 p-3 ml-3 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">pendiente</span>
              <span v-else-if="solicitud.id_estado == 2"
                    class="inline-flex items-center justify-center w-1/2 h-3 p-3 ml-3 text-xs font-medium text-white bg-green-400 rounded-full dark:bg-blue-900 dark:text-blue-300">aceptada</span>
              <span v-else
                    class="inline-flex items-center justify-center w-1/2 h-3 p-3 ml-3 text-xs font-medium text-white bg-red-500 rounded-full dark:bg-blue-900 dark:text-blue-300">rechazada</span>
            </fwb-table-cell>
            <fwb-table-cell class="flex justify-between">
              <button @click="llenarDataModal(solicitud)">
                <svg
                    class="flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="currentColor">
                  <path
                      d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                </svg>
              </button>
              <!--              <button @click="mostrarModalEliminar(grado)">-->
              <!--                <svg-->
              <!--                    class="flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"-->
              <!--                    xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">-->
              <!--                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>-->
              <!--                </svg>-->
              <!--              </button>-->
            </fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>
    </div>
    <fwb-pagination v-model="currentPage" :total-items="meta.total" :items-per-page="meta.per_page"></fwb-pagination>
  </div>

  <!--  modal View -->
  <ModalVerSolicitud></ModalVerSolicitud>
</template>

<style scoped>

</style>