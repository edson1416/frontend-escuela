import api from "../lib/axios.js";


export default {
    getAllSecciones(catalogo = null, page = 1){
        try {
            if(catalogo){
                return api('/catalogos/secciones?pagination=false')
            }else {
                return api('/catalogos/secciones?page='+page)
            }
        }catch(e){
            console.log(e)
        }
    }
}