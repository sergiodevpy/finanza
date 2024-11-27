<template>
    <div class="text-center q-pa-xl" v-if="!storeMovimiento.movimientosCargado">
        <q-spinner color="primary" size="3em" />
    </div>
    <div v-if="storeMovimiento.listaMovimientos.length == 0 && storeMovimiento.movimientosCargado">
        <sinDatos mensaje="No hay movimientos" />
    </div>


    <q-list v-else v-for="movimiento in listaMovimiento" :key="movimiento.id" bordered separator>

        <movimientoItem v-model="movimiento.seleccionado"
            :check-limpiado="!storeMovimiento.mostrarCheckListaMovimientos"
            :fecha-movimiento="movimiento.fechaMovimiento" :id="movimiento.id" :iglesia="movimiento.iglesia"
            :itemSimple="props.itemSimple" :monto="movimiento.monto"
            :mostrar-check="storeMovimiento.mostrarCheckListaMovimientos" :motivo="movimiento.motivo"
            :seleccionado="movimiento.seleccionado" :tipo-movimiento="movimiento.tipoMovimiento"
            @click="clickregistro(movimiento.id)" @check="checkMovimiento" />

    </q-list>
</template>

<script setup>

import { useStoreMovimiento } from 'src/stores/storeMovimiento';
import { computed } from 'vue';
import movimientoItem from './movimientoItem.vue';
import sinDatos from '../compartido/sinDatos.vue';

const props = defineProps({
    itemSimple: {
        type: Boolean,
        required: true,
        default: false
    },
    tipoListado: {
        type: String,
        required: false,
        default: "todos"
    },
});


const storeMovimiento = useStoreMovimiento()




const clickregistro = (movimientoid) => {

    storeMovimiento.obtenerUnMovimiento(movimientoid)

}

const checkMovimiento = (valorCheck, id) => {

    storeMovimiento.controlMovimientoSeleccionado(valorCheck, id)

    // console.log('valorCheck', valorCheck);
    // console.log('id',id);


}

const listaMovimiento = computed(() => {
    if (props.tipoListado == "ultimosCinco") {
        return storeMovimiento.listaMovimientosUltimosRegistrados
    } else {
        return storeMovimiento.listaMovimientosFiltradosAutomatico
    }


});

</script>


<style></style>