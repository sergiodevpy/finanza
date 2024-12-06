<template>
  <q-page class="q-pa-md q-mx-auto" style="max-width: 800px;">
    <!-- <div v-if="storeMovimiento.listaMovimientos.length > 0"> -->
    <div>

      <filtroMovimiento v-if="storeMovimiento.listaMovimientos.length > 0" />

      <listaMovimientos :item-simple="false" />
      <div style="min-height: 60px;">

      </div>
      <q-page-sticky v-if="storeMovimiento.movimientoSeleccionado" position="bottom-right" :offset="[18, 18]">
        <q-btn color="red" icon="delete_forever" fab @click="storeMovimiento.borrarMovimientosSeleccionados" />
      </q-page-sticky>





    </div>
    <q-page-sticky v-if="!storeMovimiento.movimientoSeleccionado" position="bottom-right" :offset="[18, 18]">
      <q-btn color="primary" icon="add" fab @click="clickNuevo" />
    </q-page-sticky>


  </q-page>

</template>

<script setup>
import { onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStoreMovimiento } from 'src/stores/storeMovimiento';
import listaMovimientos from 'src/components/movimientos/listaMovimientos.vue';
import filtroMovimiento from 'src/components/filtro/filtroMovimiento.vue';
const storeMovimiento = useStoreMovimiento()

const router = useRouter()

const clickNuevo = () => {
  router.push("/movimiento")
}
onUnmounted(() => {
  // Esta función se ejecutará cuando salgas de la página
  //console.log('Saliendo de la página')
  if (storeMovimiento.mostrarCheckListaMovimientos) {
    storeMovimiento.mostrarOcultarCheckEnMovimiento()
  }
})

</script>
