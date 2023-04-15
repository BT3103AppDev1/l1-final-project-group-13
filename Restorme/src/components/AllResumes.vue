<template>
  <div class="container" v-if="resume_id === null">
    <div class="topFilterBar">
      <button class="filterButtons">All Resumes</button>
      <button class="filterButtons">Starred Resumes</button>
    </div>
    <div class="overflow-scroll" id="resumeListContainer">
      <br />
      <ul class="resumeList">
        <li v-for="value in values" :key="value.resume_id">
          <div class="resumeContainer">
            <div class="resumeContainer2">
              <div class="topContainer">
                <div id="starContainer">star</div>
                <div id="titleContainer">
                  <button
                    id="resumeLink"
                    @click="showResume(value.resume_id, value.email)"
                  >
                    <h2 id="title">{{ value.title }}</h2>
                  </button>
                </div>
                <div class="uploadDetails">
                  Uploaded by {{ value.email }} on {{ value.date }}
                </div>
              </div>
            </div>

            <div class="tagsContainer">
              <div class="tags" id="experience">
                {{ value.experience }} Years of Experience
              </div>
              <div class="tags" id="role">{{ value.role }}</div>
              <div class="tags" id="location">{{ value.location }}</div>
            </div>
          </div>
          <br />
          <br />
        </li>
      </ul>
    </div>
  </div>
  <div class="resumeChosenContainer" v-if="resume_id != null">
    <div id="pdfContainer">
      <div id="buttonContainer">
        <button @click="resume_id = null" id="returnButton">
          Back to Resume List
        </button>
      </div>
      <div id="pdfDisplayContainer">
        <vue-pdf-embed :source="pdfSource" ref="pdfEmbed" />
      </div>
    </div>
    <div id="commentsContainer">Comments</div>
  </div>
</template>

<script>
import { db } from '../firebase.js';
import { doc, collection, getDocs, getDoc } from 'firebase/firestore';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import VuePdfEmbed from 'vue-pdf-embed';
import { storage } from '../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

export default {
  name: 'AllResumes',
  components: {
    PerfectScrollbar,
    VuePdfEmbed,
  },
  data() {
    return {
      values: [],
      user: null,
      userID: null,
      resume_id: null,
      pdfSource: null,
      resumeUserEmail: null,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getdummyData();
        this.userID = user.uid;
        // console.log(this.userID);
      }
    });
  },
  methods: {
    async getdummyData() {
      let dummyDataDocRef = collection(db, 'ResumeInfo');
      let snapshot = await getDocs(dummyDataDocRef);
      this.values = await Promise.all(
        snapshot.docs.map(async (doc) => {
          let documentData = doc.data();
          // console.log(documentData);
          let additionalInfo = documentData['Additional_Info'];
          // console.log(name);
          let title = documentData['Title'];
          // console.log(title);
          let role = documentData['Role'];
          let location = documentData['Location'];
          let experience = documentData['Experience'];
          let date = documentData['Date'];
          let resume_id = documentData['Resume_Id'];
          let email = documentData['Email'];
          return {
            additionalInfo,
            title,
            role,
            location,
            experience,
            date,
            resume_id,
            email,
          };
        })
      );
    },
    showResume(resume_id, email) {
      console.log('resumeid = ', resume_id);
      this.resume_id = resume_id;
      this.resumeUserEmail = email;
      console.log('resumeToBeDisplayed = ', this.resume_id);
      this.downloadDoc(this.resumeUserEmail, this.resume_id);
      // this.$emit('resumeClicked', resume_id);
      // this.$router.push('/resumeCommentDisplay');
    },
    async downloadDoc(userEmail, resumeID) {
      const requiredRef = ref(
        storage,
        'gs://restorme-cf3da.appspot.com/' + userEmail + '/' + resumeID + '.pdf'
      );

      const url = getDownloadURL(requiredRef)
        .then((url) => {
          this.pdfSource = url;
          // console.log('the pdf source is now ' + this.pdfSource);
        })
        .catch((error) => {
          console.error('error getting url:', error);
        });
    },
  },
};
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css" />

<style scoped>
.filterButtons {
  width: 30%;
  margin-right: 10%;
  margin-top: 2%;
  margin-left: 3%;
  margin-bottom: 2%;
  display: inline;
  background: rgb(248, 248, 246);
  border-radius: 12px;
}

.container {
  margin-left: 5%;
  margin-top: 1%;
  background-color: rgb(248, 248, 246);
  border-width: 0.5%;
  border-style: solid;
  width: 65%;
  position: fixed;
}

.topFilterBar {
  border-bottom-style: solid;
}

.scrollView {
  overflow-y: scroll;
}

#resumeListContainer {
  height: 90vh;
  overflow-y: scroll;
}

.resumeList {
  list-style-type: none;
}
.resumeContainer {
  border-bottom-style: solid;
  margin-right: 5%;
}

.resumeContainer2 {
  display: flex;
  flex-direction: row;
}

.topContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

#titleContainer {
  margin-left: 5%;
  display: flex;
}

#title {
  font-family: Helvetica;
  font-weight: normal;
  text-decoration: underline;
  font-size: 150%;
}

.tagsContainer {
  margin-left: 2%;
  margin-bottom: 2%;
}

.tags {
  display: inline;
  border-radius: 12px;
  margin-right: 10%;
  height: 50px;
  padding: 0.5%;
  background-color: rgb(250, 239, 139);
}

.uploadDetails {
  width: 16%;
  padding-right: 2%;
  padding-left: 2%;
  font-size: 90%;
  height: 100%;
  border-radius: 12px;
  background-color: rgb(231, 228, 217);
  margin-left: 30%;
}

#goToResume {
  margin-top: 100%;
  background-color: rgb(248, 248, 246);
  border: none;
  font-size: 150%;
}

.resumeChosenContainer {
  display: flex;
  flex-direction: row;
  width: 100%;
}

#pdfContainer {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  align-self: center;
  height: 95vh;
  display: flex;
  flex-direction: column;
}

#buttonContainer {
  /* flex: 1; */
  /* background-color: rgb(255, 0, 0); */
  align-self: flex-start;
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}

#returnButton {
  border-radius: 10%;
  height: auto;
}

#pdfDisplayContainer {
  /* flex: 1; */
  /* background-color: rgb(255, 255, 0); */
  align-self: center;
  justify-content: center;
  height: 95vh;
  /* display: flex; */
  /* overflow-y: scroll; */
  width: 100%;
  /* border: 2px solid black; */
}

#commentsContainer {
  flex: 1;
  background-color: rgb(92, 190, 255);
  align-self: center;
  height: 95vh;
  margin-top: 60px;
  display: flex;
}
</style>
