<template>
  <div class="text-weight-medium text-primary text-h6 text-right q-pr-md">
    {{ props.etiqueta }}
  </div>
</template>

<script setup>
const props = defineProps({
  etiqueta: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
