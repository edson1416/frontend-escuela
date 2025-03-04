import {defineStore} from "pinia";
import {ref} from "vue";


export const alertasStore = defineStore('alertas',()=>{
    const showAlertCrear = ref(false)
    const showAlertEditar = ref(false)
    const showAlertEliminar = ref(false)

    const mostrarAlertaCrear = () => {
        showAlertCrear.value = true
        setTimeout(()=>{
            showAlertCrear.value = false
        },3000)
    }

    const mostrarAlertaEditar = () => {
        showAlertEditar.value = true
        setTimeout(()=>{
            showAlertEditar.value = false
        },3000)
    }

    const mostrarAlertaEliminar = () => {
        showAlertEliminar.value = true
        setTimeout(()=>{
            showAlertEliminar.value = false
        },3000)
    }


    return {
        showAlertCrear,
        showAlertEditar,
        showAlertEliminar,
        mostrarAlertaEditar,
        mostrarAlertaEliminar,
        mostrarAlertaCrear
    }

})