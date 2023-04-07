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
            <button id = "saveReplyButton" v-on:click = "saveReply('AGEeFQOAGfpxxrlEdkjl')">Save</button>
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
  props: ['comment_id', 'comment_user', 'component'],
  methods: {
    async saveReply(comment_ID) {
      const commentDocument = doc(db, "Comments", comment_ID);
      console.log(commentDocument);
      //const user = auth.currentUser;
      //const userUID = auth.currentUser.uid;
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

      let comment = document.getElementById("replyDescription").value;
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


      // alert(" Saving your data for Comment : " + comment + categoryText + dateTime +
      //   userUID + upvotesNum + downvotesNum + markedUseful + replies)

      // try {
      //   const docRef = await addDoc(collection(db, "Comments", comment_ID, "Replies"), {
      //     Reply_ID: "", Comment_ID: comment_ID, Upload_Date: dateTime,
      //     Description: comment, Number_Of_Upvotes: upvotesNum, Number_of_Downvotes: downvotesNum,
      //     Marked_Useful: markedUseful
      //   })

      //   console.log(String(docRef.id))
      //   const replyRef = doc(db, "Comments", comment_ID, "Replies", String(docRef.id))
      //   await updateDoc(replyRef, {
      //     Reply_ID: String(docRef.id)
      //   })
      //   document.getElementById('replyForm').reset();
      //   this.$emit("added")
      // }
      // catch (error) {
      //   console.error("Error adding document: ", error);
      // }

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

#contentContainer {
  flex: 15;
  display: flex;
  flex-direction: column;
  /* background-color: rgb(255, 0, 0); */
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