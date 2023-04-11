<template>
  <div id = "largeContainer" >
    <div id="comment">
      <div id="votesContainer">
        <div class="vote">+</div>
        <div class="voteCount">3</div>
        <div class="vote">-</div>
      </div>
      <div id = "commentContentsContainer">
        <div id="commentsTopHalfContent">
          <div id="userDetailsContainer">test002@gmail.com</div>
          <img src="../assets/reply.png" id="replyButton" v-on:click="component = 'reply-input'"/>
        </div>
        <div id="commentDetailsContainer">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat autem
          maiores nemo, distinctio, modi consequuntur dolorem velit doloribus iure
          illum rem voluptatum est, enim commodi cumque corporis pariatur quaerat
          dicta.
        </div>
      </div>
    </div>

    <component v-bind:is="component" @remove="cancelComment()" v-bind:comment_id='comment_id'></component>

  <div class="container">
    <form id="myform">
      <h2>Add Comments</h2>

      <div class="formli">

        <label for="commentType">Category:</label>
        <select id="category" v-model="selected">
          <option disabled value="">Please Select a Category</option>
          <option>General</option>
          <option>Education</option>
          <option>Experience</option>
          <option>Projects</option>
          <option>Skills</option>
        </select>
        <br /><br />

        <label for="Description">Description: </label>
        <textarea id="Description" rows="4" cols="50" placeholder="Enter your comment" required></textarea>
        <br /><br />

        <div class="save">
          <button id="savebutton" type="button" v-on:click="saveCommentToFS(12345678)">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { db } from "../firebase";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import ReplyInput from "./ReplyInput.vue";

const comments_collection = collection(db, "Comments");
console.log(comments_collection)


export default {
  components: {
    "reply-input": ReplyInput
  },

  mounted() {
    const commentCollection = collection(db, "Comment_Collection");
  },

  data() {
    return {
      component: null,
      new_reply: "",
      comment_id: "AGEeFQOAGfpxxrlEdkjl",
      comment_user: "test002@gmail.com",
    }
  },

  methods: {

    async getCommentsData() {
      let commentsDataDocRef = collection(db, 'Comments');
      let snapshot = await getDocs(commentsDataDocRef);
      this.values = await Promise.all(
        snapshot.docs.map(async (doc) => {
          let documentData = doc.data();
          console.log(documentData);
          let description = documentData['Description'];
          // console.log(name);
          let user = documentData['User'];
          let date = documentData['Upload_Date'].toDate().toDateString();;
          let upvotes = documentData['Number_Of_Upvotes'];
          let downvotes = documentData['Number_of_Downvotes'];
          return {
            description,
            user,
            date,
            upvotes,
            downvotes
          };
        })
      );
    },

    async saveCommentToFS(resumeID) {
      const commentCollection = collection(db, "Comment_Collection")
      const user = auth.currentUser;
      const userUID = auth.currentUser.uid;
      console.log("IN AC")

      /*
       * A COMMENT SHOULD HAVE
       * COMMENT_ID /
       * COMMENT_TYPE /
       * USER_UID / 
       * RESUME_ID / 
       * DATE / 
       * DESCRIPTION (COMMENT) /
       * NO. OF UPVOTES /
       * NO. OF DOWNVOTES /
       * MARKED USEFUL / 
       * REPLIES - TBC
       */
      let resume_id = resumeID;
      let comment = document.getElementById("Description").value;
      let category = document.getElementById("category");
      let categoryValue = category.value
      let categoryText = category.options[category.selectedIndex].text;

      let currentdate = new Date();
      let dateTime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
      //let uploadDate = Math.floor(Date.now() /1000)

      let upvotesNum = 0;
      let downvotesNum = 0;
      let markedUseful = false;
      let replies = "to be confirmed";


      alert(" Saving your data for Comment : " + comment + categoryText + dateTime +
        userUID + upvotesNum + downvotesNum + markedUseful + replies)

      try {
        const docRef = await addDoc(collection(db, "Comments"), {
          Comment_ID: "", Resume_ID: resume_id, Comment_Category: categoryText, User: userUID, Upload_Date: dateTime,
          Description: comment, Number_Of_Upvotes: upvotesNum, Number_of_Downvotes: downvotesNum,
          Marked_Useful: markedUseful, Replies: replies
        })

        console.log(String(docRef.id))
        const commentsRef = doc(db, "Comments", String(docRef.id))
        await updateDoc(commentsRef, {
          Comment_ID: String(docRef.id)
        })
        document.getElementById('myform').reset();
        this.$emit("added")
      }
      catch (error) {
        console.error("Error adding document: ", error);
      }

    },

    cancelComment() {
      this.component = null;
    },

    


  }
}
/* 

export default {
  methods: {
    async saveCommentToFS(downloadUrl) {
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
} */
</script>

<style>
h2 {
  background-color: antiquewhite;
  align-items: center;
  text-align: center;
}

.formli {
  display: inline-block;
  text-align: left;
}

form {
  text-align: left;
  align-items: center;
  margin: auto;
  height: 50%;
}

input:hover {
  box-shadow: 1px 1px seagreen;
  border-radius: 2px;
}

input[type="text"] {
  width: 20em;
}

select {
  width: 20em;
}

#largeContainer {
  height: 500px;
  width: 380px;
}

#comment {
  display: flex;
  /* background-color: grey; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  height: 50%;
}

#votesContainer {
  /* background-color: rgb(0, 153, 255); */
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Rubik-Medium;
  flex-direction: column;
  background-color: #f5f6fa;
  border-radius: 50px;
  margin: 5%;
  width: 40%;
}

.vote {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #c5c6ef;
}

.voteCount {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5357b6;
}

#commentContentsContainer{
  margin-left: 1%;
}


#commentsTopHalfContent {
  display: flex;
  flex-direction: row;
  height: 10%;
  width: 90%;
  margin-top: 10%;
  margin-bottom: 10%;
}

@font-face {
  font-family: 'Rubik-Regular';
  src: local('Rubik-Regular');
}

@font-face {
  font-family: 'Rubik-Medium';
  src: local('Rubik-Medium');
}

#userDetailsContainer {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  font-family: Rubik-Medium;
  font-size: 100%;
  margin-bottom: -5%;
}

#commentDetailsContainer {
  /* background-color: rgb(255, 0, 255); */
  color: grey;
  font-family: Rubik-Regular;
  font-weight: medium;

}

#replyButton {
  height: 100%;
  margin-right: 2%;
  padding-right: 10%;
}

#replyButton:hover {
  background-color: lavender;
}
</style>
