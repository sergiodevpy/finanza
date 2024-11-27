<template>
    <q-item v-ripple="props.itemSimple" :clickable="props.itemSimple" @click="clickMovimiento(props.id)">
        <q-item-section side top v-if="props.mostrarCheck && !props.itemSimple">
            <q-checkbox v-model="model" size="xs"/>
        </q-item-section>

        <q-item-section>
            <q-item-label
                :class="props.tipoMovimiento == 'egreso' ? 'text-bold text-negative' : 'text-bold text-primary'">
                <!-- <q-icon v-if="props.tipoMovimiento == 'egreso'" name="south" color="red"  />
                <q-icon v-else name="north" color="green"  /> -->
                {{ props.monto }}
                <q-icon v-if="props.tipoMovimiento == 'egreso'" name="arrow_forward" color="red" />
                <q-icon v-else name="arrow_back" color="green" />
            </q-item-label>
            <q-item-label caption lines="2">

                {{ props.motivo }}
                <!-- <q-icon v-if="props.tipoMovimiento == 'egreso'" name="remove" color="red"  />
                <q-icon v-else name="add" color="green"  /> -->

            </q-item-label>
        </q-item-section>

        <q-item-section side top>
            <q-item-label class="text-bold">{{ props.fechaMovimiento }}</q-item-label>
            <q-item-label caption lines="2">{{ props.iglesia }}</q-item-label>
        </q-item-section>
        <q-item-section top side>
            <div v-if="!props.itemSimple" class="text-primary">
                <!-- <q-btn size="12px" flat dense round icon="delete" /> -->
                <q-btn size="12px" flat dense round icon="navigate_next" @click="clickMovimiento(props.id)" />
            </div>
        </q-item-section>

    </q-item>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
    modelValue: {
    type: Boolean,
    required: true
    },
    checkLimpiado: {
        type: Boolean,
        required: true,
        default: false
    },
    mostrarCheck: {
        type: Boolean,
        required: true,
        default: false
    },
    itemSimple: {
        type: Boolean,
        required: true,
        default: false
    },
    seleccionado: {
        type: Boolean,
        required: true,
        default: false
    },
    id: {
        type: String,
        required: true,
    },
    fechaMovimiento: {
        type: String,
        required: true,
    },
    iglesia: {
        type: String,
        required: true,
    },
    monto: {
        type: String,
        required: true,
    },
    motivo: {
        type: String,
        required: true,
    },
    tipoMovimiento: {
        type: String,
        required: true,
    },
    detalleMovimiento: {
        type: String,
        required: false,
    },

});
// Definir los emits
const emit = defineEmits(['click', 'check','update:modelValue'])

// Función para emitir evento
const clickMovimiento = () => {
    emit('click')
}
const checkMovimiento = () => {
    console.log('valor check,1',props.modelValue, 'valor model',model.value);
    
    emit('check', props.modelValue, props.id)
}

const check1 = ref(false)

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})


</script>

<style></style>