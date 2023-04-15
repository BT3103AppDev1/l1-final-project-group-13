<template>
  <div id="helpContainer">
    <div id="routerContainer">
      <SidebarRouter />
    </div>
    <div id="contentContainer">
      <br />
      <router-link :to="`/profile/${this.testData}`">Profile</router-link>
    </div>
  </div>
</template>

<script>
import SidebarRouter from '../components/SidebarRouter.vue';
import Profile from '@/views/Profile.vue';

export default {
  name: 'Help',
  components: {
    SidebarRouter,
  },
  data() {
    return {
      testData: 'New data',
    };
  },
  // methods: {
  //   handleClick() {
  //     this.$router.push({
  //       name: 'Profile', //use name for router push
  //       params: { data: 'Hello123' },
  //     });
  //   },
  // },
};
</script>

<style>
#helpContainer {
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
