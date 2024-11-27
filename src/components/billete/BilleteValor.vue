<template>
  <div class="row items-center">
    <div class="col-3 text-weight-medium text-primary text-h6 text-right q-pr-md">
      {{ useTextoMoneda(props.valor, "N") }}
    </div>
    <div class="col-2">
      <q-input v-model.number="cantidad" type="tel" dense outlined square />
    </div>
    <div class="col-7 text-weight-medium text-primary text-h6 text-right q-pr-md">
      {{ useTextoMoneda(total100, "S") }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTextoMoneda } from "src/components/use/useTextoMoneda";

const props = defineProps({
  valor: {
    type: Number,
    required: true,
  },
});

const cantidad = ref(0);

const total100 = computed(() => {
  return cantidad.value * props.valor;
});
</script>

<style scoped>
.ver-borde {
  border: 1px solid red;
}
</style>
