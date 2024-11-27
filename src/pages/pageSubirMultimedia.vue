<template>
    <div>
        <input type="file" @change="onFileChange" />
        <button @click="uploadImage" :disabled="!file">Subir Imagen</button>
        <p v-if="uploadProgress">Progreso: {{ uploadProgress }}%</p>
        <p v-if="downloadURL">URL de la imagen: <a :href="downloadURL" target="_blank">{{ downloadURL }}</a></p>
    </div>
</template>

<script>
import { ref } from "vue";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "src/firebase/firebase";

export default {
    setup () {
        const file = ref(null);
        const uploadProgress = ref(0);
        const downloadURL = ref("");

        const onFileChange = (event) => {
            if (event.target.files.length > 0) {
                file.value = event.target.files[0];
            }
        };

        const uploadImage = () => {
            if (!file.value) return;

           // const storage = getStorage();
            const fileRef = storageRef(storage, `images/${file.value.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file.value);

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
        };

        return {
            file,
            uploadProgress,
            downloadURL,
            onFileChange,
            uploadImage,
        };
    },
};
</script>

<style>
/* Estilo opcional */
</style>