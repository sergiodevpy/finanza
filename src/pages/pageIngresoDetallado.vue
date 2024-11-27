<template>
  <q-page>
    <div class="q-pa-md">
      <Titulo texto="Datos Iglesia" />
      <div class="col">
        <div class="row">
          <Fecha class="col-6" />
          <LugarReunion class="col-6" />
        </div>
        <Firmas />
      </div>

      <Titulo texto="Billetes" class="q-pt-md" />
      <tituloColumas />
      <Ingreso :valor="100000" />
      <Ingreso :valor="50000" />
      <Ingreso :valor="20000" />
      <Ingreso :valor="10000" />
      <Ingreso :valor="5000" />
      <Ingreso :valor="2000" />
      <Total etiqueta="Total Billetes" :valor-total="useTextoMoneda(storeIngresos.totalBilletes, 'S')" />

      <Titulo texto="Monedas" class="q-pt-md" />
      <tituloColumas />
      <Ingreso :valor="1000" />
      <Ingreso :valor="500" />
      <Ingreso :valor="100" />
      <Ingreso :valor="50" />
      <Total etiqueta="Total Monedas" :valor-total="useTextoMoneda(storeIngresos.totalMonedas, 'S')" />

      <TotalIngreso etiqueta="Total Ingresos" :valor-total="useTextoMoneda(storeIngresos.totalIngresos, 'S')" />

      <div class="q-pt-md">
        <Observaciones />
      </div>




      <div class="row justify-center q-pt-md">

        <!-- <q-btn class="col-6 " @click="generaPDF()" color="primary" icon="picture_as_pdf" label="Generar PDF"
          :disable="!storeIngresos.compartirHabilitado" />


        <q-btn class="col-5 " @click="enviaWhatsaap(storeIngresos.textoWhatsaap)" color="primary" icon="send"
          label="whatsapp" :disable="!storeIngresos.compartirHabilitado" /> -->

        <q-btn class="col-5 " @click="storeActaDB.guardarActa" color="primary" icon="check"
          label="Guardar" :disable="!storeIngresos.compartirHabilitado" />

      </div>
    </div>
  </q-page>
</template>

<script setup>
import Ingreso from "src/components/ingreso/Ingreso.vue";
import { useTextoMoneda } from "src/components/use/useTextoMoneda";
import { usePageStoreActaOfrenda } from "src/stores/storePageActaOfrenda.js";

import Titulo from "src/components/label/Titulo.vue";
import Total from "src/components/label/Total.vue";
import TotalIngreso from "src/components/label/TotalIngreso.vue";
import Fecha from "src/components/input/Fecha.vue";
import LugarReunion from "src/components/select/LugarReunion.vue";
import tituloColumas from "src/components/ingreso/tituloColumas.vue";
import Observaciones from "src/components/input/Observaciones.vue";
import Firmas from "src/components/input/Firmas.vue";

import { generaPDF } from "src/components/use/useGeneraPDF";

import { enviaWhatsaap } from "src/components/use/useEnviaWhatsaap";
import { useStoreActaDB } from "src/stores/storeActaDB";
const storeIngresos = usePageStoreActaOfrenda();
const storeActaDB = useStoreActaDB()
</script>

<style scoped>
.verborde {
  border: 1px solid red;
}
</style>
