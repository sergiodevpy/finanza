<template>
    <!-- <filtroBalance /> -->
    <!-- <q-list bordered dense> -->
    <q-item v-if="props.modoResumen">
        <!-- <q-item-label header class="text-bold">{{props.balance.mes}}</q-item-label> -->

        <q-item-section side>
            <div class="text-bold text-h6">
                Resumen
            </div>
        </q-item-section>
    </q-item>



    <q-item>
        <q-item-section side>
            <q-item-label class="text-bold">
                {{ props.balance.mes }}
            </q-item-label>
            <q-item-label v-if="!props.modoResumen">
                <div>
                    <q-btn @click="verBalance" color="primary" size="10px" dense flat no-caps icon-right="description"
                        label="ver detalle" />

                </div>
            </q-item-label>
        </q-item-section>
        <q-item-section no-wrap>

            <div class="col">

                <div class="row">
                    <div class="col text-green">
                        Ingreso
                    </div>
                    <div class="col text-right text-green">
                        {{ props.balance.ingresoTotal }} GS
                    </div>
                </div>
                <div class="row">
                    <div class="col text-red">
                        Egreso
                    </div>
                    <div class="col text-right text-red">
                        {{ props.balance.egresoTotal }} GS
                    </div>
                </div>
                <q-separator spaced />
                <div class="row">
                    <div class="col text-bold">
                        Saldo
                    </div>
                    <div class="col text-right text-bold">
                        {{ props.balance.balance }} GS
                    </div>
                </div>
            </div>


        </q-item-section>




    </q-item>
    <!-- </q-list> -->


</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStoreMovimiento } from 'src/stores/storeMovimiento';

const props = defineProps({
    balance: {
        type: Object,
        required: true
    },
    modoResumen: {
        type: Boolean,
        required: false,
        default: false
    },
})
const storeMovimiento = useStoreMovimiento()
const route = useRouter()
const verBalance = () => {
    storeMovimiento.asignarBalanceSeleccionado(props.balance)
    //console.log('balances_log',JSON.stringify(storeMovimiento.listaBalances) );

    route.push('/balancedetallado')
}


</script>

<style scoped>
.borde {
    border: 1px solid #03545f;
    /* border-radius: 5px; */
    padding: 5px;
}

.verborde {
    border: 1px solid red;
}
</style>