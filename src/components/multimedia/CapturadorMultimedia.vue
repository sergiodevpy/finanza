<template>
    <div class="photo-upload">
        <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
        <div v-if="photo" class="photo-frame">
            <img :src="photo" alt="Uploaded Photo" />
        </div>
        <q-btn v-if="!photo" icon="photo_camera" color="green" label="Subir Foto" @click="openFileInput" />
    </div>
</template>

<script>
export default {
    data () {
        return {
            photo: null,
        };
    },
    methods: {
        openFileInput () {
            this.$refs.fileInput.click();
        },
        handleFileChange (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.photo = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
    },
};
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
    border-radius: 0%;
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