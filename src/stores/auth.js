import {defineStore} from "pinia";
import loginService from "../services/login-service.js";
import {ref} from "vue";

//option api xd
export const useAuthStore = defineStore('auth', () => {
        const token = ref(null);
        const user = ref(null);
        const login = async (credenciales) => {
            const {data: {token: newToken}} = await loginService.iniciarSesion(credenciales);
            if(newToken){
                token.value = newToken;
                const {data: {usuario}} = await loginService.getUsuario();
                user.value = usuario;
            }
        }

        return {
            token,
            user,
            login
        }
    },
    {
        persist: true,
    })