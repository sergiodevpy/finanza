<template>
    <q-card
      bordered
      square
      class=""
    >
        <div class="row justify-center q-gutter-md">
            <q-radio v-model="model" @update:model-value="updateModel" size="xl" val="ingreso" label="INGRESO"
                color="primary" />
            <q-radio v-model="model" @update:model-value="updateModel" size="xl" val="egreso" label="EGRESO"
                color="red" />

        </div>


    </q-card>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])
const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const updateModel = (value) => {
    emit('update:modelValue', value)
}
</script>

<style scoped>
.verborde {
    border: 1px solid red;
}
</style>