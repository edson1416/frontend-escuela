import {createRouter, createWebHistory} from 'vue-router';

import NivelesEducativos from '../components/modules/niveles/NivelesEducativos.vue';
import Inicio from '../components/principal/Inicio.vue';
import Inscripcion from '../components/modules/inscripcion/Inscripcion.vue';
import MisionVision from '../components/modules/mision-vision/MisionVision.vue';
import Login from '../components/login/Login.vue';
import Instalaciones from "../components/modules/instalaciones/Instalaciones.vue";
import Autoridades from "../components/modules/autoridades/Autoridades.vue";
import InicioDashboard from "../components/dashboard/InicioDashboard.vue";
import NotFound from "../components/NotFound.vue";
import {useAuthStore} from "../stores/auth.js";
import {storeToRefs} from "pinia";
import NoAutorizado from "../components/NoAutorizado.vue";
import Grados from "../components/dashboard/admin/Grados.vue";
import Index from "../components/dashboard/Index.vue";

const routes = [
    {path: '/', name: 'Inicio', component: Inicio},
    {path: '/niveles', name: 'NivelesEducativos', component: NivelesEducativos},
    {path: '/inscripcion', name: 'Inscripcion', component: Inscripcion},
    {path: '/mision-vision', name: 'MisionVision', component: MisionVision},
    {path: '/login', name: 'Login', component: Login},
    {path: '/instalaciones', name: 'Instalaciones', component: Instalaciones},
    {path: '/autoridades', name: 'Autoridades', component: Autoridades},
    {
        path: '/inicio-dashboard',
        name: 'InicioDashboard',
        component: InicioDashboard,
        meta: {title: 'InicioDashboard', requiresAuth: true, puedoEntrar: "administrador"},
    },
    {
        path: '/index',
        name: 'Index',
        component: Index,
        meta: {title: 'ADMIN', requiresAuth: true, puedoEntrar: "administrador"},
    },
    {path: '/not-found', name: 'NotFound', component: NotFound},
    {path: '/no-autorizado', name: 'NoAutorizado', component: NoAutorizado},
    {path: '/grados', name: 'Grados', component: Grados, meta: {title: 'Grados', requiresAuth: true, puedoEntrar: "administrador"},},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Inicio';

    const authStore = useAuthStore();
    const {token, user} = storeToRefs(authStore);

    const listaRutas = router.getRoutes(); //mis rutas
    const existeRuta = listaRutas.find((item) => item.name === to.name);
    if (!existeRuta) {
        next({name: 'NotFound'});
        return;
    }
    //validar si la ruta requiere logue
    if (to?.meta?.requiresAuth) {
        /*
        * validar si existe un token, si existe un token
        * si no existe token redir a login
        * */
        if (!token.value) {
            next({name: 'Login'});
        } else {
            //si existe token, validar permisos del usuario getUsuario
            console.log('el usuario: ', user.value);
            console.log('El rol:', user.value.roles[0].name);
            const rol = user.value.roles[0].name

            if(rol !== to.meta.puedoEntrar){
                next({name: 'NoAutorizado'});
            }else{
                next();
            }
        }
    } else {
        if (token.value){
            next({name: 'InicioDashboard'});
        }else {
            next();
        }
    }
    //si no esta autorizado, vista sin permiso

    //si lo esta nos vamos a next()

})

export default router;
