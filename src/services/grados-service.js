import api from "../lib/axios.js";


export default {
    getAllGrados(page = 1,filtros =null) {
        try{
            if(filtros){
                let filters = [];
                if(filtros.ciclo !== '') filters.push({"field": "id_ciclo", "operator": "in", "value": [filtros.ciclo]},)
                if(filtros.seccion !== '') filters.push({"field": "id_seccion", "operator": "in", "value": [filtros.seccion]},)
                if(filtros.horario !== '') filters.push({"field": "seccion.id_horario", "operator": "in", "value": [filtros.horario]},)
                const body = {
                    "filters":filters
                }
                return api.post('/catalogos/grados/search?page='+page,body)
            }else {
                return api('/catalogos/grados?page='+page)
            }
        }catch(error){
            console.log(error);
        }
    },
    getGrado(id){
        try{
            return api('/catalogos/grados/'+id)
        }catch(error){
            console.log(error);
        }
    },
    createGrado(data){
        try{
            return api.post('/catalogos/grados', data)
        }catch(error){
            console.log(error);
        }
    },
    updateGrado(id,data){
        try{
            return api.put('/catalogos/grados/'+id, data)
        }catch(error){
            console.log(error);
        }
    },
    deleteGrado(id){
        try{
            return api.delete('/catalogos/grados/'+id)
        }catch(error){
            console.log(error);
        }
    }
}