import api from "../lib/axios.js";

export default {
    getPendientes(){
        try{
            return api('/solicitud-inscripcion/pendientes')
        }catch(e){
            console.log(e)
        }
    },
    getAll(page = 1,filtros =null){
        try{
            if(filtros){
                let filters = []
                if(filtros.grado !== '') filters.push({"field": "id_grado", "operator": "in", "value": [filtros.grado]},)
                if(filtros.estado !== '') filters.push({"field": "id_estado", "operator": "in", "value": [filtros.estado]},)
                if(filtros.sexo !== '') filters.push({"field": "sexo", "operator": "in", "value": [filtros.sexo]},)

                const body = {
                    "filters":filters
                }
                return api.post('/solicitud-inscripcion/inscripcion/search?page='+page,body)
            }else{
                return api('/solicitud-inscripcion/solicitud?page='+page)
            }
        }catch(e){
            console.log(e)
        }
    },
    changeStatus(id, data){
        try{
            console.log(data)
            return api.post('/solicitud-inscripcion/inscripcion/'+id, data)
        }catch(e){
            console.log(e)
        }
    }

}