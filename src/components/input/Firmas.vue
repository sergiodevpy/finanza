<template>
  <div class="row">
    <div class="col-12">
      <q-input square outlined v-model="storeActaDB.actaObjPage.contadoPor" label="Contado por" />
      <q-input square outlined v-model="storeActaDB.actaObjPage.supervisadoPor" label="Supervisado por" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia'
import { usePageStoreActaOfrenda } from "src/stores/storePageActaOfrenda.js";
import { useStoreActaDB } from "src/stores/storeActaDB";

const  storeActaDB = useStoreActaDB()


const { contadoPor, supervisadoPor } = storeToRefs(usePageStoreActaOfrenda())


</script>

<style></style>
