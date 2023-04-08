<template>
  <div id="resumesContainer">
    <div id="routerContainer">
      <SidebarRouter />
    </div>
    <div id="contentContainer">
      <br />
      Resumes
    </div>
  </div>
</template>

<script>
import SidebarRouter from '../components/SidebarRouter.vue';
export default {
  name: 'Resumes',
  components: {
    SidebarRouter,
  },
};
</script>

<style>
#resumesContainer {
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
