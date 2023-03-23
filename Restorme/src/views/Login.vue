<template>
  <div class="container">
    <div class="loginContainer">
      <div class="loginDetails">
        <form @submit.prevent="login">
          <h2 class="mb-3">Welcome!</h2>
          <p>It is great to see you back</p>
          <div class="input">
            <label for="email">Email </label>
            <input type="email" name="email" placeholder="" /> <br />
            <label for="password">Password </label>
            <input type="password" name="password" placeholder="" /> <br />
          </div>
          <br />
          <br />
          <button type="submit" class="mt-4 btn-pers" id="login_button">
            Login
          </button>
          <br />
          <br />
          <button class="alternative-option mt-4">
            <span @click="moveToRegister"
              >Don't have an account? Register here!</span
            >
          </button>
        </form>
      </div>
    </div>
    <div class="loginBackgroundContainer">
      <div id="backgroundImage">
        <img
          src="../assets/login background.png"
          alt="Login Background"
          id="backgroundImage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login(submitEvent) {
      this.email = submitEvent.target.elements.email.value;
      this.password = submitEvent.target.elements.password.value;
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          console.log('Successfully logged in');
          this.$router.push('/home');
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    },
    moveToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #ededed;
}
.loginContainer {
  flex: 2;
  /* background-color: yellow; */
  align-self: center;
  margin-left: 70px;
}
.loginBackgroundContainer {
  flex: 3;
  margin-top: 50px;
  margin-left: 90px;
  /* background-color: green; */
}

#backgroundImage {
  width: 90%;
  height: 90%;
}

.loginDetails {
  padding: 20px;
}

.input {
  display: inline-block;
  text-align: right;
}

form {
  text-align: center;
  align-items: center;
  margin: auto;
}
</style>
