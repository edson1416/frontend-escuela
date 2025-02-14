import api from "../lib/axios.js";


export default {
    iniciarSesion(credenciales) {
        try{
            console.log(credenciales);
            return api.post('/login', credenciales)
        }catch(e){
            console.log(e)
        }

    },
    getUsuario(){
        try{
            return api('/usuario')
        }catch(e){
            console.log(e)
        }
    }
}