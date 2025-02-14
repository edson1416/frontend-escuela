import axios from "axios";
import {useAuthStore} from "../stores/auth.js";
import {storeToRefs} from "pinia";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
})

api.interceptors.request.use(config => {
    const authStore = useAuthStore();
    const {token} = storeToRefs(authStore)
    if(token.value){
        config.headers.Authorization = `Bearer ${token.value}`
    }
    return config;
})

export default  api