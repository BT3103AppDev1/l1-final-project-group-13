<template>
  <div class="container">
    <div class="resumeContainer">
      <div class="headerContainer">
        <h2 class="uploadHeader">Upload Your Resume Here!</h2>
      </div>
      <div class="resumeDetails">
        <form id="resume_form">
          <label class="resumeLabels" for="title">Title </label> <br />
          <input
            id="title1"
            class="resumeInput"
            type="text"
            name="title"
            placeholder="Type here"
          />
          <br />
          <label class="resumeLabels" for="role">Role </label> <br />
          <input
            id="role1"
            class="resumeInput"
            type="text"
            name="role"
            placeholder="Type here"
          />
          <br />
          <label class="resumeLabels" for="location">Location </label> <br />
          <input
            id="location1"
            class="resumeInput"
            type="text"
            name="location"
            placeholder="Type here"
          />
          <br />
          <label class="resumeLabels" for="experience">Experience Level </label>
          <br />
          <input
            id="experience1"
            class="resumeInput"
            type="text"
            name="experience"
            placeholder="Type here"
          />
          <br />
          <label class="resumeLabels" for="additionalInfo"
            >Additional Information
          </label>
          <br />
          <input
            id="additionalinfo1"
            class="resumeInput"
            type="text"
            name="additionalInfo"
            placeholder="Type here"
          />
          <br />
          <div class="pdfDropBox">
            <!-- <div class="dropzone" @dragover.prevent @drop="handleFileDrop">
              Drag & drop files or 
              <input type="file" ref="myfile" />
            </div>
            <p class="dropPdfHeader" id="supportedFileFormat">
              Supported file format: PDF only
            </p> -->

            <input type="file" ref="pdfFile" accept="application/pdf" />
          </div>
          <div id="submitContainer">
            <button type="button" id="submitButton" v-on:click="save">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { dummy_data } from "../data/ResumeData";
import { db, storage } from "../firebase.js";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import exp from "constants";

export default {
  data() {
    return {
      user: false,
      email: "",
      user_id: "",
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      } else {
        this.user = false;
      }
    });
  },

  methods: {
    generateRandomId() {
      const randomChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 10; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        );
      }
      return result;
    },

    async save() {
      const uniqueId = this.generateRandomId();

      // handle the pdf
      const refToUserEmail = "gs://restorme-cf3da.appspot.com/" + this.email;
      console.log(refToUserEmail);

      const path = String(this.email) + "/" + String(uniqueId);

      const storageRef = ref(storage, path);
      uploadBytes(storageRef, this.$refs.pdfFile.files[0]).then((snapshot) => {
        console.log("uploaded!");
      });

      // save the resume details to firestore database

      let title = document.getElementById("title1").value;
      let role = document.getElementById("role1").value;
      let location = document.getElementById("location1").value;
      let experience = document.getElementById("experience1").value;
      let additionalInfo = document.getElementById("additionalinfo1").value;
      let currentdate = new Date();
      let dateTime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

      const user_email = String(this.email);
      console.log(user_email);

      alert(" Saving your data for this resume with this ID: " + uniqueId);

      try {
        const docRef = await setDoc(doc(db, "ResumeInfo", uniqueId), {
          Title: title,
          Role: role,
          Location: location,
          Experience: experience,
          Additional_Info: additionalInfo,
          Resume_Id: uniqueId,
          Date: dateTime,
          Email: this.email,
        });
        document.getElementById("resume_form").reset();
        this.$emit("added");
      } catch (error) {
        console.error("Error adding document: ", error);
      }

      document.getElementById("savebutton").disabled = false;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: scroll;
  /* background-color: #ededed; */
}
.resumeContainer {
  flex: 2;
  background-color: white;
  align-self: center;
  /* margin-left: 300px;
  margin-right: 200px; */
  height: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.headerContainer {
  align-content: center;
}

.uploadHeader {
  text-align: center;
  color: black;
  font-family: 'Montserrat', sans-serif;
  font-size: 25px;
  font-weight: bold;
}

#backgroundImage {
  width: 90%;
  height: 90%;
}

.resumeDetails {
  padding: 20px;
  align-content: center;
  text-align: center;
  background-color: white;
  height: 100%;
}

.resumeInput {
  display: inline-block;
  text-align: left;
  width: 100%;
  display: flex;
  padding: 12px 20px;
  box-sizing: border-box;
  border-color: #b4b2b2;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

form {
  margin-left: 25%;
  text-align: left;
  align-items: center;
  background-color: white;
  width: 50%;
  height: 50%;
}

.pdfDropBox {
  background-color:  #c8d8e4;;
  width: 100%;
  text-align: center;
  border-radius: 0.5%;
  border-color: grey;
  border-style: dotted;
  padding: 20% 0;
  margin: auto;
}

.dropPdfHeader {
  text-align: center;
}

#supportedFileFormat {
  font-size: 80%;
  color: grey;
}

.bolded {
  font-weight: bold;
  color: darkslateblue;
}

.resumeLabel {
  font-size: small;
}

#submitButton {
  color: white;
  margin-top: 1%;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 5%;
  padding-right: 5%;
  background-color:#52ab98;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}


#submitButton:hover {
  background-color:  #3f7d70;;
}

#submitContainer {
  text-align: center;
}
</style>
