<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);


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
        
                    <button id = "savebutton" type ="button" > Save</button><br><br>
                </form>    
</template>

<!--<button id = "savebutton" type ="button" v-on:click = "savetofs()"> Save</button><br><br></br>-->

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