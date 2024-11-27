<template>
  <div :style="props.estilo_definido">
    <q-input outlined square dense v-model="dateModel" label="Fecha">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date ref="selectorFecha" v-model="dateModel" @update:model-value="updateDate" minimal mask="DD/MM/YYYY">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="primary" flat />
                <q-btn v-close-popup label="HOY" color="primary" flat @click="setDateToToday" />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup>

import { computed, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  estilo_definido: {
    type: String,
    required: false,
    default: "max-width: 180px"
  },
})


const emit = defineEmits(['update:modelValue'])

const dateModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})


const updateDate = (value) => {
  emit('update:modelValue', value)
}



const selectorFecha = ref(null);

const setDateToToday = () => {
  if (selectorFecha.value) {
    // Llamamos al método 'setToday' del q-date
    selectorFecha.value.setToday();
  }
};
</script>

<style></style>