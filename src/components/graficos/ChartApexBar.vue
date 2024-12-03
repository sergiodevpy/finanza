<template>
    <div class="q-pa-sm">
        <apex-chart type="bar" :options="chartOptions" :series="series"></apex-chart>
    </div>
</template>

<script setup>
import { reactive } from 'vue';


const chartOptions = reactive({
    chart: {
        type: 'bar',
        toolbar: { show: true },
    },
    xaxis: {
        categories: ['Enero', 'Febrero', 'Marzo'],
    },
    title: {
        text: 'Inresos',
        align: 'center',
        margin: 10,
        style: {
            fontSize: '16px',
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "50%",
        },
    },
    dataLabels: {
        enabled: true,
        style: {
            colors: ["#fff"], // Cambia el color del texto si es necesario
        },
        offsetY: (index) => {
            console.log('offsetY_log');
            
        },
        position: "top",
        formatter: function (val) {
            return val; // Puedes personalizar el formato del texto
        },
    },


});

const series = reactive([
    {
        name: 'Ingreso',
        data: [5980000, 2500000, 1950000],
    },
]);


</script>

<style scoped></style>