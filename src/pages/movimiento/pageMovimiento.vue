<template>
  <q-page class="q-pa-md" style="max-width: 600px">

    <div class="row justify-between q-pb-md">
      <fechaCmp v-model="storeMovimiento.movimientoObj.fechaMovimiento" class="col q-pr-md"
        estilo_definido="max-width: 200px" />
      <iglesiaCmp class="col" v-model="storeMovimiento.movimientoObj.iglesia" />
    </div>


    <div class="col">
      <tipoMovimientoCmp v-model="storeMovimiento.movimientoObj.tipoMovimiento"
        class="text-weight-bolder text-primary" />
    </div>



    <div class="col">
      <montoCmp class="q-py-md" v-model="storeMovimiento.movimientoObj.monto" />
    </div>

    <div class="col">
      <textoCmp class="q-pb-md" v-model="storeMovimiento.movimientoObj.motivo" etiqueta="Motivo" />
    </div>

    <detalleTextoCmp v-model="storeMovimiento.movimientoObj.detalleMovimiento" etiqueta="Detalle del movimiento" />


    <!-- FOTO O DOCUMENTO -->
    <!-- <AgregarFotoDocumento/> -->
    <!-- <ObtenerFoto/> -->
    <GaleriaMultimedia v-if="!storeMovimiento.movimientoObj.idActa":imagen="storeMovimiento.movimientoObj.imagenNombre" />
    <div style="min-height: 60px;"></div>
    <q-page-sticky v-if="storeMovimiento.listoParaGuardar" position="bottom-right" :offset="[18, 18]">
      <q-btn :disable="!storeMovimiento.listoParaGuardar" color="primary" icon="done" fab
        @click="guardaOactualizaMovimiento" />

    </q-page-sticky>
    <q-page-sticky v-if="!storeMovimiento.listoParaGuardar && storeMovimiento.movimientoObj.id" position="bottom-right"
      :offset="[18, 18]">
      <q-btn :disable="storeMovimiento.listoParaGuardar" color="primary" icon-right="send" label="Whatsapp" no-caps
        @click="enviaWhatsaap(storeMovimiento.whatsappTextoMovimiento)" />

    </q-page-sticky>

  </q-page>
</template>

<script setup>
import { onUnmounted, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { enviaWhatsaap } from "src/components/use/useEnviaWhatsaap";
import fechaCmp from "src/components/compartido/fechaCmp.vue";
import { useStoreMovimiento } from "src/stores/storeMovimiento";
import iglesiaCmp from "src/components/compartido/iglesiaCmp.vue";
import tipoMovimientoCmp from "src/components/compartido/tipoMovimientoCmp.vue";
import detalleTextoCmp from "src/components/compartido/detalleTextoCmp.vue";
import montoCmp from "src/components/compartido/montoCmp.vue";
import textoCmp from "src/components/compartido/textoCmp.vue";
import AgregarFotoDocumento from 'src/components/multimedia/AgregarFotoDocumento.vue';
import ObtenerFoto from 'src/components/multimedia/ObtenerFoto.vue';
import GaleriaMultimedia from 'src/components/multimedia/GaleriaMultimedia.vue';
const storeMovimiento = useStoreMovimiento()

const $q = useQuasar()

const guardaOactualizaMovimiento = () => {
  if (storeMovimiento.movimientoObj.id) {
    storeMovimiento.actualizarMovimiento(storeMovimiento.movimientoObj.id, storeMovimiento.movimientoObj)
  } else {
    storeMovimiento.guardarMovimiento()
  }

}

onMounted(() => {
  if (storeMovimiento.movimientoObj.idActa) {
    $q.notify({
      type: 'warning',
      message: 'Movimiento de acta, no puedes editar los datos',
      position: 'center'
    })
  }
})

onUnmounted(() => {
  // Esta función se ejecutará cuando salgas de la página
  //console.log('Saliendo de la página')
  storeMovimiento.resetearDatosMovimientoSeleccionado()

})

</script>

<style scoped>
.verborde {
  border: 1px solid red;
}
</style>