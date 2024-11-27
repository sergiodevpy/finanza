<template>
  <div class="text-subtitle2 text-primary">
    Buscar por <span><q-icon name="search" /></span>
  </div>
  <div class="q-pb-md row ">
    <iglesiaCmp class="col" v-model="storeActaDB.filtroIglesia" />
    <fechaCmp class="col" v-model="storeActaDB.filtroFecha" />

  </div>
</template>

<script setup>
import iglesiaCmp from '../compartido/iglesiaCmp.vue';
import fechaCmp from '../compartido/fechaCmp.vue';
import { useStoreActaDB } from 'src/stores/storeActaDB';


const storeActaDB = useStoreActaDB()
</script>

<style></style>