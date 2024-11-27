<template>
  <q-card class="chart-card">
    <q-card-section>
      <div class="chart-wrapper">
        <canvas ref="chartRef"></canvas>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useChart } from 'src/use/useChart';
import { useQuasar } from 'quasar'
import { watch } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['line', 'bar', 'pie', 'doughnut', 'radar'].includes(value)
  },
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['chartClick', 'chartHover', 'chartInit'])

const $q = useQuasar()
const { chartRef, chartInstance } = useChart({
  type: props.type,
  data: props.data,
  options: {
    ...props.options,
    onClick: (event, elements) => {
      emit('chartClick', { event, elements })
    },
    onHover: (event, elements) => {
      emit('chartHover', { event, elements })
    }
  }
})

// Emitir el evento cuando el gráfico está listo
watch(chartInstance, (newInstance) => {
  if (newInstance) {
    emit('chartInit', newInstance)
  }
})
</script>

<style scoped>
.chart-card {
  position: relative;
  width: 100%;
}

.chart-wrapper {
  position: relative;
  height: 400px;
  width: 100%;
}

/* Estilos para modo oscuro */
:deep(.q-card--dark) {
  background: #1d1d1d;
}
</style>