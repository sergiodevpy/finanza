<template>

    <div class="row items-center">
        <LabelMoneda class="col-3 ver-borde " :etiqueta="props.etiqueta" />
        <InputCantidad  class="col-2 ver-borde "  v-model ="cantidad"/>
        <LabelMoneda class="col-7 ver-borde " :etiqueta="total" />
    </div>
    
</template>

<script setup>
import InputCantidad from 'src/components/input/InputCantidad.vue';
import LabelMoneda from 'src/components/label/LabelMoneda.vue';
import { ref, computed } from 'vue';




const cantidad = defineModel();



const total = computed(() => {
    return (cantidad.value * props.valor)
})



const props = defineProps({
    valor: {
        type: Number,
        required: true
    },
    etiqueta: {
        type: String,
        required: true
    },


})
</script>

<style>
 .ver-borde {
     border: 1px solid red
 }
</style>