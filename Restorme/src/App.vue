<script>
import Login from './views/Login.vue';
export default {
  components: {
    Login,
  },
};
</script>
<template>
  <Login />
  <nav>
    <router-link to="/register"> Don't have an account? Register here! </router-link>
  </nav>
  <router-view/>
</template>
<style scoped></style>
