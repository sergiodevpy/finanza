<template>
    <div class="q-py-md  row justify-center">
        <input type="file" ref="fileInputRef" style="display: none" @change="onFileChange" />
        <q-btn icon="add_a_photo" color="primary" label="Agregar foto" no-caps @click="openFileInput" />
    </div>
    <div class="row">
        <div class="col-8 ">
            <div class="row ">
                <div class="col-10 ">
                    <q-img :ratio="1" src="https://picsum.photos/500/300" />
                </div>
                <div class="col-2 column justify-center q-pl-sm">
                    <div class="row ">
                        <q-btn icon="zoom_in" round color="primary" dense />
                    </div>
                    <div class="row ">
                        <q-btn icon="delete" round color="red" dense />
                    </div>
                </div>
            </div>
        </div>


    </div>




</template>

<script setup>
import { ref } from 'vue';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "src/firebase/firebase";



const file = ref(null);
const uploadProgress = ref(0);
const downloadURL = ref("");
const fileInputRef = ref(null)

const openFileInput = () => {
    fileInputRef.value.click()
}

const onFileChange = (event) => {
    if (event.target.files.length > 0) {
        file.value = event.target.files[0];
    }
};


</script>

<style scoped>
.verborde {
    border: 1px solid red;
}

.borde {
    border: 1px solid #8ec7cf;
    border-radius: 5px;
    padding: 5px;
}
</style>