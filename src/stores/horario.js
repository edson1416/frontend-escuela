import {defineStore} from "pinia";
import {ref} from "vue";
import horarioService from "../services/horario-service.js";


export const horarioStore = defineStore('horarios', ()=>{
    const horarios = ref(null)
    const optionsHorarios = ref(null)
    const meta = ref({
        current_page: 1,
        total: 0,
        per_page: 15,
        last_page: 1,
    })

    const getCatalogoHorarios = async () => {
        const catalogo = true;
        const {data} = await horarioService.getAllHorarios(catalogo);
        optionsHorarios.value = data?.data?.map(item=>{
            return {
                value: item.id,
                name: item.nombre
            }
        })
    }

    return {
        horarios,
        optionsHorarios,
        meta,
        getCatalogoHorarios
    }
});