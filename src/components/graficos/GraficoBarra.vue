<template>
    <!-- <div class="q-pa-md"> -->
    <apex-chart type="bar" :options="chartOptions" :series="series"></apex-chart>
    <!-- </div> -->
</template>

<script setup>
import { reactive } from 'vue';
import { useTextoMoneda } from '../use/useTextoMoneda';


const chartOptions = reactive({
    chart: {
        type: 'bar',
        toolbar: { show: true },
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '9px',
            colors: ['#03545f'] // color del texto
        },
        formatter: function (val, opts) {
            return useTextoMoneda(val, "N")
        },
        offsetY: -20,

    },
    xaxis: {
        categories: ['Enero', 'Febrero', 'Marzo'],
    },
    title: {
        text: 'Ingresos - ICEC - 2024',
        align: 'center',
        margin: 10,
        style: {
            fontSize: '16px',
            color: '#03545f',
        },

    },
    plotOptions: {
        bar: {
            dataLabels: {
                position: 'top',
            },
            colors: {
                ranges: [{
                  from: 0,
                  to: 20000000,
                  color: '#03545f'
              }],
            }
        }
    },
    tooltip: {
        y: {
            formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                return useTextoMoneda(value, "S")
            }
        }
    },
    yaxis: {
        labels: {
            /**
            * Allows users to apply a custom formatter function to yaxis labels.
            *
            * @param { String } value - The generated value of the y-axis tick
            * @param { index } index of the tick / currently executing iteration in yaxis labels array
            */
            formatter: function (val, index) {
                return useTextoMoneda(val, "N");
            }
        }
    }
});

const series = reactive([
    {
        name: 'Ingresos',
        data: [11500000, 12300000, 17500000],
    },


]);


</script>

<style scoped></style>