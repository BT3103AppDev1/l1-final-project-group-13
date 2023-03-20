<script>
import Login from './views/Login.vue';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Login,
    Navbar,
  },
};
</script>
<template>
  <Navbar />
  <router-view />
</template>
<style scoped></style>
