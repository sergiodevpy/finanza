<template>
  <div v-if="storeMovimiento.listaBalanceIglesiaAnioMes.length == 0">
    <sinDatos mensaje="No hay movimientos registrados" />
  </div>
  <q-list v-else class="q-pt-sm q-pl-sm" padding bordered dense
    v-for="balance in storeMovimiento.listaBalanceIglesiaAnioMes" :key="balance.iglesia">
    <q-item-label class="text-bold text-primary">{{ balance.iglesia }}</q-item-label>
    <q-list padding v-for="anio in balance.anios" class="q-pl-md">
      <q-item-label class="text-bold text-secondary">{{ anio.anio }}</q-item-label>
      <q-list v-for="mes in anio.meses" class="">
        <balanceItem :balance="mes" />
      </q-list>
    </q-list>


    <!-- {{ balance}} -->
    <!-- <balanceItem :balance="balance.anios.meses"/> -->
  </q-list>
</template>

<script setup>
import balanceItem from "./balanceItem.vue";
import { useStoreMovimiento } from "src/stores/storeMovimiento";
import sinDatos from "../compartido/sinDatos.vue";
const storeMovimiento = useStoreMovimiento();
</script>

<style scoped>
.verborde {
  border: 1px solid red;
}

.borde {
  border: 1px solid #8ec7cf;
  border-radius: 0px;
  padding: 5px;
}
</style>
