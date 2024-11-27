<template>
  <div class="row items-center">
    <div class="col-5 text-right text-primary text-h6 text-weight-medium">
      {{ props.etiqueta }}
    </div>
    <div class="col-7 text-weight-bolder text-primary text-h6 text-right q-pr-md">
      {{ props.valorTotal }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  etiqueta: {
    type: String,
    required: true,
  },
  valorTotal: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
