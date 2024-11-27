<template>
    <div class="text-center q-pt-sm">
        <q-icon color="grey-5" name="announcement" size="100px" />
        <div class="text-grey-5">
            <!-- No hay movimientos -->
            {{ props.mensaje }}
        </div>
        <div v-if="props.agregar" class="text-grey-5 q-pt-sm">
            Agrega uno <q-btn dense icon="add" color="grey-5" @click="clickNuevoMovimiento" />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
    mensaje: {
        type: String,
        required: true
    },
    agregar: {
        type: Boolean,
        required: false,
        default: true
    },
})


const clickNuevoMovimiento = () => {
    router.push("/movimiento")
}

</script>

<style></style>