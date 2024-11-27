<template>
  <q-page class="q-pa-md">
    <div class="text-center text-bold text-primary text-weight-bolder borde">
      Balance {{ storeMovimiento.balanceSeleccionadoIglesia }} -
      {{ storeMovimiento.balanceSeleccionadoMes }} -
      {{ storeMovimiento.balanceSeleccionadoAnio }}
    </div>
    <div class=" q-pt-md text-bold text-green text-h6">
      Ingresos
    </div>
    <div>
      <q-list bordered separator v-for="movimiento in storeMovimiento.listaMovimientoDeBalanceIngresos"
        :key="movimiento.id">
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label caption>{{ movimiento.fechaMovimiento }}</q-item-label>
            <q-item-label> {{ movimiento.motivo }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-bold">{{ movimiento.monto }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

    </div>
    
    <div>
      <q-list bordered separator>
        <q-item clickable v-ripple style="background-color: #d4f2f2;">
          <q-item-section class="text-bold">Total Ingresos</q-item-section>
          <q-item-section side class="text-bold text-h6 text-green" >{{ storeMovimiento.balanceSeleccionado.ingresoTotal }}</q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class=" q-pt-md text-bold text-red text-h6">
      Egresos
    </div>
    <div>
      <q-list bordered separator v-for="movimiento in storeMovimiento.listaMovimientoDeBalanceEgresos"
        :key="movimiento.id">
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label caption>{{ movimiento.fechaMovimiento }}</q-item-label>
            <q-item-label>{{ movimiento.motivo }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-bold">{{ movimiento.monto }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="q-pb-md">
      <q-list bordered separator>
        <q-item clickable v-ripple style="background-color: #d4f2f2;" >
          <q-item-section class="text-bold">Total Egresos</q-item-section>
          <q-item-section side class="text-bold text-h6 text-red">{{ storeMovimiento.balanceSeleccionado.egresoTotal }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="q-pt-md borde">
      <balanceItem :balance="storeMovimiento.balanceSeleccionado" :modo-resumen="true" />
    </div>

    <!-- <div class="q-pt-md flex justify-end">
      <q-btn color="primary" label="Generar PDF"/>
    </div> -->
  </q-page>
</template>

<script setup>
import { useStoreMovimiento } from 'src/stores/storeMovimiento';
import balanceItem from 'src/components/sumatoria/balanceItem.vue';
const storeMovimiento = useStoreMovimiento()
</script>

<style scoped>
.borde {
  border: 1px solid #8ec7cf;
  border-radius: 0px;
  padding: 5px;
}
</style>