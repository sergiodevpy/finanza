import { defineStore } from "pinia";
import { ref } from "vue";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "src/firebase/firebase";
import { horaMinutoSegundoActual } from "src/use/useHoraActual";
import { useStoreMovimiento } from "./storeMovimiento";

export const useStoreMultimedia = defineStore("multimediaDB", () => {
  const subirImagen = async (imagen, nombreImagen) => {
    const storeMovimiento = useStoreMovimiento();
    const uploadProgress = ref(0);
    const downloadURL = ref("");
    const hora = horaMinutoSegundoActual();
    const carpeta = "movimientos/";
    //movimientos/01:09:22-nombreimagen.jpg
    const nombreImagenFinal = `${carpeta}${hora}-${nombreImagen}`;
    const fileRef = storageRef(storage, nombreImagenFinal);
    const uploadTask = uploadBytesResumable(fileRef, imagen);
    //asigna el nombre de la img como se va a guardar
    storeMovimiento.movimientoObj.imagenNombre = nombreImagenFinal;

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        uploadProgress.value = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.error("Error al subir el archivo:", error);
      },
      async () => {
        downloadURL.value = await getDownloadURL(uploadTask.snapshot.ref);
      }
    );
    //storeMovimiento.movimientoObj.imagenURL = downloadURL.value;
    return downloadURL.value;
  };

  const bajarImagen = async (nombreImagen) => {
    const starsRef = storageRef(storage, nombreImagen);
    const urlImagen = ref("");
    // Get the download URL
    await getDownloadURL(starsRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        urlImagen.value = url;
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });

    return urlImagen.value;
  };

  return {
    subirImagen,
    bajarImagen,
  };
});
