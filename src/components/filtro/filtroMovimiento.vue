<template>
  <div class="q-pb-md row justify-between">
    <q-checkbox v-if="storeMovimiento.mostrarCheckListaMovimientos" v-model="check" size="xs" label="Todos"
      @update:model-value="checkTodos" />
    <q-btn @click="storeMovimiento.mostrarOcultarCheckEnMovimiento" color="primary" icon="checklist" outline round />

    <q-input v-model="storeMovimiento.filtroTextoMovimiento"
      :class="storeMovimiento.mostrarCheckListaMovimientos ? 'col-7' : 'col-10'" label="Buscar" clearable dense outlined
      square>
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>


  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStoreMovimiento } from 'src/stores/storeMovimiento';
const storeMovimiento = useStoreMovimiento()

const check = ref(false)


const checkTodos = () => {
  if (check.value) {
    storeMovimiento.seleccionarTodosLosMovimientos()

  } else {


    storeMovimiento.borrarSeleccionMovimientos()
  }
}


</script>

<style></style>