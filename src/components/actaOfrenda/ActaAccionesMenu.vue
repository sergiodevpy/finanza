<template>
    <q-btn icon="more_vert" color="primary" flat dense>
        <q-menu auto-close>
            <q-list style="min-width: 150px">
                <q-item clickable @click="editarActa">
                    <q-item-section side>
                        <q-btn label="Editar" dense size="10px" flat icon="edit" color="primary" />
                    </q-item-section>
                </q-item>
                <q-separator />

                <q-item clickable @click="verPDF">
                    <q-item-section side>
                        <q-btn label=" Ver PDF" dense size="10px" flat icon="picture_as_pdf" color="primary" />
                    </q-item-section>
                </q-item>
                <q-item clickable @click="verMovimiento">
                    <q-item-section side>
                        <q-btn label="ver Movimiento" dense size="9px" flat icon="payments" color="primary" />
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="eliminarActa">
                    <q-item-section side>
                        <q-btn label="Borrar" dense size="10px" flat icon="delete" color="red" />
                    </q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script setup>
import { useStoreActaDB } from 'src/stores/storeActaDB';
import { useStoreMovimiento } from 'src/stores/storeMovimiento';
const storeActaDB = useStoreActaDB()
const storeMovimiento = useStoreMovimiento()

const props = defineProps({
    acta: {
        type: Object,
        required: true
    }
})

const editarActa = () => {
    console.log('Editar_acta_log', props.acta.id);
    storeActaDB.editarActa(props.acta.id)
}

const eliminarActa = () => {
    console.log('Eliminar_acta_log', props.acta.id);
    storeActaDB.borrarActa(props.acta.id, props.acta.idMovimiento)

}

const verMovimiento = () => {
    console.log('VerMoviento_acta_log', props.acta.idMovimiento);
    storeMovimiento.obtenerUnMovimiento(props.acta.idMovimiento)
}
const verPDF = () => {
    console.log('verPDF_acta_log', props.acta.id);
    storeActaDB.generarPDFacta(props.acta.id)
}

</script>

<style></style>