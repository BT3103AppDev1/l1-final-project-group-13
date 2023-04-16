<template>
  <div id="reply">
    <form id="replyForm">
      <div id="replyContentContainer">
        <div id="topHalfContent">
          <div id="userDetailsContainer">
            <text v-if = "user">{{ user.email }}</text></div>
          <button id="cancelCommentButton" @click="$emit('remove')">x</button>
        </div>
        <div id="commentDetailsContainer">
          <textarea id="replyDescription" rows="3" cols="35" placeholder="Enter your comment" required></textarea>
          <button id="saveReplyButton" v-on:click="saveReplyToFS(resume_id, comment_id)">Save</button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
import { db } from "../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default {
  name: 'ReplyInput',
  props: ['comment_id', 'resume_id', 'componentKey'],
  
  mounted() {
    const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
    },

    data() {
      return {
        user: false,
      }
    },

  methods: {
    // async getReplyDescription() {
    //   let reply_description = document.getElementById("replyDescription").value;
    //   return reply_description;
    // }

    async saveReplyToFS(resume_id, comment_id) {

      //const commentDocument = doc(db, "Comments", comment_id);
      console.log(comment_id);
      let reply_description = document.getElementById("replyDescription").value;
      let currentdate = new Date();
      let dateTime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

      let upvotesNum = 0;
      let downvotesNum = 0;
      let markedUseful = false;
      let user = this.user.email

      try {
        const docRef = await addDoc(collection(db, `/ResumeInfo/${resume_id}/Comments/${comment_id}/Replies`), {
          Reply_ID: "", Comment_ID: comment_id, Upload_Date: dateTime,
          Description: reply_description, Number_Of_Upvotes: upvotesNum, Number_of_Downvotes: downvotesNum,
          Marked_Useful: markedUseful, User: user
        })

        console.log(String(docRef.id))
        const replyRef = doc(db, "ResumeInfo", resume_ID, "Comments", comment_id, "Reply_Collection", String(docRef.id))
        await updateDoc(replyRef, {
          Reply_ID: String(docRef.id)
        })
        document.getElementById('replyForm').reset();
        this.$emit("added")
      }
      catch (error) {
        console.error("Error adding document: ", error);
      }
      this.$emit('rerender')
    }
  }

}
</script>


<style scoped>
#reply {
  /* background-color: grey; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 20px;
  margin-left: 10%;
  margin-top: 5%;
  height: 30%;
}

#replyForm {
  width: 100%;
}

#replyContentContainer {
  display: flex;
  flex-direction: column;
  /* background-color: rgb(255, 0, 0); */
  width: 100%;
  height: 50%;
}

#topHalfContent {
  display: flex;
  flex-direction: row;
  margin-left: 5%;
  margin-top: 5%;

}

#userDetailsContainer {
  /* background-color: rgb(0, 255, 0); */
  font-family: Rubik-Medium;
  font-size: 14px;
  
}

#commentDetailsContainer {
  /* background-color: rgb(255, 0, 255); */
  color: grey;
  font-family: Rubik-Regular;
  font-weight: medium;
  margin-bottom: 5px;
}

#replyDescription {
  width: 90%;
  margin-left: 5%;
  margin-top: 5%;
  font-family:'Times New Roman', Times, serif;
}

#saveReplyButton {
  font-size: 80%;
  height: 20%;
  margin-left: 74%;
  margin-top: 1%;
  background-color: orange;
  border-color: orange;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

#saveReplyButton:hover {
  background-color: darkorange;
  border-color: darkorange;
}

#cancelCommentButton {
  background-color: white;
  border: none;
  margin-right: 6%;
}
</style>