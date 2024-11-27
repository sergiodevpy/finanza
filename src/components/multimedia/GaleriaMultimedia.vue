<template>
    <div class="q-pt-md ">
        <div class="borde">
            <div class="row justify-between q-pa-sm text-primary ">
                <div class="column justify-center">
                    Comprobante / Foto
                </div>
                <div>
                    <q-btn v-if="sinArchivo" icon="photo_camera" outline color="primary" dense no-caps
                        label="Agregar foto" @click="triggerFileInput" />
                    <input type="file" ref="fileInput" accept="image/*" style="display: none"
                        @change="handleFileSelection" />
                </div>
            </div>
            <div v-if="sinArchivo" class="row justify-center ">
                <q-icon name="no_photography" color="grey-5" size="100px" />
                <div class="text-grey-5 text-caption">
                    Sin comprobante, agregue presionando botón Nuevo
                </div>
            </div>
            <div v-else class="q-pa-sm">
                <div>
                    <q-img :src="obtenerImagenURL">
                        <div class="absolute-top-right bg-transparent">
                            <div class="absolute-top-right q-mt-sm q-mr-sm">
                                <q-btn @click="eliminarArchivo" style="z-index: 10;" color="red" icon="delete" dense />

                                <a :href="imageStore.imageUrl" target="_blank" download="imagen_descargada.jpg">
                                    <q-btn class="q-mt-md" style="z-index: 10;" color="primary" icon="zoom_in" dense />
                                </a>
                            </div>
                        </div>

                    </q-img>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "src/firebase/firebase";
import { useStoreMovimiento } from 'src/stores/storeMovimiento';
import { useStoreMultimedia } from 'src/stores/storeMultimedia';
import { useImageStore } from 'src/stores/imageStore';
import { useConfirmarAccion } from 'src/use/useConfirmarAccion';
const imageStore = useImageStore()
const storeMovimiento = useStoreMovimiento()
const storeMultimedia = useStoreMultimedia()

const { confirmarAccion } = useConfirmarAccion()

const props = defineProps({
    imagen: {
        type: String,
        required: false
    }
})


onMounted(async () => {
    if (storeMovimiento.movimientoObj.imagenNombre) {
        console.log('props.imagen_log', props.imagen);
        selectedImage.value = " "//para que me muestre cargando
        await imageStore.getImageUrl(props.imagen)
        selectedImage.value = imageStore.imageUrl
        downloadURL.value = imageStore.imageUrl
        //storeMovimiento.movimientoObj.imagenURL = imageStore.imageUrl
    }

})

const obtenerImagenURL = computed(() => {
    // if (props.imagen) {
    //     return imageStore.imageUrl
    // } else {
    //     return selectedImage.value
    // }

    return selectedImage.value

})


// const sinArchivo = ref(false)
const archivo = ref(null)

const archivoEliminado = ref(false)



const eliminarArchivo = async () => {

    if (storeMovimiento.movimientoObj.imagenNombre) {
        const confirmado = await confirmarAccion("Eliminar imagen", "Confirma eliminar la imágen?", "Eliminar", "Cancelar")

        if (confirmado) {
            imageStore.deleteImage(storeMovimiento.movimientoObj.imagenNombre)
            storeMovimiento.movimientoObj.imagenNombre = ""
            storeMovimiento.movimientoObj.imagenURL = ""
            storeMovimiento.actualizarMovimiento(storeMovimiento.movimientoObj.id, storeMovimiento.movimientoObj, false)
            archivoEliminado.value = true
            selectedImage.value = null

        }
    } else {
        archivoEliminado.value = true
        selectedImage.value = null
        storeMovimiento.movimientoObj.imagenURL = ""
    }


}

const sinArchivo = computed(() => {

    return selectedImage.value ? false : true

    // return selectedImage.value ? false : true
    //return props.imagen ? false : true
})


// Reference to file input element
const fileInput = ref(null)

// Store selected image
const selectedImage = ref(null)

// Trigger file input dialog
const triggerFileInput = () => {
    fileInput.value.click()
}

// Handle file selection
const handleFileSelection = (event) => {
    // console.log('file_seleccion_log', event);

    const file = event.target.files[0]
    if (event.target.files.length > 0) {
        fileFB.value = event.target.files[0];
    }

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.onload = (e) => {
            selectedImage.value = e.target.result
        }

        reader.readAsDataURL(file)
    }
    archivoEliminado.value = false

    storeMovimiento.imagenAguardar.nombre = fileFB.value.name
    storeMovimiento.imagenAguardar.imagen = fileFB.value

    storeMovimiento.movimientoObj.imagenNombre = fileFB.value.name
    //uploadImage()
    fileInput.value.value = ''
}

const fileFB = ref(null);
const uploadProgress = ref(0);
const downloadURL = ref("");


const uploadImage = () => {
    if (!fileFB.value) return;

    // const storage = getStorage();
    const fileRef = storageRef(storage, `images/${fileFB.value.name}`);
    const uploadTask = uploadBytesResumable(fileRef, fileFB.value);

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
            storeMovimiento.movimientoObj.imagenURL = downloadURL.value
        }
    );
};




</script>

<style scoped>
.verborde {
    border: 1px solid red;
}

.borde {
    border: 1px solid #8ec7cf;
    /* border-radius: 5px; */
    /* padding: 5px; */
}
</style>