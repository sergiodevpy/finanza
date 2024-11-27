// stores/imageStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "src/firebase/firebase";

export const useImageStore = defineStore("image", () => {
  const imageUrl = ref("");
  const loading = ref(false);
  const error = ref(null);

  const getImageUrl = async (imagePath) => {
    try {
      loading.value = true;
      error.value = null;

      //const storage = getStorage();
      const imageRef = storageRef(storage, imagePath);
      const url = await getDownloadURL(imageRef);

      imageUrl.value = url;
      return url;
    } catch (err) {
      error.value = err.message;
      console.error("Error al obtener la imagen:", err);
      imageUrl.value = "";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteImage = async (imagen) => {
    //const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = storageRef(storage, imagen);

    // Delete the file
    await deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  return {
    imageUrl,
    loading,
    error,
    getImageUrl,
    deleteImage,
  };
});
