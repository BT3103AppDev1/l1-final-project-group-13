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
  <div class="app-header">
    <header>
      <Navbar />
    </header>
  </div>
  <div>
    <main class="container">
      <router-view />
    </main>
  </div>
  <!-- <nav>
    <router-link to="/register">
      Don't have an account? Register here!
    </router-link>
  </nav> -->
</template>
<style scoped></style>
