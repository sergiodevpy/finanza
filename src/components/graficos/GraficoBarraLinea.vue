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
        height: '400px',
        type: 'line',
        toolbar: {
            show: true,
            tools: {
                download: true,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: true,
                reset: false | '<img src="/static/icons/reset.png" width="20">',
                customIcons: []
            },
        },

    },

    stroke: {
        width: [0, 4]
    },
    zoom: {
        enabled: false
    },
    title: {
        text: 'Traffic Sources'
    },
    dataLabels: {
        enabled: false,
        enabledOnSeries: [1]
    },
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    yaxis: [{
        title: {
            text: 'Website Blog',
        },
        show: true

    }, {
        opposite: true,
        title: {
            text: 'Social Media'
        },
        show: true
    }]
},);

const series = reactive([{
    name: 'Website Blog',
    type: 'column',
    data: [11500000, 12300000, 17500000, 11500000, 12300000, 17500000, 11500000, 12300000, 17500000, 11500000, 12300000, 17500000]
}, {
    name: 'Social Media',
    type: 'line',
    data: [11500000, 12300000, 17500000, 11500000, 12300000, 17500000, 11500000, 12300000, 17500000, 11500000, 12300000, 17500000]
}]);


</script>

<style scoped></style>