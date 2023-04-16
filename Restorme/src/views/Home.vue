<template>
  <div>
    <div id="homeContainer">
      <div id="routerContainer">
        <SidebarRouter />
      </div>
      <div id="resumeContainer" v-if="numOfResumesUploaded === 0">
        <div id="listOfResumesZeroResumeContainer">
          <br />
          <h3>
            You have not uploaded any resumes yet. Upload your first resume to
            receive feedback now!
          </h3>
          <br />
          <div id="uploadResumeButtonZeroResumeContainer">
            <button @click="upload" id="uploadResumeButtonZeroResume">
              Upload Resumes
            </button>
          </div>
        </div>
      </div>
      <div id="resumeContainer" v-if="numOfResumesUploaded > 0">
        <div id="listOfResumesContainer">
          <div id="resumeHeaderContainer">
            <div id="resumeHeader">
              Your Resumes
              <br /><br />
            </div>
            <div id="uploadResumeButtonContainer">
              <button @click="upload" id="uploadResumeButton">
                Upload Resume (.pdf)
              </button>
            </div>
          </div>
          <div id="scrollViewOfResumesContainer">
            <div v-for="button in resumeButtons" :key="button.name">
              <button
                id="buttonsContainer"
                @click="downloadDoc(button.documentRef)"
              >
                {{ button.name }}
              </button>
            </div>
          </div>
        </div>
        <div id="pdfContainer" v-if="pdfSource != null">
          <vue-pdf-embed :source="pdfSource" ref="pdfEmbed" />
        </div>
      </div>
      <div id="commentsContainer">
        <component v-bind:is="component" v-bind:resume_id ='resumeID' :key="componentKey" @rerender="forceRerender()" ></component>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import VuePdfEmbed from 'vue-pdf-embed';
import Comment from '../components/Comment.vue';
import CommentDisplay from '../components/CommentDisplay.vue';
import { storage } from '../firebase';
import { ref as ref2 } from 'vue';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import Login from '@/views/Login.vue';
import SidebarRouter from '@/components/SidebarRouter.vue';
import Profile from '@/views/Profile.vue';

export default {
  name: 'Home',

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.loadDocs(this.email);
      } else {
        this.user = false;
      }
    });
  },
  data() {
    return {
      user: false,
      numOfResumesUploaded: 0,
      email: '',
      pdfSource: null,
      resumeButtons: [],
      resumeID: null,
      component: null,
      componentKey: 0,
    };
  },

  components: {
    VuePdfEmbed,
    "comment": Comment,
    CommentDisplay,
    Login,
    SidebarRouter,
    Profile,
},

  methods: {
    async loadDocs(userEmail) {
      const bucketRef = ref(
        storage,
        'gs://restorme-cf3da.appspot.com/' + userEmail
      );
      const docList = await listAll(bucketRef);

      this.resumeButtons = await Promise.all(
        docList.items.map(async (documentRef) => {
          let name = documentRef.name;
          this.numOfResumesUploaded += 1;
          return { name, documentRef };
        })
      );
    },
    async downloadDoc(documentRef) {
      const requiredRef = ref(storage, documentRef.fullPath);

      getDownloadURL(requiredRef)
        .then((url) => {
          this.pdfSource = url;
          this.resumeID = documentRef.name;
          this.component = 'comment';
          console.log('ResumeID = ', this.resumeID);
          this.forceRerender();
        })
        .catch((error) => {
          console.error('error getting url:', error);
        })
    },
    upload() {
      this.$router.push('/uploadResumes');
    },

    forceRerender() {
      this.componentKey += 1;
    }
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
  /* background-color: yellow; */
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

#uploadResumeButtonZeroResume {
  border-radius: 15;
  padding: 10px;
}

h3 {
  font-family: 'Rubik-Medium';
  font-size: 18px;
  color: #000000;
}


@font-face {
  font-family: 'Rubik-Regular';
  src: local('Rubik-Regular');
}

@font-face {
  font-family: 'Rubik-Medium';
  src: local('Rubik-Medium');
}

#listOfResumesContainer {
  flex: 1;
  /* background-color: rgb(255, 0, 212); */
  vertical-align: top;
  display: flex;
  flex-direction: column;
  height: 150px;
}

#listOfResumesZeroResumeContainer {
  flex: 1;
  /* background-color: rgb(255, 0, 212); */
  vertical-align: top;
  display: flex;
  flex-direction: column;
  height: 150px;
  padding: 20px;
}

#resumeHeaderContainer {
  flex: 0.2;
  /* background-color: rgb(255, 0, 0); */
  display: flex;
  margin-top: 
}

#resumeHeader {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5%;
  padding-left: 5%;
  /* margin-bottom: 20px; */
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: bold;
  background-image: url('header-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color:#2b6777;
  text-shadow: 1px 1px #f2f2f2;
  animation: fade-in 1s;
}

@keyframes fade-in {
from { opacity: 0; }
to { opacity: 1; }
}

#uploadResumeButtonContainer {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
}

#uploadResumeButton{
  font-size: 80%;
  height: 30px;
  width: 200px;
  background-color: #52ab98;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 90%;
  cursor: pointer;
}

#uploadResumeButton:hover {
  background-color: #3f7d70;
}

#uploadResumeButtonZeroResumeContainer {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  display: flex;
  justify-content: center;
  align-items: start;
  margin-right: 20px;
}

#scrollViewOfResumesContainer {
  flex: 3;
  /* background-color: rgb(255, 0, 212); */
  margin-left: 20px;
  overflow-y: scroll;
}

#buttonsContainer {
  font-size: 80%;
  height: 30px;
  width: 200px;
  margin-bottom: 10px;
  background-color: #c8d8e4;
  color: #2b6777;
  border: none;
  border-radius: 5px;
  font-size: 90%;
  cursor: pointer;
  animation: fade-in 1s;
}

#buttonsContainer:hover {
  background-color: #a4b3bf;
}

#pdfContainer {
  flex: 3.5;
  /* background-color: rgb(0, 0, 255); */
  overflow-y: scroll;
  /* width: 100%; */
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

@font-face {
  font-family: 'Rubik-Regular';
  src: local('Rubik-Regular');
}

@font-face {
  font-family: 'Rubik-Medium';
  src: local('Rubik-Medium');
}
</style>
