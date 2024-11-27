<template>
  <q-item>
    <q-item-section side>
      <q-item-label caption lines="1" class="text-bold">
        Acta del:
      </q-item-label>
      <q-item-label caption lines="1" class="text-bold">
        {{ acta.fecha }}
      </q-item-label>
      <q-item-label caption lines="1">
        {{ acta.iglesia }}
      </q-item-label>

    </q-item-section>

    <q-item-section>
      <q-item-label caption>
        <div class="row">
          <div class="col">
            Billetes
          </div>
          <div class="col text-right">
            {{ acta.totalBilletes }}
          </div>
        </div>

        <div class="row">
          <div class="col">
            Monedas
          </div>
          <div class="col text-right">
            {{ acta.totalMonedas }}
          </div>
        </div>
        <q-separator spaced />
        <div class="row">
          <div class="col text-bold">
            Total
          </div>
          <div class="col text-right text-bold">
            {{ acta.totalIngresos }}
          </div>
        </div>
      </q-item-label>
    </q-item-section>


    <q-item-section side>
      <q-item-label lines="1">
        <ActaAccionesMenu :acta="props.acta" />
      </q-item-label>
    </q-item-section>


  </q-item>
</template>

<script setup>
import ActaAccionesMenu from './ActaAccionesMenu.vue';
const props = defineProps({
  acta: {
    type: Object,
    required: true
  }
})
</script>

<style></style>