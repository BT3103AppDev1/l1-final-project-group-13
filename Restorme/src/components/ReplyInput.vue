<template>
      <div id="reply">
         <form id = "replyForm">
        <div id="contentContainer">
          <div id = "topHalfContent">
            <div id="userDetailsContainer">test002@gmail.com</div>
            <button id = "cancelCommentButton" @click = "$emit('remove')">x</button>
          </div>
          <div id="commentDetailsContainer">
            <textarea id="replyDescription" rows="3" cols="35" placeholder="Enter your comment" required></textarea>
            <button id = "saveReplyButton" v-on:click = "saveReplyToFS(comment_id)">Save</button>
          </div>

        </div>
        </form>
      </div>
</template>

<script>
import { auth } from "../firebase";
import { db } from "../firebase";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";

export default {
  name: 'ReplyInput',
  props: ['comment_id'],
  methods: {
    // async getReplyDescription() {
    //   let reply_description = document.getElementById("replyDescription").value;
    //   return reply_description;
    // }

    async saveReplyToFS(comment_id) {

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

      try {
        const docRef = await addDoc(collection(db, "Comments", comment_id, "Reply_Collection"), {
          Reply_ID: "", Comment_ID: comment_id, Upload_Date: dateTime,
          Description: reply_description, Number_Of_Upvotes: upvotesNum, Number_of_Downvotes: downvotesNum,
          Marked_Useful: markedUseful
        })

        console.log(String(docRef.id))
        const replyRef = doc(db, "Comments", comment_id, "Reply_Collection", String(docRef.id))
        await updateDoc(replyRef, {
          Reply_ID: String(docRef.id)
        })
        document.getElementById('replyForm').reset();
        this.$emit("added")
      }
      catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  }

}
</script>


<style scoped>
#reply {
  display: flex;
  flex-direction: row;
  /* background-color: grey; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 20px;
  margin-left: 10%;
}

#replyForm {
  width: 100%;
}

#contentContainer {
  flex: 15;
  display: flex;
  flex-direction: column;
  /* background-color: rgb(255, 0, 0); */
  width: 100%;
}

#topHalfContent {
  display: flex;
  flex-direction: row;
  margin-left: 5%;
}

#userDetailsContainer {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  padding: 10px;
  margin-top: 10px;
  font-family: Rubik-Medium;
  font-size: 14px;
  margin-bottom: -5px;
}

#commentDetailsContainer {
  flex: 3;
  /* background-color: rgb(255, 0, 255); */
  padding: 10px;
  color: grey;
  font-family: Rubik-Regular;
  font-weight: medium;
  margin-bottom: 5px;
}

#replyDescription {
  width: 90%;
  margin-left: 5%;
}

#saveReplyButton {
  width: 15%;
  font-size: 90%;
  height: 20%;
  display: flex;
  flex-direction: row;
  margin-top: 5%;
  margin-left: 5%;
}

#cancelCommentButton {
  background-color: white;
  border: none;
  margin-right: 6%;
}
</style>