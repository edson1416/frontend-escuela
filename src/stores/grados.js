import {defineStore} from "pinia";
import {ref} from "vue";
import gradosService from "../services/grados-service.js";


export const gradosStore = defineStore('grados',()=>{
    const grados = ref(null);
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

    return {
        grados,
        meta,
        getAll,
    }
});