<template>
  <div>
    <q-input square outlined v-model="nombre" :label="props.texto " />
  </div>
</template>

<script setup>
import { ref } from 'vue';


const nombre = ref("")

const props = defineProps({
    texto: {
        type: String,
        required: true,
    },
});



</script>

<style>

</style>


