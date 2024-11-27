<template>
    <q-input
      v-model="model"
      :label="props.etiqueta"
      type="textarea"
      outlined
      square
      style="max-width: 600px"
    />
</template>

<script  setup>
import { computed } from 'vue';



const props = defineProps({
  modelValue: {
    type: String,
    required: true
    },
    etiqueta: {
    type: String,
    required: true
    },
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

<style>

</style>