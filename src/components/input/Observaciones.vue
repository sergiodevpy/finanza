<template>
  <q-input v-model="storeActaDB.actaObjPage.observaciones" square outlined type="textarea" label="Observaciones" />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePageStoreActaOfrenda } from "src/stores/storePageActaOfrenda.js";
import { useStoreActaDB } from "src/stores/storeActaDB";

const  storeActaDB = useStoreActaDB()

//const observaciones = ref("");
const { observaciones } = storeToRefs(usePageStoreActaOfrenda())
</script>

<style></style>
