import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { ref, computed, reactive } from "vue";
import { Dialog, IconSet, Loading, Notify } from "quasar";
import { enviaWhatsaap } from "src/components/use/useEnviaWhatsaap";
import { useStoreUsuarios } from "./storeUsuarios";
import { usePageStoreActaOfrenda } from "./storePageActaOfrenda";
import { useStoreMovimiento } from "./storeMovimiento";
import { useTextoMoneda } from "src/components/use/useTextoMoneda";
import { generaActaPDF } from "src/use/useGenerarPDF";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "src/firebase/firebase";

//const movimientosColeccionRef = collection(db, 'movimientos','base','movimientosColeccion')
let actasColeccionRef = null;
let obtenerActasDB = null;
let filtro = null;

export const useStoreActaDB = defineStore("actasDB", () => {
  const ActasCargado = ref(false);

  const filtroIglesia = ref("");
  const filtroFecha = ref("");

  const actaObj = reactive({});
  const listaActas = ref([]);

  const iniciar = () => {
    ActasCargado.value = false;
    const storeUsuarios = useStoreUsuarios();
    actasColeccionRef = collection(
      db,
      "actasOfrenda",
      "base",
      "actaOfrendaColeccion"
    );
    filtro = where("idUsuario", "==", storeUsuarios.usuarioDetalle.id);

    cargarActasdesdeDB();
  };

  const cargarActasdesdeDB = () => {
    const q = query(
      actasColeccionRef,
      filtro,
      orderBy("fechaCreacion", "desc")
    );
    obtenerActasDB = onSnapshot(q, (querySnapshot) => {
      const ListaActasBD = [];
      querySnapshot.forEach((doc) => {
        //console.log('datoFB', doc);

        let actaBD = doc.data();
        actaBD.id = doc.id;
        actaBD.seleccionado = false;
        ListaActasBD.push(actaBD);
      });
      listaActas.value = ListaActasBD;
      ActasCargado.value = true;
    });
  };

  const limpiarDatos = () => {
    listaActas.value = [];
    if (obtenerActasDB) obtenerActasDB();
  };
  const router = useRouter();
  const mensajeRegistroGuardado = (titulo, mensaje, redireccion) => {
    Dialog.create({
      title: titulo,
      message: mensaje,
      cancel: false,
      persistent: true,
      ok: {
        label: "Ok",
        color: "primary",
        noCaps: true,
        // icon: "send",
      },
      // cancel: {
      //   label: "No",
      //   color: "negative",
      //   noCaps: true,
      // },
    })
      .onOk(() => {
        router.push(redireccion);
        // enviaWhatsaap(whatsappTextoMovimiento.value);
      })
      .onOk(() => {
        // console.log('>>>> second OK catcher')
      })
      .onCancel(() => {
        // router.push(redireccion);
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  };

  const guardarActaDB = async () => {
    Loading.show({
      message: "Guardando el Acta de Ofrendas favor espere...",
      spinnerColor: "primary",
      messageColor: "primary",
      boxClass: "bg-grey-2 text-primary",
    });
    const storeUsuarios = useStoreUsuarios();
    const idUsuarioConectado = storeUsuarios.usuarioDetalle.id;
    const idMovimiento = await generaRegistroMovimiento();
    console.log("id_generado_log", idMovimiento);

    const nuevaActa = Object.assign({}, actaObjPage, {
      idUsuario: idUsuarioConectado,
      fechaCreacion: serverTimestamp(),
      idMovimiento: idMovimiento,
    });

    console.log(" addDoc nuevaActa_log", nuevaActa);
    //guarda el acta
    const docref = await addDoc(actasColeccionRef, nuevaActa);
    //prepara actualización en movmiento
    const actualizacion = { idActa: docref.id };
    //asigna el acta id en el movimiento generado
    actualizaMovimiento(idMovimiento, actualizacion);

    Loading.hide();

    mensajeRegistroGuardado(
      "¡Guardado!",
      "Acta guardado y se generó el movimiento de tipo ingreso",
      "/actasofrenda"
    );
    // Object.assign(movimientoObjUltimoGuardado, movimientoObj);
    // Object.assign(movimientoObj, movimientoObjDefecto);
  };

  const guardarActa = () => {
    //si ya tiene acta id se debe atualizar
    if (actaObjPage.id) {
      actualizarActa();
    } else {
      console.log("GuardaActa_log");

      const storeActaOfrenda = usePageStoreActaOfrenda();
      actaObj.value = storeActaOfrenda.actaObjComputed;
      // Object.assign(actaObj,storeActaOfrenda.actaObjComputed)
      console.log("ActaObj_log", actaObj.value);

      guardarActaDB();
    }
  };

  const actualizaMovimiento = async (idMovimiento, actualizacion) => {
    const storeMovimiento = useStoreMovimiento();
    await storeMovimiento.actualizarMovimientoCampo(
      idMovimiento,
      actualizacion
    );
    console.log("actualizado_log", idMovimiento);
  };

  const generaRegistroMovimiento = async () => {
    const storeUsuarios = useStoreUsuarios();
    const idUsuarioConectado = storeUsuarios.usuarioDetalle.id;
    const storeMovimiento = useStoreMovimiento();

    // const montoTexto = useTextoMoneda(actaObj.value.totalIngresos,'N')

    const movObjActa = {
      idUsuario: idUsuarioConectado,
      fechaCreacion: serverTimestamp(),
      fechaMovimiento: actaObjPage.fecha,
      iglesia: actaObjPage.iglesia,
      tipoMovimiento: "ingreso",
      monto: actaObjPage.totalIngresos,
      motivo: "Ofrenda en Acta",
      detalleMovimiento:
        "Movimiento generado de forma automática al registrar un Acta de ofrendas",
      id: "",
      seleccionado: false,
    };
    console.log("genera mov movObjActa_log", movObjActa);

    const idMovimiento = await storeMovimiento.guardarMovimientoActaOfrenda(
      movObjActa
    );
    console.log("id_mov_generado_log", idMovimiento);

    return idMovimiento;
  };

  const actualizarActa = async () => {
    const storeMovimiento = useStoreMovimiento();
    Loading.show({
      message: "Actualizando el acta favor espere...",
      spinnerColor: "primary",
      messageColor: "primary",
      boxClass: "bg-grey-2 text-primary",
    });

    //eliminar movimiento
    await storeMovimiento.borrarMovimiento(actaObjPage.idMovimiento);

    //generar nuevo movimiento
    const idMovimiento = await generaRegistroMovimiento();

    actaObjPage.idMovimiento = idMovimiento;
    //actualiza acta
    await updateDoc(doc(actasColeccionRef, actaObjPage.id), actaObjPage);

    //actualiza nuevo movimiento con el acta id
    const actualizacion = { idActa: actaObjPage.id };
    //asigna el acta id en el movimiento generado
    actualizaMovimiento(idMovimiento, actualizacion);

    Object.assign(actaObjPage, actaObjPageVacio);
    Loading.hide();
    mensajeRegistroGuardado(
      "¡Actualizado!",
      "Acta actualizado correctamente",
      "/actasofrenda"
    );
    //router.push("/registros");
  };

  const listaActaFiltrado = computed(() => {
    let filtered = listaActas.value;
    //console.log(filtered);

    if (filtroIglesia.value) {
      filtered = filtered.filter(
        (item) => item.iglesia === filtroIglesia.value
      );
    }

    if (filtroFecha.value) {
      filtered = filtered.filter((item) => item.fecha === filtroFecha.value);
    }

    return filtered;
  });

  const actaObjPageVacio = reactive({
    id: "",
    idMovimiento: "",
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

  const actaObjPage = reactive({
    ...actaObjPageVacio,
  });

  const actObjPDF = reactive({
    ...actaObjPageVacio,
  });

  const menuActaOpciones = reactive({
    verActa: false,
    editarActa: false,
    verPDF: false,
    verMovimiento: false,
    borrarActa: false,
  });

  const agregaIngreso = (ingreso, tipo) => {
    if (tipo == "BILLETE") {
      // Buscar el índice del objeto que tiene el mismo valor en el array
      let index = actaObjPage.billetes.findIndex(
        (item) => item.valor === ingreso.valor
      );

      if (index !== -1) {
        // Si el objeto con el mismo valor existe, actualizar los valores
        actaObjPage.billetes[index] = ingreso;
      } else {
        // Si no existe, añadir el nuevo objeto al array
        actaObjPage.billetes.push(ingreso);
      }
    } else {
      // Buscar el índice del objeto que tiene el mismo valor en el array
      let index = actaObjPage.monedas.findIndex(
        (item) => item.valor === ingreso.valor
      );

      if (index !== -1) {
        // Si el objeto con el mismo valor existe, actualizar los valores
        actaObjPage.monedas[index] = ingreso;
      } else {
        // Si no existe, añadir el nuevo objeto al array
        actaObjPage.monedas.push(ingreso);
      }
    }
  };

  const eliminarIngreso = (ingreso, tipo) => {
    if (tipo == "BILLETE") {
      // Buscar el índice del objeto que tiene el mismo valor en el array
      let index = actaObjPage.billetes.findIndex(
        (item) => item.valor === ingreso.valor
      );

      if (index !== -1) {
        // Si el objeto con el mismo valor existe borrar
        actaObjPage.billetes.splice(index, 1);
      } else {
        // Si no existe, añadir el nuevo objeto al array
        actaObjPage.billetes.push(ingreso);
      }
    } else {
      // Buscar el índice del objeto que tiene el mismo valor en el array
      let index = actaObjPage.monedas.findIndex(
        (item) => item.valor === ingreso.valor
      );

      if (index !== -1) {
        // Si el objeto con el mismo valor existe, actualizar los valores
        actaObjPage.monedas.splice(index, 1);
      } else {
        // Si no existe, añadir el nuevo objeto al array
        actaObjPage.monedas.push(ingreso);
      }
    }
  };

  const totalBilletes = computed(() => {
    const total = actaObjPage.billetes.reduce((accumulator, { totalValor }) => {
      return accumulator + totalValor;
    }, 0);
    actaObjPage.totalBilletes = useTextoMoneda(total, "N");
    return total;
  });

  const totalMonedas = computed(() => {
    const total = actaObjPage.monedas.reduce((accumulator, { totalValor }) => {
      return accumulator + totalValor;
    }, 0);
    actaObjPage.totalMonedas = useTextoMoneda(total, "N");
    return total;
  });

  const totalIngresos = computed(() => {
    const total = totalBilletes.value + totalMonedas.value;

    actaObjPage.totalIngresos = useTextoMoneda(total, "N");
    return total;
  });

  const controlDatosCargados = computed(() => {
    const datosCargados =
      !!actaObjPage.fecha &&
      !!actaObjPage.iglesia &&
      !!actaObjPage.contadoPor &&
      !!actaObjPage.supervisadoPor;

    const billetesCargados = actaObjPage.billetes.length == 6;
    const monedasCargadas = actaObjPage.monedas.length == 4;

    return datosCargados && billetesCargados && monedasCargadas;
  });

  const guardarActaHabilitado = computed(() => {
    //Controlar que los datos esten cargados
    return controlDatosCargados.value;
  });

  const borrarActa = async (actaId, movimientoId) => {
    Loading.show({
      message: "Eliminando Acta y movimiento favor espere...",
      spinnerColor: "primary",
      messageColor: "primary",
      boxClass: "bg-grey-2 text-primary",
    });
    const storeMovimiento = useStoreMovimiento();
    console.log("actaID", actaId, "movimientoID", movimientoId);
    if (movimientoId) await storeMovimiento.borrarMovimiento(movimientoId);

    console.log("actascoleccion", actasColeccionRef);

    await deleteDoc(doc(actasColeccionRef, actaId));
    Loading.hide();
    Notify.create({
      message: "Acta borrado",
      position: "bottom",
    });
  };

  const editarActa = (idActa) => {
    const actaRevisar = listaActas.value.find((item) => item.id === idActa);
    console.log("acta_log", actaRevisar);

    Object.assign(actaObjPage, actaRevisar);
    //Object.assign(movimientoObjOriginal, actaRevisar);
    router.push("/acta");
  };

  const resetearActaSeleccionado = () => {
    Object.assign(actaObjPage, actaObjPageVacio);

    //console.log('reset de movs');
  };

  const buscaDatoPorCampo = (listado, campo, valorBuscado) => {
    if (listado == "BILLETE") {
      const ObjetoBuscado = () => (campo, valorBuscado) =>
        actaObjPage.billetes.find((item) => item[campo] === valorBuscado);
      console.log("ObjetoBuscado_log", ObjetoBuscado);
    } else {
      const ObjetoBuscado = () => (campo, valorBuscado) =>
        actaObjPage.monedas.find((item) => item[campo] === valorBuscado);
      console.log("ObjetoBuscado_log", ObjetoBuscado);
    }
  };

  const datoPorCampo = (listado, campo, valor) => {
    let objetoIngreso = null;
    if (listado == "BILLETE") {
      objetoIngreso = actaObjPage.billetes.find(
        (item) => item[campo] === valor
      );
    } else {
      objetoIngreso = actaObjPage.monedas.find((item) => item[campo] === valor);
    }
    console.log("objetoIngreso_log", objetoIngreso);

    const cantidad = objetoIngreso ? objetoIngreso.cantidad : null;
    console.log("cantidad", cantidad);

    return cantidad;
  };

  const obtenerActa = (idActa) => {
    const actaPDF = listaActas.value.find((item) => item.id === idActa);
    Object.assign(actObjPDF, actaPDF);
    return actObjPDF;
  };

  const traerDato = (tipo, valor, campo) => {
    if (tipo == "BILLETE") {
      const item = actObjPDF.billetes.find((item) => item.valor === valor);
      if (campo == "cantidad") {
        return item ? item.cantidad : null;
      } else {
        return item ? item.totalValor : null;
      }
    } else {
      const item = actObjPDF.monedas.find((item) => item.valor === valor);
      if (campo == "cantidad") {
        return item ? item.cantidad : null;
      } else {
        return item ? item.totalValor : null;
      }
    }
  };

  const generarPDFacta = (actaID) => {
    generaActaPDF(actaID);
  };

  return {
    //estados
    filtroIglesia,
    filtroFecha,
    listaActas,
    ActasCargado,
    menuActaOpciones,
    actaObjPage,

    //acciones
    iniciar,
    limpiarDatos,
    guardarActa,
    listaActaFiltrado,
    editarActa,
    agregaIngreso,
    eliminarIngreso,
    totalBilletes,
    totalMonedas,
    totalIngresos,
    guardarActaHabilitado,
    borrarActa,
    resetearActaSeleccionado,
    buscaDatoPorCampo,
    datoPorCampo,
    obtenerActa,
    traerDato,
    generarPDFacta,
  };
});
