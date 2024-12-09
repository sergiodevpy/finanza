<template>
    <q-btn style="min-width: 125px" @click="clickBoton" color="teal-10" size="15px" :text-color="props.color" no-caps
        stack :to="props.accion" outline square>
        <q-icon size="3em" :name="props.icono" />
        <div>
            {{ props.texto }}
        </div>
    </q-btn>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { useStoreMovimiento } from "src/stores/storeMovimiento";
import { useStoreActaDB } from 'src/stores/storeActaDB';
const storeMovimiento = useStoreMovimiento()
const storeActaDB = useStoreActaDB()

const router = useRouter()
const props = defineProps({
    icono: {
        type: String,
        required: true,
    },
    texto: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
        default: 'primary'
    },
    accion: {
        type: String,
        required: true,
    },
    dato: {
        type: Object,
        required: false,
    },
});


const clickBoton = () => {
    console.log('datoobj_log', props.dato);
    if (props.accion == "/movimiento") {
        if (props.dato) {
            storeMovimiento.movimientoObj.tipoMovimiento = props.dato.tipoMovimiento
            storeMovimiento.movimientoObj.fechaMovimiento = props.dato.fecha
            storeMovimiento.movimientoObj.iglesia = props.dato.iglesia
        }
    }

    if (props.accion == "/acta") {
        if (props.dato) {
            storeActaDB.actaObjPage.iglesia = props.dato.iglesia
            storeActaDB.actaObjPage.fecha = props.dato.fecha


        }
    }

    router.push(props.accion)


}

</script>

<style scoped></style>