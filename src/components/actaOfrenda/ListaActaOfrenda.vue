<template>

  <div v-if="storeActaDB.listaActaFiltrado.length == 0">
    <sinDatos mensaje="No hay actas de ofrenda registrado, agregue en botón (+)" :agregar="false" />
  </div>

  <q-list v-else bordered v-for="acta in storeActaDB.listaActaFiltrado" key="acta.id">
    <ListaActaOfrendaItem :acta="acta" />
    <!-- <q-item>
      <q-item-section side>
        <q-item-label caption lines="1">
          {{ acta.fecha }}
        </q-item-label>
        <q-item-label caption lines="1">
          {{ acta.iglesia }}
        </q-item-label>

      </q-item-section>

      <q-item-section>
        <q-item-label caption>
          <div class="row">
            <div class="col">
              Billetes
            </div>
            <div class="col text-right">
              {{ acta.totalBilletes }}
            </div>
          </div>

          <div class="row">
            <div class="col">
              Monedas
            </div>
            <div class="col text-right">
              {{ acta.totalMonedas }}
            </div>
          </div>

          <div class="row">
            <div class="col">
              Total
            </div>
            <div class="col text-right text-bold">
              {{ acta.totalIngresos }}
            </div>
          </div>
        </q-item-label>
      </q-item-section>


      <q-item-section side>
        <q-item-label lines="1">
          <q-btn icon="menu" color="primary" flat dense>
            <q-menu auto-close>
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section side>
                    <q-btn label="Editar" dense size="10px" flat icon="edit" color="primary" />
                  </q-item-section>
                </q-item>
                <q-separator />

                <q-item clickable>
                  <q-item-section side>
                    <q-btn label=" Ver PDF" dense size="10px" flat icon="picture_as_pdf" color="primary" />
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section side>
                    <q-btn label="Movimiento" dense size="10px" flat icon="payments" color="primary" />
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section side>
                    <q-btn label="Borrar" dense size="10px" flat icon="delete" color="red" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-label>


      </q-item-section>


    </q-item> -->

  </q-list>
</template>

<script setup>
import { useStoreActaDB } from 'src/stores/storeActaDB';
import ListaActaOfrendaItem from './ListaActaOfrendaItem.vue';
import sinDatos from '../compartido/sinDatos.vue';
const storeActaDB = useStoreActaDB()
</script>

<style scoped>
.verborde {
  border: 1px solid red;
}
</style>