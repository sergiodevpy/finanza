<template>
    <div
      style="max-width: 100px"
    >
        <q-input
          :label="props.etiqueta"
          type="tel"
          outlined
          square
          dense
        />
    </div>
</template>

<script setup>
const props = defineProps({
    etiqueta: {
        type: String,
        required: true
    },

    
})

</script>

<style>

</style>