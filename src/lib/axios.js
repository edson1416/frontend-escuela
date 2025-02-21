import axios from "axios";
import {useAuthStore} from "../stores/auth.js";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

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

api.interceptors.response.use(response => {
    return response;
}, async (error) => {
    if(error.response.status === 401) {
        const authStore = useAuthStore();
        authStore.logout()
    }
})

export default  api