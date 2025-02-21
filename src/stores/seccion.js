import {defineStore} from "pinia";
import {ref} from "vue";
import seccionService from "../services/seccion-service.js";


export const seccionStore = defineStore('secciones', () => {
    const secciones = ref(null)
    const optionsSecciones = ref(null)
    const meta = ref({
        current_page: 1,
        total: 0,
        per_page: 15,
        last_page: 1,
    })

    const getCatalogoSecciones = async () => {
        const catalogo = true;
        const {data} = await seccionService.getAllSecciones(catalogo)
        optionsSecciones.value = data?.data?.map(item => {
            return {
                value: item.id,
                name: item.seccion,
            }
        })
    }

    return {
        secciones,
        optionsSecciones,
        meta,
        getCatalogoSecciones,
    }

});