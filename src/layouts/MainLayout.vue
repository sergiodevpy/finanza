<template>
  <q-layout view="hHh lpR lFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="payments" />
            Finanzas

          </div>
        </q-toolbar-title>


      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :breakpoint="767" :width="250" class="bg-primary" bordered show-if-above>
      <q-list>
        <q-item-label class="text-white" header>
          Accesos
        </q-item-label>

        <!-- <NavLink v-for="link in navLinks" :key="link.title" v-bind="link" /> -->
        <q-separator spaced />
        <q-item @click="storeUsuarios.terminarSesionUsuario" class="text-white" tag="a" clickable>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Salir</q-item-label>
            <q-item-label v-if="storeUsuarios.usuarioDetalle.email" class="text-white" caption>
              Usuario: {{ storeUsuarios.usuarioDetalle.usuario }}
            </q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="transparent-footer">
      <!-- <balanceMovimientos v-if="route.path == '/registros'"/> -->
      <Botonera />
    </q-footer>
  </q-layout>

</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import NavLink from 'src/components/nav/NavLink.vue';
import Botonera from 'src/components/pie/Botonera.vue';
import balanceMovimientos from 'src/components/sumatoria/balanceItem.vue';
import { useStoreUsuarios } from 'src/stores/storeUsuarios';

const storeUsuarios = useStoreUsuarios()
const route = useRoute()

//console.log(route);

defineOptions({
  name: 'MainLayout'
})

const navLinks = [
  {
    title: 'Ingreso',
    caption: 'Ingreso detallado de ofrenda',
    icon: 'paid',
    link: '/'
  },
  {
    title: 'Configuraciones',
    caption: 'Ajustes de la aplicación',
    icon: 'settings',
    link: '/configuraciones'
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.transparent-footer {
  background:white
  /* background: transparent !important; */
  /* Alternativa usando rgba */
  /* background: rgba(0, 0, 0, 0) !important; */
}
</style>
