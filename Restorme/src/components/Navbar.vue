<template>
  <nav>
    <div v-if="name" id="logo">
      {{ name }}
    </div>
    <div v-else id="logo">
      <img v-bind:src="logoImg" alt="Logo" />
    </div>
  </nav>
</template>

<script>
import { CNavbar, CNavbarBrand, CNavbarNav } from '@coreui/vue';

export default {
  name: 'Navbar',
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
}
</style>
