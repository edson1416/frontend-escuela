import api from "../lib/axios.js";


export default {
    getAllHorarios(catalogo = null, page = 1){
        try{
            if(catalogo){
                return api('/catalogos/horarios?pagination=false')
            }else {
                return api('/catalogos/horarios?page='+page)
            }

        }catch(e){
            console.log(e)
        }
    }
}