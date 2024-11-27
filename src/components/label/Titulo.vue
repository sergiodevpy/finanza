<template>
    <div class="col-12 text-weight-bolder text-primary text-h5 text-center">
        {{ props.texto }}
    </div>
</template>

<script setup>
const props = defineProps({
    texto: {
        type: String,
        required: true,
    },
});
</script>

<style></style>
