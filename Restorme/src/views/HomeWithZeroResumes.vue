<template>
  <div v-if="user">
    <div id="HomeWithZeroResumesContainer">
      <div id="routerContainer">
        <SidebarRouter />
      </div>
      <div id="contentContainer">
        <ResumeInputs />
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import ResumeInputs from '../components/ResumeInputs.vue';
import SidebarRouter from '../components/SidebarRouter.vue';

export default {
  name: 'HomeWithZeroResumes',
  data() {
    return {
      user: false,
    };
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
  components: { ResumeInputs, SidebarRouter },
};
</script>

<style>
#HomeWithZeroResumesContainer {
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
