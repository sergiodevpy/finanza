<template>
  <div class="text-subtitle2 text-primary">
    Buscar por <span><q-icon name="search" /></span>
  </div>
  <div class="q-pb-md row ">
    <iglesiaCmp class="col" v-model="storeMovimiento.balanceIglesiaFiltro" />
    <mesCmp class="col" v-model="storeMovimiento.balanceMesFiltro" />
    <q-input class="col" dense square outlined clearable type="tel" mask="####" label="Año"
      v-model="storeMovimiento.balanceAnioFiltro" />
  </div>
</template>

<script setup>
import { useStoreMovimiento } from 'src/stores/storeMovimiento';
import iglesiaCmp from '../compartido/iglesiaCmp.vue';
import mesCmp from '../compartido/mesCmp.vue';

const storeMovimiento = useStoreMovimiento()



</script>

<style></style>