<template>

  <q-select
    v-model="model"
    :options="options"
    @update:model-value="updateModel"
    label="Iglesia"
    style="max-width: 180px"
    outlined
    square
    dense
    clearable
  />

</template>

<script setup>
import { computed } from 'vue';

const options = ["CENTRO", "CAPILLA", "LIMPIO"];

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
