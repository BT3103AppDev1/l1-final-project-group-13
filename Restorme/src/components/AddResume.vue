<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    methods: {
        async savetofs() {
            console.log("IN AC")

            let title = document.getElementById("title").value
            let role = document.getElementById("role").value
            let location = document.getElementById("location").value
            let expLevel = document.getElementById("expLevel").value
            let addInfo = document.getElementById("addInfo").value

            alert(" Saving your data for resume : " + title)

            try{
                const docRef = await setDoc(doc(db, "Portfolio", title),{
                    Title: title, Role: role, Location: location, ExperienceLevel: expLevel, AdditionalInfo: addInfo
                })
                console.log(docRef)
                document.getElementById('userForm').reset();
                this.$emit("added")
            }
            catch(error) {
                console.error("Error adding document: ", error);
            }
        }
    }
        
}
</script>

<template>
<div id = "Container"></div>
                <h1 class = "titleOfDiv"> Add Resumes</h1>
                <form id = "userForm"> 
                    
                    <label for = "title"> Title:</label>
                    <input type = "text" id = "title" required = "" placeholder="Title"> <br><br>

                    <label for = "role"> Role:</label>
                    <input type = "text" id = "role" required = "" placeholder="Role"> <br><br>

                    <label for = "location"> Location:</label>
                    <input type = "number" id = "location" required = "" placeholder="Location"> <br><br>

                    <label for = "expLevel"> Experience Level:</label>
                    <input type = "number" id = "expLevel" required = "" placeholder="Experience Level"> <br><br>

                    <label for = "addInfo"> Additional Information:</label>
                    <input type = "number" id = "addInfo" required = "" placeholder="Additional Information"> <br><br>
        
                    <button id = "savebutton" type ="button" v-on:click = "savetofs()"> Save</button><br><br>
                </form>    
</template>

<style scoped>
h1{
    background-color: rgb(129,184,99);
}

.titleofDiv {
    display: inline-block;
    text-align: right;
}

form {
    text-align: center;
    align-items: center;
    margin: auto;
}

input hover{
    box-shadow: 3px 3px purple;
    border-radius: 2px;
}

.savebutton {
    text-align: center;
}

label {
    display:inline-block;
    text-align:right;
    width: 95px;
}
</style>