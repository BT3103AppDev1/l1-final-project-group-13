<template>
    <h1>Create an Account</h1>
    <p><input type = "text" placeholder="Email" v-model="email" /></p>
    <p><input type = "text" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, doc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import {auth, db} from "../firebase.js";


const router = useRouter();
const email = ref("");
const password = ref("");
const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log("Successfully Registered");
        router.push('./Home');
    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message)
    })
    try {
        const docRef = addDoc(collection(db, "users"), {
        Email: email.value,
        Name: null,
        Age: null,
        Biography: null,
        Experience: null,
        SocialMediaLinks: null,
    });
    console.log("Document written with ID: ", docRef.id);
    } catch(e) {
    console.error("Error adding document: ", e);
    }


};
</script>
