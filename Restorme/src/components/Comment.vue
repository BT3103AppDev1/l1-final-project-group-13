<template>
  <head>
    <link rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  </head>
  <div id = "largeContainer" >
    <h1 id="commentHeader">Comments</h1>
    <ul style = "list-style-type: none;">
      <li v-for = "cat in categories" >
        <i class="material-symbols-outlined">{{ category_icons[cat] }}</i>
          <span id="categoryDivider">{{cat}}</span>
      <ul style = "list-style-type: none;">
        <li v-for = "value in categorizeComment(values, cat)" key: value.comment_id>
      <div id="comment">
        <div id="votesContainer">
          <div class="vote" v-on:click = "upvoteComment(resume_id, value.comment_id, value.userHasUpvotedThisComment, value.userHasDownvotedThisComment)">+</div>
          <div class="voteCount">{{ value.upvotes - value.downvotes }}</div>
          <div class="vote" v-on:click = "downvoteComment(resume_id, value.comment_id, value.userHasUpvotedThisComment, value.userHasDownvotedThisComment)" >-</div>
        </div>
        <div id = "commentContentsContainer">
          <div id="commentsTopHalfContent">
            <div id="userDetailsContainer">@{{ value.user }}</div>
            <img src="../assets/reply.png" id="replyButton" v-on:click="showReply(value.comment_id)"/>
          </div>
          <div id="commentDetailsContainer">
            {{ value.description }}
          </div>
          <div id="commentDateContainer">
            Posted {{ value.date }}
          </div>
        </div>
      </div>
      <ul style = "list-style-type: none;">
        <li v-for = "reply in value.replies" >
          <div>
              <div id="reply">
                <div id="replyVotesContainer">
                  <div class="vote">+</div>
                  <div class="voteCount">3</div>
                  <div class="vote">-</div>
                </div>
                <div id = "replyContentsContainer">
                  <div id="replyTopHalfContent">
                    <div id="userDetailsContainer">@{{ reply.reply_user }}</div>
                  </div>
                  <div id="replyDetailsContainer">
                    {{ reply.reply_description }}
                  </div>
                  <div id="replyDateContainer">
                    Posted {{ reply.reply_date }}
                  </div>
                </div>
          </div>
          </div>
        </li>
      </ul>
       <component v-if="value.comment_id == this.comment_id" v-bind:is="component" @remove="cancelComment()" v-bind:comment_id='value.comment_id' v-bind:resume_id = resume_id :key = 'componentKey' @rerender="forceRerender()"></component>
      </li>
      </ul>

      </li>
    </ul>
    
   

  <div class="container">
    <form id="myform">
      <h2 id = "addCommentHeader">Add New Comment</h2>

      <div class="formli">

        <label for="commentType">Category:</label>
        <select id="category" v-model="selected" required>
          <option disabled value="">Please Select a Category</option>
          <option>General</option>
          <option>Education</option>
          <option>Experience</option>
          <option>Projects</option>
          <option>Skills</option>
        </select>
        <br /><br />

        <label for="descriptionBox">Description: </label>
        <textarea id="descriptionBox" rows="4" cols="50" placeholder="Enter your comment" required></textarea>
        <br /><br />

        <div class="save">
          <button id="saveButton" type="button" v-on:click="saveCommentToFS(resume_id)">
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
import { addDoc, collection, doc, getDoc, updateDoc, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReplyInput from "./ReplyInput.vue";
//import Profile from "@/views/Profile.vue";

// const comments_collection = collection(db, "Comments");
// console.log(comments_collection)
//import OtherProfile from "../views/OtherProfile.vue"

export default {
  props: ['resume_id', 'key'],
  components: {
    "reply-input": ReplyInput
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getCommentsData();
        this.email = user.email;
      }
    });
  },

  data() {
    return {
      component: null,
      new_reply: "",
      comment_id: "",
      comment_user: "",
      values: [],
      categories: ['General', 'Education', 'Experience', 'Projects', 'Skills'],
      category_icons: {
        'General': 'badge',
        'Education': 'school',
        'Experience': 'business_center',
        'Projects': 'integration_instructions',
        'Skills': 'auto_awesome'
      },
      componentKey: 0,
      categorize : null
    }
  },

  methods: {

    async getCommentsData() {
      let commentsDataDocRef = collection(db, "ResumeInfo", this.resume_id, "Comments");
      let snapshot = await getDocs(commentsDataDocRef);
      this.values = await Promise.all(
        snapshot.docs.map(async (docu) => {
          let documentData = docu.data();
          let comment_id = documentData['Comment_ID']
          let description = documentData['Description'];
          // console.log(name);
          let user = documentData['User'];
          let date = documentData['Upload_Date'];
          let upvotes = documentData['Number_Of_Upvotes'];
          let downvotes = documentData['Number_of_Downvotes'];
          let category = documentData['Comment_Category']
          let repliesDataDocRef =  collection(db, `ResumeInfo/${this.resume_id}/Comments/${comment_id}/Replies`);
          let snapshot_replies = await getDocs(repliesDataDocRef);
          console.log(snapshot_replies);
          var replies = []
          snapshot_replies.forEach((reply_doc) => {
            let replyData = reply_doc.data()
            let reply = {
              reply_id: replyData['Reply_ID'],
              reply_description: replyData['Description'],
              reply_user: replyData['User'],
              reply_date: replyData['Upload_Date']

            }
            replies.push(reply)
          })
          console.log(replies)

          let userHasUpvotedThisComment = null;
          let userHasDownvotedThisComment = null;

          let userHasVotedOnThisCommentRef = doc(db, 'users', this.email);
          let getUserVotesOnThisComment = await getDoc(userHasVotedOnThisCommentRef).then(
            (doc) => {
              // console.log('Document data:', doc);
              let userInfo = doc.data();
              // console.log('UserInfo: ', userInfo);
              let commentsUpvoted = userInfo['CommentsUserUpvoted'];
              let commentsDownvoted = userInfo['CommentsUserDownvoted'];
              // console.log('userStarredResumes: ', userStarredResumes);
              userHasUpvotedThisComment = commentsUpvoted.includes(this.resume_id);
              userHasDownvotedThisComment = commentsDownvoted.includes(this.resume_id);
            })
            
          return {
            comment_id,
            description,
            user,
            date,
            upvotes,
            downvotes,
            category,
            replies,
            userHasUpvotedThisComment,
            userHasDownvotedThisComment
          };
        })
      );
    },

    async saveCommentToFS(resume_id) {
      // const commentCollection = collection(db, "Comment_Collection")
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
      let resume_ID = resume_id;
      let comment = document.getElementById("descriptionBox").value;
      let category = document.getElementById("category");
      let categoryValue = category.value
      if (category.selectedIndex === -1) {
        alert("Please select a category")
        return
      }
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

      // if (category.selectedIndex === -1) {
      //   alert("Please select a category")
      //   return
      // }
    
      if (comment == "") {
        alert("Please enter a comment")
        return
      }

      alert(" Your comment has been saved! ")

      try {
        const docRef = await addDoc(collection(db, "ResumeInfo", resume_ID, "Comments"), {
          Comment_ID: "", Resume_ID: resume_ID, Comment_Category: categoryText, User: userUID, Upload_Date: dateTime,
          Description: comment, Number_Of_Upvotes: upvotesNum, Number_of_Downvotes: downvotesNum,
          Marked_Useful: markedUseful, Replies: replies
        })

        console.log(String(docRef.id))
        const commentsRef = doc(db, "ResumeInfo", resume_ID, "Comments", String(docRef.id))
        await updateDoc(commentsRef, {
          Comment_ID: String(docRef.id)
        })
        document.getElementById('myform').reset();
        this.$emit("added")
      }
      catch (error) {
        console.error("Error adding document: ", error);
      }
      // this.$emit('rerender');
      this.getCommentsData()

    },

    async upvoteComment(resume_id, comment_id, userHasUpvotedThisComment, userHasDownvotedThisComment) {
      let commentsDocRef = doc(db, "ResumeInfo", resume_id, "Comments", comment_id);
      let commentDocSnap = await getDoc(commentsDocRef)
      let commentData = commentDocSnap.data()

      let commentsUpvoted = []
      let commentsDownvoted = []

      let userHasVotedOnThisCommentRef = doc(db, 'users', this.email);
      let getUserVotesOnThisComment = await getDoc(userHasVotedOnThisCommentRef).then(
        (doc) => {
          // console.log('Document data:', doc);
          let userInfo = doc.data();
          // console.log('UserInfo: ', userInfo);
          commentsUpvoted = userInfo['CommentsUserUpvoted'];
          console.log('commentsUpvoted: ', commentsUpvoted);
          commentsDownvoted = userInfo['CommentsUserDownvoted'];
          console.log('commentsDownvoted: ', commentsDownvoted);
          // console.log('userStarredResumes: ', userStarredResumes);
        })


      if (commentsUpvoted.includes(resume_id)) {
        // console.log('user has already starred this resume');
        commentsUpvoted = commentsUpvoted.filter(item => item !== resume_id)

        let updateUpvotedComments = await updateDoc(userHasVotedOnThisCommentRef, {
          CommentsUserUpvoted: commentsUpvoted,
      });

        let upvotes = commentData['Number_Of_Upvotes']
        const newUpvote = {
          Number_Of_Upvotes: upvotes - 1,
        };
        updateDoc(commentsDocRef, newUpvote)
        .then(commentsDocRef => {
            console.log("User's upvote has been removed");
        })
        .catch(error => {
          console.log(error);
      })

        // this.forceRerender()
        // this.getCommentsData()
        // this.values = this.values
        // this.categories = this.categories
      }
      else if (commentsDownvoted.includes(resume_id)) {
        commentsDownvoted = commentsDownvoted.filter(item => item !== resume_id)
        commentsUpvoted.push(resume_id)

        let upvotes = commentData['Number_Of_Upvotes']
        const newUpvote = {
          Number_Of_Upvotes: upvotes + 1,
        };
        updateDoc(commentsDocRef, newUpvote)
        .then(commentsDocRef => {
            console.log("User's upvote has been added");
        })
        .catch(error => {
          console.log(error);
        })

        let downvotes = commentData['Number_of_Downvotes']
        const newDownvote = {
          Number_of_Downvotes: downvotes - 1,
        };
        updateDoc(commentsDocRef, newDownvote)
        .then(commentsDocRef => {
            console.log("User's downvote has been removed");
        })
        .catch(error => {
          console.log(error);
        })

        let updateUpvotedComments = await updateDoc(userHasVotedOnThisCommentRef, {
          CommentsUserUpvoted: commentsUpvoted,
      });
      // this.forceRerender()
      }
      else {
        let upvotes = commentData['Number_Of_Upvotes']
        const newUpvote = {
          Number_Of_Upvotes: upvotes + 1,
        };
        updateDoc(commentsDocRef, newUpvote)
        .then(commentsDocRef => {
            console.log("User's upvote has been added");
        })
        .catch(error => {
          console.log(error);
      })
        commentsUpvoted.push(resume_id)
        let updateUpvotedComments = await updateDoc(userHasVotedOnThisCommentRef, {
          CommentsUserUpvoted: commentsUpvoted,
      });
      // this.forceRerender()
      }

      // this.$emit('rerender')
      this.getCommentsData()
      this.values = this.values
      this.categories = this.categories
      // this.categorizeComment(allComments, cat)
      // this.forceRerender()



    },

    async downvoteComment(resume_id, comment_id, userHasUpvotedThisComment, userHasDownvotedThisComment) {
      let commentsDocRef = doc(db, "ResumeInfo", resume_id, "Comments", comment_id);
      let commentDocSnap = await getDoc(commentsDocRef)
      let commentData = commentDocSnap.data()

      let commentsUpvoted = []
      let commentsDownvoted = []

      let userHasVotedOnThisCommentRef = doc(db, 'users', this.email);
      let getUserVotesOnThisComment = await getDoc(userHasVotedOnThisCommentRef).then(
        (doc) => {
          // console.log('Document data:', doc);
          let userInfo = doc.data();
          // console.log('UserInfo: ', userInfo);
          commentsUpvoted = userInfo['CommentsUserUpvoted'];
          console.log('commentsUpvoted: ', commentsUpvoted);
          commentsDownvoted = userInfo['CommentsUserDownvoted'];
          console.log('commentsDownvoted: ', commentsDownvoted);
          // console.log('userStarredResumes: ', userStarredResumes);
        })


      if (commentsDownvoted.includes(resume_id)) {
        // console.log('user has already starred this resume');
        commentsDownvoted = commentsDownvoted.filter(item => item !== resume_id)

        let updateDownvotedComments = await updateDoc(userHasVotedOnThisCommentRef, {
          CommentsUserDownvoted: commentsDownvoted,
      });

        let downvotes = commentData['Number_of_Downvotes']
        const newDownvote = {
          Numberof_Downvotes: downvotes - 1,
        };
        updateDoc(commentsDocRef, newDownvote)
        .then(commentsDocRef => {
            console.log("User's downvote has been removed");
        })
        .catch(error => {
          console.log(error);
      })

        // this.forceRerender()
        // this.getCommentsData()
        // this.values = this.values
        // this.categories = this.categories
      }
      else if (commentsDownvoted.includes(resume_id)) {
        commentsDownvoted = commentsDownvoted.filter(item => item !== resume_id)
        commentsUpvoted.push(resume_id)

        let downvotes = commentData['Number_of_Downvotes']
        const newDownvote = {
          Number_of_Downvotes: downvotes + 1,
        };
        updateDoc(commentsDocRef, newDownvote)
        .then(commentsDocRef => {
            console.log("User's upvote has been added");
        })
        .catch(error => {
          console.log(error);
        })

        let upvotes = commentData['Number_Of_Upvotes']
        const newUpvote = {
          Number_Of_Upvotes: upvotes - 1,
        };
        updateDoc(commentsDocRef, newUpvote)
        .then(commentsDocRef => {
            console.log("User's downvote has been removed");
        })
        .catch(error => {
          console.log(error);
        })

        let updateDownvotedComments = await updateDoc(userHasVotedOnThisCommentRef, {
          CommentsUserDownvoted: commentsDownvoted,
      });
      // this.forceRerender()
      }
      else {
        let downvotes = commentData['Number_of_Downvotes']
        const newDownvote = {
          Number_of_Downvotes: downvotes + 1,
        };
        updateDoc(commentsDocRef, newDownvote)
        .then(commentsDocRef => {
            console.log("User's upvote has been added");
        })
        .catch(error => {
          console.log(error);
      })
        commentsDownvoted.push(resume_id)
        let updateDownvotedComments = await updateDoc(userHasVotedOnThisCommentRef, {
          CommentsUserDownvoted: commentsDownvoted,
      });
      // this.forceRerender()
      }

      // this.$emit('rerender')
      this.getCommentsData()
      this.values = this.values
      this.categories = this.categories
      // this.categorizeComment(allComments, cat)
      // this.forceRerender()



    },

    cancelComment() {
      this.component = null;
    },

    showReply(comment_id) {
      this.comment_id = comment_id;
      this.component = 'reply-input';
    },

    categorizeComment(allComments, cat) {
      var categorized = []
      allComments.forEach((comment) => {
        if (comment.category == cat) {
          categorized.push(comment);
        }
      })
      return categorized;
    },

    forceRerender() {
      this.componentKey += 1;
      // this.$emit('rerender')
      this.getCommentsData()
    }

   

    


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

#commentHeader {
  width: 90%;
  background-color: #c8d8e4;
  color: #2b6777;
  border-style: ridge;
  border-color: #2b6777;
  font-family: 'Montserrat', sans-serif;
  font-size: 25px;
  font-weight: bold;
  animation: fade-in 1s;
}

#categoryDivider {
  padding-bottom: 3%;
  padding-top: 4%;
  animation: fade-in 1s;
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
  animation: fade-in 1s;
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

#descriptionBox {
  display: block;
  width: 100%;
  height: 30%;
  padding: 2%;
  font-size: 16px;
  line-height: 1.4;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family:'Times New Roman', Times, serif;
}

#addCommentHeader {
  margin-top: 30%;
  width: 90%;
  background-color: #c8d8e4;
  color: #2b6777;
  border-style: ridge;
  border-color: #2b6777;
  font-family: 'Montserrat', sans-serif;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

#largeContainer {
  height: 800px;
  overflow-y: scroll;
}

#comment {
  display: flex;
  /* background-color: grey; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  height: 150px;
  width: 350px;
  padding-right: 10%;
  position:relative; left:-50px;
  animation: fade-in 1s;
}

#votesContainer {
  /* background-color: rgb(0, 153, 255); */
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Rubik-Medium;
  flex-direction: column;
  background-color:#f2f2f2;
  border-radius: 50px;
  margin: 5%;
  width: 40px;
}

.vote {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color:#2b6777;
}

.voteCount {
  flex: 1;
  /* background-color: rgb(0, 255, 0); */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2b6777;
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
  font-family: 'Montserrat', sans-serif;
  font-weight: medium;

}

#commentDateContainer {
  font-style: italic;
  margin-left: 3%;
  font-size: 80%;
  padding-top: 0%;
}

#replyButton {
  height: 100%;
  margin-left: 5%;
}

#replyButton:hover {
  background-color: #f2f2f2;
}

#reply {
  display: flex;
  /* background-color: grey; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  height: 120px;
  width: 350px;
  position:relative; left:-60px;
  animation: fade-in 1s;
}

#replyVotesContainer {
  /* background-color: rgb(0, 153, 255); */
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Rubik-Medium;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 50px;
  margin: 5%;
  width: 10%;
}

#replyContentsContainer{
  margin-left: 1%;
}


#replyDetailsContainer {
  /* background-color: rgb(255, 0, 255); */
  color: grey;
  font-family: Rubik-Regular;
  font-weight: medium;
  margin-left: 5%;
  margin-right: 5%;
}

#replyContentsContainer{
  margin-left: 1%;
}


#replyTopHalfContent {
  display: flex;
  flex-direction: row;
  height: 10%;
  width: 90%;
  margin-top: 1%;
  margin-bottom: 40px;
}

#replyDateContainer {
  font-style: italic;
  margin-left: 3%;
  font-size: 80%;
  position: relative;
  padding-top: 10%;
}

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

.material-symbols-outlined ~ span {display:inline-block}

#saveButton {
  background-color:#52ab98;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 78%;
}

#saveButton:hover {
  background-color:  #3f7d70;;
}

</style>
