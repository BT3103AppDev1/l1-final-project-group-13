<template>
    <div class="profileContainer">
        <form id="profile">
            <label for="name">Name:
                <text v-if="user">
                    {{ name }}
                </text>
            </label>
            <input type="text" id="name"> <br>

            <label for="name">Age:
                <text v-if="user">
                    {{ age }}
                </text>
            </label>
            <input type="text" id="age"> <br>

            <label for="name">Biography:
                <text v-if="user">
                    {{ biography }}
                </text>
            </label>
            <input type="text" id="biography"> <br>
        </form>

        <button @click="retrieve">
            Load data
        </button>
    </div>
</template>

<script>
// https://firebase.google.com/docs/auth/web/manage-users#get_a_users_provider-specific_profile_information
import { getAuth, onAuthStateChanged } from "firebase/auth";

// https://firebase.google.com/docs/firestore/query-data/get-data#initialize
// https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { auth, db } from '../firebase.js';

export default {
    name: 'Profile',
    data() {
        return {
            name: '',
            age: '',
            biography: '',
        };
    },

    methods: {
        async retrieve() {
            // const db = getFirestore();
            console.log(db);
            // const auth = getAuth();
            console.log(auth);
            const user = auth.currentUser;
            console.log(user);

            if (user !== null) {
                user.providerData.forEach((profile) => {
                    console.log("  Email: " + profile.uid);
                });

                //retrieve user's firestore document
                const docRef = doc(db, "users", "MAF1zhAVv57j08quRwFC"); //user.uid
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    console.log("data type: ", typeof(docSnap.data()))
                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
        }
    }
}

</script>

<style>
#profileContainer {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>