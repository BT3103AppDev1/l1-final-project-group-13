<template>
  <div class = "container">
    <div class = "topFilterBar">
        <button class = "filterButtons">All Resumes</button>
        <button class = "filterButtons">Starred Resumes</button>
    </div>
    <div class = "overflow-scroll" id = "resumeListContainer">
        <ul class = "resumeList">
            <li v-for="value in values" :key="value.resume_id">
                <div class = "resumeContainer">
                    <div class = "resumeContainer2">
                        <input type = "checkbox" id = "checkbox" v-model = "checked" />
                        <div class = "topContainer">
                            <label for = "checkbox">
                                <div id = "titleContainer">
                                    <h2 id = "title">{{ value.title }}</h2>
                                </div>
                            </label>
                            <div class = "uploadDetails">
                                Uploaded by {{ value.name }} on {{ value.date }} 
                            </div>
                            <div class = "goToResumeContainer">
                                <button id = "goToResume">></button>
                            </div>
                        </div>
                    </div> 
                    
                    <div class = "tagsContainer">
                        <div class = "tags" id = "experience">{{ value.experience }} Years of Experience</div> 
                        <div class = "tags" id = "role"> {{ value.role }}</div>
                        <div class = "tags" id = "location"> {{ value.location }}</div>
                    </div>
                </div>
                <br/>
                <br/>
            </li>
        </ul>
        </div>
  </div>
</template>

<script>
import { db } from '../firebase.js';
import { doc, collection, getDocs } from "firebase/firestore";
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

// export default {
//     mounted() {
//         async function data() {
//             let resumes = await getDocs(collection(db, "dummyData"));
//             let index = 1;
//             resumes.forEach((docs) => {
//                 let documentData = docs.data()
//                 console.log(docs.data());
//                 let title = (documentData.title)
//                 console.log(title)

//                 let table = document.getElementById("resumes_table")
//                 let row = table.insertRow(index)

//                 let cell1 = row.insertCell(0);
//                 cell1.innerHTML = title;
                
//                 index += 1
//             })
            
//         }
//         data();
//     }
    
// }

export default {
    name: "AllResumes",
    components: {
        PerfectScrollbar
    },
    data: function () {
        return {
            values: [
                {
                    "user_id": "64247f9646a1c53b703f5f47",
                    "resume_id": 1,
                    "experience": "1",
                    "date": "20 Jan 2023",
                    "name": "Cleo Ray",
                    "title": "Applying to MALATHION",
                    "role": "Software Developer",
                    "location": "United Arab Emirates"
                },
                {
                    "user_id": "64247f96c890a2ecc3657ee8",
                    "resume_id": 2,
                    "experience": "2",
                    "date": "20 Jun 2023",
                    "name": "Maria Vinson",
                    "title": "Applying to EXOSWITCH",
                    "role": "Software Engineer",
                    "location": "Kazakhstan"
                },
                {
                    "user_id": "64247f9670ac2432ff780cf5",
                    "resume_id": 3,
                    "experience": "3",
                    "date": "20 Feb 2023",
                    "name": "Jayne Grant",
                    "title": "Applying to SPORTAN",
                    "role": "Data Analyst",
                    "location": "Hong Kong"
                },
                {
                    "user_id": "64247f96521ce02531404d85",
                    "resume_id": 4,
                    "experience": "4",
                    "date": "26 May 2023",
                    "name": "Stephenson Ortiz",
                    "title": "Applying to PHUEL",
                    "role": "Computer Engineer",
                    "location": "Nigeria"
                },
                {
                    "user_id": "64247f969446dab25ab93485",
                    "resume_id": 5,
                    "experience": "5",
                    "date": "14 Apr 2023",
                    "name": "Charlene Hanson",
                    "title": "Applying to PHOLIO",
                    "role": "Software Engineer",
                    "location": "Libya"
                },
                {
                    "user_id": "64247f969446dab25ab93486",
                    "resume_id": 6,
                    "experience": "5",
                    "date": "14 Apr 2023",
                    "name": "Adam Hanson",
                    "title": "Applying to PHOLIO",
                    "role": "Software Engineer",
                    "location": "Libya"
                }
            ]
        };
    }
};
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>

<style scoped>
  .filterButtons {
    width: 30%;
    margin-right: 10%;
    margin-top: 2%;
    margin-left: 3%;
    margin-bottom: 2%;
    display: inline; 
    background: rgb(248, 248, 246);
    border-radius: 12px;
}

.container {
    margin-left: 30%;
    background-color: rgb(248, 248, 246);
    border-width: 0.5%;
    border-style: solid;
    width: 70%;
    position: fixed;
}

.topFilterBar {
    border-bottom-style: solid;
}

.scrollView {
    overflow-y: scroll;
}

#resumeListContainer {
    height: 600px;
}

.resumeList {
    list-style-type: none;
}
.resumeContainer {
    border-bottom-style: solid;
    margin-right: 5%;
}

.resumeContainer2 {
    display: flex;
    flex-direction: row;
}

.topContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

#titleContainer {
    margin-left: 10%;
    width: 300px;
    display: flex;
    flex-direction: row;
}

#title {
    font-family: Helvetica;
    font-weight: normal;
    text-decoration: underline;
    font-size: 150%;
}

.tagsContainer{
    margin-left: 2%;
    margin-bottom: 2%;
}
.tags{
    display: inline;
    border-radius: 12px;
    margin-right: 10%;
    height: 50px;
    padding: 0.5%;
    background-color: rgb(250, 239, 139);
    
}

.uploadDetails {
    width: 16%;
    padding-right: 2%;
    padding-left: 2%;
    font-size: 90%;
    height: 100%;
    border-radius: 12px;
    background-color: rgb(231, 228, 217);
    margin-left: 30%;
}


#goToResume {
    margin-top: 100%;
    background-color:rgb(248, 248, 246);
    border: none;
    font-size: 150%;
}



</style>