<template>
  <q-page class="q-pa-md">
    <filtroGrafico />
    <div v-for="balance in storeGraficos.resumenFinanciero" :key="balance.iglesia">
      <div class="q-mb-md borde">
        <GraficoBarra :Iglesia="balance.iglesia" :Anio="balance.anio" Tipo="Ingresos" :valores="balance.ingresos" />
      </div>
    </div>
    <div v-for="balance in storeGraficos.resumenFinanciero" :key="balance.iglesia">
      <div class="q-mb-md borde">
        <GraficoBarra :Iglesia="balance.iglesia" :Anio="balance.anio" Tipo="Egresos" :valores="balance.egresos" />
      </div>
    </div>



  </q-page>
</template>

<script setup>
import GraficoBarra from 'src/components/graficos/GraficoBarra.vue';
import GraficoLinea from 'src/components/graficos/GraficoLinea.vue';
import GraficoBarraLinea from 'src/components/graficos/GraficoBarraLinea.vue';
import filtroGrafico from 'src/components/filtro/filtroGrafico.vue';
import { useStoreGraficos } from 'src/stores/storeGraficos';
const storeGraficos = useStoreGraficos()
</script>


<style scoped>
.borde {
  border: 1px solid #8ec7cf;
  border-radius: 5px;
  padding: 5px;
}
</style>