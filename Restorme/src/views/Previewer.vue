<script>
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export default {
  props: {
    path: String,
  },
  data: () => {
    return {
      url: "",
    };
  },

  mounted() {
    getDownloadURL(ref(storage, this.path)).then(
      (download_url) => (this.url = download_url)
    );
  },

  // this is the function required, uploads the document into the folder called "folder", and the document will be called "unique_ID"
  methods: {
    upload: function () {
      const storageRef = ref(storage, "folder/unique_ID.pdf");
      uploadBytes(storageRef, this.$refs.myfile.files[0]).then((snapshot) => {
        console.log("uploaded!");
        window.location.reload();
      });
    },
  },
};
</script>

<template>
  <h1>Preview and Upload a PDF</h1>
  <input type="file" ref="myfile" /> <br /><br />
  <button @click="upload">UPLOAD</button> <br />
  <h2>the download link for this url is: {{ url }}</h2>

  <!-- ignore the link, it won't work! -->
  <!-- this link will display unique_ID.pdf from the folder called "folder" ONLY -->
  <embed
    src="https://firebasestorage.googleapis.com/v0/b/democpp-bb2e4.appspot.com/o/folder%2Funique_ID.pdf?alt=media&token=04c17457-0a99-44a3-aa7a-32ddd2d747bc"
    width="500"
    height="800"
  />
</template>

<style scoped>
</style>
