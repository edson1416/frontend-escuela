import {defineStore} from "pinia";
import {ref} from "vue";
import cicloService from "../services/ciclo-service.js";


export const cicloStore = defineStore('ciclos', () => {
    const ciclos = ref(null)
    const optionsCiclos = ref(null)
    const meta = ref({
        current_page: 1,
        total: 0,
        per_page: 15,
        last_page: 1,
    })

    const getCatalogoCiclo = async () => {
        const catalogo =true;
        const {data} = await cicloService.gatAllCilos(catalogo)
        ciclos.value = data.data
        optionsCiclos.value = data?.data?.map(item =>{
            return {
                value: item.id,
                name: item.ciclo,
            }
        })
        console.log('estos ciclos', optionsCiclos.value)
    }

    return {
        ciclos,
        meta,
        optionsCiclos,
        getCatalogoCiclo,
    }
});