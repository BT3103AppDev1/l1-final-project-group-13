<script>
import SidebarRouter from "@/components/SidebarRouter.vue";
import ResumeInputs from "@/components/ResumeInputs.vue";

export default {
  name: "UploadResume",
  components: {
    SidebarRouter,
    ResumeInputs,
  },
};
</script>

<template>
  <div id="uploadContainer">
    <div id="routerContainer">
      <SidebarRouter />
    </div>
    <div id="contentContainer">
      <br />
      <ResumeInputs />

      
    </div>
  </div>
</template>

<style>
#uploadContainer {
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