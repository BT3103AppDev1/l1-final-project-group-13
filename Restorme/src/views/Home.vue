<template>
  <div v-if="numOfResumesUploaded">
    <div id="homeContainer">
      <div id="routerContainer">router</div>
      <div id="resumeContainer">
        <div id="listOfResumesContainer">
          <div id="resumeHeaderContainer">
            <div id="resumeHeader">
              <h3>Your Resumes</h3> <br><br>
            </div>
            <div id="uploadResumeButtonContainer">
              <input type="file" ref="myfile" /> <br /><br />
              <input
                type="text"
                placeholder="Enter job title here..."
                id="myInput"
              />
              <br /><br />

              <button @click="upload" id="uploadResumeButton">
                Upload Resume (.pdf)
              </button>
            </div>
          </div>
          <div id="scrollViewOfResumesContainer">
            <button>Full stack software engineer</button>
            <br />
            <br />
            <button>Database administrator</button>
            <br />
            <br />
          </div>
        </div>
        <div id="pdfContainer">
          <vue-pdf-embed :source="pdfSource" />
        </div>
      </div>
      <div id="commentsContainer">
        <Comment />
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import VuePdfEmbed from "vue-pdf-embed";
import Comment from "../components/Comment.vue";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import Login from "@/views/Login.vue";

export default {
  name: "Home",
  data() {
    return {
      user: false,
      numOfResumesUploaded: 2,
      email: "",
      pdfSource: "../src/assets/ResumeTemplate.pdf",
    };
  },

  components: {
    VuePdfEmbed,
    Comment,
    Login,
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      } else {
        this.user = false;
      }
    });
  },

  methods: {
    upload: function () {
      const folder = String(this.email);
      var jobTitle = document.getElementById("myInput").value;

      const final_path = folder + "/" + String(jobTitle);
      const storageRef = ref(storage, final_path);

      alert(jobTitle);
      uploadBytes(storageRef, this.$refs.myfile.files[0]).then((snapshot) => {
        console.log("uploaded!");
        window.location.reload();
      });
    },
  },
};
</script>

<style>
#homeContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 98vw;
}

#routerContainer {
  flex: 1;
  background-color: yellow;
  align-self: center;
  height: 95vh;
  margin-top: 60px;
}

#resumeContainer {
  flex: 2.5;
  /* background-color: rgb(0, 255, 0); */
  align-self: center;
  height: 95vh;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}

#listOfResumesContainer {
  flex: 1;
  /* background-color: rgb(255, 0, 212); */
  vertical-align: top;
  display: flex;
  flex-direction: column;
  height: 150px;
}

#resumeHeaderContainer {
  flex: 1;
  /* background-color: rgb(255, 0, 0); */
  display: flex;
  align-items: center;
}

#resumeHeader {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}

#uploadResumeButtonContainer {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
}

#scrollViewOfResumesContainer {
  flex: 3;
  /* background-color: rgb(255, 0, 212); */
  margin-left: 20px;
  overflow-y: scroll;
}

#pdfContainer {
  flex: 3.5;
  /* background-color: rgb(0, 0, 255); */
  overflow-y: scroll;
  width: 100%;
  border: 2px solid black;
  /* padding: 10px; */
}

#commentsContainer {
  flex: 2;
  /* background-color: rgb(0, 242, 255); */
  align-self: center;
  height: 95vh;
  margin-top: 80px;
  padding: 20px;
  justify-content: center;
  overflow-y: scroll;
}
</style>
