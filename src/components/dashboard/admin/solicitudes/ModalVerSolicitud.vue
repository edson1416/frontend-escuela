<script setup>
import PDF from "pdf-vue3";
import {FwbButton, FwbModal, FwbAvatar, FwbTab, FwbTabs, FwbSpinner} from "flowbite-vue";
import {modalStore} from "../../../../stores/modales.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import PreviewPdf from "./PreviewPdf.vue";
import {solicitudesStore} from "../../../../stores/solicitudes.js";
import {alertasStore} from "../../../../stores/alertas.js";

const modal = modalStore()
const alertas = alertasStore()
const solicitud = solicitudesStore()

const {laSolicitud} = storeToRefs(solicitud)
const {showModal} = storeToRefs(modal)
const activeTab = ref('first')

//CAMBIAR ESTADO
const changeStatus =async (id, newStatus) => {
  const datos = {
    ...laSolicitud.value,
    id_estado: newStatus,
    _method: 'PUT',
    foto: laSolicitud.value.foto.replace('http://localhost:8000/storage/', ''),
    partida_nacimiento: laSolicitud.value.partida_nacimiento.replace('http://localhost:8000/storage/', ''),
  }
  await solicitud.cambiarEstado(id, datos)
  modal.closeModal()
  solicitud.allSolicitudes()

  if(newStatus === 2) {
    alertas.mostrarAlertaEditar()
  }else if(newStatus === 3) {
    alertas.mostrarAlertaEliminar()
  }

}

</script>

<template>
  <fwb-modal v-if="showModal" @close="modal.closeModal">
    <template #header>
      <div class="flex justify-center w-full">
        <h1 class="flex text-lg font-semibold">SOLICITUD DE INSCRIPCIÓN</h1>
      </div>
    </template>
    <template #body>
      <div class="flex flex-col space-y-4">
        <div class="flex flex-row ">
          <div class="flex w-1/4">
            <fwb-avatar v-if="laSolicitud.foto" size="xl" :img="laSolicitud.foto"/>
            <fwb-avatar v-else size="xl" img="/img/jinx.jpg"/>
          </div>
          <div class="flex flex-col w-2/4 p-3">
            <h1 class="text-lg font-semibold">{{laSolicitud.nombre_alumno}} {{laSolicitud.apellido_alumno}}</h1>
            <h1 class="font-light">{{laSolicitud.correo_alumno}}</h1>
            <h1 class="font-light">{{laSolicitud.fecha_nacimiento}}</h1>
            <h1 v-if="laSolicitud.telefono_alumno" class="font-light">{{laSolicitud.telefono_alumno}}</h1>
            <h1 v-if="!laSolicitud.telefono_alumno" class="font-light">Sin telefono personal</h1>
            <h1 class="font-light">{{laSolicitud.direccion_alumno}}</h1>
          </div>
          <div class="flex flex-col w-1/4">
            <div v-if="laSolicitud.id_estado === 1" class="text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 flex p-1 justify-center shadow-lg">
              <h1 class="flex text-lg font-semibold">Pendiente</h1>
            </div>
            <div v-if="laSolicitud.id_estado === 2" class="text-white bg-green-400 rounded-full flex p-1 justify-center shadow-lg">
              <h1 class="flex text-lg font-semibold">Aceptado</h1>
            </div>
            <div v-if="laSolicitud.id_estado === 3" class="text-white bg-red-500 rounded-full dark:bg-blue-900 flex p-1 justify-center shadow-lg">
              <h1 class="flex text-lg font-semibold">Rechazado</h1>
            </div>
          </div>
        </div>
        <div class="">
          <fwb-tabs v-model="activeTab" directive="show" class="p-5">
            <fwb-tab name="first" title="Informacion del responsable">
              <div class="flex flex-col space-y-2">
                <p class="font-semibold">Nombre: <span class="font-normal">{{laSolicitud.nombre_responsable}} </span></p>
                <p class="font-semibold">Correo: <span class="font-normal">{{laSolicitud.correo_responsable}}</span></p>
                <p v-if="laSolicitud.telefono_responable" class="font-semibold">Telefono: <span class="font-normal">{{laSolicitud.telefono_responsable}}</span></p>
                <p v-else class="font-semibold">Telefono: <span class="font-normal">Sin numero de telefono</span></p>
                <p class="font-semibold">DUI: <span class="font-normal">{{laSolicitud.dui}}</span></p>
                <p class="font-semibold">Dirección: <span class="font-normal">{{laSolicitud.direccion_alumno}}</span></p>
              </div>

            </fwb-tab>
            <fwb-tab name="second" title="Documentos del alumno">
              <div class="flex flex-col space-y-2">
                <p class="font-semibold">Partida de nacimiento</p>
                <hr>
                <iframe :src="laSolicitud.partida_nacimiento"
                        type="application/pdf"
                        width="100%"
                        height="100%"></iframe>
                <p class="font-semibold">Certificado</p>
<!--                <hr>-->
<!--                <iframe :src="laSolicitud.partida_nacimiento"-->
<!--                        type="application/pdf"-->
<!--                        width="100%"-->
<!--                        height="100%"></iframe>-->
<!--                <p class="font-semibold">Carta Recomendación</p>-->
<!--                <hr>-->
<!--                <iframe :src="laSolicitud.partida_nacimiento"-->
<!--                        type="application/pdf"-->
<!--                        width="100%"-->
<!--                        height="100%"></iframe>-->

              </div>
            </fwb-tab>
          </fwb-tabs>
        </div>
      </div>

    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button v-if="laSolicitud.id_estado === 1" @click="modal.closeModal" color="dark">
          Cancelar
        </fwb-button>
        <fwb-button v-else @click="modal.closeModal" color="dark">
          Atras
        </fwb-button>
        <fwb-button v-if="laSolicitud.id_estado === 1" @click="changeStatus(laSolicitud.id,2)" color="green">
          Aceptar
        </fwb-button>
        <fwb-button v-if="laSolicitud.id_estado === 1" @click="changeStatus(laSolicitud.id,3)" color="red">
          Rechazar
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<style scoped>

</style>