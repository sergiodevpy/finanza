<template>
    <!-- <q-footer elevated> -->
      <q-tabs
        no-caps
        active-bg-color="white"
        active-color="primary"
        indicator-color="transparent"
        align="justify"
        class="bg-white text-secondary"
      >
        <q-route-tab to="/inicio" name="home" icon="home" class="btnNav">
          Inicio
        </q-route-tab>
        <!-- <q-route-tab to="/movimiento" name="movimiento" icon="post_add" class="btnNav">
          Movimiento
        </q-route-tab> -->
        <q-route-tab to="/registros" name="misRegistros" icon="currency_exchange" class="btnNav">
          Movimientos
        </q-route-tab>
        
        <q-route-tab
          to="/actasofrenda"
          name="pendientes"
          icon="article"
          class="btnNav"
        >
          Actas
        </q-route-tab>
        <q-route-tab to="/balances" name="balances" icon="description" class="btnNav">
          Balances
        </q-route-tab>
        <q-route-tab to="/graficos" name="graficos" icon="insert_chart" class="btnNav">
          Gráficos
        </q-route-tab>
        
      </q-tabs>
    <!-- </q-footer> -->
  </template>
<script setup >

</script>
  <style>
.btnNav {
  width: calc(100% / 5);
  font-size: 9px;
}
</style>