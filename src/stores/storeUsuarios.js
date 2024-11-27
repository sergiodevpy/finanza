import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { Dialog, Loading } from "quasar";
import { auth } from "src/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { reactive, ref } from "vue";
import { useStoreMovimiento } from "./storeMovimiento";
import { useStoreActaDB } from "./storeActaDB";
import { useStorePerfilUsuarios } from "./storePerfilUsuario";

export const useStoreUsuarios = defineStore("usuarios", () => {
  //estados
  const credencialesRegistro = reactive({});
  const usuarioIngresado = ref(false);

  const usuarioDetallePorDefecto = {
    id: null,
    email: null,
    usuario: null,
  };

  const usuarioDetalle = reactive({
    ...usuarioDetallePorDefecto,
  });

  //acciones

  //utilidades
  const showFirebaseError = (message) => {
    Dialog.create({
      title: "Error",
      message: message,
    });
  };

  const mostrarMensaje = (titulo, mensaje) => {
    Dialog.create({
      title: titulo,
      message: mensaje,
    });
  };

  const init = () => {
    const router = useRouter();
    const storeMovimiento = useStoreMovimiento();
    const storeActaDB = useStoreActaDB();
    const storePerfilUsuario = useStorePerfilUsuarios();
    onAuthStateChanged(auth, async (user) => {
      usuarioIngresado.value = true;
      if (user) {
        //cargamos los datos del usuario
        //console.log('init user true = ',user);

        usuarioDetalle.id = user.uid;
        usuarioDetalle.email = user.email;
        usuarioDetalle.usuario = user.email.split("@")[0];
        //TODO: ver si es un registro nuevo llevarlo a la página de perfil y completar sus datos
        await storePerfilUsuario.buscarPerfilDB();
        console.log(
          "storePerfilUsuario.perfil.idUsuario_log",
          storePerfilUsuario.perfil.idUsuario
        );

        if (storePerfilUsuario.perfil.idUsuario) {
          router.push("/inicio");
        } else {
          router.push("/perfil");
        }
        //router.push("/inicio");
        storeMovimiento.iniciar();
        storeActaDB.iniciar();
      } else {
        //lmpiamos los datos a null o default
        Object.assign(usuarioDetalle, usuarioDetallePorDefecto);
        router.replace("/ingresar");
        storeMovimiento.limpiarDatos();
        storeActaDB.limpiarDatos();
        storePerfilUsuario.limpiarDatos();
      }
    });
  };

  const registrarUsuario = (credenciales) => {
    Loading.show({
      message: "Registrando favor espere...",
      spinnerColor: "primary",
      messageColor: "primary",
      boxClass: "bg-grey-2 text-primary",
    });
    Object.assign(credencialesRegistro, credenciales);
    createUserWithEmailAndPassword(
      auth,
      `${credenciales.email}@mail.com`,
      credenciales.password
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("user creado: ", user);
        Loading.hide();
        // mostrarMensaje(
        //   "Registro correcto!",
        //   "Usuario registrado correctamente"
        // );
        // ...
      })
      .catch((error) => {
        Loading.hide();
        showFirebaseError(error.message);
      });
  };

  const terminarSesionUsuario = () => {
    signOut(auth)
      .then(() => {
        console.log("Usuario salió");
      })
      .catch((error) => {
        showFirebaseError(error.message);
      });
  };

  const ingresar = (credenciales) => {
    Loading.show({
      message: "Ingresando favor espere...",
      spinnerColor: "primary",
      messageColor: "primary",
      boxClass: "bg-grey-2 text-primary",
    });
    Object.assign(credencialesRegistro, credenciales);
    signInWithEmailAndPassword(
      auth,
      `${credenciales.email}@mail.com`,
      credenciales.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Loading.hide();
        //console.log('user ingresado: ',user)
      })
      .catch((error) => {
        Loading.hide();
        showFirebaseError(error.message);
      });
  };
  return {
    //estados
    usuarioDetalle,
    usuarioIngresado,
    credencialesRegistro,
    //acciones
    registrarUsuario,
    terminarSesionUsuario,
    ingresar,
    init,
  };
});
