<template>
  <q-page class="q-pa-md q-mx-auto" style="max-width: 600px;">
    <filtroActa />
    <ListaActaOfrenda />
    <div style="min-height: 60px;">

    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn color="primary" icon="add" fab @click="clickNuevo" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import filtroActa from 'src/components/filtro/filtroActa.vue';
import ListaActaOfrenda from 'src/components/actaOfrenda/ListaActaOfrenda.vue';
const router = useRouter()
const clickNuevo = () => {
  router.push("/acta")
}
</script>

<style></style>