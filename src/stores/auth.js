import {defineStore} from "pinia";
import loginService from "../services/login-service.js";
import {ref} from "vue";
import {useRouter} from "vue-router";

//option api xd
export const useAuthStore = defineStore('auth', () => {
        const token = ref(null);
        const user = ref(null);
        const router = useRouter();
        const login = async (credenciales) => {
            const {data: {token: newToken}} = await loginService.iniciarSesion(credenciales);
            if(newToken){
                token.value = newToken;
                const {data: {usuario}} = await loginService.getUsuario();
                user.value = usuario;
            }
        }

        const logout = () => {
            token.value = null;
            user.value = null;
            localStorage.removeItem('auth');
            router.push({name: "Login", replace: true});
        }

        return {
            token,
            user,
            login,
            logout,
        }
    },
    {
        persist: true,
    })