<template>
    <div>
        <q-select square outlined v-model="storeActaDB.actaObjPage.iglesia" :options="options" label="Iglesia" style="max-width: 180px" />
    </div>
</template>

<script setup>
import { ref } from "vue";

import { storeToRefs } from 'pinia'
import { usePageStoreActaOfrenda } from "src/stores/storePageActaOfrenda.js";
import { useStoreActaDB } from "src/stores/storeActaDB";

const  storeActaDB = useStoreActaDB()

//const model = ref("");
const { iglesia } = storeToRefs(usePageStoreActaOfrenda())


const options = ["CENTRO", "CAPILLA", "LIMPIO"];
</script>

<style></style>
