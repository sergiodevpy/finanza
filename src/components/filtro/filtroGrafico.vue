<template>
  <div class="text-subtitle2 text-primary">
    Ver por <span><q-icon name="search" /></span>
  </div>
  <div class="q-pb-md row ">
    <iglesiaCmp class="col" v-model="storeGraficos.graficoIglesiaFiltro" />

    <q-input class="col" dense square outlined clearable type="tel" mask="####" label="Año"
      v-model="storeGraficos.graficoAnioFiltro" />
  </div>
</template>

<script setup>
import { useStoreMovimiento } from 'src/stores/storeMovimiento';
import iglesiaCmp from '../compartido/iglesiaCmp.vue';
import { useStoreGraficos } from 'src/stores/storeGraficos';

const storeMovimiento = useStoreMovimiento()
const storeGraficos = useStoreGraficos()



</script>

<style></style>