import api from "../lib/axios.js";


export default {
    gatAllCilos(catalogo = null, page = 1){
        try{
            if(catalogo){
                return api('/catalogos/ciclos?pagination=false')
            }else {
                return api('/catalogos/ciclos?page='+page);
            }

        }catch(error){
            console.log(error);
        }
    }
}