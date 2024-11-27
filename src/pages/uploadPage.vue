<!-- src/pages/UploadPage.vue -->
<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">Subir Archivos</div>

    <!-- Botones de subida -->
    <div class="q-gutter-md">
      <q-btn color="primary" icon="photo_camera" label="Tomar Foto" @click="captureImage" />
      <q-btn color="secondary" icon="upload_file" label="Subir Archivo" @click="selectFile" />
    </div>

    <!-- Input oculto para subir archivos -->
    <input type="file" ref="fileInput" accept=".pdf,.jpg,.jpeg,.png" style="display: none" @change="handleFileUpload" />

    <!-- Progreso de subida -->
    <q-linear-progress v-if="uploading" :value="uploadProgress" class="q-mt-md" />

    <!-- Tabs para cambiar entre vista de galería y lista -->
    <q-tabs v-model="activeTab" class="q-mt-lg" dense>
      <q-tab name="gallery" icon="grid_view" label="Galería" />
      <q-tab name="list" icon="list" label="Lista" />
    </q-tabs>

    <q-tab-panels v-model="activeTab" animated>
      <!-- Vista de Galería -->
      <q-tab-panel name="gallery">
        <div class="row q-col-gutter-md">
          <div v-for="file in files" :key="file.id" class="col-6 col-sm-4 col-md-3">
            <q-card class="cursor-pointer" @click="previewFile(file)">
              <!-- Previsualización según tipo de archivo -->
              <q-img v-if="file.type.includes('image')" :src="file.url" style="height: 200px" />
              <div v-else class="text-center q-pa-md flex flex-center" style="height: 200px">
                <q-icon name="picture_as_pdf" size="64px" v-if="file.type.includes('pdf')" />
              </div>
              <q-card-section>
                <div class="text-subtitle2">{{ file.name }}</div>
                <div class="text-caption">{{ formatDate(file.timestamp) }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- Vista de Lista -->
      <q-tab-panel name="list">
        <q-list separator>
          <q-item v-for="file in sortedFiles" :key="file.id" clickable @click="previewFile(file)">
            <q-item-section avatar>
              <q-icon :name="getFileIcon(file.type)" :color="getFileColor(file.type)" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ file.name }}</q-item-label>
              <q-item-label caption>
                {{ formatDate(file.timestamp) }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat round icon="delete" color="negative" @click.stop="deleteFile(file)" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Dialog para previsualizar archivos -->
    <q-dialog v-model="previewDialog">
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ selectedFile?.name }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div v-if="selectedFile?.type.includes('image')">
            <q-img :src="selectedFile.url" />
          </div>
          <div v-else-if="selectedFile?.type.includes('pdf')">
            <iframe :src="selectedFile?.url" style="width: 100%; height: 500px" frameborder="0" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const $q = useQuasar();
const storage = getStorage();
const db = getFirestore();

// Referencias y estados
const fileInput = ref(null);
const files = ref([]);
const uploading = ref(false);
const uploadProgress = ref(0);
const activeTab = ref('gallery');
const previewDialog = ref(false);
const selectedFile = ref(null);

// Archivos ordenados por fecha
const sortedFiles = computed(() => {
  return [...files.value].sort((a, b) => b.timestamp - a.timestamp);
});

// Cargar archivos al montar el componente
onMounted(() => {
  const q = query(collection(db, 'files'), orderBy('timestamp', 'desc'));
  onSnapshot(q, (snapshot) => {
    files.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  });
});

// Funciones de utilidad
const formatDate = (timestamp) => {
  return formatDistanceToNow(timestamp, { addSuffix: true, locale: es });
};

const getFileIcon = (type) => {
  if (type.includes('image')) return 'image';
  if (type.includes('pdf')) return 'picture_as_pdf';
  return 'insert_drive_file';
};

const getFileColor = (type) => {
  if (type.includes('image')) return 'primary';
  if (type.includes('pdf')) return 'negative';
  return 'grey';
};

// Funciones de subida de archivos
const captureImage = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      stream.getTracks().forEach(track => track.stop());
      await uploadFile(blob, `camera_${Date.now()}.jpg`);
    }, 'image/jpeg');
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Error al acceder a la cámara',
      icon: 'error'
    });
  }
};

const selectFile = () => {
  fileInput.value.click();
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await uploadFile(file, file.name);
  }
  fileInput.value.value = '';
};

const uploadFile = async (file, fileName) => {
  uploading.value = true;
  uploadProgress.value = 0;

  try {
    const fileRef = storageRef(storage, `uploads/${fileName}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        uploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes);
      },
      (error) => {
        $q.notify({
          color: 'negative',
          message: 'Error al subir el archivo',
          icon: 'error'
        });
        uploading.value = false;
      },
      async () => {
        const url = await getDownloadURL(fileRef);
        await addDoc(collection(db, 'files'), {
          name: fileName,
          url,
          type: file.type,
          timestamp: Date.now()
        });

        uploading.value = false;
        $q.notify({
          color: 'positive',
          message: 'Archivo subido exitosamente',
          icon: 'check'
        });
      }
    );
  } catch (error) {
    uploading.value = false;
    $q.notify({
      color: 'negative',
      message: 'Error al subir el archivo',
      icon: 'error'
    });
  }
};

// Funciones de previsualización y eliminación
const previewFile = (file) => {
  selectedFile.value = file;
  previewDialog.value = true;
};

const deleteFile = async (file) => {
  try {
    const fileRef = storageRef(storage, file.url);
    await deleteObject(fileRef);
    await deleteDoc(doc(db, 'files', file.id));

    $q.notify({
      color: 'positive',
      message: 'Archivo eliminado exitosamente',
      icon: 'check'
    });
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Error al eliminar el archivo',
      icon: 'error'
    });
  }
};
</script>