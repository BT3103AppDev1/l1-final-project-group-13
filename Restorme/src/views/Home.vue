<template>
  <div v-if="numOfResumesUploaded">
    <div id="homeContainer">
      <div id="routerContainer">
        <SidebarRouter />
      </div>
      <div id="resumeContainer">
        <div id="listOfResumesContainer">
          <div id="resumeHeaderContainer">
            <div id="resumeHeader">
              <h3>Your Resumes</h3>
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
        <CommentDisplay />
        <Comment />
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
      numOfResumesUploaded: 2,
      email: '',
      pdfSource: null,
      resumeButtons: [],
    };
  },

  components: {
    VuePdfEmbed,
    Comment,
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
          return { name, documentRef };
        })
      );
    },
    async downloadDoc(documentRef) {
      const requiredRef = ref(storage, documentRef.fullPath);

      getDownloadURL(requiredRef)
        .then((url) => {
          this.pdfSource = url;
        })
        .catch((error) => {
          console.error('error getting url:', error);
        });
    },
    upload() {
      this.$router.push('/uploadResumes');
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

#listOfResumesContainer {
  flex: 1;
  /* background-color: rgb(255, 0, 212); */
  vertical-align: top;
  display: flex;
  flex-direction: column;
  height: 150px;
}

#resumeHeaderContainer {
  flex: 0.2;
  /* background-color: rgb(255, 0, 0); */
  display: flex;
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

#buttonsContainer {
  margin-bottom: 10px;
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
</style>
