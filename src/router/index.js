import { createRouter, createWebHistory } from 'vue-router';

import NivelesEducativos from '../components/modules/niveles/NivelesEducativos.vue';
import Inicio from '../components/principal/Inicio.vue';
import Inscripcion from '../components/modules/inscripcion/Inscripcion.vue';
import MisionVision from '../components/modules/mision-vision/MisionVision.vue';
import Login from '../components/login/Login.vue';
import Instalaciones from "../components/modules/instalaciones/Instalaciones.vue";
import Autoridades from "../components/modules/autoridades/Autoridades.vue";

const routes = [
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/niveles', name: 'NivelesEducativos', component: NivelesEducativos },
  { path: '/inscripcion', name: 'Inscripcion', component: Inscripcion },
  { path: '/mision-vision', name: 'MisionVision', component: MisionVision },
  { path: '/login', name: 'Login', component: Login },
  {path: '/instalaciones', name: 'Instalaciones', component: Instalaciones },
  {path: '/autoridades', name: 'Autoridades', component: Autoridades},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
