<template>
  <div id="otherprofileContainer">
    <div id="routerContainer">
      <SidebarRouter />
    </div>
    <div id="contentContainer">
      <br />
      Personal details
      <div v-if="testData != ''">
        {{ testData }}
      </div>
      
    </div>
  </div>
</template>

<script>
import SidebarRouter from '../components/SidebarRouter.vue';
//import Help from './Help.vue';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, query, where } from '@firebase/firestore';
import { async } from '@firebase/util';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase';
import Comment from '../components/Comment.vue';
import { nextTick } from 'vue';

await nextTick()

export default {
  name: 'OtherProfile',
  components: {
    SidebarRouter,
    Comment,
  },
  data() {
    //const testDRef = doc(collection(db, "users", testData))
    return {
      user: "",
      testData: "",
    };
  },
  created() {
    // let data = this.data;
    // console.log('data is', data);
    this.testData = this.$route.params.testData
    console.log('this.$route.params.data is', this.testData);
    // this.testData = this.testingInfo;
    // console.log('testingInfo is', this.testingInfo);
    /* onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.useremail = user.email;
        //this.fetchProfile(this.testData);
      }
    }); */
  },
  /*methods: {
     async fetchProfile(testData) {
      const userRef = doc(db, "users", testData)
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let Name = docSnap.data().Name;
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      return {
        Name
      }
    } 

  }*/
};
</script>

<style>
#profileContainer {
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
#contentContainer {
  flex: 4.5;
  /* background-color: rgb(0, 255, 0); */
  align-self: center;
  height: 95vh;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}
</style>
