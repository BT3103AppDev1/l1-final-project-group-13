<template>

</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp);
const userUID = auth.currentUser.uid;

export default {
  methods: {
    async saveResumeToFirestore(downloadUrl) {
        console.log("IN AC") 

        let title  = document.getElementById("title1").value
        let role  = document.getElementById("role1").value
        let location  = document.getElementById("location1").value
        let expLevel =  document.getElementById("expLevel1").value
        let addInfo =  document.getElementById("addInfo1").value
        let uploadDate = firestore.Fieldvalue.serverTimestamp();

    alert(" Saving your data for Resume : " + title + role + location + expLevel + addInfo) 

    try{
      const docRef = await setDoc(doc(db, "Resume"),{
        Resume_ID: "", Title: title , Role : role, Location: location, 
        Experience_Level : expLevel, Additional_Info: addInfo, Upload_Date: uploadDate,
        Download_Url : downloadUrl, User: userUID
      })

      console.log(docRef)
      await updateDoc(doc(db, "Resume"), {
        "Resume_ID": docRef
      })
      //document.getElementById('myform').reset();
      //this.$emit("added")
      }
    catch(error) {
        console.error("Error adding document: ", error);
    }
      }
  }
}
</script>

<style scoped>

</style>