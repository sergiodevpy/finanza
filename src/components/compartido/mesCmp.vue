<template>

  <q-select
    v-model="model"
    :options="months"
    @update:model-value="updateModel"
    label="Mes"
    style="max-width: 180px"
    outlined
    square
    dense
    clearable
  />

</template>

<script setup>
import { computed } from 'vue';

import { ref } from 'vue'

// Estado reactivo para el mes seleccionado
const selectedMonth = ref(null)

// Lista de meses como constante
const months = [
    'Enero', 
    'Febrero', 
    'Marzo', 
    'Abril', 
    'Mayo', 
    'Junio', 
    'Julio', 
    'Agosto', 
    'Septiembre', 
    'Octubre', 
    'Noviembre', 
    'Diciembre'
];

const props = defineProps({
  modelValue: {
    type: String,
    required: false
  }
})


const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})


const updateModel = (value) => {
  emit('update:modelValue', value)
}




</script>

<style></style>
