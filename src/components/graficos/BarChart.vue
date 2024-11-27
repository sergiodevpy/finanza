<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>


<script setup>
import { ref } from 'vue';
import { Bar } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);


const chartData = ref({
    labels: ['Enero', 'Febrero', 'Marzo'],
    datasets: [
        {
            label: 'Centro',
            data: [1500000, 850000, 1000000],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
        },
        {
            label: 'Capilla',
            data: [2000000, 740000, 850000],
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgb(255, 159, 64)'],
            borderWidth: 1,
        },
        {
            label: 'Limpio',
            data: [2100000, 859000, 1000000],
            backgroundColor: ['rgba(0, 0, 255, 0.2)'],
            borderColor: ['rgb(0, 0, 255)'],
            borderWidth: 1,
        },
    ],
});


const chartOptions = ref({
    responsive: true,
    indexAxis: 'x',
});
</script>