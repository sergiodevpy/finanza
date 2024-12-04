<template>
    <!-- <div class="q-pa-md"> -->
    <apex-chart type="line" :options="chartOptions" :series="series"></apex-chart>
    <!-- </div> -->
</template>

<script setup>
import { reactive } from 'vue';
import { useTextoMoneda } from '../use/useTextoMoneda';


const chartOptions = reactive({
    chart: {
        type: 'line',
        zoom: {
            enabled: false
        }
    },
  
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: 'Product Trends by Month',
        align: 'left'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    },
    yaxis: {
        show: false,
    },
    plotOptions: {
        line: {
            colors: {
                threshold: 0,
                colorAboveThreshold: '#03545f',
                colorBelowThreshold: '#03545f',
            }
        }
    },
});

const series = reactive([
    {
        name: "Desktops",
        data: [11500000, 12300000, 17500000,11500000, 12300000, 17500000,11500000, 12300000, 17500000,11500000, 12300000, 17500000]
    },


]);


</script>

<style scoped></style>