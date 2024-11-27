<template>
    <q-page class="q-pa-md">
        <div class="q-pb-md">
            <div class="text-primary text-h4">
                ¡Hola
                <span class="text-weight-bolder">
                    {{ storeUsuarios.usuarioDetalle.usuario }}
                </span>
                <span>
                    !
                </span>
            </div>
        </div>
        <div class="text-primary text-caption">
            Completa por favor los datos para poder usar la aplicación
        </div>
        <q-separator />

        <div class="q-pt-xl">
            <div class="text-primary text-caption">
                De qué iglesias sueles registrar movimientos?
            </div>
            <iglesiaCmp class="col" v-model="storePerfilUsuarios.iglesia" />
        </div>


        <div class="q-pt-xl flex flex-center" v-if="storePerfilUsuarios.iglesia">
            <q-btn label="Guardar" color="primary" icon="done" @click="storePerfilUsuarios.guardarPerfilUsuario"/>
        </div>





    </q-page>
</template>

<script setup>
import iglesiaCmp from 'src/components/compartido/iglesiaCmp.vue';
import { useStoreActaDB } from 'src/stores/storeActaDB';
import { useStoreUsuarios } from 'src/stores/storeUsuarios';
import { useStorePerfilUsuarios } from 'src/stores/storePerfilUsuario';
const storePerfilUsuarios = useStorePerfilUsuarios()
const storeUsuarios = useStoreUsuarios()





</script>

<style></style>