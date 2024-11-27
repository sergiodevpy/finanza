<template>
  <div style="max-width: 180px">
    <q-input outlined square v-model="fecha" label="Fecha">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date ref="selectorFecha" v-model="fecha" minimal mask="DD/MM/YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="primary" flat />
                <q-btn
                  v-close-popup
                  label="HOY"
                  color="primary"
                  flat
                  @click="setDateToToday"
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { storeToRefs } from 'pinia'
import { usePageStoreActaOfrenda } from "src/stores/storePageActaOfrenda.js";

//const fecha = ref("");

const {fecha} = storeToRefs(usePageStoreActaOfrenda())



const selectorFecha = ref(null);

const setDateToToday = () => {
  if (selectorFecha.value) {
    // Llamamos al método 'setToday' del q-date
    selectorFecha.value.setToday();
  }
};
</script>

<style></style>
