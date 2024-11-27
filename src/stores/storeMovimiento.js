import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { ref, computed, reactive } from "vue";
import { Dialog, IconSet, Loading, Notify } from "quasar";
import { enviaWhatsaap } from "src/components/use/useEnviaWhatsaap";
import { useStoreUsuarios } from "./storeUsuarios";
import { useStoreMultimedia } from "./storeMultimedia";
import { useImageStore } from "./imageStore";
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
let movimientosColeccionRef = null;
let obtenerMovimientosBDss = null;
let filtro = null;

export const useStoreMovimiento = defineStore("movimiento", () => {
  //estados
  const mostrarCheckListaMovimientos = ref(false);
  const fechaMovimiento = ref("");
  const iglesia = ref("");
  const tipoMovimiento = ref("");

  const movimientosCargado = ref(false);

  const movimientoObjDefecto = {
    idUsuario: "",
    fechaMovimiento: "",
    iglesia: "",
    tipoMovimiento: "",
    monto: "",
    motivo: "",
    detalleMovimiento: "",
    idUsuario: "",
    id: "",
    seleccionado: false,
    idActa: "",
    imagenURL: "",
    imagenNombre: "",
    //docOimg: null,
  };

  const movimientoObj = reactive({
    ...movimientoObjDefecto,
  });

  const movimientoObjOriginal = reactive({
    ...movimientoObjDefecto,
  });
  const movimientoObjUltimoGuardado = reactive({
    ...movimientoObjDefecto,
  });

  const listaMovimientos = ref([]);
  const listaMovimientosFiltrados = ref([]);
  const listaMovimientosSelecionados = ref([]);

  const balanceSeleccionado = ref({});
  const balanceSeleccionadoAnio = ref("");
  const balanceSeleccionadoMes = ref("");
  const balanceSeleccionadoIglesia = ref("");
  const asignarBalanceSeleccionado = (balance) => {
    //console.log(balance);
    balanceSeleccionadoAnio.value = balance.anio;
    balanceSeleccionadoMes.value = balance.mes;
    balanceSeleccionadoIglesia.value = balance.iglesia;
    balanceSeleccionado.value = balance;
  };

  //const listaBalancePorIglesiaAnioMes = useAgrupadorIglesia(listaBalances.value)

  //acciones

  const iniciar = () => {
    movimientosCargado.value = false;
    const storeUsuarios = useStoreUsuarios();
    movimientosColeccionRef = collection(
      db,
      "movimientos",
      "base",
      "movimientosColeccion"
    );
    filtro = where("idUsuario", "==", storeUsuarios.usuarioDetalle.id);

    cargarMovimientosDesdeBD();
  };

  const cargarMovimientosDesdeBD = () => {
    const q = query(
      movimientosColeccionRef,
      filtro,
      orderBy("fechaCreacion", "desc")
    );
    obtenerMovimientosBDss = onSnapshot(q, (querySnapshot) => {
      const ListaMovimientoBD = [];
      querySnapshot.forEach((doc) => {
        //console.log('datoFB', doc);

        let movimientoBD = doc.data();
        movimientoBD.id = doc.id;
        movimientoBD.seleccionado = false;
        ListaMovimientoBD.push(movimientoBD);
      });
      listaMovimientos.value = ListaMovimientoBD;
      movimientosCargado.value = true;
    });
  };

  const limpiarDatos = () => {
    listaMovimientos.value = [];
    if (obtenerMovimientosBDss) obtenerMovimientosBDss();
  };

  //utilidades
  const mostrarMensaje = (titulo, mensaje) => {
    Dialog.create({
      title: titulo,
      message: mensaje,
    });
  };
  const router = useRouter();
  const mostrarMensajeConAccion = (titulo, mensaje, accion) => {
    Dialog.create({
      title: titulo,
      message: mensaje,
      cancel: true,
      persistent: true,
      ok: {
        label: "Cargar otro",
        color: "primary",
        noCaps: true,
      },
      cancel: {
        label: "No",
        color: "negative",
        noCaps: true,
      },
    })
      .onOk(() => {
        // console.log('>>>> OK')
      })
      .onOk(() => {
        // console.log('>>>> second OK catcher')
      })
      .onCancel(() => {
        router.push(accion);
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  };

  const mensajeMovimientoGuardado = (titulo, mensaje, redireccion) => {
    Dialog.create({
      title: titulo,
      message: mensaje,
      cancel: true,
      persistent: true,
      ok: {
        label: "Whatsapp",
        color: "primary",
        noCaps: true,
        icon: "send",
      },
      cancel: {
        label: "No",
        color: "negative",
        noCaps: true,
      },
    })
      .onOk(() => {
        enviaWhatsaap(whatsappTextoMovimiento.value);
      })
      .onOk(() => {
        // console.log('>>>> second OK catcher')
      })
      .onCancel(() => {
        router.push(redireccion);
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  };

  const imagenAguardarVacio = reactive({
    nombre: "",
    imagen: null,
  });

  const imagenAguardar = reactive({
    ...imagenAguardarVacio,
  });

  const guardarMovimiento = async () => {
    const storeUsuarios = useStoreUsuarios();
    const storeMultimedia = useStoreMultimedia();
    const idUsuarioConectado = storeUsuarios.usuarioDetalle.id;

    //listaMovimientos.value.push(nuevoMovimiento);

    // Add a new document in collection "cities"
    //await setDoc(doc(db, 'movimientos', nuevoMovimiento.idUsuario), nuevoMovimiento);

    // Add a new document with a generated id.
    Loading.show({
      message: "Guardando el movimiento favor espere...",
      spinnerColor: "primary",
      messageColor: "primary",
      boxClass: "bg-grey-2 text-primary",
    });

    if (imagenAguardar.nombre) {
      //al guardar inicia la subida de la img a la base de datos (storage)
      storeMultimedia.subirImagen(imagenAguardar.imagen, imagenAguardar.nombre);
      console.log("url_log", movimientoObj.imagenURL);
    }

    //armamos el nuevo mov con los datos finales (tomando tb la url img que asigna el proceso anterior)
    const nuevoMovimiento = Object.assign({}, movimientoObj, {
      idUsuario: idUsuarioConectado,
      fechaCreacion: serverTimestamp(),
    });
    console.log("url_log", nuevoMovimiento);
    await addDoc(movimientosColeccionRef, nuevoMovimiento);

    Loading.hide();
    //mostrarMensaje("¡Guardado!", "se guardó correctamente el movimiento");
    // mostrarMensajeConAccion(
    //   "¡Guardado!",
    //   "Cargar otro movimiento?",
    //   "/registros"
    // );

    mensajeMovimientoGuardado(
      "¡Guardado!",
      "Movimiento registrado, quiere informar por whatsaap?",
      "/registros"
    );
    Object.assign(movimientoObjUltimoGuardado, movimientoObj);
    Object.assign(movimientoObj, movimientoObjDefecto);
    Object.assign(imagenAguardar, imagenAguardarVacio);
  };

  const guardarMovimientoActaOfrenda = async (movimientoObjActa) => {
    console.log("generandoMov_log", movimientoObjActa);
    Loading.show({
      message: "Generando movimiento de ingreso del acta...",
      spinnerColor: "primary",
      messageColor: "primary",
      boxClass: "bg-grey-2 text-primary",
    });
    const docref = await addDoc(movimientosColeccionRef, movimientoObjActa);
    Loading.hide();
    return docref.id;
    // return "aasdasdasd"
  };

  const borrarMovimiento = async (movimientoId) => {
    await deleteDoc(doc(movimientosColeccionRef, movimientoId));

    Notify.create({
      message: "Movimiento borrado",
      position: "top",
    });
  };

  const borrarMovimientosSeleccionados = async () => {
    const imageStore = useImageStore();
    Loading.show({
      message: "Eliminando movimientos favor espere...",
      spinnerColor: "primary",
      messageColor: "primary",
      boxClass: "bg-grey-2 text-primary",
    });
    for (const movimiento of listaMovimientos.value) {
      if (movimiento.seleccionado && movimiento.idActa == "") {
        //si tiene imagen lo borra
        if (movimiento.imagenNombre) {
          imageStore.deleteImage(movimiento.imagenNombre);
        }
        await borrarMovimiento(movimiento.id);
      }
    }
    Loading.hide();
  };

  const resetearDatosMovimientoSeleccionado = () => {
    Object.assign(movimientoObj, movimientoObjDefecto);
    Object.assign(movimientoObjOriginal, movimientoObjDefecto);

    //console.log('reset de movs');
  };

  const actualizarMovimiento = async (
    movimientoId,
    movimientoActualizado,
    mostrarDialogo = true
  ) => {
    const storeMultimedia = useStoreMultimedia();
    console.log("mostrarDialogo_log", mostrarDialogo);

    if (mostrarDialogo == true) {
      Loading.show({
        message: "Actualizando el movimiento favor espere...",
        spinnerColor: "primary",
        messageColor: "primary",
        boxClass: "bg-grey-2 text-primary",
      });
    }

    if (imagenAguardar.nombre) {
      //al guardar inicia la subida de la img a la base de datos (storage)
      storeMultimedia.subirImagen(imagenAguardar.imagen, imagenAguardar.nombre);
      console.log("url_log", movimientoObj.imagenURL);
    }

    console.log(
      "movimientoId_log",
      movimientoId,
      "movimientoActualizado_log",
      movimientoActualizado
    );

    await updateDoc(
      doc(movimientosColeccionRef, movimientoId),
      movimientoActualizado
    );

    if (mostrarDialogo == true) Loading.hide();
    if (mostrarDialogo == true) {
      Object.assign(movimientoObj, movimientoObjDefecto);
      Object.assign(movimientoObjOriginal, movimientoObjDefecto);
      mensajeMovimientoGuardado(
        "¡Actualizado!",
        "Movimiento actualizado, quiere informar por whatsaap?",
        "/registros"
      );
    }
    //router.push("/registros");
  };

  const actualizarMovimientoCampo = async (movimientoId, actualizacion) => {
    Loading.show({
      message: "Actualizando el movimiento favor espere...",
      spinnerColor: "primary",
      messageColor: "primary",
      boxClass: "bg-grey-2 text-primary",
    });
    await updateDoc(doc(movimientosColeccionRef, movimientoId), actualizacion);
    Object.assign(movimientoObj, movimientoObjDefecto);
    Object.assign(movimientoObjOriginal, movimientoObjDefecto);
    Loading.hide();
  };

  const obtenerUnMovimiento = (movimientoID) => {
    const movimientoArevisar = listaMovimientos.value.find(
      (item) => item.id === movimientoID
    );
    Object.assign(movimientoObj, movimientoArevisar);
    Object.assign(movimientoObjOriginal, movimientoArevisar);
    router.push("/movimiento");
  };

  const huboActualizacion = computed(() => {
    return Object.keys(movimientoObj).some(
      (key) => movimientoObj[key] !== movimientoObjOriginal[key]
    );
  });

  //control
  const listoParaGuardar = computed(() => {
    //registro nuevo se controla que estén cargados
    const datosCargados =
      !!movimientoObj.fechaMovimiento &&
      !!movimientoObj.iglesia &&
      !!movimientoObj.tipoMovimiento &&
      !!movimientoObj.monto &&
      !!movimientoObj.motivo;

    //si tiene un Acta ID no se puede modificar
    if (movimientoObj.idActa) {
      return false;
    }

    //si tiene id es un objeto a actualizar
    if (movimientoObj.id) {
      //retorna true si los objetos son diferente al orignal
      return huboActualizacion.value && datosCargados;
    } else {
      return datosCargados;
    }
  });

  const controlMovimientoSeleccionado = (seleccionado, id) => {
    // Buscar el índice del objeto que tiene el mismo valor en el array
    let index = listaMovimientosSelecionados.value.findIndex(
      (item) => item.id === id
    );

    if (index !== -1) {
      // Si el objeto con el mismo valor existe borrar
      if (seleccionado === false)
        listaMovimientosSelecionados.value.splice(index, 1);
    } else {
      if (seleccionado === true) {
        const movimientoSeleccionado = listaMovimientos.value.find(
          (item) => item.id === id
        );
        // Si no existe, añadir el nuevo objeto al array
        listaMovimientosSelecionados.value.push(movimientoSeleccionado);
      }
    }
  };

  const movimientoSeleccionado = computed(() => {
    const CantidadMovimientosSeleccionados = listaMovimientos.value.filter(
      (item) => item.seleccionado
    ).length;
    return CantidadMovimientosSeleccionados > 0 ? true : false;
  });

  const borrarSeleccionMovimientos = () => {
    listaMovimientos.value.forEach((item) => {
      item.seleccionado = false;
    });
  };

  const seleccionarTodosLosMovimientos = () => {
    listaMovimientos.value.forEach((item) => {
      item.seleccionado = true;
    });
  };

  const actualizaDetalleMovimiento = (detalle) => {
    movimientoObj.detalleMovimiento.value = detalle;
  };

  const asignarFechaMovimiento = (fecha) => {
    fechaMovimiento.value = fecha;
  };

  const asignarIglesia = (iglesia) => {
    iglesia.value = iglesia;
  };

  const asignartipoMovimiento = (tipoMovimiento) => {
    tipoMovimiento.value = tipoMovimiento;
  };

  const mostrarOcultarCheckEnMovimiento = () => {
    mostrarCheckListaMovimientos.value = !mostrarCheckListaMovimientos.value;
    if (!mostrarCheckListaMovimientos.value) {
      borrarSeleccionMovimientos();
    }
  };

  const filtroTextoMovimiento = ref("");
  const listaMovimientosFiltradosAutomatico = computed(() => {
    if (!filtroTextoMovimiento.value) return listaMovimientos.value;

    const searchTerms = filtroTextoMovimiento.value.toLowerCase().split(" ");

    return listaMovimientos.value.filter((item) => {
      const itemValues = Object.values(item).join(" ").toLowerCase();
      return searchTerms.every((term) => itemValues.includes(term));
    });
  });

  const listaMovimientosUltimosRegistrados = computed(() => {
    return listaMovimientos.value.slice(0,5)
  })

  // Array de nombres de meses en español
  const nombresMeses = [
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

  // Función para formatear números con separadores de miles
  const formatearNumero = (numero) => {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const balanceAnioFiltro = ref("");
  const balanceMesFiltro = ref("");
  const balanceIglesiaFiltro = ref("");

  const listaBalancesFiltrado = computed(() => {
    let filtered = listaBalances.value;
    //console.log(filtered);

    if (balanceAnioFiltro.value) {
      filtered = filtered.filter(
        (item) => item.anio === balanceAnioFiltro.value
      );
    }

    if (balanceMesFiltro.value) {
      filtered = filtered.filter((item) => item.mes === balanceMesFiltro.value);
    }

    if (balanceIglesiaFiltro.value) {
      filtered = filtered.filter(
        (item) => item.iglesia === balanceIglesiaFiltro.value
      );
    }

    return filtered;
  });

  const listaMovimientoDeBalance = computed(() => {
    let filtered = listaMovimientos.value;
    //console.log(filtered);

    if (balanceSeleccionadoAnio.value) {
      filtered = filtered.filter((item) => {
        const [dia, mes, anio] = item.fechaMovimiento.split("/");

        return anio === balanceSeleccionadoAnio.value;
      });
    }

    if (balanceSeleccionadoMes.value) {
      filtered = filtered.filter((item) => {
        const [dia, mesIndex, anio] = item.fechaMovimiento.split("/");
        const mes = nombresMeses[mesIndex - 1];

        return mes === balanceSeleccionadoMes.value;
      });
    }

    if (balanceSeleccionadoIglesia.value) {
      filtered = filtered.filter(
        (item) => item.iglesia === balanceSeleccionadoIglesia.value
      );
    }

    return filtered;
  });

  const listaMovimientoDeBalanceIngresos = computed(() => {
    let filtered = listaMovimientos.value;
    //console.log(filtered);

    if (balanceSeleccionadoAnio.value) {
      filtered = filtered.filter((item) => {
        const [dia, mes, anio] = item.fechaMovimiento.split("/");

        return anio === balanceSeleccionadoAnio.value;
      });
    }

    if (balanceSeleccionadoMes.value) {
      filtered = filtered.filter((item) => {
        const [dia, mesIndex, anio] = item.fechaMovimiento.split("/");
        const mes = nombresMeses[mesIndex - 1];

        return mes === balanceSeleccionadoMes.value;
      });
    }

    if (balanceSeleccionadoIglesia.value) {
      filtered = filtered.filter(
        (item) => item.iglesia === balanceSeleccionadoIglesia.value
      );
    }

    filtered = filtered.filter((item) => item.tipoMovimiento === "ingreso");

    return filtered;
  });

  const listaMovimientoDeBalanceEgresos = computed(() => {
    let filtered = listaMovimientos.value;
    //console.log(filtered);

    if (balanceSeleccionadoAnio.value) {
      filtered = filtered.filter((item) => {
        const [dia, mes, anio] = item.fechaMovimiento.split("/");

        return anio === balanceSeleccionadoAnio.value;
      });
    }

    if (balanceSeleccionadoMes.value) {
      filtered = filtered.filter((item) => {
        const [dia, mesIndex, anio] = item.fechaMovimiento.split("/");
        const mes = nombresMeses[mesIndex - 1];

        return mes === balanceSeleccionadoMes.value;
      });
    }

    if (balanceSeleccionadoIglesia.value) {
      filtered = filtered.filter(
        (item) => item.iglesia === balanceSeleccionadoIglesia.value
      );
    }

    filtered = filtered.filter((item) => item.tipoMovimiento === "egreso");

    return filtered;
  });

  // Función para calcular totales agrupados
  const listaBalances = computed(() => {
    // Primero agrupamos los movimientos
    const grupos = {};

    listaMovimientos.value.forEach((movimiento) => {
      let [dia, mes, anio] = movimiento.fechaMovimiento.split("/");
      const fecha = new Date(anio, mes - 1, dia);
      anio = fecha.getFullYear();
      const mesIndex = fecha.getMonth();
      mes = nombresMeses[mesIndex];
      const iglesia = movimiento.iglesia;

      //const monto = parseInt(movimiento.monto) || 0;
      const monto = Number(movimiento.monto.replaceAll(".", "")) || 0;

      //console.log('log_movimiento.monto',movimiento.monto,'log_monto',monto);

      const key = `${anio}-${mesIndex}-${iglesia}`;

      if (!grupos[key]) {
        grupos[key] = {
          anio: anio.toString(),
          mes,
          iglesia: iglesia,
          ingresoTotal: 0,
          egresoTotal: 0,
          balance: 0,
        };
      }

      if (movimiento.tipoMovimiento.toLowerCase() === "ingreso") {
        grupos[key].ingresoTotal += monto;
      } else if (movimiento.tipoMovimiento.toLowerCase() === "egreso") {
        grupos[key].egresoTotal += monto;
      }

      grupos[key].balance = grupos[key].ingresoTotal - grupos[key].egresoTotal;
    });

    // Convertimos el objeto grupos en un array y formateamos los números
    return Object.values(grupos).map((grupo) => ({
      ...grupo,
      ingresoTotal: formatearNumero(grupo.ingresoTotal),
      egresoTotal: formatearNumero(grupo.egresoTotal),
      balance: formatearNumero(grupo.balance),
    }));
  });

  const listaBalanceIglesiaAnioMes = computed(() => {
    const churchGroups = listaBalancesFiltrado.value.reduce((acc, item) => {
      if (!acc[item.iglesia]) {
        acc[item.iglesia] = [];
      }
      acc[item.iglesia].push(item);
      return acc;
    }, {});

    return Object.entries(churchGroups).map(([iglesia, items]) => {
      const yearGroups = items.reduce((acc, item) => {
        if (!acc[item.anio]) {
          acc[item.anio] = {
            anio: item.anio,
            meses: [],
            ingresoTotalAnio: 0,
            egresoTotalAnio: 0,
            saldoTotalAnio: 0,
          };
        }
        acc[item.anio].meses.push(item);
        acc[item.anio].ingresoTotalAnio += parseInt(
          item.ingresoTotal.replace(/\./g, "")
        );
        acc[item.anio].egresoTotalAnio += parseInt(
          item.egresoTotal.replace(/\./g, "")
        );
        acc[item.anio].saldoTotalAnio =
          acc[item.anio].ingresoTotalAnio - acc[item.anio].egresoTotalAnio;
        return acc;
      }, {});

      return {
        iglesia,
        anios: Object.values(yearGroups).map((year) => ({
          ...year,
          ingresoTotalAnio: year.ingresoTotalAnio.toLocaleString("es-PY"),
          egresoTotalAnio: year.egresoTotalAnio.toLocaleString("es-PY"),
          saldoTotalAnio: year.saldoTotalAnio.toLocaleString("es-PY"),
        })),
      };
    });
  });

  const whatsappTextoMovimiento = computed(() => {
    if (movimientoObj.id) {
      Object.assign(movimientoObjUltimoGuardado, movimientoObj);
    }

    if (movimientoObj.idActa) {
      Object.assign(movimientoObjUltimoGuardado, movimientoObjOriginal);
    }
    const urlFoto = ref("");
    if (movimientoObj.imagenNombre) {
      const imageStore = useImageStore();
      urlFoto.value = imageStore.imageUrl;
    }
    const texto = `Iglesia: *${movimientoObjUltimoGuardado.iglesia}* \nFecha: *${movimientoObjUltimoGuardado.fechaMovimiento}* \nTipo: *${movimientoObjUltimoGuardado.tipoMovimiento}* \nMonto: *${movimientoObjUltimoGuardado.monto} GS.*\nMotivo: *${movimientoObjUltimoGuardado.motivo}* \nDetalle: *${movimientoObjUltimoGuardado.detalleMovimiento}* \nFoto: *${urlFoto.value}* \n--Registrado en la APP--`;
    return texto;
  });

  return {
    //estados
    fechaMovimiento,
    iglesia,
    tipoMovimiento,
    movimientoObj,
    listaMovimientos,
    movimientoObjOriginal,
    movimientosCargado,
    mostrarCheckListaMovimientos,
    listaMovimientosSelecionados,
    listaMovimientosFiltrados,
    filtroTextoMovimiento,
    balanceAnioFiltro,
    balanceMesFiltro,
    balanceIglesiaFiltro,
    balanceSeleccionado,
    balanceSeleccionadoAnio,
    balanceSeleccionadoMes,
    balanceSeleccionadoIglesia,
    imagenAguardar,
    //listaBalancePorIglesiaAnioMes,

    //acciones
    asignarFechaMovimiento,
    asignarIglesia,
    asignartipoMovimiento,
    actualizaDetalleMovimiento,
    listoParaGuardar,
    guardarMovimiento,
    cargarMovimientosDesdeBD,
    iniciar,
    borrarMovimiento,
    actualizarMovimiento,
    limpiarDatos,
    mostrarMensajeConAccion,
    obtenerUnMovimiento,
    resetearDatosMovimientoSeleccionado,
    huboActualizacion,
    mostrarOcultarCheckEnMovimiento,
    controlMovimientoSeleccionado,
    movimientoSeleccionado,
    borrarSeleccionMovimientos,
    seleccionarTodosLosMovimientos,
    borrarMovimientosSeleccionados,
    listaMovimientosFiltradosAutomatico,
    listaBalances,
    listaBalancesFiltrado,
    listaMovimientoDeBalance,
    asignarBalanceSeleccionado,
    listaMovimientoDeBalanceIngresos,
    listaMovimientoDeBalanceEgresos,
    whatsappTextoMovimiento,
    listaBalanceIglesiaAnioMes,
    guardarMovimientoActaOfrenda,
    actualizarMovimientoCampo,
    listaMovimientosUltimosRegistrados,
  };
});
