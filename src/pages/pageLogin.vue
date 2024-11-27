<template>
  <q-page class="flex flex-center fondo">
    <q-card class="bg-primary text-white" style="min-width: 320px">
      <q-card-section align="center">
        <q-img
          src="~assets/img/logo_transparente.png"
          spinner-color="white"
          
        />
      </q-card-section>
      <q-card-section class="text-center text-bold">
        <q-tabs v-model="tab" class="text-white" no-caps>
          <q-tab name="ingresar" label="Ingresar" icon="check_circle" />
          <q-tab name="registrarse" label="Registrarse" icon="add_circle" />
        </q-tabs>
      </q-card-section>

      <q-card-section>
        <q-form @submit="enviarFormulario">
          <q-input
            v-model="credenciales.email"
            class="q-pb-md"
            bg-color="white"
            label="Usuario"
            outlined
            square
          />
          <q-input
            v-model="credenciales.password"
            class="q-pb-md"
            bg-color="white"
            label="Contraseña"
            type="password"
            outlined
            square
          />

          <div class="flex flex-center">
            <q-btn
              icon="touch_app"
              :label="submitButtonTitle"
              color="white"
              type="submit"
              no-caps
              outline
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, reactive, computed } from "vue";

import { useStoreUsuarios } from "src/stores/storeUsuarios";

const $q = useQuasar();

const storeUsuarios = useStoreUsuarios()

const tab = ref("ingresar");

const credenciales = reactive({
  email: "",
  password: "",
});

const submitButtonTitle = computed(() => {
  return tab.value === "ingresar" ? "Ingresar" : "Registrarse";
});

const enviarFormulario = () => {
  if (!credenciales.email || !credenciales.password) {
    $q.dialog({
      title: "Error",
      message: "Debes ingresar Usuario y Contraseña",
    });
  } else {
    enviarFormularioValidado();
  }
};
const enviarFormularioValidado = () => {
  if (tab.value === "registrarse") {
    storeUsuarios.registrarUsuario(credenciales)
  } else {
    storeUsuarios.ingresar(credenciales)
  }
  
};
</script>

<style scoped>
.fondo {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(3, 84, 95, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>
