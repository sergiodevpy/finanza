<template>
    <div class="row items-center">
        <div class="col-3 text-weight-medium text-primary text-h6 text-right q-pr-sm">
            {{ useTextoMoneda(props.valor, "N") }}
        </div>
        <div class="col-2">
            <q-input v-model.number="cantidad" type="tel" dense outlined square @update:model-value="actualizaIngreso"
                style="max-width: 100px" />
        </div>
        <div class="col-7 text-weight-medium text-primary text-h6 text-right q-pr-md">
            {{ useTextoMoneda(totalValor, "S") }}
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTextoMoneda } from "src/components/use/useTextoMoneda";
import { usePageStoreActaOfrenda } from "src/stores/storePageActaOfrenda.js";
import { useStoreActaDB } from "src/stores/storeActaDB";

const storeActaDB = useStoreActaDB()

const storeIngresos = usePageStoreActaOfrenda()

const props = defineProps({
    valor: {
        type: Number,
        required: true,
    }
});

const cantidad = ref();

onMounted(() => {
    //si es una visualización del acta se obtiene los datos del objeto acta
    if (storeActaDB.actaObjPage.id) {
        if (props.valor >= 2000) {
            cantidad.value = storeActaDB.datoPorCampo('BILLETE', 'valor', props.valor)
        } else {
            cantidad.value = storeActaDB.datoPorCampo('MONEDA', 'valor', props.valor)
        }
    }
})

const totalValor = computed(() => {

    if (typeof cantidad.value === 'number' && !isNaN(cantidad.value) && cantidad.value >= 0) {
        return cantidad.value * props.valor;
    } else {
        return 0
    }
});


const actualizaIngreso = () => {
    const ingreso = {
        valor: props.valor,
        cantidad: cantidad.value,
        totalValor: totalValor.value
    }

    if (typeof cantidad.value === 'number' && !isNaN(cantidad.value) && cantidad.value >= 0) {

        if (props.valor >= 2000) {
            storeActaDB.agregaIngreso(ingreso, "BILLETE")
        } else {
            storeActaDB.agregaIngreso(ingreso, "MONEDA")
        }
    } else {
        cantidad.value = ""
        //eliminar del store si es que ya existía
        if (props.valor >= 2000) {
            storeActaDB.eliminarIngreso(ingreso, "BILLETE")
        } else {
            storeActaDB.eliminarIngreso(ingreso, "MONEDA")
        }

    }



}






</script>

<style scoped>
.ver-borde {
    border: 1px solid red;
}
</style>
