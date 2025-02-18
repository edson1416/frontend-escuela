import api from "../lib/axios.js";


export default {
    getAllGrados(page) {
        try{
            return api('/catalogos/grados?page='+page)
        }catch(error){
            console.log(error);
        }
    }
}