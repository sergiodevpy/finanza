<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md borde">
      <GraficoBarra />
    </div>
    <div class="borde">
      <GraficoLinea />
    </div>

  </q-page>
</template>

<script setup>
import GraficoBarra from 'src/components/graficos/GraficoBarra.vue';
import GraficoLinea from 'src/components/graficos/GraficoLinea.vue';
</script>

<style scoped>
.borde {
  border: 1px solid #8ec7cf;
  border-radius: 5px;
  padding: 5px;
}
</style>