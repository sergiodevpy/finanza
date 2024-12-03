<template>
    <q-page class="q-pa-md">
        <div class="borde">
            <GraficoBarra />
        </div>
    </q-page>
</template>

<script setup>
import ChartApexBar from 'src/components/graficos/ChartApexBar.vue';
import GraficoBarra from 'src/components/graficos/GraficoBarra.vue';

</script>

<style scoped>
.borde {
    border: 1px solid #8ec7cf;
    border-radius: 5px;
    padding: 5px;
}
</style>