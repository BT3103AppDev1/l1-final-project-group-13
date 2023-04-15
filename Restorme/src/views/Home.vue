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
              <br /><br />

              <button @click="goToUpload" id="uploadResumeButton">
                Upload Resume (.pdf)
              </button>
            </div>
          </div>
          <div
            id="scrollViewOfResumesContainer"
            v-for="(button, index) in resumeButtons"
            :key="index"
          >
            <button @click="downloadDoc(button.documentRef)">
              {{ button.name }}
            </button>
          </div>
        </div>
        <div id="pdfContainer">
          <vue-pdf-embed :source=pdfSource2 ref="pdfEmbed"/>
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
      } else {
        this.user = false;
      }
    });
  },

  setup() {
    const pdfEmbed = ref2(null)
    const pdfUrl = ref2('')


    const resumeButtons = ref2([]);

    const requiredURL = {value: null};
    //this.pdfSource = requiredURL.value;
    
    console.log(requiredURL.value);

    //console.log(this.email);
    
    async function loadDocs(userEmail) {
      //console.log(this.email);

      const bucketRef = ref(
        storage,

        // i need help with linking the useremail here
        'gs://restorme-cf3da.appspot.com/mattlim2000@gmail.com'
      );
      const docList = await listAll(bucketRef);

      docList.items.forEach((documentRef) => {
        const name = documentRef.name;
        resumeButtons.value.push({ name, documentRef });
      });
    }

    function downloadDoc(documentRef) {
      const requiredRef = ref(storage, documentRef.fullPath);

      const url = getDownloadURL(requiredRef)
        .then((url) => {
          //console.log(url);

          // i need help with changing the pdfSource here
          requiredURL.value = url;
          console.log(this.email);
          console.log("updated!" + requiredURL.value);
          console.log("before, pdfSource is: " + this.pdfSource);
          this.pdfSource = requiredURL.value;
          console.log("the pdf source is now " + this.pdfSource);

        });

      
      
      
      //this.pdfSource = url;
    }

    loadDocs();

    return { resumeButtons, downloadDoc, requiredURL };
  },

  data() {
    return {
      user: false,
      numOfResumesUploaded: 2,
      email: '',
      pdfSource: '../src/assets/ResumeTemplate.pdf',
      pdfSource2: "https://firebasestorage.googleapis.com/v0/b/restorme-cf3da.appspot.com/o/mattlim2000%40gmail.com%2FN5HO5dVzri?alt=media&token=a2da3c58-52bd-48d7-b2b2-9e97014ec472"
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

    goToUpload: function () {
      this.$router.push('/uploadResumes')
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
