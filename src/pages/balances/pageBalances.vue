<template>
  <q-page class="q-pa-md">
    <div style="max-width: 800px;" class="q-mx-auto">
      <filtroBalance />

      <!-- <BarChart class="borde" /> -->
      <!-- <balanceItem/> -->
      <div class="">
        <listaBalances />
      </div>



    </div>
  </q-page>
</template>

<script setup>
import filtroBalance from 'src/components/filtro/filtroBalance.vue';
import listaBalances from 'src/components/sumatoria/listaBalances.vue';
import BarChart from 'src/components/graficos/BarChart.vue';
</script>

<style scoped>
.borde {
  border: 1px solid #8ec7cf;
  border-radius: 0px;
  padding: 5px;
}
</style>