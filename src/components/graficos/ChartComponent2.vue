<template>
  <div class="q-pa-md">
    <q-card class="chart-container">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
        <Line
          :data="chartData"
          :options="chartOptions"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const title = ref('Estadísticas de Ventas')

// Datos para el gráfico
const chartData = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Ventas 2024',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#1976D2',
      backgroundColor: 'rgba(25, 118, 210, 0.2)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Ventas 2023',
      data: [8, 15, 5, 4, 3, 2],
      borderColor: '#26A69A',
      backgroundColor: 'rgba(38, 166, 154, 0.2)',
      tension: 0.4,
      fill: true
    }
  ]
}

// Configuración del gráfico
const chartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Comparativa de Ventas Anuales'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: value => `$${value}k`
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  }
}
</script>

<style scoped>
.chart-container {
  max-width: 800px;
  margin: 0 auto;
}
.chart-container .q-card-section {
  height: 400px;
}
</style>