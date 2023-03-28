<template>
  <div id="comment">
    <div id="votesContainer">
      <div class="vote">+</div>
      <div class="voteCount">3</div>
      <div class="vote">-</div>
    </div>
    <div id="contentContainer">
      <div id="userDetailsContainer">test002@gmail.com</div>
      <div id="commentDetailsContainer">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat autem
        maiores nemo, distinctio, modi consequuntur dolorem velit doloribus iure
        illum rem voluptatum est, enim commodi cumque corporis pariatur quaerat
        dicta.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
};
</script>

<style>
#comment {
  display: flex;
  flex-direction: row;
  /* background-color: grey; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 20px;
}

#votesContainer {
  flex: 1;
  /* background-color: rgb(0, 153, 255); */
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Rubik-Medium;
  flex-direction: column;
  background-color: #f5f6fa;
  border-radius: 50px;
  margin: 20px;
}

.vote {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #c5c6ef;
}

.voteCount {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5357b6;
}

#contentContainer {
  flex: 15;
  display: flex;
  flex-direction: column;
  /* background-color: rgb(255, 0, 0); */
}

@font-face {
  font-family: 'Rubik-Regular';
  src: local('Rubik-Regular');
}

@font-face {
  font-family: 'Rubik-Medium';
  src: local('Rubik-Medium');
}

#userDetailsContainer {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  padding: 10px;
  margin-top: 10px;
  font-family: Rubik-Medium;
  font-size: 14px;
  margin-bottom: -5px;
}

#commentDetailsContainer {
  flex: 3;
  /* background-color: rgb(255, 0, 255); */
  padding: 10px;
  color: grey;
  font-family: Rubik-Regular;
  font-weight: medium;
  margin-bottom: 5px;
}
</style>
