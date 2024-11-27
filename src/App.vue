<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useStoreUsuarios } from './stores/storeUsuarios';
defineOptions({
  name: 'App'
});

const storeUsuarios = useStoreUsuarios()

onMounted(() => {
  storeUsuarios.init()
})


</script>
