<template>
  <div class="container">
    <div class="loginContainer">
      <div class="loginDetails">
        <form @submit.prevent="login">
          <h2 class="mb-3">Registration</h2>
          <p>Please input your following details</p>
          <div class="input">
            <label for="email">Email </label>
            <input type="email" v-model="email" placeholder="" />
            <br />
            <label for="password">Password </label>
            <input type="password" v-model="password" placeholder="" />
            <br />
          </div>
          <br />
          <br />
          <button class="alternative-option mt-4" style="margin-right: 20px">
            <span @click="backToLogin">Back</span>
          </button>
          <button class="alternative-option mt-4">
            <span @click="register">Submit</span>
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

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
setDoc,
} from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { auth, db } from '../firebase.js';
const router = useRouter();
const email = ref('');
const password = ref('');
const register = async () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log(email.value, 'Successfully Registered');
      alert("You've successfully registered!");
      router.push('./Home');
      const currUserUID = auth.currentUser.uid;
      try {
        const docRef = setDoc(doc(db, 'users', currUserUID), {
          Email: email.value,
          Name: null,
          Age: null,
          Biography: null,
          Experience: null,
          SocialMediaLinks: null,
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

const backToLogin = () => {
  router.push('./');
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
