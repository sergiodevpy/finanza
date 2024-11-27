<template>
    <q-input
      v-model="model"
      label="Monto GS"
      outlined
      square
      mask="###.###.###.###"
      input-class="text-right text-weight-bolder text-h4 text-primary"
      reverse-fill-mask
      
      type="tel"
    />
</template>

<script setup>
import { computed } from 'vue';
import { useTextoMoneda } from '../use/useTextoMoneda';
const props = defineProps({
    modelValue: {
        type: String,
        required: true
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