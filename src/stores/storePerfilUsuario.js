import { defineStore } from "pinia";

import { ref, reactive } from "vue";
import { Loading } from "quasar";
import { useRouter } from "vue-router";
import { useStoreUsuarios } from "./storeUsuarios";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase";

let perfilColeccionRef = null;
let obtenerperfilDB = null;
let filtro = null;

export const useStorePerfilUsuarios = defineStore("perfilUsuario", () => {
  const router = useRouter();
  const iglesia = ref("");
  const storeUsuarios = useStoreUsuarios();
  const perfilDefecto = {
    usuario: "",
    idUsuario: "",
    password: "",
    tipoUsuario: "",
    iglesia: "",
    configuracioes: "",
  };

  const perfil = reactive({
    ...perfilDefecto,
  });

  const perfilCargado = ref(false);
  const iniciar = () => {
    perfilCargado.value = false;

    perfilColeccionRef = collection(
      db,
      "usuarios",
      "base",
      "usuariosColeccion"
    );
    filtro = where("idUsuario", "==", storeUsuarios.usuarioDetalle.id);

    cargarPerfilDB();
  };

  const cargarPerfilDB = () => {};

  const buscarPerfilDB = async () => {
    const docRef = doc(
      db,
      "usuarios",
      "base",
      "usuariosColeccion",
      storeUsuarios.usuarioDetalle.id
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const perfilEncontrado = docSnap.data();
      console.log("perfilEncontrado_log", perfilEncontrado);
      Object.assign(perfil, perfilEncontrado);
      console.log("perfil_log", perfil);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const guardarPerfilUsuario = async () => {
    Loading.show({
      message: "Guardado perfil favor espere...",
      spinnerColor: "primary",
      messageColor: "primary",
      boxClass: "bg-grey-2 text-primary",
    });
    const nuevoPerfil = {
      usuario: storeUsuarios.usuarioDetalle.usuario,
      idUsuario: storeUsuarios.usuarioDetalle.id,
      password: storeUsuarios.credencialesRegistro.password,
      tipoUsuario: "NORMAL",
      iglesia: iglesia.value,
      configuracioes: "",
    };
    //Object.assign(perfil, nuevoPerfil);
    console.log("nuevoPerfil_log", nuevoPerfil);

    await setDoc(
      doc(
        db,
        "usuarios",
        "base",
        "usuariosColeccion",
        storeUsuarios.usuarioDetalle.id //asignamos el id de documento el mismo del id usuario
      ),
      nuevoPerfil
    );
    Object.assign(perfil, nuevoPerfil);
    Loading.hide();
    router.push("/inicio");
  };

  const limpiarDatos = () => {
    Object.assign(perfil, perfilDefecto);
  };

  //estados
  return {
    iniciar,
    iglesia,
    guardarPerfilUsuario,
    perfil,
    buscarPerfilDB,
    limpiarDatos,
  };
});
