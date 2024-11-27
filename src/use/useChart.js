import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'

// Registrar los componentes necesarios de Chart.js
Chart.register(...registerables)

export function useChart(props) {
  const chartInstance = ref(null)
  const chartRef = ref(null)

  const initChart = () => {
    if (!chartRef.value) return
    
    // Destruir la instancia anterior si existe
    if (chartInstance.value) {
      chartInstance.value.destroy()
    }

    const ctx = chartRef.value.getContext('2d')
    
    // Asegurarse de que tenemos un contexto válido
    if (!ctx) return

    chartInstance.value = new Chart(ctx, {
      type: props.type,
      data: props.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...props.options
      }
    })
  }

  const updateChart = () => {
    if (chartInstance.value) {
      chartInstance.value.data = props.data
      chartInstance.value.update('active')
    }
  }

  // Usar nextTick para asegurar que el DOM está listo
  onMounted(async () => {
    await nextTick()
    initChart()
  })

  onUnmounted(() => {
    if (chartInstance.value) {
      chartInstance.value.destroy()
      chartInstance.value = null
    }
  })

  // Observar cambios en los datos
  watch(() => props.data, () => {
    nextTick(() => {
      updateChart()
    })
  }, { deep: true })

  return {
    chartRef,
    chartInstance
  }
}
