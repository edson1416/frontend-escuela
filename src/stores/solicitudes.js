import {defineStore} from "pinia";
import {ref} from "vue";
import solicitudesService from "../services/solicitudes-service.js";


export const solicitudesStore = defineStore('solicitudes', () =>{
   const solicitudesPendientes = ref(null);
   const solicitudesInscripcion = ref(null);
   const laSolicitud = ref(null);
   const meta = ref({
       current_page: 1,
       total: 0,
       per_page: 15,
       last_page: 1,
   });

   const pendientes = async () =>{
       const {data: {solicitudes}} = await solicitudesService.getPendientes();
       solicitudesPendientes.value = solicitudes;
   }

   const allSolicitudes = async (page=1) =>{
       const {data} =await solicitudesService.getAll(page);
       solicitudesInscripcion.value = data.data;
       meta.value = data.meta;
       console.log()
   }

   const solicitudesFiltradas = async (filtros) => {
       const {data} =await solicitudesService.getAll(1, filtros);
       solicitudesInscripcion.value = data.data;
       meta.value = data.meta;
   }

   const cambiarEstado = async (id, data) =>{
       await solicitudesService.changeStatus(id, data);
   }

   return {
       solicitudesPendientes,
       solicitudesInscripcion,
       laSolicitud,
       pendientes,
       allSolicitudes,
       solicitudesFiltradas,
       cambiarEstado,
       meta
   }
});