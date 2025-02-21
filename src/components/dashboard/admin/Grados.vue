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
import {nextTick, onMounted, ref, watch, computed} from "vue";
import {gradosStore} from "../../../stores/grados.js";
import {storeToRefs} from "pinia";
import {FwbSpinner} from 'flowbite-vue'
import {FwbSelect, FwbInput, FwbAlert} from 'flowbite-vue'
import {FwbButton, FwbModal} from 'flowbite-vue'
import {cicloStore} from "../../../stores/ciclo.js";
import {seccionStore} from "../../../stores/seccion.js";
import {horarioStore} from "../../../stores/horario.js";

//STORES
const losgrados = gradosStore()
const losciclos = cicloStore()
const secciones = seccionStore()
const horarios = horarioStore()

//RELLENAR CATALOGOS
const rellenarCatalogos = () => {
  losciclos.getCatalogoCiclo()
  secciones.getCatalogoSecciones()
  horarios.getCatalogoHorarios()
}

//MONTANDO VISTA
onMounted(async () => {
  await losgrados.getAll()
  rellenarCatalogos()

})

//VARIABLES A USAR
const {meta, grados, grado} = storeToRefs(losgrados)
const {ciclos, optionsCiclos} = storeToRefs(losciclos)
const {optionsSecciones} = storeToRefs(secciones)
const {optionsHorarios} = storeToRefs(horarios)

const showModalCreate = ref(false);
const showModalEliminar = ref(false);
const showAlertCreate = ref(false);
const showAlertUpdate = ref(false);
const datosNuevoGrado = ref({});
const editando = ref(false);

// Variables para almacenar selecciones
const filtros = ref({});
const selectedCiclo = ref('');
const selectedSeccion = ref('');
const selectedHorario = ref('');

const selectedModalCiclo = ref('');
const selectedModalSeccion = ref('');
const nombreGrado = ref('');
const idGrado = ref('')

//FILTRANDO TABLA
const setFiltros = () => {
  filtros.value = {
    ciclo: selectedCiclo.value,
    seccion: selectedSeccion.value,
    horario: selectedHorario.value,
  }

  losgrados.gradoFiltros(filtros.value);
}

const limpiarFiltros = () => {
  selectedCiclo.value = '';
  selectedSeccion.value = '';
  selectedHorario.value = '';

  losgrados.getAll()
}

//REGISTRAR GRADO

const mostrarModalCrear = () => {
  showModalCreate.value = true;
}

const mostrarModalEliminar = (datos) => {
  idGrado.value = datos.id
  showModalEliminar.value = true;
}

const CerrarModalEliminar = () => {
  showModalEliminar.value = false;
}

const mostrarAlertaCreado = () => {
  showAlertCreate.value = true;
  setTimeout(() => {
    showAlertCreate.value = false;
  }, 3000)
}

const mostrarAlertaEditado = () => {
  showAlertUpdate.value = true;
  setTimeout(() => {
    showAlertUpdate.value = false;
  }, 3000)
}

const handleInput = () => {
  if (nombreGrado.value.trim()) {
    nombreGradoError.value = false; // Oculta el mensaje de error si el campo tiene contenido
  }
  if (selectedModalSeccion.value !== '') {
    seccionGradoError.value = false;
  }
  if (selectedModalCiclo.value !== '') {
    cicloGradoError.value = false;
  }
};

//VARIABLES PARA VALIDACIONES
const nombreGradoError = ref(false);
const seccionGradoError = ref(false);
const cicloGradoError = ref(false);

const crearGrado = async () => {
  if (nombreGrado.value === '') {
    nombreGradoError.value = true;
  }
  if (selectedModalSeccion.value === '') {
    seccionGradoError.value = true;
  }
  if (selectedModalCiclo.value === '') {
    cicloGradoError.value = true;
  }
  if (nombreGrado.value !== '' && selectedModalSeccion.value !== '' && selectedModalCiclo.value !== '') {
    datosNuevoGrado.value = {
      grado: nombreGrado.value,
      id_seccion: selectedModalSeccion.value,
      id_ciclo: selectedModalCiclo.value,
    }

    if(editando.value) {
      await losgrados.editarGrado(idGrado.value,datosNuevoGrado.value)
      mostrarAlertaEditado()
    }else{
      await losgrados.saveGrado(datosNuevoGrado.value)
      mostrarAlertaCreado()
    }

    closeModal()
    losgrados.getAll()
  }

}

const eliminarGrado = () => {
  losgrados.eliminarGrado(idGrado.value)
  CerrarModalEliminar()
  losgrados.getAll()
}


function closeModal() {
  nombreGrado.value = ''
  idGrado.value = ''
  selectedModalSeccion.value = ''
  selectedModalCiclo.value = ''
  nombreGradoError.value = false
  cicloGradoError.value = false
  seccionGradoError.value = false
  showModalCreate.value = false
  editando.value = false
}

const mostrarModalEditar = async (datos) =>{
  editando.value = true
  idGrado.value = datos.id
  nombreGrado.value = datos.grado
  selectedModalSeccion.value = datos.id_seccion
  selectedModalCiclo.value = datos.id_ciclo
  mostrarModalCrear()
}

//ESCUCHANDO GRADOS
const currentPage = ref(meta.value.current_page)
watch(currentPage, (newPage) => {
  grados.value = null;
  losgrados.getAll(newPage)
})


</script>

<template>
  <div class="flex flex-col items-center space-y-9 mt-6 p-10 w-full ">
    <div class="flex flex-col w-full absolute items-end">
      <fwb-alert v-if="showAlertCreate" icon type="success" class="mr-3 w-1/5">
        Registro creado con exito.
      </fwb-alert>
      <fwb-alert v-if="showAlertUpdate" icon type="success" class="mr-3 w-1/5">
        Registro editado con exito.
      </fwb-alert>
    </div>
    <div class=" flex bg-gray-100 w-2/4 justify-center rounded-md shadow-xl">
      <h1 class="text-3xl font-bold ">Grados académicos</h1>
    </div>
    <div class=" flex flex-col w-full p-2 space-y-5">
      <div class="flex flex-row w-full space-x-3 ">
        <div class="flex  w-1/3">
          <fwb-select class="w-full"
                      v-model="selectedCiclo"
                      :options="optionsCiclos"
                      label="Seleccionar ciclo"
                      placeholder="Seleccionar ciclo"
          />
        </div>
        <div class="flex w-1/3">
          <fwb-select class="w-full"
                      v-model="selectedSeccion"
                      :options="optionsSecciones"
                      label="Seleccionar seccion"
                      placeholder="Seleccionar seccion"
          />
        </div>
        <div class="flex w-1/3">
          <fwb-select class="w-full"
                      v-model="selectedHorario"
                      :options="optionsHorarios"
                      label="Seleccionar horario"
                      placeholder="Seleccionar horario"
          />
        </div>
      </div>
      <div class="flex flex-row justify-center w-full space-x-6 ">
        <div class="flex w-1/6 ">
          <fwb-button class="w-full" color="default" @click="setFiltros">Filtrar</fwb-button>
        </div>
        <div class="flex w-1/6 ">
          <fwb-button class="w-full" color="light" @click="limpiarFiltros">Limpiar</fwb-button>
        </div>
        <div class="flex w-1/6 ">
          <fwb-button class="w-full" color="green" @click="mostrarModalCrear">Crear</fwb-button>
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
          <fwb-table-cell class="flex justify-between">
            <button @click="mostrarModalEditar(grado)">
              <svg
                  class="flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
              </svg>
            </button>
            <button @click="mostrarModalEliminar(grado)">
              <svg
                  class="flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
              </svg>
            </button>
          </fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
    <fwb-pagination v-model="currentPage" :total-items="meta.total" :items-per-page="meta.per_page"></fwb-pagination>
  </div>

  <!--  modal crear y actualizar -->
  <fwb-modal v-if="showModalCreate" @close="closeModal">
    <template #header>
      <div class="flex justify-center w-full">
        <h1 v-if="!editando" class="flex text-lg font-semibold">Resgistrar grado académico</h1>
        <h1 v-else class="flex text-lg font-semibold">Editar grado académico</h1>
      </div>
    </template>
    <template #body>
      <form>
        <div class=" flex flex-col items-center space-y-5">
          <div class=" w-3/4">
            <fwb-input
                v-model="nombreGrado"
                placeholder="ejemplo: 5to grado"
                label="Grado académico"
                required
                :validation-status="nombreGradoError ? 'error' : ''"
                @input="handleInput"
            >
              <template #validationMessage v-if="nombreGradoError">
                El campo nombre es requerido
              </template>
            </fwb-input>
          </div>
          <div class=" w-3/4">
            <fwb-select class="w-full"
                        v-model="selectedModalSeccion"
                        :options="optionsSecciones"
                        label="Seleccionar seccion"
                        placeholder="Seleccionar seccion"
                        required
                        :validation-status="seccionGradoError ? 'error' : ''"
                        @change="handleInput"
            >
              <template #validationMessage v-if="seccionGradoError">
                La seccion del grado es requerida
              </template>
            </fwb-select>
          </div>
          <div class=" w-3/4">
            <fwb-select class="w-full"
                        v-model="selectedModalCiclo"
                        :options="optionsCiclos"
                        label="Seleccionar ciclo"
                        placeholder="Seleccionar ciclo"
                        required
                        :validation-status="cicloGradoError ? 'error' : ''"
                        @change="handleInput"
            >
              <template #validationMessage v-if="cicloGradoError">
                El ciclo del grado es requerido
              </template>
            </fwb-select>

          </div>


        </div>
      </form>


    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="red">
          Cancelar
        </fwb-button>
        <fwb-button v-if="!editando" @click="crearGrado" color="green">
          Guardar
        </fwb-button>
        <fwb-button v-else @click="crearGrado" color="blue">
          Editar
        </fwb-button>
      </div>
    </template>
  </fwb-modal>

  <fwb-modal v-if="showModalEliminar" @close="CerrarModalEliminar">
    <template #body>
      <div class="flex w-full justify-center">
        <h1 class="text-xl" > ¿ Estas seguro que quieres eliminar este registro ?</h1>
      </div>


    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="CerrarModalEliminar" color="light">
          Cancelar
        </fwb-button>
        <fwb-button @click="eliminarGrado" color="red">
          Eliminar
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<style scoped>

</style>