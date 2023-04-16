<template>
  <div class="container" v-if="resume_id === null">
    <div class="topFilterBar">
      <button
        class="filterButtons"
        v-on:click="changeToAllResumeView"
        :class="allResumesButtonActive ? 'active' : 'inactive'"
      >
        All Resumes
      </button>
      <button
        class="filterButtons"
        v-on:click="changeToStarredResumeView"
        :class="starredResumesButtonActive ? 'active' : 'inactive'"
      >
        Starred Resumes
      </button>
    </div>
    <div
      class="overflow-scroll"
      id="resumeListContainer"
      v-if="this.showStarredResumes === false"
    >
      <br />
      <ul class="resumeList">
        <li v-for="value in values" :key="value.resume_id">
          <div class="resumeContainer">
            <div class="resumeContainer2">
              <div class="topContainer">
                <div id="starContainer">
                  <div
                    id="emptyStarContainer"
                    v-if="value.userHasStarredThisResume === false"
                  >
                    <button
                      v-on:click="addToUserStarredResumes(value.resume_id)"
                    >
                      <img src="../assets/empty star.png" id="star" />
                    </button>
                  </div>
                  <div
                    id="filledStarContainer"
                    v-if="value.userHasStarredThisResume === true"
                  >
                    <button
                      v-on:click="removeFromUserStarredResumes(value.resume_id)"
                    >
                      <img src="../assets/yellow star.png" id="star" />
                    </button>
                  </div>
                </div>
                <div id="titleContainer">
                  <button
                    id="resumeLink"
                    @click="showResume(value.resume_id, value.email)"
                  >
                    {{ value.title }}
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
    <div
      class="overflow-scroll"
      id="resumeListContainer"
      v-if="this.showStarredResumes === true"
    >
      <br />
      <ul class="resumeList">
        <div v-if="this.numberOfStarredResumes === 0">
          Star a resume to bookmark it for later!
        </div>
        <div v-if="this.numberOfStarredResumes > 0">
          <li v-for="value in starredResumesValues" :key="value.resume_id">
            <div
              class="resumeContainer"
              v-if="value.userHasStarredThisResume === true"
            >
              <div class="resumeContainer2">
                <div class="topContainer">
                  <div id="starContainer">
                    <div id="filledStarContainer">
                      <button
                        v-on:click="
                          removeFromUserStarredResumes(value.resume_id)
                        "
                      >
                        <img src="../assets/yellow star.png" id="star" />
                      </button>
                    </div>
                  </div>
                  <div id="titleContainer">
                    <button
                      id="resumeLink"
                      @click="showResume(value.resume_id, value.email)"
                    >
                      {{ value.title }}
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
        </div>
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
    <div id="commentsContainer">
      <component
        v-bind:is="component"
        v-bind:resume_id="resume_id"
        :key="componentKey"
        @rerender="forceRerender()"
      ></component>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase.js';
import {
  doc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import VuePdfEmbed from 'vue-pdf-embed';
import { storage } from '../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import Comment from '../components/Comment.vue';
import CommentDisplay from '../components/CommentDisplay.vue';

export default {
  name: 'AllResumes',
  components: {
    VuePdfEmbed,
    comment: Comment,
    CommentDisplay,
  },
  data() {
    return {
      values: [],
      user: null,
      userID: null,
      resume_id: null,
      pdfSource: null,
      resumeUserEmail: null,
      showStarredResumes: false,
      numberOfStarredResumes: 0,
      allResumesButtonActive: true,
      starredResumesButtonActive: false,
      starredResumesValues: [],
      component: null,
      componentKey: 0,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getdummyData();
        this.userID = user.uid;
        this.email = user.email;
        // console.log(this.userID);
      }
    });
  },
  methods: {
    async getdummyData() {
      this.numberOfStarredResumes = 0;
      this.starredResumesValues = [];
      let dummyDataDocRef = collection(db, 'ResumeInfo');
      let snapshot = await getDocs(dummyDataDocRef);
      this.values = await Promise.all(
        snapshot.docs.map(async (document) => {
          let documentData = document.data();
          // console.log(documentData);
          let additionalInfo = documentData['Additional Info'];
          // console.log(name);
          let title = documentData['Title'];
          console.log(title);
          let role = documentData['Role'];
          let location = documentData['Location'];
          let experience = documentData['Experience'];
          let date = documentData['Date'];
          let resume_id = documentData['Resume_Id'];
          let user_id = documentData['UserID'];
          let email = documentData['Email'];

          //need to check if the user has starred this resume via value.userStarredResume
          let userHasStarredThisResume = null;
          let userStarredResumesRef = doc(db, 'users', this.email);
          let getUserStarredResumes = await getDoc(userStarredResumesRef).then(
            (doc) => {
              console.log('Document data:', doc);
              let userInfo = doc.data();
              console.log('UserInfo: ', userInfo);
              let userStarredResumes = userInfo['StarredResumes'];
              console.log('userStarredResumes: ', userStarredResumes);
              userHasStarredThisResume = userStarredResumes.includes(resume_id);
              if (userHasStarredThisResume === true) {
                this.numberOfStarredResumes++;
              }
            }
          );

          return {
            additionalInfo,
            title,
            role,
            location,
            experience,
            date,
            resume_id,
            user_id,
            email,
            userHasStarredThisResume,
          };
        })
      );
      for (let i = 0; i < this.values.length; i++) {
        if (this.values[i].userHasStarredThisResume === true) {
          this.starredResumesValues.push(this.values[i]);
        }
      }
    },
    changeToAllResumeView() {
      this.showStarredResumes = false;
      this.allResumesButtonActive = true;
      this.starredResumesButtonActive = false;
    },
    changeToStarredResumeView() {
      this.showStarredResumes = true;
      this.allResumesButtonActive = false;
      this.starredResumesButtonActive = true;
    },
    async addToUserStarredResumes(resumeID) {
      // for adding to user's starred history

      let userStarredResumesRef = doc(db, 'users', this.email);
      var userStarredResumesArray = [];
      let getUserStarredResumes = await getDoc(userStarredResumesRef).then(
        (doc) => {
          let userInfo = doc.data();
          userStarredResumesArray = userInfo['StarredResumes'];
        }
      );

      if (userStarredResumesArray.includes(resumeID)) {
        console.log('user has already starred this resume');
        this.getdummyData();
        this.values = this.values;
        this.numberOfStarredResumes = this.numberOfStarredResumes;
        return;
      }

      userStarredResumesArray.push(resumeID);
      let updateUserStarredResumes = await updateDoc(userStarredResumesRef, {
        StarredResumes: userStarredResumesArray,
      });
      console.log('added to user starred history');
      this.getdummyData();
      this.values = this.values;
      this.numberOfStarredResumes = this.numberOfStarredResumes;
    },
    async removeFromUserStarredResumes(resumeID) {
      // for removing from user's starred history
      let userStarredResumesRef = doc(db, 'users', this.email);
      var userStarredResumesArray = [];
      let getUserStarredResumes = await getDoc(userStarredResumesRef).then(
        (doc) => {
          let userInfo = doc.data();
          userStarredResumesArray = userInfo['StarredResumes'];
        }
      );

      userStarredResumesArray = userStarredResumesArray.filter(
        (item) => item !== resumeID
      );
      let updateUserStarredResumes = await updateDoc(userStarredResumesRef, {
        StarredResumes: userStarredResumesArray,
      });
      console.log('removed from user starred history');
      this.getdummyData();
      this.values = this.values;
      this.numberOfStarredResumes = this.numberOfStarredResumes;
    },
    showResume(resume_id, email) {
      console.log('resumeid = ', resume_id);
      this.resume_id = resume_id;
      this.resumeUserEmail = email;
      console.log('resumeToBeDisplayed = ', this.resume_id);
      this.downloadDoc(this.resumeUserEmail, this.resume_id);
      // this.$emit('resumeClicked', resume_id);
      // this.$router.push('/resumeCommentDisplay');
      this.component = 'comment';
      this.forceRerender();
    },
    async downloadDoc(userEmail, resumeID) {
      const requiredRef = ref(
        storage,
        'gs://restorme-cf3da.appspot.com/' + userEmail + '/' + resumeID
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
    forceRerender() {
      this.componentKey += 1;
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
  align-items: top;
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
  /* justify-content: space-between; */
  width: 100%;
}

#starContainer {
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
}

#star {
  width: 20px;
  height: 20px;
  margin-left: 5%;
  margin-top: 10%;
}

#resumeLink {
  padding: 10px;
}

#titleContainer {
  margin-left: 5%;
  /* display: flex; */
  flex: 5;
  /* background-color: red; */
}

#title {
  font-family: Helvetica;
  font-weight: normal;
  text-decoration: underline;
  /* font-size: 150%; */
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
  flex: 0.7;
  /* background-color: rgb(0, 242, 255); */
  align-self: center;
  height: 95vh;
  margin-top: 80px;
  padding: 20px;
  justify-content: center;
  overflow-y: scroll;
}

.active {
  background-color: rgb(250, 239, 139);
}
</style>
