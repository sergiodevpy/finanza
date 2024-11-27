<template>
    <div class="q-pa-md photo-upload">
        <input type="file" ref="fileInputRef" style="display: none" @change="handleFileChange" />
        <div v-if="photo" class="photo-frame">
            <img :src="photo" alt="Uploaded Photo" />
            <div>
                <q-btn icon="delete" round color="red" dense outline @click="eliminarFoto" />
            </div>
        </div>

        <q-btn v-if="!photo" icon="photo_camera" color="green" label="Subir Foto" @click="openFileInput" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const photo = ref(null)
const photoOld = ref(null)
const fileInputRef = ref(null)

const openFileInput = () => {
    console.log('evento_log',photo);
    
    photo.value = "null"
    fileInputRef.value.click()
}

const handleFileChange = (event) => {
    console.log('cambioFoto_log', photo);

    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            photo.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
    console.log('cambioFoto_log', photo);
}
const eliminarFoto = () => {
    photo.value = null
}
</script>

<style>
.photo-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.photo-frame {
    width: 200px;
    height: 200px;
    /* border-radius: 50%; */
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    margin-bottom: 20px;
}

.photo-frame img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}
</style>