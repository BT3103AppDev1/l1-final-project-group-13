<template>
  <div class="navbar">
    <div class="navbar_logo_container">
      <img src="../assets/logo.png" alt="Logo" id="navbar-logo" />
      <p class="navbar-text">Restormé</p>
    </div>
    <div class="user_details_container" v-if="user">
      <text v-if="user">
        {{ user.email }}
      </text>
    </div>
    <div class="signOutContainer">
      <button @click="signOutFunction" v-if="user" class="navbar-button">
        Sign Out
      </button>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  name: 'Navbar',
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

  methods: {
    signOutFunction() {
      const auth = getAuth();
      const user = auth.currentUser;
      console.log(user.email, 'signed out');
      signOut(auth, user);
      this.$router.push('/');
    },
  },
};
</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 999;
}

.navbar_logo_container {
  flex: 1;
  display: flex;
  align-content: center;
  align-items: center;
}

.user_details_container {
  flex: 8;
  display: flex;
  align-content: center;
  justify-content: flex-end;
}

#navbar-logo {
  height: 40px;
  margin-right: 12px;
}

.navbar-text {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.signOutContainer {
  flex: 1;
  display: flex;
  align-content: center;
  justify-content: center;
}

.navbar-button {
  border-radius: 5px;
}
</style>
