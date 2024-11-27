<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Gráfico de líneas -->
      <div class="col-12 col-md-6">
        <chart-component type="line" :data="lineData" :options="lineOptions" @chartClick="handleChartClick"
          @chartInit="handleChartInit" />
      </div>

      <!-- Gráfico de barras -->
      <div class="col-12 col-md-6">
        <chart-component type="bar" :data="barData" :options="barOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChartComponent from 'src/components/graficos/ChartComponent.vue';

// Datos para el gráfico de líneas
const lineData = ref({
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [{
    label: 'Ventas 2024',
    data: [65, 59, 80, 81, 56, 55],
    fill: false,
    borderColor: '#26A69A',
    tension: 0.1
  }]
})

// Opciones para el gráfico de líneas
const lineOptions = ref({
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Ventas Mensuales'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
})

// Datos para el gráfico de barras
const barData = ref({
  labels: ['Producto A', 'Producto B', 'Producto C'],
  datasets: [{
    label: 'Unidades Vendidas',
    data: [12, 19, 3],
    backgroundColor: [
      '#26A69A',
      '#9C27B0',
      '#FF9800'
    ]
  }]
})

// Opciones para el gráfico de barras
const barOptions = ref({
  plugins: {
    legend: {
      position: 'top'
    }
  }
})

// Manejadores de eventos
const handleChartClick = ({ event, elements }) => {
  if (elements.length > 0) {
    const element = elements[0]
    console.log('Elemento clickeado:', element)
  }
}

const handleChartInit = (chart) => {
  console.log('Gráfico inicializado:', chart)
}

// Ejemplo de actualización de datos
onMounted(() => {
  // Simular actualización de datos cada 5 segundos
  setInterval(() => {
    lineData.value.datasets[0].data = lineData.value.datasets[0].data.map(
      () => Math.floor(Math.random() * 100)
    )
  }, 5000)
})
</script>