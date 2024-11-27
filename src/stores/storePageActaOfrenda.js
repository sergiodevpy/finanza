import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useTextoMoneda } from "src/components/use/useTextoMoneda";
export const usePageStoreActaOfrenda = defineStore("ingresos", () => {
  /*
    state
  */

  const fecha = ref("");
  const iglesia = ref("");
  const contadoPor = ref("");
  const supervisadoPor = ref("");
  const observaciones = ref("")

  const billetes = ref([
    // {
    //   valor: 100000,
    //   cantidad: 5,
    //   totalValor: 500000,
    // },
    // {
    //   valor: 50000,
    //   cantidad: 5,
    //   totalValor: 250000,
    // },
  ]);

  const monedas = ref([
    // {
    //   valor: 1000,
    //   cantidad: 5,
    //   totalValor: 5000,
    // },
    // {
    //   valor: 500,
    //   cantidad: 5,
    //   totalValor: 2500,
    // },
  ]);
  const actaObjDefecto = ref({
    fecha: "",
    iglesia: "",
    contadoPor: "",
    supervisadoPor: "",
    billetes: [],
    totalBilletes: "",
    monedas: [],
    totalMonedas: "",
    totalIngresos: "",
    observaciones: "",
  });
  const actaObj = ref({
    ...actaObjDefecto,
  });

  // Función auxiliar para parsear la fecha
  const parsearFecha = (fechaStr) => {
    const [dia, mes, anio] = fechaStr.split("/").map(Number);
    return new Date(anio, mes - 1, dia);
  };

  /*
    getters
  */

  const traerDato = (tipo, valor, campo) => {
    if (tipo == "BILLETE") {
      const item = billetes.value.find((item) => item.valor === valor);
      if (campo == "cantidad") {
        return item ? item.cantidad : null;
      } else {
        return item ? item.totalValor : null;
      }
    } else {
      const item = monedas.value.find((item) => item.valor === valor);
      if (campo == "cantidad") {
        return item ? item.cantidad : null;
      } else {
        return item ? item.totalValor : null;
      }
    }
  };

  // Computed: fecha como objeto Date
  const fechaDate = computed(() => parsearFecha(fecha.value));

  // Computed: día
  const dia = computed(() =>
    fechaDate.value.getDate().toString().padStart(2, "0")
  );

  // Computed: mes en letras
  const mesEnLetras = computed(() => {
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    return meses[fechaDate.value.getMonth()];
  });

  // Computed: año
  const anio = computed(() => fechaDate.value.getFullYear());

  const totalBilletes = computed(() => {
    return billetes.value.reduce((accumulator, { totalValor }) => {
      return accumulator + totalValor;
    }, 0);
  });

  const totalMonedas = computed(() => {
    return monedas.value.reduce((accumulator, { totalValor }) => {
      return accumulator + totalValor;
    }, 0);
  });

  const totalIngresos = computed(() => {
    return totalBilletes.value + totalMonedas.value;
  });

  const controlDatosCargados = computed(() => {
    const datosCargados =
      !!fecha.value &&
      !!iglesia.value &&
      !!contadoPor.value &&
      !!supervisadoPor.value;

    const billetesCargados = billetes.value.length == 6;
    const monedasCargadas = monedas.value.length == 4;

    return datosCargados && billetesCargados && monedasCargadas;
  });

  const compartirHabilitado = computed(() => {
    //Controlar que los datos esten cargados
    return controlDatosCargados.value;
  });

  const textoWhatsaap = computed(() => {
    const texto = `Ofrenda en *${iglesia.value}* \nFecha: *${
      fecha.value
    }* \nMonto: *${useTextoMoneda(totalIngresos.value, "S")}*`;
    return texto;
  });

  /*
    actions
  */

  const agregaIngreso = (ingreso, tipo) => {
    if (tipo == "BILLETE") {
      // Buscar el índice del objeto que tiene el mismo valor en el array
      let index = billetes.value.findIndex(
        (item) => item.valor === ingreso.valor
      );

      if (index !== -1) {
        // Si el objeto con el mismo valor existe, actualizar los valores
        billetes.value[index] = ingreso;
      } else {
        // Si no existe, añadir el nuevo objeto al array
        billetes.value.push(ingreso);
      }
    } else {
      // Buscar el índice del objeto que tiene el mismo valor en el array
      let index = monedas.value.findIndex(
        (item) => item.valor === ingreso.valor
      );

      if (index !== -1) {
        // Si el objeto con el mismo valor existe, actualizar los valores
        monedas.value[index] = ingreso;
      } else {
        // Si no existe, añadir el nuevo objeto al array
        monedas.value.push(ingreso);
      }
    }
  };

  const eliminarIngreso = (ingreso, tipo) => {
    if (tipo == "BILLETE") {
      // Buscar el índice del objeto que tiene el mismo valor en el array
      let index = billetes.value.findIndex(
        (item) => item.valor === ingreso.valor
      );

      if (index !== -1) {
        // Si el objeto con el mismo valor existe borrar
        billetes.value.splice(index, 1);
      } else {
        // Si no existe, añadir el nuevo objeto al array
        billetes.value.push(ingreso);
      }
    } else {
      // Buscar el índice del objeto que tiene el mismo valor en el array
      let index = monedas.value.findIndex(
        (item) => item.valor === ingreso.valor
      );

      if (index !== -1) {
        // Si el objeto con el mismo valor existe, actualizar los valores
        monedas.value.splice(index, 1);
      } else {
        // Si no existe, añadir el nuevo objeto al array
        monedas.value.push(ingreso);
      }
    }
  };

  // const montoTexto = useTextoMoneda(actaObj.value.totalIngresos,'N')  

  const actaObjComputed = computed(() => ({
    fecha: fecha.value,
    iglesia: iglesia.value,
    contadoPor: contadoPor.value,
    supervisadoPor: supervisadoPor.value,
    billetes: billetes.value,
    totalBilletes: useTextoMoneda(totalBilletes.value,'N') ,
    monedas: monedas.value,
    totalMonedas: useTextoMoneda(totalMonedas.value,'N') ,
    totalIngresos: useTextoMoneda(totalIngresos.value,'N') ,
    observaciones: observaciones.value,
  }));

  /*
    return
  */
  return {
    //states
    billetes,
    monedas,
    fecha,
    iglesia,
    contadoPor,
    supervisadoPor,
    actaObjDefecto,
    actaObj,
    observaciones,
    //getters
    fechaDate,
    dia,
    mesEnLetras,
    anio,
    totalBilletes,
    totalMonedas,
    totalIngresos,
    compartirHabilitado,
    traerDato,
    textoWhatsaap,

    //actions
    agregaIngreso,
    eliminarIngreso,
    actaObjComputed,
  };
});
