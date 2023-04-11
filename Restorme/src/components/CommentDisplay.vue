<template>
    <head>
        <link rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </head>
    <div>
      <h1 id="Current">Comments</h1>

      <i class="material-symbols-outlined">badge</i>
      <span id="General">General</span>
      <table id="table" class="auto-index">
        <tr v-for="(row, index) in tableRows" :key="row.date">
          <td>
            // Upvote
            Downvote Function here
            <!-- <button @click="deleteInstrument(row.coin, useremail)" class="bwt">
              Delete
            </button> -->
          </td>
          <td>{{ row.userName }}</td>
          <td>{{ row.date }}</td>
          <td>{{ row.description }}</td>
          <td>
            // Reply
            Comment Function here
            <!-- <button @click="deleteInstrument(row.coin, useremail)" class="bwt">
              Delete
            </button> -->
          </td>
        </tr>
      </table>
      <br />


      <i class="material-symbols-outlined">school</i>
      <span id="Education">Education</span>
      <br />
      <br />


      <i class="material-symbols-outlined">business_center</i>
      <span id="Experience">Experience</span>
      <br />
      <br />

      <i class="material-symbols-outlined">integration_instructions</i>
      <span id="Projects">Projects</span>
      <br />
      <br />

      <i class="material-symbols-outlined">auto_awesome</i>
      <span id="Skills">Skills</span>
      <br />
      <br />


      <br />
      <br />
      <div v-for="(commentList, index) in uniqueComments" v-bind:key="index" id="contentContainer">
        <div id="userDetailsContainer">{{ commentList.name }}</div>
            <div  id="commentDetailsContainer">
                {{ commentList.comment }}
            </div>
    </div>


    <!-- 
        CODE IN PROGRESS

    <div class="scrollfield">
            <ul class="commentList">
                <li v-for="(commentList, index) in uniqueComments" v-bind:key="index">
                    <p class="username">{{ commentList.name }}:</p>
                    <div class="commentbox">
                        <p class="comments">{{ commentList.comment }}</p>
                    </div>
                </li>
            </ul>
    </div>

      <h2 id="EducationComment">Total Profit is : {{  }} USD</h2>
     -->
    </div>
</template>

<script>
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
import { async } from "@firebase/util";

/* //import CoinGecko from "coingecko-api"

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; */

export default {
    data() {
        return {
            user: false,
            useremail: "",
            tableRows: [],
        };
    },

  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.useremail = user.email;
        this.fetchAndUpdateData(user.email);
      }
    });
  },
  methods: {
    async fetchAndUpdateData(useremail) {
        //const commentsList = [];
        
        const userUid = auth.currentUser.uid;
        console.log(userUid);
        this.user = userUid



        // ------   QUERY FOR GENERAL CATEGORY COMMENTS
        const qgeneral = query(collection(db, "Comments"), 
        where("Resume_ID", "==", 12345678), where("Comment_Category", "==", "General")); //multiple queries do not work well- better to filter on js
        //console.log(q);
        let allDocuments = await getDocs(qgeneral);
        
        // Test if the Firebase query works
        allDocuments.forEach((doc) => {
            console.log(doc.data());
            console.log(doc.data().Description)
        })
        // Result: It works.

        this.tableRows = await Promise.all(
            allDocuments.docs.map(async (docu) => {
                let user = docu.data().User;

                const userRef = doc(db, "users", String(user))
                const userNameSnap = await getDoc(userRef);
                const userNameDoc = userNameSnap.data();
                console.log(userNameDoc);
                let userName = userNameDoc.Name;
                

                let description = docu.data().Description;
                let date = docu.data().Upload_Date;

                return {
                    description,
                    date,
                    userName,
                }
            })
        )


        /* 
                      const userNameRef = doc(db, "Users", userUid)
                const userNameSnap = getDoc(userNameRef);
                try {
                    const userName = (await userNameSnap).data().Name;
                    return userName;
                } catch (error) {
                    console.log("No such user")
                }
        
        this.General = await Promise.all(
            allDocuments.docs.map(async (doc) => {
                let documentData = doc.data();

                let description = documentData.description;

                return {
                    description
                }
            })
        ) */


        
      

  /*
      // Promise.all to ensure all async operations are over.
      // allDocuments.docs.map(async (doc) to iterate over all documents and create arrays of promises

      this.tableRows = await Promise.all(
        allDocuments.docs.map(async (doc) => {
          let documentData = doc.data();

          let coin = documentData.Coin;
          let ticker = documentData.Ticker;
          let buyPrice = documentData.Buy_Price;
          let buyQuantity = documentData.Buy_Quantity;

          let currentPrice = await this.fetchCurrentPrice(ticker);
          let profit = Math.round(
            buyQuantity * (parseFloat(currentPrice) - parseFloat(buyPrice))
          );

          this.totalProfit += profit;

          buyPrice = currencyFormat.format(buyPrice);
          currentPrice = currencyFormat.format(currentPrice);
          profit = currencyFormat.format(profit);

          return {
            coin,
            ticker,
            buyPrice,
            buyQuantity,
            currentPrice,
            profit,
          };
        })
      );
      this.totalProfit = currencyFormat.format(this.totalProfit);
    },

    async fetchCurrentPrice(ticker) {
      let binance = new ccxt.binance();
      let x = await binance.fetch_ohlcv(ticker, "5m");
      return x[499][4];
    },

    async deleteInstrument(coin, user) {
      alert("You are going to delete: " + coin);
      await deleteDoc(doc(db, user, coin));
      console.log("Document successfully deleted!", coin);

      // Refresh table data and total profit
      await this.fetchAndUpdateData(this.useremail);
    },
  },*/
}}}
</script>


<style>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

.material-symbols-outlined ~ span {display:inline-block}

#contentContainer {
  flex: 15;
  display: flex;
  flex-direction: column;
  /* background-color: rgb(255, 0, 0); */
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

h1{
  text-align: center;
  background-color: rgb(240, 217, 142);
  font: 700;
  font-family: sans-serif;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: lighter;
  border-radius: 10em;
}


span,
h2{
  text-align: left;
  background-color: transparent;
  font-family: sans-serif;
  display: block;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: lighter;
  border-radius: 5em;
  width: 50%;
  margin-left: 1%;

}


table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

tr:nth-child(even) {
  background-color: #e3edee;

}

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 5px;


}


.bwt {
  color: rgb(243, 236, 236);
  background-color: rgb(255, 94, 0);
}
</style>