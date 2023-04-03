<template>
  <div v-if="numOfResumesUploaded">
    <div id="homeContainer">
      <div id="routerContainer">router</div>
      <div id="resumeContainer">
        <div id="listOfResumesContainer">
          <div id="resumeHeaderContainer">
            <div id="resumeHeader">
              <h3>Your Resumes</h3>
            </div>
            <div id="uploadResumeButtonContainer">
              <button id="uploadResumeButton">Upload Resume (.pdf)</button>
            </div>
          </div>
          <div id="scrollViewOfResumesContainer">
            <button>Full stack software engineer</button>
            <br />
            <br />
            <button>Database administrator</button>
            <br />
            <br />
            <button>Product manager</button>
            <br />
            <br />
            <button>Data analyst</button>
            <br />
            <br />
            <button>Financial Analyst</button>
            <br />
            <br />
            <button>Data scientist</button>
            <br />
            <br />
            <button>Cloud engineer</button>
            <br />
            <br />
            <button>Cloud architect</button>
            <br />
            <br />
            <button>Frontend mobile engineer</button>
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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import VuePdfEmbed from 'vue-pdf-embed';
import Comment from '../components/Comment.vue';

export default {
  name: 'Home',
  data() {
    return {
      user: false,
      numOfResumesUploaded: 2,
      pdfSource: '../src/assets/ResumeTemplate.pdf',
    };
  },

  components: {
    VuePdfEmbed,
    Comment,
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = false;
      }
    });
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
