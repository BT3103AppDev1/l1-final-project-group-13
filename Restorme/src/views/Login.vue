<template>
  <div class="container">
    <div class="loginContainer">
      <div class="loginDetails">
        <form @submit.prevent="login">
          <h2 class="mb-3">Welcome!</h2>
          <h3>It is great to see you back</h3>
          <div class="input">
            <label for="email">Email address</label>
            <input
              class="form-control"
              type="text"
              name="email"
              placeholder="email@adress.com"
            />
          </div>
          <div class="input">
            <label for="password">Password</label>
            <input
              class="form-control"
              type="password"
              name="password"
              placeholder="password123"
            />
          </div>

          <button type="submit" class="mt-4 btn-pers" id="login_button">
            Login
          </button>
          <div class="alternative-option mt-4">
            <span @click="moveToRegister"
              >Don't have an account? Register here!</span
            >
          </div>
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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.$router.push('/dashboard');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          let alert_1 = document.querySelector('#alert_1');
          alert_1.classList.remove('d-none');
          alert_1.innerHTML = errorMessage;
          console.log(alert_1);
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
</style>
