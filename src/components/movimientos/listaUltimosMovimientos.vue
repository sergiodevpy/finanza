<template>
  <div class="q-pt-md">
    <q-card flat class="borde">
      <q-card-section>
        <div class="text-weight-bolder text-primary text-h5 ">
          Últimos movimientos
        </div>
      </q-card-section>
      <q-card-section>

        <listaMovimientos :item-simple="true" tipo-listado="ultimosCinco" />


      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import listaMovimientos from './listaMovimientos.vue';


</script>

<style scoped>
.borde {
  border: 1px solid #8ec7cf;
  border-radius: 5px;
  padding: 5px;
}
</style>