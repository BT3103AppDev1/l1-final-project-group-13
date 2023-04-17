<template>
  <div id="profileContainer">
    <div id="routerContainer">
      <SidebarRouter />
    </div>
    <div id="contentContainer">
      <h2 style="align-self: self-start">Account Settings</h2>
      <div id="formContainer">
        <form id="profile_form">
          <div class="input">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" />
          </div>
          <br />
          <div class="input">
            <label for="age">Age:</label>
            <input type="text" id="age" v-model="age" />
          </div>
          <br />
          <div id="bioInput">
            <label for="biography">Biography:</label>
            <textarea type="text" id="biography" v-model="biography">
            </textarea>
          </div>
          <br />
          <div class="input">
            <label for="experience">Experience:</label>
            <input type="text" id="experience" v-model="experience" />
          </div>
        </form>
      </div>
      <!-- <div class="input">
        <label for="socMedia">Social Media Links:</label>
        <input type="text" id="socMedia" v-model="socMedia" />
      </div> -->

      <button type="button" id="submitButton" v-on:click="save">
        Save Changes
      </button>
    </div>
  </div>
</template>

<script>
import SidebarRouter from '../components/SidebarRouter.vue';
import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@firebase/firestore';
import { async } from '@firebase/util';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase';

export default {
  name: 'Profile',
  components: {
    SidebarRouter,
  },

  data() {
    return {
      user: false,
      email: '',
      user_id: '',
    };
  },

  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        console.log(user.email);
        const userNameRef = await getDoc(doc(db, 'users', user.email));
        console.log(userNameRef.data());
        const userName = userNameRef.data().Name;
        const age = userNameRef.data().Age;
        const biography = userNameRef.data().Biography;
        const experience = userNameRef.data().Experience;
        document.getElementById('name').placeholder = String(userName);
        document.getElementById('age').placeholder = String(age);
        document.getElementById('biography').placeholder = String(biography);
        document.getElementById('experience').placeholder = String(experience);
      } else {
        this.user = false;
      }
    });
  },
  methods: {
    async save() {
      // save the user details to firestore database

      let name = document.getElementById('name').value;
      let age = document.getElementById('age').value;
      let biography = document.getElementById('biography').value;
      let experience = document.getElementById('experience').value;
      //let socMedia = document.getElementById("socMedia").value;

      const user_email = String(this.email);
      console.log(user_email);

      alert(
        ' Saving your data for this user:' + name + age + biography + experience
      );

      try {
        const docRef = await updateDoc(doc(db, 'users', user_email), {
          Name: name,
          Age: age,
          Biography: biography,
          Experience: experience,
          //SocialMediaLinks: socMedia
        });
        document.getElementById('profile_form').reset();
        this.$emit('added');
      } catch (error) {
        console.error('Error adding document: ', error);
      }

      document.getElementById('savebutton').disabled = false;
    },
  },
};
</script>

<style>
#profileContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 98vw;
  /* padding: 60px 25px; */
}
#routerContainer {
  flex: 1;
  /* background-color: yellow; */
  align-self: center;
  height: 95vh;
  margin-top: 60px;
}
#contentContainer {
  flex: 4.5;
  /* background-color: rgb(0, 255, 0); */
  align-self: center;
  height: 95vh;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#formContainer {
  display: inline;
  text-align: left;
  align-self: center;
  align-items: center;
  padding: 12px 20px;
  box-sizing: border-box;
  border-color: #b4b2b2;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: white;
  width: 1000px;
}

#name {
  width: 100%;
}

#age {
  padding: 10px;
  width: 100%;
}

#name {
  padding: 10px;
}

#bioInput {
  display: flex;
  align-items: center;
}

#experience {
  padding: 10px;
  width: 100%;
}

#submitButton {
  color: white;
  margin-top: 1%;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #52ab98;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 20%;
  align-items: center;
}

textarea {
  width: 1000px;
}
</style>
