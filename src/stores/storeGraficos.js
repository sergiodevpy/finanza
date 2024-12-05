import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useStoreMovimiento } from "./storeMovimiento";

export const useStoreGraficos = defineStore("graficos", () => {
  const graficoAnioFiltro = ref("");
  const graficoIglesiaFiltro = ref("");

  const graficoIngreso = reactive({
    iglesia: "",
    anio: "",
    meses: [],
    ingresos: [],
  });

  const listaGraficoIngreso = reactive([]);

  const storeMovimiento = useStoreMovimiento();
  // const asignaValores = computed(() => {
  //   storeMovimiento.balanceAnioFiltro = graficoAnioFiltro.value;
  //   storeMovimiento.balanceIglesiaFiltro = graficoIglesiaFiltro.value;
  //   console.log(
  //     "storeMovimiento.listaBalanceIglesiaAnioMes_log",
  //     JSON.stringify(storeMovimiento.listaBalanceIglesiaAnioMes)
  //   );
  // });

  const resumenFinanciero = computed(() => {
    // Arreglo de meses para completar
    const mesesOrden = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    return storeMovimiento.listaBalanceIglesiaAnioMes.map((iglesia) => {
      // Obtener el año (asumiendo que todos son del mismo año)
      const anio = iglesia.anios[0].anio;

      // Preparar un objeto con ingresos para cada mes, inicialmente en 0
      const ingresosPorMes = mesesOrden.map(() => 0);
      const egresosPorMes = mesesOrden.map(() => 0);

      // Llenar los ingresos de los meses con datos reales
      iglesia.anios[0].meses.forEach((mesData) => {
        const indexMes = mesesOrden.findIndex(
          (mes) => mes.toUpperCase() === mesData.mes.toUpperCase()
        );

        if (indexMes !== -1) {
          // Convertir el string de ingresos a número
          ingresosPorMes[indexMes] = parseFloat(
            mesData.ingresoTotal.replace(/\./g, "")
          );
          egresosPorMes[indexMes] = parseFloat(
            mesData.egresoTotal.replace(/\./g, "")
          );
        }
      });

      return {
        iglesia: iglesia.iglesia,
        anio: anio,
        meses: mesesOrden.map((mes) => mes.slice(0, 3).toUpperCase()),
        ingresos: ingresosPorMes,
        egresos: egresosPorMes,
      };
    });
  });

  return {
    graficoAnioFiltro,
    graficoIglesiaFiltro,
    // asignaValores,
    graficoIngreso,
    listaGraficoIngreso,
    resumenFinanciero,
  };
});
