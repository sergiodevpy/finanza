<template>
    <div>

    </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
const props = defineProps({
    titulo: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
})

const $q = useQuasar()

const confirm = () => {
    $q.dialog({
        title: 'Confirm',
        message: 'Would you like to turn on the wifi?',
        cancel: true,
        persistent: true
    }).onOk(() => {
        // console.log('>>>> OK')
    }).onOk(() => {
        // console.log('>>>> second OK catcher')
    }).onCancel(() => {
        // console.log('>>>> Cancel')
    }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
    })
}

</script>

<style></style>