<template>
    <fwb-navbar class=" bg-slate-100 fixed top-0 left-0 w-full z-50 shadow-md">
        <template #logo>
            <fwb-navbar-logo alt="escuela logo" image-url="/img/school.png" link="#">
                EAAS
            </fwb-navbar-logo>
        </template>
        <template #default="{ isShowMenu }">
            <fwb-navbar-collapse :is-show-menu="isShowMenu">
                <fwb-navbar-link is-active link="#">
                    <router-link to="/" class="fwb-navbar-link">Inicio</router-link>
                </fwb-navbar-link>

                <fwb-navbar-link link="#">
                    <router-link to="/niveles" class="fwb-navbar-link">Niveles Educativos</router-link>
                </fwb-navbar-link>
                <fwb-navbar-link link="#">
                    <router-link to="/instalaciones" class="fwb-navbar-link">Instalaciones</router-link>
                </fwb-navbar-link>
                <fwb-navbar-link link="#">
                    <router-link to="/mision-vision" class="fwb-navbar-link">Misión y Visión</router-link>
                </fwb-navbar-link>
                <fwb-navbar-link link="#">
                    <router-link to="/autoridades" class="fwb-navbar-link">Autoridades</router-link>
                </fwb-navbar-link>
                <fwb-navbar-link link="#">
                    <router-link to="/inscripcion" class="fwb-navbar-link">Inscripcion</router-link>
                </fwb-navbar-link>
            </fwb-navbar-collapse>
        </template>
        <template #right-side>
            <router-link to="/login">
                <fwb-button>
                    Iniciar Sesión
                </fwb-button>
            </router-link>
        </template>
    </fwb-navbar>
</template>

<script setup>
import {
    FwbButton,
    FwbNavbar,
    FwbNavbarCollapse,
    FwbNavbarLink,
    FwbNavbarLogo,
} from 'flowbite-vue'
</script>