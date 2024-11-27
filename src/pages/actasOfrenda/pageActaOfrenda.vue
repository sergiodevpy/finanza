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
      <Ingreso :valor="100000"  />
      <Ingreso :valor="50000"  />
      <Ingreso :valor="20000"  />
      <Ingreso :valor="10000"  />
      <Ingreso :valor="5000"  />
      <Ingreso :valor="2000"  />
      <Total etiqueta="Total Billetes" :valor-total="useTextoMoneda(storeActaDB.totalBilletes, 'S')" />

      <Titulo texto="Monedas" class="q-pt-md" />
      <tituloColumas />
      <Ingreso :valor="1000"  />
      <Ingreso :valor="500"  />
      <Ingreso :valor="100"  />
      <Ingreso :valor="50"  />
      <Total etiqueta="Total Monedas" :valor-total="useTextoMoneda(storeActaDB.totalMonedas, 'S')" />

      <TotalIngreso etiqueta="Total Ingresos" :valor-total="useTextoMoneda(storeActaDB.totalIngresos, 'S')" />

      <div class="q-pt-md">
        <Observaciones />
      </div>




      <div class="row justify-center q-pt-md">

        <!-- <q-btn class="col-6 " @click="generaPDF()" color="primary" icon="picture_as_pdf" label="Generar PDF"
          :disable="!storeIngresos.compartirHabilitado" />


        <q-btn class="col-5 " @click="enviaWhatsaap(storeIngresos.textoWhatsaap)" color="primary" icon="send"
          label="whatsapp" :disable="!storeIngresos.compartirHabilitado" /> -->

        <q-btn class="col-5 " @click="storeActaDB.guardarActa" color="primary" icon="check" label="Guardar"
          :disable="!storeActaDB.guardarActaHabilitado" />

      </div>

      <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn color="primary" icon="check" fab @click="storeActaDB.guardarActa"
          :disable="!storeActaDB.guardarActaHabilitado" />
      </q-page-sticky> -->
    </div>
  </q-page>
</template>

<script setup>
import { onUnmounted } from "vue";
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

onUnmounted(() => {
  // Esta función se ejecutará cuando salgas de la página
  //console.log('Saliendo de la página')
  storeActaDB.resetearActaSeleccionado()
})


</script>

<style scoped>
.verborde {
  border: 1px solid red;
}
</style>
