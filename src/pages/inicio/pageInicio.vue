<template>
  <q-page class="q-pa-md q-mx-auto" style="max-width: 800px;">

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


    <q-card flat class="borde">
      <q-card-section>
        <div class="text-weight-bolder text-primary text-h5 ">
          Accesos rápidos
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md flex flex-center">
          <botonAcceso icono="paid" texto="Egreso" color="red" accion="/movimiento" :dato="preCarga('egreso')" />
          <botonAcceso icono="paid" texto="Ingreso" color="green" accion="/movimiento" :dato="preCarga('ingreso')" />
          <botonAcceso icono="note_add" texto="Acta ofrenda" accion="/acta" :dato="preCarga('acta')" />
          <botonAcceso icono="currency_exchange" texto="Movimiento" accion="/movimiento"
            :dato="preCarga('movimiento')" />
          <!-- <botonAcceso icono="menu_open" texto="Registros" accion="/registros" /> -->
        </div>

      </q-card-section>
    </q-card>

    <listaUltimosMovimientos />



  </q-page>
</template>

<script setup>
import botonAcceso from 'src/components/accesos/botonAcceso.vue';
import listaUltimosMovimientos from 'src/components/movimientos/listaUltimosMovimientos.vue';
import { useStoreUsuarios } from 'src/stores/storeUsuarios';
import { obtenerFechaHoy } from 'src/use/useFechaDeHoy';
import { useStorePerfilUsuarios } from 'src/stores/storePerfilUsuario';
const storeUsuarios = useStoreUsuarios()
const storePerfilUsuarios = useStorePerfilUsuarios()
const preCarga = (tipo) => {
  const fechaHoy = obtenerFechaHoy()
  const iglesiaPerfil = storePerfilUsuarios.perfil.iglesia
  console.log('fechaHoy_log', fechaHoy);

  if (tipo == "ingreso") {
    console.log();

    return {
      tipoMovimiento: 'ingreso',
      fecha: fechaHoy,
      iglesia: iglesiaPerfil
    }

  }

  if (tipo == "egreso") {
    return {
      tipoMovimiento: 'egreso',
      fecha: fechaHoy,
      iglesia: iglesiaPerfil
    }
  }

  if (tipo == "movimiento") {
    return {
      tipoMovimiento: '',
      fecha: fechaHoy,
      iglesia: iglesiaPerfil
    }
  }

  if (tipo == "acta") {
    return {
      tipoMovimiento: '',
      fecha: fechaHoy,
      iglesia: iglesiaPerfil
    }
  }


}

</script>

<style scoped>
.borde {
  border: 1px solid #8ec7cf;
  border-radius: 5px;
  padding: 5px;
}
</style>
