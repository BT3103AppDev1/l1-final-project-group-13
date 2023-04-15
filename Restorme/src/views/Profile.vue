<template>
  <div id="profileContainer">
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
import Help from './Help.vue';

export default {
  name: 'Profile',
  components: {
    SidebarRouter,
    Help,
  },
  data() {
    return {
      testData: '',
    };
  },
  created() {
    // let data = this.data;
    // console.log('data is', data);
    this.testData = this.$route.params.testData;
    console.log('this.$route.params.data is', this.testData);
    // this.testData = this.testingInfo;
    // console.log('testingInfo is', this.testingInfo);
  },
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
