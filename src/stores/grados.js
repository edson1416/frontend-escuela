import {defineStore} from "pinia";
import {ref} from "vue";
import gradosService from "../services/grados-service.js";


export const gradosStore = defineStore('grados',()=>{
    const grados = ref(null);
    const grado = ref(null);
    const meta = ref({
        current_page: 1,
        total: 0,
        per_page: 15,
        last_page: 1,
    })

    const getAll = async (page = 1)=>{
        const {data} = await gradosService.getAllGrados(page)
        grados.value = data.data
        meta.value = data.meta
        console.log(data)
    }

    const gradoFiltros = async (filtros) => {
        //console.log('mis filtros = ',filtros)
        const {data} = await gradosService.getAllGrados(1,filtros)
        grados.value = data.data
        meta.value = data.meta
    }

    const saveGrado = async (data) => {
        await gradosService.createGrado(data)
        console.log('mi grado =',data)
    }

    const editarGrado = async (id,data) => {
        await gradosService.updateGrado(id,data)
    }

    const eliminarGrado = async (id) => {
        await gradosService.deleteGrado(id)
    }
    const getGrado = async (id) => {
        const {data} = await gradosService.getGrado(id)
        grado.value = data.data
        console.log('EL GRADO =',grado.value)
    }

    return {
        grados,
        meta,
        grado,
        getAll,
        gradoFiltros,
        saveGrado,
        getGrado,
        editarGrado,
        eliminarGrado,
    }
});